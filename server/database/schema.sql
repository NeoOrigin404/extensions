CREATE TABLE member (
  id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  username VARCHAR(50) NOT NULL UNIQUE,
  email varchar(255) NOT NULL UNIQUE,
  hashed_password varchar(255) NOT NULL,
  premium BOOLEAN DEFAULT FALSE,
  role VARCHAR(50) NOT NULL DEFAULT 'user'
);

CREATE TABLE extension (
  id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  logo VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL UNIQUE,
  description VARCHAR(255) NOT NULL,
  is_premium BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT FALSE
);

CREATE TABLE language (
  id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE member_language (
  member_id INTEGER NOT NULL,
  language_id INTEGER NOT NULL
);

INSERT INTO member (first_name, last_name, username, email, hashed_password, premium, role)
VALUES
("Julien", "Picart", "NeoOrigin404", "admin@extensions.com", "$argon2id$v=19$m=32768,t=10,p=4$jmU9Y1voPSzx95B2JUNQ0A$j77ZlRuGDdDQVSY+I78lb+4w8WM8AqkSpbWOyK1LCNQ", TRUE, "admin");

INSERT INTO extension (logo, name, description, is_premium, is_active)
VALUES
("/assets/images/logo-devlens.svg", "DevLens", "Quickly inspect page layouts and visualize element boundaries.", FALSE, FALSE),
("/assets/images/logo-style-spy.svg", "StyleSpy", "Instantly analyze and copy CSS from any webpage element.", FALSE, FALSE),
("./assets/images/logo-speed-boost.svg", "SpeedBoost", "Optimizes browser resource usage to accelerate page loading.", FALSE, FALSE),
("./assets/images/logo-json-wizard.svg", "JSONWizard", "Formats, validates, and prettifies JSON responses in-browser.", FALSE, FALSE),
("./assets/images/logo-tab-master-pro.svg", "TabMaster Pro", "Organizes browser tabs into groups and sessions.", FALSE, FALSE),
("./assets/images/logo-viewport-buddy.svg", "ViewportBuddy", "Simulates various screen resolutions directly within the browser.", FALSE, FALSE),
("./assets/images/logo-markup-notes.svg", "Markup Notes", "Enables annotation and notes directly onto webpages for collaborative debugging.", FALSE, FALSE),
("./assets/images/logo-grid-guides.svg", "GridGuides", "Overlay customizable grids and alignment guides on any webpage.", FALSE, FALSE),
("./assets/images/logo-palette-picker.svg", "Palette Picker", "Instantly extracts color palettes from any webpage.", FALSE, FALSE),
("./assets/images/logo-link-checker.svg", "LinkChecker", "Scans and highlights broken links on any page.", FALSE, FALSE),
("./assets/images/logo-dom-snapshot.svg", "DOM Snapshot", "Capture and export DOM structures quickly.", FALSE, FALSE),
("./assets/images/logo-console-plus.svg", "ConsolePlus", "Enhanced developer console with advanced filtering and logging.", FALSE, FALSE);


INSERT INTO language (name)
VALUES
("JavaScript"),
("Python"),
("C#"),
("C++"),
("Java"),
("PHP"),
("Ruby"),
("Swift"),
("Rust"),
("TypeScript"),
("CSS"),
("HTML5"),
("SQL");


INSERT INTO member_language (member_id, language_id)
VALUES
(1, 1);