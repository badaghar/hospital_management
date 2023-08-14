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
-- Table structure for table `distributer`
--

DROP TABLE IF EXISTS `distributer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `distributer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phoneNo` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `gstNo` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dlNo` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Distributer_name_key` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `distributer`
--

LOCK TABLES `distributer` WRITE;
/*!40000 ALTER TABLE `distributer` DISABLE KEYS */;
INSERT INTO `distributer` VALUES (1,'yarmla','1234567890','','','2023-05-21 15:19:16.589','2023-05-21 15:19:16.589'),(2,'MAHAVEER MEDI-SALES PVT LTD','08045655555','29AAKCM2337H1ZA','KA-B21-145789,90','2023-05-28 08:11:57.217','2023-05-28 08:11:57.217'),(3,'M/S VK PHARMA','9480536009','','KA-BJ1-188376/77','2023-05-28 11:35:21.714','2023-05-28 11:35:21.714'),(4,'BHIMA ENTERPRISES','9611580131','29BNDPD2010A1ZZ','KA/YD1-197320 20G-19732221B-197321','2023-05-28 11:55:04.771','2023-05-28 11:55:18.886'),(5,'VISHWA PHARMACEUITICAL DISTRIBUTORS','9886521808','29AEEPH9039Q1ZQ','KA-YD1-240632/33','2023-05-28 12:41:19.932','2023-05-28 12:41:19.932'),(6,'NIRMALADEVI DISTRIBUTOR','9035573080','29AHEPS4670F1Z1','KA-YD1-20B-213001\\KA-YD1-21B-213002','2023-05-29 05:42:36.357','2023-05-29 05:42:36.357'),(7,'GANGA DISTRIBUTORS','7618774103','29AJJPG7841D2Z3','KA-GL1-216925','2023-05-29 12:56:26.229','2023-05-29 12:56:26.229'),(8,'M/S MAHALAXMI DISTRIBUTORS','9035638000','29ABYB7940B1ZF','KA/GLB/20B/620/GLB/21B/608','2023-05-29 12:58:46.305','2023-05-29 12:58:46.305'),(9,'GYANICARE AGENCIES','9108841717','29AZKP6702GIZH','KA/GL2/20B/211801/GL2/21B/211802/20G/211803','2023-05-29 13:01:10.541','2023-05-29 13:01:10.541'),(10,'SHARANA SHABAREESH DISTRIBUTORS','9448829776','29ABAAFS0264R1ZN','20B KA-GL1-155435','2023-05-29 13:03:37.095','2023-05-29 13:03:37.095'),(11,'ATNOOR PHARMA','9342906939','29ANBPA5060AIZP','20B-KA-GLI-207380','2023-05-29 13:05:11.144','2023-05-29 13:05:11.144'),(12,'SHREE LAXMI PHARMA DISTRIBUTORS','9900920785','29AECPR7375F1Z2','KA/GL2/20B/154962/GL2/21B/154963','2023-05-29 13:09:10.773','2023-05-29 13:09:10.773'),(13,'SRI SIDDALINGESHWARA DISTRIBUTORS','9739487777','29BESPA9836F1ZO','20B\\KA-YD1-238589,21B','2023-05-29 13:12:23.366','2023-05-29 13:12:23.366'),(14,'REVANSIDDESHWAR DISTRIBUTORS','08472-278549','29AAJFR3342R1ZG','KA/GL1/156227/21B/156228','2023-05-29 13:14:59.885','2023-05-29 13:14:59.885'),(15,'SRI VINAYAKA PHARMA','9481441094','29ABSFM1821C1Z9','20B/KAGL1-215806','2023-05-29 13:17:19.317','2023-05-29 13:17:19.317'),(16,'M/S NAVEEN PHARMA','9606750715','29AMTPB6394H1ZF','KA/GLB/20B/666/21B/655','2023-05-29 13:20:13.597','2023-05-29 13:20:13.597'),(17,'SHIVA KRUPA PHARMACEUTICAL DISTRIBUTORS','08472226710','29AASFS3721L1ZJ','KA/GLB/20B/308/GLB/21B/298','2023-05-31 08:57:14.367','2023-05-31 08:57:14.367'),(18,'ADISHREE PHARMA','916364229339','29APDPP1608PIZF','20B-KA-B32-181168,21B-181169,20G-181170','2023-06-04 07:57:52.366','2023-06-04 07:57:52.366'),(19,'GURUDATTA AGENCIES ','9342331159','29AIAPM2711J1ZD','KA-GLB/20B/582/,KA-GLB/21B/571','2023-06-04 08:31:54.168','2023-06-04 08:31:54.168'),(20,'SHRUTHI SURGICAL AND PHARMA HOUSE','9902533807','29CEKPB2999K2ZS','KA-YD1-20B-175136-KA-YD1-21B-175137','2023-06-05 11:46:35.487','2023-06-05 11:46:35.487'),(21,'VAISHNAVI PHARMA','9341599905','29AOQPK0641B1Z3','KAGL2/20B206600*20G20661*21B206602','2023-06-06 09:03:05.970','2023-06-06 09:03:05.970'),(22,'ELLTON AGENCIES','9341654209','29AAAFE4812AIZ0','KA-GL1-20B-100545,21B-100546','2023-06-09 07:05:27.457','2023-06-09 07:05:27.457'),(23,'SAI PHARMACEUTICALS DISTRIBUTORS','7829666125','29AYMPS0667D1Z1','KA/YD1-140177/140178','2023-06-09 07:51:24.157','2023-06-09 07:51:24.157'),(24,'KAYAKALPA DISTRIBUTORS','9448749737','29AAHFK1894K1ZQ','KA/GL1/20B/102431/GL1/21B/10202','2023-06-09 08:35:04.577','2023-06-09 08:36:14.994'),(25,'AYUSH PHARMA PHARMACEUTICAL DISTRIBUTORS','8618185565','29EFLPM9030J1ZV','KA-YD1-20B-213260,KA-YD1-21B-213261','2023-06-09 08:47:23.944','2023-06-09 08:47:23.944'),(26,'SHIVA PHARMA','9060666894','29CUPPP8228N1ZH','KA/GL1/20B/164559/21B/164560','2023-06-12 07:21:47.229','2023-06-12 07:21:47.229'),(27,'SRI CHANNABASAVA DISTRIBUTORS','9342253294','29BPQM1855K224','KAGL2-20/21','2023-06-13 11:49:42.291','2023-06-13 11:49:42.291'),(28,'SHREYA PHARMA GLB','8722777764','29ACMFS2353JIZN','KA/GL2/20B/224878/21B/224880/20G/224880','2023-06-13 15:22:26.360','2023-06-13 15:22:26.360'),(29,'M/S SAANVI DISTRIBUTORS BIDAR','9538100698','29AVQPK7883E1ZT','KA-BD1/20B-176064/21B-176065','2023-06-14 07:39:37.053','2023-06-14 07:39:37.053'),(31,'UDAYA MEDICAL STORES','9035016555','29AEKPB6467L1ZY','KA-YD1-MYP/20B/286-KA-YD1-MYP/21B/287','2023-06-18 05:38:33.693','2023-06-18 05:38:33.693'),(32,'MALLIGE MEDICAL AGENCY','9113588285','29BWIPB5504M1ZC','KA-GL1-225656-225657','2023-06-20 07:22:53.979','2023-06-20 07:22:53.979'),(33,'SHRE DANDAGUNDA','9845147844','','','2023-06-27 13:24:41.925','2023-06-27 13:24:41.925'),(34,'GANESH PHARMACEUTICALS','998628698','29AAOFG2445D1ZD','','2023-07-03 04:54:06.516','2023-07-03 04:54:06.516'),(35,'M/S SHARANODAYA DISTRIBUTORS GLB','08472252882','29AAYPW4982D1ZO','KA/GL2/20B/212027/GL1/21B/212028/20-217599','2023-07-04 07:02:51.405','2023-07-04 07:02:51.405'),(36,'SRI BALAJI DISTRIBUTORS','9448633706','29AKCPM8556D1ZX','20B/KA-YD1-108055*KA-21B/YD1-108056','2023-07-10 09:20:58.996','2023-07-10 09:20:58.996'),(37,'NEW SAI PHARMA YADGIR','8095266429','29BNOPJ1478F1ZM','KA-YD1-20B/21B-245005/06','2023-07-11 03:46:33.069','2023-07-11 03:47:25.489'),(38,'ELINX PHARMACUTICALS INDIA PVT LTD','6363332952','29AADCE1967C1ZP','KA-BT1-134520/KA-BTI-134521','2023-07-18 12:28:07.532','2023-07-18 12:28:07.532'),(39,'SKYTECH PHARMA AND SURGICALS','9880969647','29EGAPS7317JIZW','KA-YDI-21838','2023-07-27 11:20:55.705','2023-07-27 11:21:44.004'),(40,'MEDFORD PHARMACEUTICALS LLP','7353360944','29ABKFM3832H1Z0','20B KA-B61-191425','2023-08-10 07:16:42.638','2023-08-10 07:16:42.638');
/*!40000 ALTER TABLE `distributer` ENABLE KEYS */;
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
