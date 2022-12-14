-- migrate:up

CREATE TABLE IF NOT EXISTS `users` (
                                       `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                                       `nickname` varchar(50) NOT NULL,
                                       `password` varchar(100) NOT NULL,
                                       `email` varchar(50) UNIQUE NOT NULL,
                                       `position_name` varchar(50) NOT NULL,
                                       `group_id` int NOT NULL DEFAULT (2),
                                       `is_admin` tinyint NOT NULL DEFAULT (0),
                                       `is_deleted` boolean DEFAULT (false),
                                       `created_at` datetime NOT NULL DEFAULT (now()),
                                       `updated_at` datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL COMMENT 'update time'
);

CREATE TABLE IF NOT EXISTS `user_group` (
                                            `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                                            `company_name` varchar(50) UNIQUE NOT NULL,
                                            `start_date` datetime,
                                            `end_date` datetime,
                                            `is_deleted` boolean DEFAULT (false),
                                            `created_at` datetime NOT NULL DEFAULT (now()),
                                            `updated_at` datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL COMMENT 'update time'
);

CREATE TABLE IF NOT EXISTS `feeds` (
                                       `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                                       `user_id` int NOT NULL,
                                       `category_id` int,
                                       `title` varchar(100),
                                       `logo_img` varchar(250),
                                       `introduction` varchar(100),
                                       `website_url` varchar(250),
                                       `detail_introduction` varchar(1000),
                                       `member_benefit` varchar(100),
                                       `contact` varchar(50),
                                       `use_branch_id` int,
                                       `status_id` int DEFAULT (1),
                                       `created_at` datetime NOT NULL DEFAULT (now()),
                                       `updated_at` datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL COMMENT 'update time'
);

CREATE TABLE IF NOT EXISTS `feed_status` (
                                             `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                                             `status` varchar(50) NOT NULL,
                                             `created_at` datetime NOT NULL DEFAULT (now()),
                                             `updated_at` datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL COMMENT 'update time'
);

CREATE TABLE IF NOT EXISTS `main_field` (
                                            `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                                            `field_name` varchar(500) NOT NULL,
                                            `created_at` datetime NOT NULL DEFAULT (now()),
                                            `updated_at` datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL COMMENT 'update time'
);

CREATE TABLE IF NOT EXISTS `feeds_main_fields` (
                                                   `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                                                   `feeds_id` int NOT NULL,
                                                   `main_field_id` int,
                                                   `created_at` datetime NOT NULL DEFAULT (now()),
                                                   `updated_at` datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL COMMENT 'update time'
);

CREATE TABLE IF NOT EXISTS `branch` (
                                        `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                                        `branch_name` varchar(50) NOT NULL,
                                        `created_at` datetime NOT NULL DEFAULT (now()),
                                        `updated_at` datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL COMMENT 'update time'
);

CREATE TABLE IF NOT EXISTS `location` (
                                          `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                                          `location` varchar(50) NOT NULL,
                                          `created_at` datetime NOT NULL DEFAULT (now()),
                                          `updated_at` datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL COMMENT 'update time'
);

CREATE TABLE IF NOT EXISTS `branch_location` (
                                                 `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                                                 `location_id` int NOT NULL,
                                                 `branch_id` int NOT NULL,
                                                 `created_at` datetime NOT NULL DEFAULT (now()),
                                                 `updated_at` datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL COMMENT 'update time'
);

CREATE TABLE IF NOT EXISTS `replies` (
                                         `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                                         `user_id` int NOT NULL,
                                         `feed_id` int NOT NULL,
                                         `comment` varchar(1000) NOT NULL,
                                         `parent_reply_id` int DEFAULT (0),
                                         `is_private` boolean NOT NULL DEFAULT (false),
                                         `is_deleted` boolean DEFAULT (false),
                                         `created_at` datetime NOT NULL DEFAULT (now()),
                                         `updated_at` datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL COMMENT 'update time'
);

CREATE TABLE IF NOT EXISTS `category` (
                                          `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                                          `category` varchar(50) NOT NULL,
                                          `category_img_url` varchar(250),
                                          `introduction` varchar(250),
                                          `parent_category_id` int,
                                          `created_at` datetime NOT NULL DEFAULT (now()),
                                          `updated_at` datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL COMMENT 'update time'
);

CREATE TABLE IF NOT EXISTS `company_file` (
                                              `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                                              `feed_id` int NOT NULL,
                                              `file_name` varchar(100) NOT NULL,
                                              `file_link` varchar(250) NOT NULL,
                                              `created_at` datetime NOT NULL DEFAULT (now()),
                                              `updated_at` datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL COMMENT 'update time'
);

ALTER TABLE `users` ADD FOREIGN KEY (`group_id`) REFERENCES `user_group` (`id`);

ALTER TABLE `feeds` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `feeds` ADD FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

ALTER TABLE `feeds` ADD FOREIGN KEY (`use_branch_id`) REFERENCES `branch` (`id`);

ALTER TABLE `feeds` ADD FOREIGN KEY (`status_id`) REFERENCES `feed_status` (`id`);

ALTER TABLE `feeds_main_fields` ADD FOREIGN KEY (`feeds_id`) REFERENCES `feeds` (`id`);

ALTER TABLE `feeds_main_fields` ADD FOREIGN KEY (`main_field_id`) REFERENCES `main_field` (`id`);

ALTER TABLE `branch_location` ADD FOREIGN KEY (`location_id`) REFERENCES `location` (`id`);

ALTER TABLE `branch_location` ADD FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`);

ALTER TABLE `replies` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `replies` ADD FOREIGN KEY (`feed_id`) REFERENCES `feeds` (`id`);

ALTER TABLE `category` ADD FOREIGN KEY (`parent_category_id`) REFERENCES `category` (`id`);

ALTER TABLE `company_file` ADD FOREIGN KEY (`feed_id`) REFERENCES `feeds` (`id`);


-- migrate:down

SET foreign_key_checks = 0;

DROP TABLE users;
DROP TABLE user_group;
DROP TABLE feeds;
DROP TABLE feed_status;
DROP TABLE main_field;
DROP TABLE feeds_main_fields;
DROP TABLE branch;
DROP TABLE location;
DROP TABLE branch_location;
DROP TABLE replies;
DROP TABLE category;
DROP TABLE company_file;

SET foreign_key_checks = 1;