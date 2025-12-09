-- Insert sample models
INSERT INTO models (slug, display_name, avatar_url, banner_url, bio, gateway_url) VALUES
('luna-star', 'Luna Star', 'https://picsum.photos/seed/luna/200/200', 'https://picsum.photos/seed/lunabanner/1200/400', 'Content creator specializing in dance challenges and trending TikTok videos. Follow for daily entertainment!', 'https://example.com/18plus/luna-star'),
('alex-rivers', 'Alex Rivers', 'https://picsum.photos/seed/alex/200/200', 'https://picsum.photos/seed/alexbanner/1200/400', 'Fitness enthusiast and lifestyle vlogger. Sharing workout tips and motivational content.', 'https://example.com/18plus/alex-rivers');

-- Insert sample videos for Luna Star (model_id = 1)
INSERT INTO videos (model_id, slug, title, thumbnail_url, video_url, duration_seconds, views) VALUES
(1, 'luna-dance-challenge-1', 'Epic Dance Challenge #1', 'https://picsum.photos/seed/vid1/640/360', 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', 60, 15420),
(1, 'luna-trending-moves', 'Trending Moves Compilation', 'https://picsum.photos/seed/vid2/640/360', 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_2mb.mp4', 120, 28350);

-- Insert sample videos for Alex Rivers (model_id = 2)
INSERT INTO videos (model_id, slug, title, thumbnail_url, video_url, duration_seconds, views) VALUES
(2, 'alex-workout-routine', 'Morning Workout Routine', 'https://picsum.photos/seed/vid3/640/360', 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', 180, 42100),
(2, 'alex-fitness-tips', '5 Fitness Tips for Beginners', 'https://picsum.photos/seed/vid4/640/360', 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_2mb.mp4', 240, 35780);
