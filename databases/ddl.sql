CREATE TABLE `positions` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) UNIQUE NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp
);

CREATE TABLE `users` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `code` varchar(255) UNIQUE NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` char(1) NOT NULL,
  `isAdmin` bool NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp,
  `position_id` int NOT NULL
);

CREATE TABLE `attendances` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `notes` varchar(255),
  `proof_of_work_picture_url` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp,
  `user_id` int NOT NULL
);

ALTER TABLE `users` ADD FOREIGN KEY (`position_id`) REFERENCES `positions` (`id`);

ALTER TABLE `attendances` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
