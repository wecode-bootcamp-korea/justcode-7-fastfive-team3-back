-- migrate:up

CREATE TABLE `users` (
                         `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                         `nickname` varchar(50) NOT NULL,
                         `password` varchar(100) NOT NULL,
                         `email` varchar(50) UNIQUE NOT NULL,
                         `sort_id` int NOT NULL,
                         `is_admin` tinyint NOT NULL DEFAULT (0),
                         `created_at` datetime NOT NULL DEFAULT (now()),
                         `updated_at` datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL COMMENT 'update time'
);

CREATE TABLE IF NOT EXISTS `user_group` (
                              `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                              `sort` varchar(250) NOT NULL,
                              `created_at` datetime NOT NULL DEFAULT (now()),
                              `updated_at` datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL COMMENT 'update time'
);

CREATE TABLE IF NOT EXISTS `feeds` (
                         `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                         `user_id` int NOT NULL,
                         `title` varchar(100) NOT NULL,
                         `logo_img` varchar(100) NOT NULL,
                         `introduction` varchar(100) NOT NULL,
                         `website_url` varchar(250),
                         `detail_introduction` varchar(1000),
                         `member_benefit` varchar(100),
                         `contact` varchar(50) NOT NULL,
                         `company_file` varchar(100),
                         `use_branch_id` int NOT NULL,
                         `status_id` int NOT NULL DEFAULT (1),
                         `created_at` datetime NOT NULL DEFAULT (now()),
                         `updated_at` datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL COMMENT 'update time'
);

CREATE TABLE IF NOT EXISTS `feed_status` (
                               `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                               `status` varchar(50) NOT NULL,
                               `created_at` datetime NOT NULL DEFAULT (now()),
                               `updated_at` datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL COMMENT 'update time'
);

CREATE TABLE IF NOT EXISTS `feed_category` (
                                 `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                                 `feed_id` int NOT NULL,
                                 `category_id` int NOT NULL,
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
                                     `main_field_id` int NOT NULL,
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

CREATE TABLE IF NOT EXISTS `comments` (
                            `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                            `user_id` int NOT NULL,
                            `feed_id` int NOT NULL,
                            `comment` varchar(1000) NOT NULL,
                            `reply_id` int,
                            `status` boolean NOT NULL DEFAULT (true),
                            `created_at` datetime NOT NULL DEFAULT (now()),
                            `updated_at` datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL COMMENT 'update time'
);

CREATE TABLE IF NOT EXISTS `category` (
                            `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                            `category` varchar(50) NOT NULL,
                            `introduction` varchar(250),
                            `high_rank_id` int,
                            `created_at` datetime NOT NULL DEFAULT (now()),
                            `updated_at` datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL COMMENT 'update time'
);

ALTER TABLE `users` ADD FOREIGN KEY (`sort_id`) REFERENCES `user_group` (`id`);

ALTER TABLE `feeds` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `feeds` ADD FOREIGN KEY (`use_branch_id`) REFERENCES `branch` (`id`);

ALTER TABLE `feeds` ADD FOREIGN KEY (`status_id`) REFERENCES `feed_status` (`id`);

ALTER TABLE `feed_category` ADD FOREIGN KEY (`feed_id`) REFERENCES `feeds` (`id`);

ALTER TABLE `feed_category` ADD FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

ALTER TABLE `feeds_main_fields` ADD FOREIGN KEY (`feeds_id`) REFERENCES `feeds` (`id`);

ALTER TABLE `feeds_main_fields` ADD FOREIGN KEY (`main_field_id`) REFERENCES `main_field` (`id`);

ALTER TABLE `branch_location` ADD FOREIGN KEY (`location_id`) REFERENCES `location` (`id`);

ALTER TABLE `branch_location` ADD FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`feed_id`) REFERENCES `feeds` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`reply_id`) REFERENCES `comments` (`id`);

ALTER TABLE `category` ADD FOREIGN KEY (`high_rank_id`) REFERENCES `category` (`id`);


-- migrate:down

SET foreign_key_checks = 0;

DROP TABLE users;
DROP TABLE user_group;
DROP TABLE feeds;
DROP TABLE feed_status;
DROP TABLE feed_category;
DROP TABLE main_field;
DROP TABLE feeds_main_fields;
DROP TABLE branch;
DROP TABLE location;
DROP TABLE branch_location;
DROP TABLE comments;
DROP TABLE category;

SET foreign_key_checks = 1;