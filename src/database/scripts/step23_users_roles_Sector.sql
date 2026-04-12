USE hatchery_control;

CREATE TABLE sectors (
  id INT IDENTITY(1,1) PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME()
);

CREATE TABLE roles (
  id INT IDENTITY(1,1) PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE users (
  id INT IDENTITY(1,1) PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  password_hash VARCHAR(255) NULL,
  sector_id INT NULL,
  is_active BIT NOT NULL DEFAULT 1,
  created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
  CONSTRAINT FK_users_sector FOREIGN KEY (sector_id) REFERENCES sectors(id)
);

CREATE TABLE user_roles (
  user_id INT NOT NULL,
  role_id INT NOT NULL,
  PRIMARY KEY (user_id, role_id),
  CONSTRAINT Fk_user_roles_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT FK_user_roles_role FOREIGN KEY (role_id) REFERENCES roles(id)
);