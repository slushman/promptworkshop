-- Split "role / organization" into separate fields. Existing values stay in `role`.
ALTER TABLE testimonials ADD COLUMN organization TEXT;
