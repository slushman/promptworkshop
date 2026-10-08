import type { APIRoute } from 'astro';

export const prerender = false;

const LIMITS = { name: 100, role: 150, body: 2000 };

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const POST: APIRoute = async ({ request, locals }) => {
  const wantsJson = request.headers.get('accept')?.includes('application/json');
  const respond = (ok: boolean, message: string, status = ok ? 200 : 400) =>
    wantsJson
      ? json({ ok, message }, status)
      : Response.redirect(new URL(`/testimonial?${ok ? 'thanks=1' : 'error=1'}`, request.url), 303);

  const form = await request.formData();

  // Honeypot: bots fill this in, people never see it. Pretend success.
  if (String(form.get('website') ?? '').trim()) return respond(true, 'Thank you!');

  const name = String(form.get('name') ?? '').trim();
  const role = String(form.get('role') ?? '').trim();
  const body = String(form.get('body') ?? '').trim();
  const canPublish = form.get('can_publish') ? 1 : 0;

  if (!name || !body) return respond(false, 'Please provide your name and testimonial.');
  if (name.length > LIMITS.name || role.length > LIMITS.role || body.length > LIMITS.body) {
    return respond(false, 'One of your answers is too long.');
  }

  try {
    await locals.runtime.env.promptworkshop.prepare(
      'INSERT INTO testimonials (name, role, body, can_publish) VALUES (?, ?, ?, ?)'
    )
      .bind(name, role || null, body, canPublish)
      .run();
  } catch (err) {
    console.error('Failed to save testimonial', err);
    return respond(false, 'Something went wrong. Please try again.', 500);
  }

  return respond(true, 'Thank you! Your testimonial has been received.');
};
