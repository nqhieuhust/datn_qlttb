-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: qlttbdb
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accessories`
--

DROP TABLE IF EXISTS `accessories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accessories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `accessory_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int unsigned DEFAULT '0',
  `unit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `import_date` date DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  `provider_id` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accessories`
--

LOCK TABLES `accessories` WRITE;
/*!40000 ALTER TABLE `accessories` DISABLE KEYS */;
INSERT INTO `accessories` VALUES (10,'Bóng đèn máy sinh hóa',5,'Cái','2023-07-01',1,4,'2023-07-03 02:55:27','2023-07-10 02:38:01'),(11,'Điện cực ốc tai',100,'Bộ','2023-07-01',1,3,'2023-07-03 02:58:11','2023-07-03 02:58:11'),(12,'Dầu silicon (dùng trong phẫu thuật cắt dịch kính và điều trị bong võng mạc)',0,'Lọ','2023-07-03',2,5,'2023-07-03 02:59:05','2023-07-10 03:01:17'),(13,'Máy trợ thính',20,'Bộ','2023-07-03',1,4,'2023-07-03 02:59:39','2023-07-10 03:01:56'),(15,'Bộ mặt nạ Venturi',50,'Bộ','2023-07-10',1,18,'2023-07-10 02:17:54','2023-07-10 02:17:54'),(16,'Kim sinh thiết cơ tim',100,'Cái','2023-07-10',1,5,'2023-07-10 02:19:09','2023-07-10 02:54:28'),(17,'Hạt nhựa PVA (sử dụng trong nút mạch)',75,'Lọ','2023-07-06',1,3,'2023-07-10 02:20:57','2023-07-10 02:20:57'),(18,'Tế bào sừng nuôi cấy dùng trong điều trị bỏng, vết thương',100,'Tấm','2023-07-07',1,4,'2023-07-10 02:21:49','2023-07-10 02:21:49'),(19,'Máy cắt nối tự động và ghim khâu máy',25,'Cái','2023-07-10',1,19,'2023-07-10 02:23:48','2023-07-10 02:54:41'),(21,'Ống silicon dùng trong phẫu thuật mắt',23,'Cái','2023-07-10',1,4,'2023-07-10 02:42:39','2023-07-10 03:12:17');
/*!40000 ALTER TABLE `accessories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `department_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `manager` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `department_name_UNIQUE` (`department_name`),
  UNIQUE KEY `departmentscol_UNIQUE` (`manager`),
  UNIQUE KEY `address_UNIQUE` (`address`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (51,'Khoa Xét nghiệm','C1-103','Nguyễn Hồng Ngọc','2023-06-22 13:47:13','2023-07-07 10:23:41'),(52,'Khoa Chẩn đoán hình ảnh','C9-101','Lê Minh Đức','2023-06-23 03:41:52','2023-07-02 17:46:04'),(53,'Khoa Cấp cứu','C1-101','Trần Bảo Minh','2023-06-23 04:01:20','2023-07-02 17:46:13'),(55,'Khoa Mắt','C3-102','Ngô Thị Thanh Huyền','2023-06-23 04:04:49','2023-07-02 17:44:17'),(56,'Khoa Răng Hàm Mặt','C2-204','Nguyễn Quang Cường','2023-06-23 04:10:41','2023-07-02 17:44:58'),(57,'Khoa Tai Mũi họng','C3-103','Nguyễn Phương Hà','2023-06-23 04:11:12','2023-07-02 17:44:49'),(68,'Phòng Quản lý vật tư, thiết bị','C2-101','Nguyễn Quang Hiếu','2023-06-26 06:42:03','2023-07-02 17:40:28'),(69,'Phòng Công nghệ thông tin','B1-103','Nguyễn Văn Hiếu','2023-06-26 10:04:37','2023-07-02 17:41:30'),(70,'Khoa Sản','D3-101','Phạm Thị Thanh Thảo','2023-06-26 10:09:27','2023-07-02 17:41:47'),(80,'Khoa Da liễu','D3-103','Nguyễn Văn Huy','2023-07-09 16:00:34','2023-07-09 16:29:40');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devices` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `device_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `model` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `serial` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `device_group` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `device_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `classif_document` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `attached_document` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `datasheet_document` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `manufacture` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `import_date` date DEFAULT NULL,
  `handover_date` date DEFAULT NULL,
  `expire_date` date DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `provider_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` tinyint DEFAULT '-1',
  `accessory` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `department_id` int DEFAULT '0',
  `manager_device` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` tinyint DEFAULT '-1',
  `countries` double DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
INSERT INTO `devices` VALUES (29,'CDHA.0001','Máy Điện Não','Neuron - Spectrum 4/P','EEG-2023','Nga','Loại B',NULL,NULL,NULL,'Neurosoft',NULL,'2023-07-01','2023-07-10','2028-07-01','http://localhost:3050/api/v1/upload/image-6eefbb67-d253-4966-963e-a9540eb0878d.jpg',5,16,'2023-07-02 18:54:02','2023-07-10 10:33:38',1,'Đầu điện cực; Dây cáp kết nối; Gel',52,'Lê Minh Đức',2,17098242),(30,'CDHA.0002','Máy Chụp Cộng Hưởng Từ 0.35T SIEMENS','MAGNETOM C!','MRI-2023','Đức','Loại B',NULL,NULL,NULL,' Siemens',NULL,'2023-07-01','2023-07-10','2028-07-01','http://localhost:3050/api/v1/upload/image-688921d8-62ff-4384-8a3a-0a7dc8502b07.jpg',4,15,'2023-07-02 19:07:29','2023-07-10 10:33:45',2,'Cuộn dây RF, chất đối quang, bộ kẹp định vị',52,'Hồ Viết Đức',2,357114),(33,'XN.0001','Máy Ly Tâm Hettich',' EBA 200 Series',NULL,'Đức','Loại B',NULL,NULL,NULL,'Hettich',NULL,'2023-07-01','2023-07-10','2025-07-01','http://localhost:3050/api/v1/upload/image-f06e706f-7578-4546-ac92-7cd74b80c03a.jpg',4,7,'2023-07-03 01:33:23','2023-07-08 11:48:58',1,'Rotor; Máy điều khiển; Bộ nguồn điện',51,'Nguyễn Thị Hồng Ngọc',2,357114),(36,'CC.0001','Máy thở Chirana AURA V','Chirana AURA V',NULL,'Mỹ','Loại C',NULL,NULL,NULL,'IPM Chirana Inc',NULL,'2023-07-01','2023-07-10','2030-07-01','http://localhost:3050/api/v1/upload/image-fb29ce80-1c74-4bb7-943c-14008c0eeea5.jpg',3,19,'2023-07-03 02:12:28','2023-07-10 10:23:52',3,'Ống dẫn khí; Mặt nạ; Ống nối; Bộ lọc',53,'Trần Bảo Minh',3,9372610),(38,'M.0001','Đèn khe di động PSL','SLKE08','M-2023','Anh','Loại B',NULL,NULL,NULL,'Keeler',NULL,'2023-07-03','2023-07-10','2028-07-03','http://localhost:3050/api/v1/upload/image-7ca6c68c-5c48-46d6-955e-b35cd439bec5.jpg',3,18,'2023-07-03 10:05:31','2023-07-10 10:24:02',4,'Dây cáp, ống kính',55,'Ngô Thị Thanh Huyền',2,242900),(49,'CDHA.0003','Máy Siêu Âm Samsung Hs70A','HS70A',NULL,NULL,NULL,NULL,NULL,NULL,'Samsung Medison',NULL,'2023-07-10','2023-07-15','2025-07-10','http://localhost:3050/api/v1/upload/image-ffb8b516-d086-4601-82d4-0bbecdeb087d.jpg',4,20,'2023-07-10 10:08:37','2023-07-10 10:08:37',1,NULL,52,NULL,2,120538),(50,'CDHA.0004','Máy siêu âm 4D Aloka Alpha 6','Prosound Alpha 6',NULL,NULL,NULL,NULL,NULL,NULL,'Aloka',NULL,'2023-07-10','2023-07-15','2025-07-10','http://localhost:3050/api/v1/upload/image-ef0eced5-2533-40d9-8542-dd675c927532.jpg',16,16,'2023-07-10 10:23:10','2023-07-10 10:23:10',1,NULL,52,NULL,2,377930),(51,'TB.0001','Máy cân và lắc túi máu CM750','CM750',NULL,NULL,NULL,NULL,NULL,NULL,'Centron Corporation',NULL,'2023-07-10','2023-07-12','2026-07-10','http://localhost:3050/api/v1/upload/image-a2f50747-3d63-4b23-9bfa-2b1a3305d878.png',19,21,'2023-07-10 10:48:45','2023-07-10 10:49:27',1,NULL,68,NULL,1,120538),(52,'XN.0002','Máy xét nghiệm nước tiểu','BC400','123456789',NULL,NULL,NULL,NULL,NULL,'Siemens',NULL,'2023-07-10','2023-07-12','2025-07-16','http://localhost:3050/api/v1/upload/image-cd634947-1136-49cb-954e-9fef235e8ff8.jpg',16,7,'2023-07-10 11:06:11','2023-07-10 11:06:11',1,NULL,51,NULL,2,9706961),(53,'TMH.0001','Máy nội soi tai mũi họng INV-150L','INV-150L','123456',NULL,NULL,NULL,NULL,NULL,'Innotech',NULL,'2023-07-04','2023-07-11','2025-08-20','http://localhost:3050/api/v1/upload/image-68f60609-1f32-4d5d-8d3b-f035a6ffaec3.jpg',5,17,'2023-07-10 11:11:54','2023-07-10 11:11:54',1,NULL,57,NULL,1,377930);
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2019_12_14_000001_create_personal_access_tokens_table',1),(5,'2023_06_17_164441_create_departments_table',1),(6,'2023_06_17_165734_create_providers_table',1),(7,'2023_06_17_165911_create_devices_table',1),(8,'2023_06_17_170804_create_accessories_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `providers`
--

DROP TABLE IF EXISTS `providers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `providers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `provider_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `representator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `mobile_UNIQUE` (`mobile`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `providers`
--

LOCK TABLES `providers` WRITE;
/*!40000 ALTER TABLE `providers` DISABLE KEYS */;
INSERT INTO `providers` VALUES (3,'Công ty Thiết bị y tế Việt Nam – CTCP Vinamed','89 Lương Định Của, Đống Đa, Hà Nội','Nguyễn Văn A','04382356793','info@vinamed.com.vn','2023-06-21 07:34:12','2023-07-09 16:56:35'),(4,'Công Ty Thiết Bị Y Tế Phương Mai Hà Nội','Số 4 Phương Mai, Đống Đa, Hà Nội','Nguyễn Văn B','0983062890','phuongmaitbyt@gmail.com','2023-06-21 07:40:50','2023-06-30 04:20:47'),(5,'Hanoi IEC - Doanh Nghiệp Thiết Bị Y Tế Tại Hà Nội ','Số 35, Lô 1A, Trung Yên 11B, Trung Hòa, Cầu Giấy, Hà Nội','Nguyễn Văn C','0838786073','biz@hanoi-iec.com','2023-06-21 07:41:15','2023-07-03 01:25:31'),(16,'Công ty Cổ phần Vật tư y tế Hà Nội','A8 Lô 18 – Khu ĐTM Định Công, Hoàng Mai, Hà Nội','Nguyễn Văn D','02436404111','kinhdoanh@hanoimedical.com.vn','2023-07-09 16:54:14','2023-07-09 16:54:14'),(18,'Công ty Cổ phần Thiết bị y tế Metech','Tầng 1 Nhà A,Số 85 Lương Định Của, Phương Mai, Đống Đa, Hà Nội','Trần Văn A','0903455229','info@thietbimetech.vn','2023-07-09 16:58:41','2023-07-09 16:58:41'),(19,'Công ty Hapharco','Số 4 – BT1, phố Bùi Xuân Phái, Mỹ Đình 2, Nam Từ Liêm, Hà Nội','Trần Văn B',' 02437872242','contact@gmp.com.vn','2023-07-09 17:00:52','2023-07-09 17:00:52'),(20,'Công ty TNHH xuất nhập khẩu y tế Thăng Long','Phòng 828 CT5 A – Khu Đô Thị Xa La, Tân Triều, Thanh Trì, Hà Nội','Trần Văn C','0934676323','donga1983@gmail.com','2023-07-09 17:02:50','2023-07-09 17:02:50'),(21,'Công ty TNHH Thiết bị khoa học và y tế MPT','Số 118 Nguyễn Ngọc Nại, Quận Thanh Xuân, Hà Nội','Trần Văn D','02422188222','mpt@fpt.vn','2023-07-09 17:07:20','2023-07-09 17:07:20'),(22,'Công Ty TNHH Thiết Bị Y Tế Huê Lợi','Số 5, Ngách 17, Ngõ 38, Đ. Phương Mai, Phương Mai, Đống Đa, Hà Nội','Trần Văn E','0972633588','thietbiytehueloi@gmail.com','2023-07-09 17:08:53','2023-07-09 17:11:40'),(23,'Công ty TNHH thiết bị y tế Hoàng Lộc M.E','Số 16 Ngách 167/17 Phố Phương Mai,  P. Phương Mai, Q. Đống Đa , Tp Hà Nội','Nguyễn Văn E','0988501377','hoanglocme@gmail.com','2023-07-09 17:11:24','2023-07-09 17:11:24');
/*!40000 ALTER TABLE `providers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `setting`
--

DROP TABLE IF EXISTS `setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `setting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `device_id` int NOT NULL,
  `broken_date` date DEFAULT NULL,
  `broken_reason` varchar(50) DEFAULT NULL,
  `other_reason` varchar(255) DEFAULT NULL,
  `fix_date` date DEFAULT NULL,
  `repair_person` varchar(45) DEFAULT NULL,
  `repair_plan` varchar(255) DEFAULT NULL,
  `complete_date` date DEFAULT NULL,
  `repair_content` varchar(255) DEFAULT NULL,
  `confirm_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `device_id_UNIQUE` (`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `setting`
--

LOCK TABLES `setting` WRITE;
/*!40000 ALTER TABLE `setting` DISABLE KEYS */;
/*!40000 ALTER TABLE `setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `full_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` int DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` tinyint DEFAULT '-1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (7,'Nguyễn Hồng Ngọc','nhngoc','nhn@gmail.com','0378212236','Hà Tĩnh',3,51,NULL,'$2b$05$IJ5I4L7/JuHpk1/h/BAdSeAcVN8CRf2UnLE60W3JvcjT5Uga1bmgW',NULL,'2023-06-24 16:46:10','2023-07-02 17:51:30',1),(10,'Phạm Thị Thanh Thảo','pttthao','pttthao@gmail.com','0383878607','Thanh Xuân, Hà Nội',3,70,NULL,'$2b$05$lgUpnDihIF2WglK4Kbz1Ru5YwSZPNwUiCSUJoktjIHfFnCKIgRnWC',NULL,'2023-06-24 16:58:37','2023-07-07 10:40:14',1),(12,'Nguyễn Quang Hiếu','nqhieu','nqhieu@gmail.com','0866987800','Giáp Bát, Hoàng Mai, Hà Nội',2,68,NULL,'$2b$05$XJRjiDuC2NJD4M8589bqc.9fgZG4R3H7lyb1.D5HzJQsx9ni98mO2',NULL,'2023-06-26 07:57:21','2023-07-07 10:40:43',1),(13,'Nguyễn Văn Hiếu','nvhieu','nvhieu@gmail.com','0866987807','Hà Tĩnh',1,69,NULL,'$2b$05$4QqLc.fOdtS1UgfrIPaHiekGfLCuPoAxBkKhVw4TmqGppi4vF6uLK',NULL,'2023-06-26 10:06:07','2023-07-02 17:47:51',1),(15,'Lê Minh Đức','lmduc123','lmduc@gmail.com','0347211540','Thanh Xuân, Hà Nội',3,52,NULL,'$2b$05$EMTCw.1lh75mh3281Bw0P.zyTexD7UvXu19NQitm5q4.kVuDvhD2u',NULL,'2023-07-02 18:02:07','2023-07-02 18:03:59',1),(16,'Hồ Viết Đức','hvduc123','hvduc@gmail.com','0866212457','Hai Bà Trưng, Hà Nội',3,52,NULL,'$2b$05$3dFitABRQlpxyPJKZUS5Oe965y3sHblV2GsDMT5RrRilaZNKQICMe',NULL,'2023-07-02 18:03:38','2023-07-02 18:03:50',1),(17,'Nguyễn Phương Hà','npha123','npha@gmail.com','0347225617','Đống Đa, Hà Nội',3,57,NULL,'$2b$05$eFJi60HI65mbyIatw5ygouVPubGc9kS5tDdce.yzAQC/FS7xU9c.K',NULL,'2023-07-02 18:06:37','2023-07-02 18:06:37',-1),(18,'Ngô Thị Thanh Huyền','ntthuyen','ntthuyen@gmail.com','0867112203','Mỹ Đình, Hà Nội',3,55,NULL,'$2b$05$Pzd8MXIAF/YqOj8cvdLf4.m5pe0uaGmloH/8IFdhXQd9Gjc1q9KzS',NULL,'2023-07-03 10:06:50','2023-07-03 10:06:50',1),(19,'Trần Bảo Minh','tbminh','tbminh@gmail.com','0866987855','Hoàn Kiếm, Hà Nội',3,53,NULL,'$2b$05$83AqSGCGTH2jIEKpgwPaXOqnOGhPj4wnpovGsPPF9v6aeYWvqA19a',NULL,'2023-07-06 16:35:13','2023-07-07 10:41:38',1),(20,'Trần Văn Đức','tvduc123','tvduc@gmail.com','0383456789','Hoàng Mai, Hà Nội',3,52,NULL,'$2b$05$Ky45G53rHKt9Amgfm/inguf5T6YczqWruFqrP5q.RveqnyuBZln/u',NULL,'2023-07-09 16:40:53','2023-07-09 16:40:53',1),(21,'Nguyễn Quang Dũng','nqdung','nqdung@gmail.com','0898604752','Cầu Giấy, Hà Nội',2,68,NULL,'$2b$05$KPdYYDOy6NHhQCvMeZxmOeOLJQ85VE2L6h1oa24LVwn12Q2.PrqzC',NULL,'2023-07-10 10:29:19','2023-07-10 10:29:19',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-10 22:06:48
