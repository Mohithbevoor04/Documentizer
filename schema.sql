-- TalentChain AI (Documentizer) MySQL Database Schema Initialization Script

CREATE DATABASE IF NOT EXISTS `talentchain_db`;
USE `talentchain_db`;

-- Users Table
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(64) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `phone_number` VARCHAR(32),
  `role` VARCHAR(32) NOT NULL,
  `primary_role` VARCHAR(32) NOT NULL,
  `allowed_roles` JSON NOT NULL,
  `avatar` TEXT,
  `university_id` VARCHAR(64) NOT NULL,
  `university_name` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Achievements Table
CREATE TABLE IF NOT EXISTS `achievements` (
  `id` VARCHAR(64) PRIMARY KEY,
  `student_id` VARCHAR(64) NOT NULL,
  `student_name` VARCHAR(255) NOT NULL,
  `student_roll` VARCHAR(64) NOT NULL,
  `department` VARCHAR(128) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `type` VARCHAR(32) NOT NULL,
  `description` TEXT NOT NULL,
  `tech_stack` JSON NOT NULL,
  `verification_status` VARCHAR(32) DEFAULT 'pending',
  `ipfs_hash` VARCHAR(128),
  `tx_hash` VARCHAR(128),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Verifiable Credentials Table
CREATE TABLE IF NOT EXISTS `credentials` (
  `id` VARCHAR(64) PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `type` VARCHAR(32) NOT NULL,
  `student_name` VARCHAR(255) NOT NULL,
  `student_roll` VARCHAR(64) NOT NULL,
  `university_name` VARCHAR(255) NOT NULL,
  `issuer_name` VARCHAR(255) NOT NULL,
  `issued_at` VARCHAR(32) NOT NULL,
  `ipfs_hash` VARCHAR(128) NOT NULL,
  `tx_hash` VARCHAR(128) NOT NULL,
  `contract_address` VARCHAR(128) NOT NULL,
  `token_id` VARCHAR(64) NOT NULL,
  `status` VARCHAR(32) DEFAULT 'valid',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Jobs & Internships Table
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` VARCHAR(64) PRIMARY KEY,
  `company_name` VARCHAR(255) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `type` VARCHAR(32) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `is_remote` TINYINT DEFAULT 0,
  `stipend_or_salary` VARCHAR(128) NOT NULL,
  `deadline` VARCHAR(32) NOT NULL,
  `skills_required` JSON NOT NULL,
  `description` TEXT NOT NULL,
  `min_cgpa` DECIMAL(3,2) DEFAULT 7.00,
  `status` VARCHAR(32) DEFAULT 'open',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Audit Logs Table
CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` VARCHAR(64) PRIMARY KEY,
  `actor_name` VARCHAR(255) NOT NULL,
  `actor_role` VARCHAR(32) NOT NULL,
  `action` VARCHAR(128) NOT NULL,
  `target` VARCHAR(255) NOT NULL,
  `hash` VARCHAR(128),
  `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert Default Seed Users
INSERT INTO `users` (`id`, `name`, `email`, `phone_number`, `role`, `primary_role`, `allowed_roles`, `avatar`, `university_id`, `university_name`)
VALUES 
('usr_student_01', 'Alex Rivera', 'alex.rivera@dsatm.edu', '+91 98765 43210', 'student', 'student', '["student"]', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250', 'uni_dsatm_01', 'Dayananda Sagar Academy of Tech & Mgmt'),
('usr_faculty_01', 'Dr. Sarah Jenkins', 'sarah.jenkins@dsatm.edu', '+91 98765 12345', 'faculty', 'faculty', '["faculty", "student"]', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250', 'uni_dsatm_01', 'Dayananda Sagar Academy of Tech & Mgmt')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);
