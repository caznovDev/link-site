
CREATE TABLE IF NOT EXISTS models (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  banner_url TEXT,
  bio TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS videos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE,
  title TEXT,
  thumbnail_url TEXT,
  video_url TEXT,
  duration_seconds INTEGER,
  model_id INTEGER,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(model_id) REFERENCES models(id)
);
