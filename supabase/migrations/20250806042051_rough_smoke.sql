-- Seed data for SPR HOA application

-- Insert sample admin users (these should be updated with real admin emails)
INSERT INTO admin_users (email, role) VALUES 
('admin@spr-hoa.com', 'admin'),
('moderator@spr-hoa.com', 'moderator')
ON CONFLICT (email) DO NOTHING;

-- Insert sample owners master data
INSERT INTO owners_master (unit_number, hoa_account_number) VALUES 
('101', '1001'),
('102', '1002'),
('103', '1003'),
('201', '2001'),
('202', '2002'),
('203', '2003')
ON CONFLICT (unit_number) DO NOTHING;

-- Insert sample registration tokens
INSERT INTO registration_token (unit_number, hoa_last4, token, used) VALUES 
('101', '1001', 'token_101_1001', false),
('102', '1002', 'token_102_1002', false),
('103', '1003', 'token_103_1003', false)
ON CONFLICT (unit_number, hoa_last4, token) DO NOTHING;

-- Insert sample news articles
INSERT INTO news_articles (title, content, author, published, image_url) VALUES 
('Welcome to Sandpiper Run', 'Welcome to our new community portal! Here you can stay updated with the latest news, events, and connect with your neighbors.', 'SPR Admin', true, 'https://images.pexels.com/photos/1546166/pexels-photo-1546166.jpeg'),
('Pool Maintenance Schedule', 'The pool will be closed for maintenance on the first Monday of each month from 8 AM to 12 PM.', 'Maintenance Team', true, 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg'),
('Community Guidelines Update', 'Please review the updated community guidelines available in the documents section.', 'HOA Board', true, null)
ON CONFLICT (id) DO NOTHING;

-- Insert sample events
INSERT INTO events (title, description, event_date, event_time, location, event_type) VALUES 
('Monthly HOA Meeting', 'Join us for our monthly HOA meeting to discuss community matters.', CURRENT_DATE + INTERVAL '7 days', '19:00:00', 'Community Center', 'meeting'),
('Pool Party', 'Annual summer pool party for all residents and their families.', CURRENT_DATE + INTERVAL '14 days', '15:00:00', 'Pool Area', 'social'),
('Landscaping Maintenance', 'Scheduled landscaping maintenance for common areas.', CURRENT_DATE + INTERVAL '3 days', '09:00:00', 'Common Areas', 'maintenance')
ON CONFLICT (id) DO NOTHING;

-- Insert sample community posts
INSERT INTO community_posts (title, content, category, author_name) VALUES 
('Lost Cat - Fluffy', 'Has anyone seen a gray tabby cat named Fluffy? Last seen near building 2.', 'General', 'Jane Doe'),
('Garage Sale This Weekend', 'Having a garage sale this Saturday from 8 AM to 2 PM. Lots of great items!', 'General', 'John Smith'),
('Tennis Court Reservation', 'The tennis court is available for reservation. Please contact the office.', 'General', 'Admin')
ON CONFLICT (id) DO NOTHING;

-- Insert sample message templates for admins
INSERT INTO admin_message_templates (template_name, subject_template, content_template, is_default) VALUES 
('Welcome Message', 'Welcome to Sandpiper Run Portal', 'Welcome to the Sandpiper Run community portal! We''re excited to have you join our online community. Here you can stay updated with news, events, and connect with your neighbors.', true),
('Photo Approval', 'Your photo has been approved', 'Great news! Your photo submission has been approved and is now visible in the community gallery. Thank you for contributing to our community!', false),
('Photo Rejection', 'Photo submission requires attention', 'Thank you for your photo submission. Unfortunately, we need to make some adjustments before it can be published. Please review our photo guidelines and resubmit.', false),
('Event Reminder', 'Upcoming Event Reminder', 'Don''t forget about the upcoming event: {{event_title}} on {{event_date}}. We look forward to seeing you there!', false)
ON CONFLICT (template_name) DO NOTHING;