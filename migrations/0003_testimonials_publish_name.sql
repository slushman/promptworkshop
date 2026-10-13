-- Separate permission to publish the name from permission to publish the feedback.
-- Previously one checkbox covered both, so existing rows carry that answer over.
ALTER TABLE testimonials ADD COLUMN can_publish_name INTEGER NOT NULL DEFAULT 0;
UPDATE testimonials SET can_publish_name = can_publish;
