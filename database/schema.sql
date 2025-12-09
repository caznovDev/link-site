CREATE TABLE models (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  banner_url TEXT,
  bio TEXT,
  gateway_url TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE videos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  model_id INTEGER NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  thumbnail_url TEXT,
  video_url TEXT NOT NULL,
  duration_seconds INTEGER,
  views INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(model_id) REFERENCES models(id)
);

CREATE INDEX idx_models_slug ON models(slug);
CREATE INDEX idx_videos_slug ON videos(slug);
CREATE INDEX idx_videos_model ON videos(model_id);
CREATE INDEX idx_videos_created ON videos(created_at);
