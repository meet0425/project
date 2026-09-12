-- ========================================
-- MG INFOTECH Complete Database Structure
-- Copy ALL → phpMyAdmin → SQL → Go!
-- ========================================

-- 1. CREATE DATABASE
CREATE DATABASE IF NOT EXISTS `mginfo` 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `mginfo`;

-- 2. DROP ALL TABLES (Safe recreate)
DROP TABLE IF EXISTS `contacts`, `enquiries`, `admissions`, `stats`, `projects`, `courses`;

-- 3. COURSES TABLE
CREATE TABLE `courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `price` decimal(10,2) DEFAULT NULL,
  `duration` varchar(50) DEFAULT NULL,
  `category` varchar(50) DEFAULT 'General',
  `image` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. PROJECTS TABLE
CREATE TABLE `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `description` text,
  `image_url` varchar(500) DEFAULT NULL,
  `live_url` varchar(500) DEFAULT NULL,
  `github_url` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. STATS TABLE (Home counters)
CREATE TABLE `stats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `students` int(11) DEFAULT 0,
  `courses` int(11) DEFAULT 0,
  `trainers` int(11) DEFAULT 0,
  `projects` int(11) DEFAULT 0,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. ADMISSIONS TABLE
CREATE TABLE `admissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `course` varchar(100) DEFAULT NULL,
  `address` text,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. ENQUIRIES TABLE (Courses enquiry)
CREATE TABLE `enquiries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `course` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. CONTACTS TABLE
CREATE TABLE `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `subject` varchar(200) DEFAULT NULL,
  `message` text,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. SAMPLE DATA
-- Courses
INSERT INTO `courses` (`name`, `description`, `price`, `duration`, `category`, `image`) VALUES
('React JS', 'Modern frontend development using React hooks and components.', 12000.00, '3 Months', 'Frontend', 'https://images.unsplash.com/photo-1708827943933-d8dc1f916e46'),
('Node JS', 'Build scalable backend APIs using Node.js and Express.', 10000.00, '3 Months', 'Backend', 'https://images.unsplash.com/photo-1644951680756-1fa914f8bae6'),
('MERN Stack', 'Complete full stack development with MongoDB, Express, React, Node.', 20000.00, '6 Months', 'Fullstack', 'https://images.unsplash.com/photo-1708827943933-d8dc1f916e46'),
('Web Development', 'Complete website development from design to deployment.', 15000.00, '4 Months', 'Web', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d');

-- Projects (6 samples)
INSERT INTO `projects` (`title`, `category`, `description`, `image_url`, `live_url`, `github_url`) VALUES
('E-Commerce Web App', 'MERN', 'Full-featured e-commerce platform with cart, payment gateway, admin dashboard.', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d', 'https://example.com/ecommerce', 'https://github.com/user/ecommerce'),
('Admin Analytics Dashboard', 'Web', 'Modern dashboard with charts, reports, authentication system.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71', 'https://example.com/dashboard', 'https://github.com/user/dashboard'),
('Portfolio Website', 'UI', 'Responsive portfolio with animations and project showcase.', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085', 'https://example.com/portfolio', 'https://github.com/user/portfolio'),
('Student Management System', 'MERN', 'CRUD system with authentication and database integration.', 'https://images.unsplash.com/photo-1581090700227-1e8a5c1f6b9c', 'https://example.com/student-mgmt', 'https://github.com/user/student-mgmt'),
('Blog Application', 'Web', 'Dynamic blog platform with admin panel and API integration.', 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d', 'https://example.com/blog', 'https://github.com/user/blog'),
('Task Manager App', 'UI', 'Task app with drag-drop UI and productivity tracking.', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c', 'https://example.com/taskmgr', 'https://github.com/user/taskmgr');

-- Stats
INSERT INTO `stats` (`students`, `courses`, `trainers`, `projects`) VALUES (1250, 28, 12, 520);

-- 10. VERIFY (Run to check)
SELECT 'SUCCESS: Database ready with 6 tables + data!' as Status;
SHOW TABLES;
SELECT COUNT(*) as 'Total Courses' FROM courses;
SELECT COUNT(*) as 'Total Projects' FROM projects;

-- END ✅ Save as db_structure.sql

