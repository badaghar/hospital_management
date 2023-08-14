-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 192.168.1.108    Database: hospital_management
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `labcharges`
--

DROP TABLE IF EXISTS `labcharges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `labcharges` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` double NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `LabCharges_name_key` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labcharges`
--

LOCK TABLES `labcharges` WRITE;
/*!40000 ALTER TABLE `labcharges` DISABLE KEYS */;
INSERT INTO `labcharges` VALUES (1,'CBC',200,'2023-07-02 05:11:07.267','2023-07-02 05:31:29.734'),(2,'ESR',100,'2023-07-02 05:31:56.095','2023-07-02 05:31:56.095'),(3,'BLOOD GROUP',100,'2023-07-02 05:32:32.987','2023-07-02 05:32:32.987'),(4,'BT/CT',100,'2023-07-02 05:32:47.963','2023-07-02 05:32:47.963'),(5,'AFC',250,'2023-07-02 05:33:06.628','2023-07-02 05:33:06.628'),(6,'APTT',600,'2023-07-02 05:33:22.850','2023-07-02 05:33:22.850'),(7,'PT/INR',500,'2023-07-02 05:33:46.168','2023-07-02 05:33:46.168'),(8,'HIV',250,'2023-07-02 05:33:57.548','2023-07-02 05:33:57.548'),(9,'HBSAG',150,'2023-07-02 05:34:15.598','2023-07-02 05:34:15.598'),(10,'VDRI',150,'2023-07-02 05:34:42.878','2023-07-02 05:34:42.878'),(11,'HCV',600,'2023-07-02 05:35:05.312','2023-07-02 05:35:05.312'),(12,'ASO',500,'2023-07-02 05:35:23.079','2023-07-02 05:35:23.079'),(13,'CRP',500,'2023-07-02 05:35:35.785','2023-07-02 06:02:55.586'),(14,'RA TEST',500,'2023-07-02 05:35:56.095','2023-07-03 06:52:58.123'),(15,'WIDAL',100,'2023-07-02 05:36:18.461','2023-07-02 05:36:18.461'),(16,'DENGUE',700,'2023-07-02 05:36:37.460','2023-07-02 05:36:37.460'),(17,'CHIKANGUNYA TEST',1000,'2023-07-02 05:37:56.776','2023-07-02 05:37:56.776'),(18,'ROT FOR MP',200,'2023-07-02 05:38:23.600','2023-07-02 05:38:23.600'),(19,'URINE ROUTINE',100,'2023-07-02 05:39:42.946','2023-07-02 05:39:42.946'),(20,'URINE ANALYSIS',150,'2023-07-02 05:40:02.954','2023-07-02 05:40:02.954'),(21,'URINE ROUTINE BS/BP',150,'2023-07-02 05:43:02.829','2023-07-02 05:43:02.829'),(22,'T3 T4 TSH',600,'2023-07-02 05:43:44.851','2023-07-02 05:43:44.851'),(23,'TF3 TF4',900,'2023-07-02 05:44:05.125','2023-07-02 05:44:05.125'),(24,'TSH',500,'2023-07-02 05:44:18.042','2023-07-02 05:44:18.042'),(25,'PROLACTIN',600,'2023-07-02 05:44:42.559','2023-07-02 05:44:42.559'),(26,'BETA HCG',1000,'2023-07-02 05:45:32.859','2023-07-02 05:45:32.859'),(27,'PS STUDY',250,'2023-07-02 05:46:35.270','2023-07-02 05:46:35.270'),(28,'RBS',100,'2023-07-02 05:46:54.574','2023-07-02 05:46:54.574'),(29,'FBS',50,'2023-07-02 05:47:10.758','2023-07-02 05:47:10.758'),(30,'PPBS',50,'2023-07-02 05:47:27.230','2023-07-02 05:47:27.230'),(31,'HBA1C',800,'2023-07-02 05:47:53.842','2023-07-02 05:47:53.842'),(32,'RFT',350,'2023-07-02 05:48:06.608','2023-07-02 05:48:06.608'),(33,'BLOOD UREA',100,'2023-07-02 05:49:27.984','2023-07-02 05:49:27.984'),(34,'SR CREATININE',100,'2023-07-02 05:50:09.887','2023-07-02 05:50:09.887'),(35,'URIC ACID',250,'2023-07-02 05:51:09.119','2023-07-02 05:51:09.119'),(36,'SR CALCIUM',400,'2023-07-02 05:53:15.097','2023-07-02 05:53:15.097'),(37,'SR PHOSPHORE',1200,'2023-07-02 05:53:38.854','2023-07-02 05:53:38.854'),(38,'LFT',450,'2023-07-02 05:53:55.493','2023-07-02 05:53:55.493'),(39,'BILIRUBIN',100,'2023-07-02 05:54:12.834','2023-07-02 05:54:12.834'),(40,'SGOT (AST)',150,'2023-07-02 05:54:37.698','2023-07-02 05:54:37.698'),(41,'SGPT (ALT)',150,'2023-07-02 05:55:38.805','2023-07-02 05:55:38.805'),(42,'ALP',200,'2023-07-02 05:56:00.097','2023-07-02 05:56:00.097'),(43,'TOTAL PROTEIN',100,'2023-07-02 05:56:37.726','2023-07-02 05:56:37.726'),(44,'SR ALBUMIN',100,'2023-07-02 05:57:03.737','2023-07-02 05:57:03.737'),(45,'LIPID PROFILE',600,'2023-07-02 05:57:51.832','2023-07-02 05:57:51.832'),(46,'SR ELECTROLYTES',700,'2023-07-02 05:58:18.788','2023-07-02 05:58:18.788'),(47,'SR AMYLASE',800,'2023-07-02 05:58:44.341','2023-07-02 05:58:44.341'),(48,'SR LIPASE',800,'2023-07-02 06:00:03.675','2023-07-02 06:00:03.675'),(50,'LDH',500,'2023-07-02 06:00:41.473','2023-07-02 06:00:41.473'),(51,'FERRITINE',900,'2023-07-02 06:01:03.609','2023-07-02 06:01:03.609'),(52,'D-DMIER',1500,'2023-07-02 06:01:26.139','2023-07-02 06:01:26.139'),(53,'IL-6',2000,'2023-07-02 06:01:40.705','2023-07-02 06:01:40.705'),(54,'PCT (PROCALCITONIN)',2200,'2023-07-02 06:02:08.371','2023-07-02 06:02:08.371'),(55,'CHOLINESTERASE',800,'2023-07-02 06:02:26.683','2023-07-02 06:02:26.683');
/*!40000 ALTER TABLE `labcharges` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-12 12:55:05