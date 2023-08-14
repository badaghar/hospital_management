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
-- Table structure for table `returnmedicine`
--

DROP TABLE IF EXISTS `returnmedicine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `returnmedicine` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime(3) NOT NULL,
  `medicine` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `total` double NOT NULL,
  `discount` double NOT NULL,
  `sgst` double NOT NULL,
  `cgst` double NOT NULL,
  `grand_total` double NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `patientId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ReturnMedicine_patientId_fkey` (`patientId`),
  CONSTRAINT `ReturnMedicine_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patient` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `returnmedicine_chk_1` CHECK (json_valid(`medicine`))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `returnmedicine`
--

LOCK TABLES `returnmedicine` WRITE;
/*!40000 ALTER TABLE `returnmedicine` DISABLE KEYS */;
INSERT INTO `returnmedicine` VALUES (1,'2023-07-03 00:00:00.000','[{\"medicine Name\":\"CEDONEX 1.5G\",\"batch No\":\"ZHS2212\",\"Expiry Date\":\"2024-11-01T00:00:00.000Z\",\"mrp\":176,\"quantity\":\"2\",\"cgst/sgst\":12,\"amount\":352},{\"medicine Name\":\"DISPOVAN 10 ML\",\"batch No\":\"321101JP2\",\"Expiry Date\":\"2028-04-01T00:00:00.000Z\",\"mrp\":11,\"quantity\":\"2\",\"cgst/sgst\":12,\"amount\":22}]',353.96,0,10.02,10.02,374,'2023-07-03 13:33:26.378','2023-07-03 13:33:26.378',209),(2,'2023-07-30 00:00:00.000','[{\"medicine Name\":\"ESOKEM D CAP 15\'S\",\"batch No\":\"PCH07796\",\"Expiry Date\":\"2024-07-01T00:00:00.000Z\",\"mrp\":10.71,\"quantity\":\"12\",\"cgst/sgst\":12,\"amount\":128.52},{\"medicine Name\":\"TELQUE H 40MG TAB\",\"batch No\":\"PI10AE04\",\"Expiry Date\":\"2024-10-01T00:00:00.000Z\",\"mrp\":10,\"quantity\":\"13\",\"cgst/sgst\":12,\"amount\":130},{\"medicine Name\":\"DOLO-T\",\"batch No\":\"DOGS0005\",\"Expiry Date\":\"2024-01-01T00:00:00.000Z\",\"mrp\":11.3,\"quantity\":\"12\",\"cgst/sgst\":12,\"amount\":135.6},{\"medicine Name\":\"BIOHISTIN 16\",\"batch No\":\"SPA230342\",\"Expiry Date\":\"2025-01-01T00:00:00.000Z\",\"mrp\":12.96,\"quantity\":\"20\",\"cgst/sgst\":12,\"amount\":259.2}]',648.5,0,2.41,2.41,653,'2023-07-30 07:36:59.021','2023-07-30 07:36:59.021',585);
/*!40000 ALTER TABLE `returnmedicine` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-12 12:55:04
