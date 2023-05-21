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

-- add resetPasswordToken & resetPasswordExpires for forgot password
ALTER TABLE users
ADD COLUMN reset_password_token TEXT DEFAULT '',
ADD COLUMN reset_password_expires TIMESTAMP;

-- create  new table of clients
CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(50) UNIQUE NOT NULL,
	address VARCHAR(250) NOT NULL
);