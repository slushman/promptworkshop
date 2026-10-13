// Industries a testimonial can be tagged with. Add new industry pages here.
export const INDUSTRIES = ['education'] as const;
export type Industry = (typeof INDUSTRIES)[number];

export const parseIndustry = (value: unknown): Industry | null =>
  INDUSTRIES.find((i) => i === value) ?? null;

export interface PublishedTestimonial {
  body: string;
  // null when the author did not allow their name to be shown.
  attribution: string | null;
}

interface Row {
  name: string;
  role: string | null;
  organization: string | null;
  body: string;
  can_publish_name: number;
}

// Only approved testimonials the author agreed to publish. Name, role and
// organization are dropped here unless the author also agreed to those, so they
// never reach a template for anonymous testimonials.
export async function getPublishedTestimonials(
  db: D1Database,
  { industry, limit }: { industry?: Industry; limit: number }
): Promise<PublishedTestimonial[]> {
  const { results } = await db
    .prepare(
      `SELECT name, role, organization, body, can_publish_name FROM testimonials
       WHERE approved = 1 AND can_publish = 1 ${industry ? 'AND industry = ?' : ''}
       ORDER BY created_at DESC, id DESC LIMIT ?`
    )
    .bind(...(industry ? [industry, limit] : [limit]))
    .all<Row>();

  return results.map((r) => ({
    body: r.body,
    attribution: r.can_publish_name
      ? [r.name, r.role, r.organization].filter(Boolean).join(', ')
      : null,
  }));
}
