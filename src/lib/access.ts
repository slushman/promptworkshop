// Verifies the signed JWT that Cloudflare Access attaches to every request it lets through.
// Fails closed: anything missing, malformed, expired, or misconfigured is rejected.

interface AccessEnv {
  ACCESS_TEAM_DOMAIN?: string;
  ACCESS_AUD?: string;
}

interface Jwk extends JsonWebKey {
  kid: string;
}

let jwksCache: { keys: Jwk[]; fetchedAt: number } | null = null;
const JWKS_TTL_MS = 60 * 60 * 1000;

const decode = (part: string) =>
  Uint8Array.from(atob(part.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));

const parseJson = (part: string) => JSON.parse(new TextDecoder().decode(decode(part)));

async function getKeys(team: string, force: boolean): Promise<Jwk[]> {
  if (!force && jwksCache && Date.now() - jwksCache.fetchedAt < JWKS_TTL_MS) return jwksCache.keys;
  const res = await fetch(`https://${team}/cdn-cgi/access/certs`);
  if (!res.ok) throw new Error(`Failed to fetch Access certs: ${res.status}`);
  const { keys } = (await res.json()) as { keys: Jwk[] };
  jwksCache = { keys, fetchedAt: Date.now() };
  return keys;
}

/** Returns the authenticated email, or null if the request is not a valid Access request. */
export async function verifyAccess(request: Request, env: AccessEnv): Promise<string | null> {
  // `astro dev` has no Access in front of it. Production builds always enforce.
  if (import.meta.env.DEV) return 'dev@localhost';

  const team = env.ACCESS_TEAM_DOMAIN;
  const aud = env.ACCESS_AUD;
  if (!team || !aud) return null;

  const token = request.headers.get('Cf-Access-Jwt-Assertion');
  const parts = token?.split('.');
  if (!parts || parts.length !== 3) return null;

  try {
    const header = parseJson(parts[0]);
    const payload = parseJson(parts[1]);
    if (header.alg !== 'RS256') return null;

    let jwk = (await getKeys(team, false)).find((k) => k.kid === header.kid);
    if (!jwk) jwk = (await getKeys(team, true)).find((k) => k.kid === header.kid);
    if (!jwk) return null;

    const key = await crypto.subtle.importKey(
      'jwk',
      jwk,
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false,
      ['verify']
    );
    const valid = await crypto.subtle.verify(
      'RSASSA-PKCS1-v1_5',
      key,
      decode(parts[2]),
      new TextEncoder().encode(`${parts[0]}.${parts[1]}`)
    );
    if (!valid) return null;

    const now = Math.floor(Date.now() / 1000);
    const audiences: string[] = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
    if (!audiences.includes(aud)) return null;
    if (payload.iss !== `https://${team}`) return null;
    if (typeof payload.exp !== 'number' || payload.exp <= now) return null;
    if (typeof payload.nbf === 'number' && payload.nbf > now) return null;

    return typeof payload.email === 'string' ? payload.email : null;
  } catch {
    return null;
  }
}
