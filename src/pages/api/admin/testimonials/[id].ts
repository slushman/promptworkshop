import type { APIRoute } from 'astro';
import { verifyAccess } from '../../../../lib/access';

export const prerender = false;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

// Returns an error Response if the caller isn't allowed to make this change, otherwise the row id.
async function authorize(request: Request, locals: App.Locals, idParam: string | undefined) {
  if (!(await verifyAccess(request, locals.runtime.env))) return json({ ok: false }, 403);

  // Defense in depth against cross-site requests riding the Access cookie.
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) return json({ ok: false }, 403);

  const id = Number(idParam);
  if (!Number.isInteger(id) || id < 1) return json({ ok: false, message: 'Invalid id' }, 400);
  return id;
}

export const PATCH: APIRoute = async ({ request, locals, params }) => {
  const id = await authorize(request, locals, params.id);
  if (id instanceof Response) return id;

  let approved: unknown;
  try {
    ({ approved } = await request.json());
  } catch {
    return json({ ok: false, message: 'Invalid JSON' }, 400);
  }
  if (typeof approved !== 'boolean') return json({ ok: false, message: 'approved must be boolean' }, 400);

  const result = await locals.runtime.env.promptworkshop
    .prepare('UPDATE testimonials SET approved = ? WHERE id = ?')
    .bind(approved ? 1 : 0, id)
    .run();
  return result.meta.changes ? json({ ok: true }) : json({ ok: false, message: 'Not found' }, 404);
};

export const DELETE: APIRoute = async ({ request, locals, params }) => {
  const id = await authorize(request, locals, params.id);
  if (id instanceof Response) return id;

  const result = await locals.runtime.env.promptworkshop
    .prepare('DELETE FROM testimonials WHERE id = ?')
    .bind(id)
    .run();
  return result.meta.changes ? json({ ok: true }) : json({ ok: false, message: 'Not found' }, 404);
};
