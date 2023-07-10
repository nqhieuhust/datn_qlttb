/*
 Navicat Premium Data Transfer

 Source Server         : VPS_TrungPhuNA
 Source Server Type    : MySQL
 Source Server Version : 50568
 Source Host           : localhost:3306
 Source Schema         : 2023_reactjs_nodejs_qlthietbi

 Target Server Type    : MySQL
 Target Server Version : 50568
 File Encoding         : 65001

 Date: 29/06/2023 14:40:31
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for accessories
-- ----------------------------
DROP TABLE IF EXISTS `accessories`;
CREATE TABLE `accessories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `accessory_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int(11) DEFAULT '0',
  `unit` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `import_date` date DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `provider_id` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of accessories
-- ----------------------------
BEGIN;
INSERT INTO `accessories` (`id`, `accessory_name`, `quantity`, `unit`, `import_date`, `status`, `provider_id`, `created_at`, `updated_at`) VALUES (2, 'Phim X-Quang', 100, 'Tấm', '2023-06-08', 1, 3, '2023-06-21 16:38:30', '2023-06-21 16:38:30');
INSERT INTO `accessories` (`id`, `accessory_name`, `quantity`, `unit`, `import_date`, `status`, `provider_id`, `created_at`, `updated_at`) VALUES (5, 'Đầu dò điện', 50, 'Cái', '2023-06-09', 1, 4, '2023-06-21 16:51:02', '2023-06-21 16:51:02');
INSERT INTO `accessories` (`id`, `accessory_name`, `quantity`, `unit`, `import_date`, `status`, `provider_id`, `created_at`, `updated_at`) VALUES (6, 'Chất kháng khuẩn', 200, 'Chai', '2023-06-17', 1, 5, '2023-06-21 16:51:28', '2023-06-21 16:51:28');
COMMIT;

-- ----------------------------
-- Table structure for departments
-- ----------------------------
DROP TABLE IF EXISTS `departments`;
CREATE TABLE `departments` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `department_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of departments
-- ----------------------------
BEGIN;
INSERT INTO `departments` (`id`, `department_name`, `address`, `created_at`, `updated_at`) VALUES (51, 'Khoa Xét nghiệm', 'C1-103', '2023-06-22 20:47:13', '2023-06-26 16:55:03');
INSERT INTO `departments` (`id`, `department_name`, `address`, `created_at`, `updated_at`) VALUES (52, 'Khoa Chẩn Đoán Hình Ảnh', 'C9-101', '2023-06-23 10:41:52', '2023-06-26 16:55:33');
INSERT INTO `departments` (`id`, `department_name`, `address`, `created_at`, `updated_at`) VALUES (53, 'Khoa Cấp Cứu', 'C1-101', '2023-06-23 11:01:20', '2023-06-26 16:55:20');
INSERT INTO `departments` (`id`, `department_name`, `address`, `created_at`, `updated_at`) VALUES (55, 'Khoa Mắt', 'C3-102', '2023-06-23 11:04:49', '2023-06-26 16:55:11');
INSERT INTO `departments` (`id`, `department_name`, `address`, `created_at`, `updated_at`) VALUES (56, 'Khoa Răng Hàm Mặt', 'C2-204', '2023-06-23 11:10:41', '2023-06-23 11:10:41');
INSERT INTO `departments` (`id`, `department_name`, `address`, `created_at`, `updated_at`) VALUES (57, 'Khoa Tai Mũi họng', 'C3-103', '2023-06-23 11:11:12', '2023-06-23 11:11:12');
INSERT INTO `departments` (`id`, `department_name`, `address`, `created_at`, `updated_at`) VALUES (68, 'Phòng Quản lý vật tư, thiết bị', 'C2-101', '2023-06-26 13:42:03', '2023-06-26 13:42:03');
INSERT INTO `departments` (`id`, `department_name`, `address`, `created_at`, `updated_at`) VALUES (69, 'Phòng Công nghệ thông tin', 'B1-103', '2023-06-26 17:04:37', '2023-06-26 17:04:37');
INSERT INTO `departments` (`id`, `department_name`, `address`, `created_at`, `updated_at`) VALUES (70, 'Khoa Sản', 'D3-101', '2023-06-26 17:09:27', '2023-06-26 17:09:27');
INSERT INTO `departments` (`id`, `department_name`, `address`, `created_at`, `updated_at`) VALUES (71, 'Khoa Ung Bướu', 'D2-104', '2023-06-26 17:09:51', '2023-06-26 17:09:51');
COMMIT;

-- ----------------------------
-- Table structure for devices
-- ----------------------------
DROP TABLE IF EXISTS `devices`;
CREATE TABLE `devices` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `device_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `model` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `serial` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `device_group` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `device_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `classif_document` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `attached_document` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `datasheet_document` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `manufacture` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `import_date` date DEFAULT NULL,
  `handover_date` date DEFAULT NULL,
  `expire_date` date DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `provider_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` tinyint(4) DEFAULT '-1',
  `department_id` int(11) DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of devices
-- ----------------------------
BEGIN;
INSERT INTO `devices` (`id`, `code`, `device_name`, `model`, `serial`, `device_group`, `device_type`, `classif_document`, `attached_document`, `datasheet_document`, `manufacture`, `import_date`, `handover_date`, `expire_date`, `avatar`, `provider_id`, `user_id`, `created_at`, `updated_at`, `status`, `department_id`) VALUES (14, 'addad003v', 'Máy Xét Nghiệm Sinh Hóa Tự Động BioLis 50i Superiord', 'BioLis 50i Superiord', 'SKVS0002j', '1', 'A', NULL, NULL, NULL, 'Siemen', '2023-06-29', '2023-06-29', '2023-06-30', 'http://api-qltb.topcode.fun/api/v1/upload/image-17028b36-b966-4cac-ab01-42d61d0a25eb.png', 7, 7, '2023-06-23 11:13:06', '2023-06-27 00:46:19', 1, 55);
INSERT INTO `devices` (`id`, `code`, `device_name`, `model`, `serial`, `device_group`, `device_type`, `classif_document`, `attached_document`, `datasheet_document`, `manufacture`, `import_date`, `handover_date`, `expire_date`, `avatar`, `provider_id`, `user_id`, `created_at`, `updated_at`, `status`, `department_id`) VALUES (15, 'CDHA-0001', 'Máy siêu âm', 'EXP123', 'SKVS0002', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'http://api-qltb.topcode.fun/api/v1/upload/image-4d6d0e31-ba92-4c8d-90f5-7b47b5218e54.jpg', 4, 2, '2023-06-26 18:33:35', '2023-06-26 18:33:35', 1, 52);
INSERT INTO `devices` (`id`, `code`, `device_name`, `model`, `serial`, `device_group`, `device_type`, `classif_document`, `attached_document`, `datasheet_document`, `manufacture`, `import_date`, `handover_date`, `expire_date`, `avatar`, `provider_id`, `user_id`, `created_at`, `updated_at`, `status`, `department_id`) VALUES (16, 'RHM.0001', 'Máy chụp X-quang răng', '1221', '15', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'http://api-qltb.topcode.fun/api/v1/upload/image-28fc868c-142e-4fd1-921f-5b6e8d94fb42.jpg', 7, 11, '2023-06-26 18:39:48', '2023-06-27 00:08:38', 3, 56);
INSERT INTO `devices` (`id`, `code`, `device_name`, `model`, `serial`, `device_group`, `device_type`, `classif_document`, `attached_document`, `datasheet_document`, `manufacture`, `import_date`, `handover_date`, `expire_date`, `avatar`, `provider_id`, `user_id`, `created_at`, `updated_at`, `status`, `department_id`) VALUES (17, 'CDHA.0002', 'Máy EMR', '12sad', 'vdsvcsd', '1', 'A', NULL, NULL, NULL, NULL, '2023-05-31', '2023-06-23', '2023-06-15', 'http://api-qltb.topcode.fun/api/v1/upload/image-f4c6598b-30a5-43f7-9ddb-f23bbb81d25a.jpg', 4, 9, '2023-06-27 00:08:09', '2023-06-27 00:34:55', 1, 52);
COMMIT;

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of migrations
-- ----------------------------
BEGIN;
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (1, '2014_10_12_000000_create_users_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (2, '2014_10_12_100000_create_password_resets_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (3, '2019_08_19_000000_create_failed_jobs_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (4, '2019_12_14_000001_create_personal_access_tokens_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (5, '2023_06_17_164441_create_departments_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (6, '2023_06_17_165734_create_providers_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (7, '2023_06_17_165911_create_devices_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (8, '2023_06_17_170804_create_accessories_table', 1);
COMMIT;

-- ----------------------------
-- Table structure for password_resets
-- ----------------------------
DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`(191)) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of password_resets
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for personal_access_tokens
-- ----------------------------
DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`) USING BTREE,
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`(191),`tokenable_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of personal_access_tokens
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for providers
-- ----------------------------
DROP TABLE IF EXISTS `providers`;
CREATE TABLE `providers` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `provider_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `representator` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of providers
-- ----------------------------
BEGIN;
INSERT INTO `providers` (`id`, `provider_name`, `address`, `representator`, `mobile`, `email`, `created_at`, `updated_at`) VALUES (3, 'Tổng Công ty Thiết bị Y tế ', '89 Lương Định Của, Đống Đa, Hà Nội', 'Nguyễn Văn AA', '0438235679', 'info@vinamed.com.vn', '2023-06-21 14:34:12', '2023-06-24 10:56:10');
INSERT INTO `providers` (`id`, `provider_name`, `address`, `representator`, `mobile`, `email`, `created_at`, `updated_at`) VALUES (4, 'Công Ty Thiết Bị Y Tế Phương Mai Hà Nội', 'Số 4 Phương Mai, Đống Đa, Hà Nội', 'Nguyễn Văn B', '0983062890', 'phuongmaitbyt@gmail.com', '2023-06-21 14:40:50', '2023-06-21 14:40:50');
INSERT INTO `providers` (`id`, `provider_name`, `address`, `representator`, `mobile`, `email`, `created_at`, `updated_at`) VALUES (5, 'Hanoi IEC - Doanh Nghiệp Thiết Bị Y Tế Tại Hà Nội ', 'Số 35, Lô 1A, Trung Yên 11B, Trung Hòa, Cầu Giấy, Hà Nội', 'Nguyễn Văn C', '0838786073', 'biz@hanoi-iec.com', '2023-06-21 14:41:15', '2023-06-21 14:41:15');
INSERT INTO `providers` (`id`, `provider_name`, `address`, `representator`, `mobile`, `email`, `created_at`, `updated_at`) VALUES (6, 'Hanoi IEC - Doanh Nghiệp Thiết Bị Y Tế Tại Hà Nội', 'Số 4 Phương Mai, Đống Đa, Hà Nội', 'Nguyễn Văn Tét', '0123456789', 'info@vinamed.com.vn', '2023-06-21 14:42:10', '2023-06-23 10:51:26');
INSERT INTO `providers` (`id`, `provider_name`, `address`, `representator`, `mobile`, `email`, `created_at`, `updated_at`) VALUES (7, 'Tổng Công ty Thiết bị Y tế Việt Nam – CTCP Vinamed', 'Số 35, Lô 1A, Trung Yên 11B, Trung Hòa, Cầu Giấy, Hà Nội', 'Nguyễn Văn Tét Hai', '0123456789', 'phuongmaitbyt@gmail.com', '2023-06-21 14:42:42', '2023-06-21 14:42:42');
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `full_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` tinyint(4) DEFAULT '-1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` (`id`, `full_name`, `username`, `email`, `mobile`, `address`, `role`, `department_id`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `status`) VALUES (1, 'Nguyễn Trần Hoàng', 'hoang123', 'hoang123@gmail.com', '0989228382', 'Cổ Nhuế 1, thành phố Hà Nội dfgvsdgsdfgdsfgs', 3, 57, NULL, '$2b$05$NLfRfEMZj0m7MAS7NmoOS.dmOYuSeSgHPNCoRH6CQmbIRMIATZxn2', NULL, '2023-06-21 11:56:15', '2023-06-26 17:08:37', -1);
INSERT INTO `users` (`id`, `full_name`, `username`, `email`, `mobile`, `address`, `role`, `department_id`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `status`) VALUES (2, 'Trịnh Xuân Lễ', 'le123', 'svdtxl912@gmail.com', '0989228382', 'Hải Phòng', 2, 52, NULL, '$2b$05$v/zuqkVpEoWSKvkfaN/zYeo5ecYCD2fltlUy.aod4nLyC8bHSVzo6', NULL, '2023-06-21 17:26:46', '2023-06-26 18:33:19', 1);
INSERT INTO `users` (`id`, `full_name`, `username`, `email`, `mobile`, `address`, `role`, `department_id`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `status`) VALUES (3, 'Phú phan1', 'phuphan', 'phuphan123@gmail.com', '0989228392', 'string', 1, 1, NULL, '$2b$05$cvkeAKeKcOg9fY4aL2JUJeDOqsGYGZp5mkVJSCNcrQT8du3/JKJla', NULL, '2023-06-21 18:03:07', '2023-06-27 11:13:54', 1);
INSERT INTO `users` (`id`, `full_name`, `username`, `email`, `mobile`, `address`, `role`, `department_id`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `status`) VALUES (7, 'Nguyễn Văn Long', 'long123', 'nvl@gmail.com', '0378212236', 'Ninh Bình', 3, 51, NULL, '$2b$05$UIMdbo56F7AJ8FA0QXGh1OtinvHwN7lA8Yqe5WH.o0vUJO1Gy8Qie', NULL, '2023-06-24 23:46:10', '2023-06-26 17:02:31', 1);
INSERT INTO `users` (`id`, `full_name`, `username`, `email`, `mobile`, `address`, `role`, `department_id`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `status`) VALUES (9, 'Lê Minh Đức', 'duc123', 'lmd@gmail.com', '0866912321', 'Nam Định', 3, 55, NULL, '$2b$05$26ajFAqZXWURhBWo0E8tQ.dZZIy6PZdAuEDkM1SSPpm3EewsiigVC', NULL, '2023-06-24 23:58:07', '2023-06-26 17:00:23', 1);
INSERT INTO `users` (`id`, `full_name`, `username`, `email`, `mobile`, `address`, `role`, `department_id`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `status`) VALUES (10, 'Phạm Thị Thảo', 'thao123', 'ptt@gmail.com', '0383978607', 'Thanh Xuân, Hà Nội', 3, 53, NULL, '$2b$05$9ykbU9hepB.bdM3TGE8pI.qKyWxKn2.qC.EF2J9WgVfkk3t6/oLX6', NULL, '2023-06-24 23:58:37', '2023-06-26 16:58:10', 1);
INSERT INTO `users` (`id`, `full_name`, `username`, `email`, `mobile`, `address`, `role`, `department_id`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `status`) VALUES (11, 'Nguyễn Quang Hiếu', 'hieu2k', 'hieu2k.hust@gmail.com', '0866987800', 'Hà Tĩnh', 3, 56, NULL, '$2b$05$wU.fhFPNEy7dXhAp0rhrWexG7np/xErZ3x8FPrcEnS1pH2S5URDFi', NULL, '2023-06-26 10:16:04', '2023-06-27 11:14:40', 1);
INSERT INTO `users` (`id`, `full_name`, `username`, `email`, `mobile`, `address`, `role`, `department_id`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `status`) VALUES (12, 'Nguyễn Văn Hiếu', 'hieusbhsht', 'hieu@gmail.com', '0866987821', 'Tân Mai, Hoàng Mai, Hà Nội', 2, 68, NULL, '$2b$05$gNnX8PXVyLI9lHr13EMur.v9PDZMIiLBemknAeLhUT8jxV.9RorfW', NULL, '2023-06-26 14:57:21', '2023-06-26 17:01:04', 1);
INSERT INTO `users` (`id`, `full_name`, `username`, `email`, `mobile`, `address`, `role`, `department_id`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `status`) VALUES (13, 'Nguyễn Quang Hiếu', 'hieuadmin', 'hieusb@gmail.com', '0866987807', 'Hà Tĩnh', 1, 69, NULL, '$2b$05$ATZImcOLKXs8oC5mZFO.KOl/R.iB8fRyyHzpr7DNIq65i/g/YHJn6', NULL, '2023-06-26 17:06:07', '2023-06-26 17:06:07', 1);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
