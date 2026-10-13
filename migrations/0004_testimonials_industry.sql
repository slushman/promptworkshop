-- Which industry page a testimonial belongs to (NULL = general, home page only).
-- Existing testimonials all came from education workshops.
ALTER TABLE testimonials ADD COLUMN industry TEXT;
UPDATE testimonials SET industry = 'education';
