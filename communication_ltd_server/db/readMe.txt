-- Create a new database named Communication_LTD
CREATE DATABASE "Communication_LTD";

-- Create a new table named users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  salt TEXT NOT NULL
);

-- add login attempts to users table
ALTER TABLE users ADD COLUMN login_attempts INTEGER DEFAULT 0;

-- add last login attempt time to users table
ALTER TABLE users ADD COLUMN last_login_attempt timestamp;
