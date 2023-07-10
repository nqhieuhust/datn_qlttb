<<<<<<< HEAD
CREATE DATABASE  IF NOT EXISTS `qlttbdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `qlttbdb`;
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
  `quantity` int DEFAULT '0',
  `unit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `import_date` date DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  `provider_id` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accessories`
--

LOCK TABLES `accessories` WRITE;
/*!40000 ALTER TABLE `accessories` DISABLE KEYS */;
INSERT INTO `accessories` VALUES (10,'Bóng đèn máy sinh hóa',20,'Cái','2023-07-01',1,4,'2023-07-03 02:55:27','2023-07-03 02:55:27'),(11,'Điện cực ốc tai',100,'Bộ','2023-07-01',1,3,'2023-07-03 02:58:11','2023-07-03 02:58:11'),(12,'Dầu silicon (dùng trong phẫu thuật cắt dịch kính và điều trị bong võng mạc)',100,'Lọ','2023-07-03',1,5,'2023-07-03 02:59:05','2023-07-03 02:59:05'),(13,'Máy trợ thính',100,'Cái','2023-07-03',2,4,'2023-07-03 02:59:39','2023-07-05 07:02:19');
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
  UNIQUE KEY `departmentscol_UNIQUE` (`manager`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (51,'Khoa Xét nghiệm','C1-103','Nguyễn Hồng Ngọc','2023-06-22 13:47:13','2023-07-07 10:23:41'),(52,'Khoa Chẩn đoán hình ảnh','C9-101','Lê Minh Đức','2023-06-23 03:41:52','2023-07-02 17:46:04'),(53,'Khoa Cấp cứu','C1-101','Trần Bảo Minh','2023-06-23 04:01:20','2023-07-02 17:46:13'),(55,'Khoa Mắt','C3-102','Ngô Thị Thanh Huyền','2023-06-23 04:04:49','2023-07-02 17:44:17'),(56,'Khoa Răng Hàm Mặt','C2-204','Nguyễn Quang Cường','2023-06-23 04:10:41','2023-07-02 17:44:58'),(57,'Khoa Tai Mũi họng','C3-103','Nguyễn Phương Hà','2023-06-23 04:11:12','2023-07-02 17:44:49'),(68,'Phòng Quản lý vật tư, thiết bị','C2-101','Nguyễn Quang Hiếu','2023-06-26 06:42:03','2023-07-02 17:40:28'),(69,'Phòng Công nghệ thông tin','B1-103','Nguyễn Văn Hiếu','2023-06-26 10:04:37','2023-07-02 17:41:30'),(70,'Khoa Sản','D3-101','Phạm Thị Thanh Thảo','2023-06-26 10:09:27','2023-07-02 17:41:47');
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
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
INSERT INTO `devices` VALUES (29,'CDHA.0002','Máy Điện Não','Neuron - Spectrum 4/P','EEG-2023','Nga','Loại B',NULL,NULL,NULL,'Neurosoft',NULL,'2023-07-01','2023-07-10','2028-07-01','http://localhost:3050/api/v1/upload/image-6eefbb67-d253-4966-963e-a9540eb0878d.jpg',5,16,'2023-07-02 18:54:02','2023-07-07 10:22:06',1,'Đầu điện cực; Dây cáp kết nối; Gel',52,'Lê Minh Đức',-1),(30,'CDHA.0001','Máy Chụp Cộng Hưởng Từ 0.35T SIEMENS','MAGNETOM C!','MRI-2023','Đức','Loại B',NULL,NULL,NULL,' Siemens',NULL,'2023-07-01','2023-07-10','2028-07-01','http://localhost:3050/api/v1/upload/image-688921d8-62ff-4384-8a3a-0a7dc8502b07.jpg',4,15,'2023-07-02 19:07:29','2023-07-07 10:22:13',1,'Cuộn dây RF, chất đối quang, bộ kẹp định vị',52,'Hồ Viết Đức',-1),(33,'XN.0001','Máy Ly Tâm Hettich',' EBA 200 Series',NULL,'Đức','Loại B',NULL,NULL,NULL,'Hettich',NULL,'2023-07-01','2023-07-10','2025-07-01','http://localhost:3050/api/v1/upload/image-f06e706f-7578-4546-ac92-7cd74b80c03a.jpg',4,7,'2023-07-03 01:33:23','2023-07-07 10:23:15',1,'Rotor; Máy điều khiển; Bộ nguồn điện',51,'Nguyễn Thị Hồng Ngọc',-1),(36,'CC.0001','Máy thở Chirana AURA V','Chirana AURA V',NULL,'Mỹ','Loại C',NULL,NULL,NULL,'IPM Chirana Inc',NULL,'2023-07-01','2023-07-10','2030-07-01','http://localhost:3050/api/v1/upload/image-fb29ce80-1c74-4bb7-943c-14008c0eeea5.jpg',3,NULL,'2023-07-03 02:12:28','2023-07-03 02:12:28',1,'Ống dẫn khí; Mặt nạ; Ống nối; Bộ lọc',53,'Trần Bảo Minh',-1),(38,'M.0001','Đèn khe di động PSL','SLKE08','M-2023','Anh','Loại B',NULL,NULL,NULL,'Keeler',NULL,'2023-07-03','2023-07-10','2028-07-03','http://localhost:3050/api/v1/upload/image-7ca6c68c-5c48-46d6-955e-b35cd439bec5.jpg',5,NULL,'2023-07-03 10:05:31','2023-07-07 10:15:30',1,'Dây cáp, ống kính',55,'Ngô Thị Thanh Huyền',-1),(42,'reg','reg','ẻg','ẻg','ẻg','ẻg',NULL,NULL,NULL,'ẻg',NULL,NULL,NULL,NULL,'http://localhost:3050/api/v1/upload/image-6aed83b6-005e-4ef9-b2e0-1feedcf9a593.jpg',4,15,'2023-07-08 04:28:58','2023-07-08 04:28:58',3,'greg',52,NULL,2);
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
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`(191)) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`) USING BTREE,
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`(191),`tokenable_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `providers`
--

LOCK TABLES `providers` WRITE;
/*!40000 ALTER TABLE `providers` DISABLE KEYS */;
INSERT INTO `providers` VALUES (3,'Tổng Công ty Thiết bị Y tế ','89 Lương Định Của, Đống Đa, Hà Nội','Nguyễn Văn A','04382356793','info@vinamed.com.vn','2023-06-21 07:34:12','2023-07-02 18:56:00'),(4,'Công Ty Thiết Bị Y Tế Phương Mai Hà Nội','Số 4 Phương Mai, Đống Đa, Hà Nội','Nguyễn Văn B','0983062890','phuongmaitbyt@gmail.com','2023-06-21 07:40:50','2023-06-30 04:20:47'),(5,'Hanoi IEC - Doanh Nghiệp Thiết Bị Y Tế Tại Hà Nội ','Số 35, Lô 1A, Trung Yên 11B, Trung Hòa, Cầu Giấy, Hà Nội','Nguyễn Văn C','0838786073','biz@hanoi-iec.com','2023-06-21 07:41:15','2023-07-03 01:25:31');
/*!40000 ALTER TABLE `providers` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (7,'Nguyễn Hồng Ngọc','nhngoc','nhn@gmail.com','0378212236','Hà Tĩnh',3,51,NULL,'$2b$05$IJ5I4L7/JuHpk1/h/BAdSeAcVN8CRf2UnLE60W3JvcjT5Uga1bmgW',NULL,'2023-06-24 16:46:10','2023-07-02 17:51:30',1),(10,'Phạm Thị Thanh Thảo','pttthao','pttthao@gmail.com','0383878607','Thanh Xuân, Hà Nội',3,70,NULL,'$2b$05$lgUpnDihIF2WglK4Kbz1Ru5YwSZPNwUiCSUJoktjIHfFnCKIgRnWC',NULL,'2023-06-24 16:58:37','2023-07-07 10:40:14',1),(12,'Nguyễn Quang Hiếu','nqhieu','nqhieu@gmail.com','0866987800','Giáp Bát, Hoàng Mai, Hà Nội',2,68,NULL,'$2b$05$XJRjiDuC2NJD4M8589bqc.9fgZG4R3H7lyb1.D5HzJQsx9ni98mO2',NULL,'2023-06-26 07:57:21','2023-07-07 10:40:43',1),(13,'Nguyễn Văn Hiếu','nvhieu','nvhieu@gmail.com','0866987807','Hà Tĩnh',1,69,NULL,'$2b$05$4QqLc.fOdtS1UgfrIPaHiekGfLCuPoAxBkKhVw4TmqGppi4vF6uLK',NULL,'2023-06-26 10:06:07','2023-07-02 17:47:51',1),(15,'Lê Minh Đức','lmduc123','lmduc@gmail.com','0347211540','Thanh Xuân, Hà Nội',3,52,NULL,'$2b$05$EMTCw.1lh75mh3281Bw0P.zyTexD7UvXu19NQitm5q4.kVuDvhD2u',NULL,'2023-07-02 18:02:07','2023-07-02 18:03:59',1),(16,'Hồ Viết Đức','hvduc123','hvduc@gmail.com','0866212457','Hai Bà Trưng, Hà Nội',3,52,NULL,'$2b$05$3dFitABRQlpxyPJKZUS5Oe965y3sHblV2GsDMT5RrRilaZNKQICMe',NULL,'2023-07-02 18:03:38','2023-07-02 18:03:50',1),(17,'Nguyễn Phương Hà','npha123','npha@gmail.com','0347225617','Đống Đa, Hà Nội',3,57,NULL,'$2b$05$eFJi60HI65mbyIatw5ygouVPubGc9kS5tDdce.yzAQC/FS7xU9c.K',NULL,'2023-07-02 18:06:37','2023-07-02 18:06:37',-1),(18,'Ngô Thị Thanh Huyền','ntthuyen','ntthuyen@gmail.com','0867112203','Mỹ Đình, Hà Nội',3,55,NULL,'$2b$05$Pzd8MXIAF/YqOj8cvdLf4.m5pe0uaGmloH/8IFdhXQd9Gjc1q9KzS',NULL,'2023-07-03 10:06:50','2023-07-03 10:06:50',1),(19,'Trần Bảo Minh','tbminh','tbminh@gmail.com','0866987855','Hoàn Kiếm, Hà Nội',3,53,NULL,'$2b$05$83AqSGCGTH2jIEKpgwPaXOqnOGhPj4wnpovGsPPF9v6aeYWvqA19a',NULL,'2023-07-06 16:35:13','2023-07-07 10:41:38',1);
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

-- Dump completed on 2023-07-08 11:37:52
=======
CREATE DATABASE  IF NOT EXISTS `qlttbdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `qlttbdb`;
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
  `quantity` int DEFAULT '0',
  `unit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `import_date` date DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  `provider_id` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accessories`
--

LOCK TABLES `accessories` WRITE;
/*!40000 ALTER TABLE `accessories` DISABLE KEYS */;
INSERT INTO `accessories` VALUES (10,'Bóng đèn máy sinh hóa',20,'Cái','2023-07-01',1,4,'2023-07-03 02:55:27','2023-07-03 02:55:27'),(11,'Điện cực ốc tai',100,'Bộ','2023-07-01',1,3,'2023-07-03 02:58:11','2023-07-03 02:58:11'),(12,'Dầu silicon (dùng trong phẫu thuật cắt dịch kính và điều trị bong võng mạc)',100,'Lọ','2023-07-03',1,5,'2023-07-03 02:59:05','2023-07-03 02:59:05'),(13,'Máy trợ thính',100,'Cái','2023-07-03',2,4,'2023-07-03 02:59:39','2023-07-05 07:02:19');
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
  UNIQUE KEY `departmentscol_UNIQUE` (`manager`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (51,'Khoa Xét nghiệm','C1-103','Nguyễn Hồng Ngọc','2023-06-22 13:47:13','2023-07-07 10:23:41'),(52,'Khoa Chẩn đoán hình ảnh','C9-101','Lê Minh Đức','2023-06-23 03:41:52','2023-07-02 17:46:04'),(53,'Khoa Cấp cứu','C1-101','Trần Bảo Minh','2023-06-23 04:01:20','2023-07-02 17:46:13'),(55,'Khoa Mắt','C3-102','Ngô Thị Thanh Huyền','2023-06-23 04:04:49','2023-07-02 17:44:17'),(56,'Khoa Răng Hàm Mặt','C2-204','Nguyễn Quang Cường','2023-06-23 04:10:41','2023-07-02 17:44:58'),(57,'Khoa Tai Mũi họng','C3-103','Nguyễn Phương Hà','2023-06-23 04:11:12','2023-07-02 17:44:49'),(68,'Phòng Quản lý vật tư, thiết bị','C2-101','Nguyễn Quang Hiếu','2023-06-26 06:42:03','2023-07-02 17:40:28'),(69,'Phòng Công nghệ thông tin','B1-103','Nguyễn Văn Hiếu','2023-06-26 10:04:37','2023-07-02 17:41:30'),(70,'Khoa Sản','D3-101','Phạm Thị Thanh Thảo','2023-06-26 10:09:27','2023-07-02 17:41:47');
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
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
INSERT INTO `devices` VALUES (29,'CDHA.0002','Máy Điện Não','Neuron - Spectrum 4/P','EEG-2023','Nga','Loại B',NULL,NULL,NULL,'Neurosoft',NULL,'2023-07-01','2023-07-10','2028-07-01','http://localhost:3050/api/v1/upload/image-6eefbb67-d253-4966-963e-a9540eb0878d.jpg',5,16,'2023-07-02 18:54:02','2023-07-07 10:22:06',1,'Đầu điện cực; Dây cáp kết nối; Gel',52,'Lê Minh Đức',-1),(30,'CDHA.0001','Máy Chụp Cộng Hưởng Từ 0.35T SIEMENS','MAGNETOM C!','MRI-2023','Đức','Loại B',NULL,NULL,NULL,' Siemens',NULL,'2023-07-01','2023-07-10','2028-07-01','http://localhost:3050/api/v1/upload/image-688921d8-62ff-4384-8a3a-0a7dc8502b07.jpg',4,15,'2023-07-02 19:07:29','2023-07-07 10:22:13',1,'Cuộn dây RF, chất đối quang, bộ kẹp định vị',52,'Hồ Viết Đức',-1),(33,'XN.0001','Máy Ly Tâm Hettich',' EBA 200 Series',NULL,'Đức','Loại B',NULL,NULL,NULL,'Hettich',NULL,'2023-07-01','2023-07-10','2025-07-01','http://localhost:3050/api/v1/upload/image-f06e706f-7578-4546-ac92-7cd74b80c03a.jpg',4,7,'2023-07-03 01:33:23','2023-07-07 10:23:15',1,'Rotor; Máy điều khiển; Bộ nguồn điện',51,'Nguyễn Thị Hồng Ngọc',-1),(36,'CC.0001','Máy thở Chirana AURA V','Chirana AURA V',NULL,'Mỹ','Loại C',NULL,NULL,NULL,'IPM Chirana Inc',NULL,'2023-07-01','2023-07-10','2030-07-01','http://localhost:3050/api/v1/upload/image-fb29ce80-1c74-4bb7-943c-14008c0eeea5.jpg',3,NULL,'2023-07-03 02:12:28','2023-07-03 02:12:28',1,'Ống dẫn khí; Mặt nạ; Ống nối; Bộ lọc',53,'Trần Bảo Minh',-1),(38,'M.0001','Đèn khe di động PSL','SLKE08','M-2023','Anh','Loại B',NULL,NULL,NULL,'Keeler',NULL,'2023-07-03','2023-07-10','2028-07-03','http://localhost:3050/api/v1/upload/image-7ca6c68c-5c48-46d6-955e-b35cd439bec5.jpg',5,NULL,'2023-07-03 10:05:31','2023-07-07 10:15:30',1,'Dây cáp, ống kính',55,'Ngô Thị Thanh Huyền',-1),(42,'reg','reg','ẻg','ẻg','ẻg','ẻg',NULL,NULL,NULL,'ẻg',NULL,NULL,NULL,NULL,'http://localhost:3050/api/v1/upload/image-6aed83b6-005e-4ef9-b2e0-1feedcf9a593.jpg',4,15,'2023-07-08 04:28:58','2023-07-08 04:28:58',3,'greg',52,NULL,2);
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
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`(191)) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`) USING BTREE,
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`(191),`tokenable_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `providers`
--

LOCK TABLES `providers` WRITE;
/*!40000 ALTER TABLE `providers` DISABLE KEYS */;
INSERT INTO `providers` VALUES (3,'Tổng Công ty Thiết bị Y tế ','89 Lương Định Của, Đống Đa, Hà Nội','Nguyễn Văn A','04382356793','info@vinamed.com.vn','2023-06-21 07:34:12','2023-07-02 18:56:00'),(4,'Công Ty Thiết Bị Y Tế Phương Mai Hà Nội','Số 4 Phương Mai, Đống Đa, Hà Nội','Nguyễn Văn B','0983062890','phuongmaitbyt@gmail.com','2023-06-21 07:40:50','2023-06-30 04:20:47'),(5,'Hanoi IEC - Doanh Nghiệp Thiết Bị Y Tế Tại Hà Nội ','Số 35, Lô 1A, Trung Yên 11B, Trung Hòa, Cầu Giấy, Hà Nội','Nguyễn Văn C','0838786073','biz@hanoi-iec.com','2023-06-21 07:41:15','2023-07-03 01:25:31');
/*!40000 ALTER TABLE `providers` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (7,'Nguyễn Hồng Ngọc','nhngoc','nhn@gmail.com','0378212236','Hà Tĩnh',3,51,NULL,'$2b$05$IJ5I4L7/JuHpk1/h/BAdSeAcVN8CRf2UnLE60W3JvcjT5Uga1bmgW',NULL,'2023-06-24 16:46:10','2023-07-02 17:51:30',1),(10,'Phạm Thị Thanh Thảo','pttthao','pttthao@gmail.com','0383878607','Thanh Xuân, Hà Nội',3,70,NULL,'$2b$05$lgUpnDihIF2WglK4Kbz1Ru5YwSZPNwUiCSUJoktjIHfFnCKIgRnWC',NULL,'2023-06-24 16:58:37','2023-07-07 10:40:14',1),(12,'Nguyễn Quang Hiếu','nqhieu','nqhieu@gmail.com','0866987800','Giáp Bát, Hoàng Mai, Hà Nội',2,68,NULL,'$2b$05$XJRjiDuC2NJD4M8589bqc.9fgZG4R3H7lyb1.D5HzJQsx9ni98mO2',NULL,'2023-06-26 07:57:21','2023-07-07 10:40:43',1),(13,'Nguyễn Văn Hiếu','nvhieu','nvhieu@gmail.com','0866987807','Hà Tĩnh',1,69,NULL,'$2b$05$4QqLc.fOdtS1UgfrIPaHiekGfLCuPoAxBkKhVw4TmqGppi4vF6uLK',NULL,'2023-06-26 10:06:07','2023-07-02 17:47:51',1),(15,'Lê Minh Đức','lmduc123','lmduc@gmail.com','0347211540','Thanh Xuân, Hà Nội',3,52,NULL,'$2b$05$EMTCw.1lh75mh3281Bw0P.zyTexD7UvXu19NQitm5q4.kVuDvhD2u',NULL,'2023-07-02 18:02:07','2023-07-02 18:03:59',1),(16,'Hồ Viết Đức','hvduc123','hvduc@gmail.com','0866212457','Hai Bà Trưng, Hà Nội',3,52,NULL,'$2b$05$3dFitABRQlpxyPJKZUS5Oe965y3sHblV2GsDMT5RrRilaZNKQICMe',NULL,'2023-07-02 18:03:38','2023-07-02 18:03:50',1),(17,'Nguyễn Phương Hà','npha123','npha@gmail.com','0347225617','Đống Đa, Hà Nội',3,57,NULL,'$2b$05$eFJi60HI65mbyIatw5ygouVPubGc9kS5tDdce.yzAQC/FS7xU9c.K',NULL,'2023-07-02 18:06:37','2023-07-02 18:06:37',-1),(18,'Ngô Thị Thanh Huyền','ntthuyen','ntthuyen@gmail.com','0867112203','Mỹ Đình, Hà Nội',3,55,NULL,'$2b$05$Pzd8MXIAF/YqOj8cvdLf4.m5pe0uaGmloH/8IFdhXQd9Gjc1q9KzS',NULL,'2023-07-03 10:06:50','2023-07-03 10:06:50',1),(19,'Trần Bảo Minh','tbminh','tbminh@gmail.com','0866987855','Hoàn Kiếm, Hà Nội',3,53,NULL,'$2b$05$83AqSGCGTH2jIEKpgwPaXOqnOGhPj4wnpovGsPPF9v6aeYWvqA19a',NULL,'2023-07-06 16:35:13','2023-07-07 10:41:38',1);
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

-- Dump completed on 2023-07-08 11:37:52
>>>>>>> cb5128c104699e5ccac309e24edf964606dc41bc
