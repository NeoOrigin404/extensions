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
  logo VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  is_premium BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT FALSE
);

INSERT INTO member (first_name, last_name, username, email, hashed_password, premium, role)
VALUES
("Julien", "Picart", "NeoOrigin404", "admin@extensions.com", "Admin", TRUE, "admin");

INSERT INTO extension (logo, name, description, is_premium, is_active)
VALUES
("/assets/images/logo-devlens.svg", "DevLens", "Quickly inspect page layouts and visualize element boundaries.", FALSE, FALSE),
("/assets/images/logo-style-spy.svg", "StyleSpy", "Instantly analyze and copy CSS from any webpage element.", FALSE, FALSE);