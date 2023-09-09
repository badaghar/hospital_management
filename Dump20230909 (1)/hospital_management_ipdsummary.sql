-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 192.168.1.106    Database: hospital_management
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
-- Table structure for table `ipdsummary`
--

DROP TABLE IF EXISTS `ipdsummary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ipdsummary` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `ipdId` int NOT NULL,
  `updated_at` datetime(3) NOT NULL,
  `summary` json NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IpdSummary_ipdId_fkey` (`ipdId`),
  CONSTRAINT `IpdSummary_ipdId_fkey` FOREIGN KEY (`ipdId`) REFERENCES `ipd` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ipdsummary`
--

LOCK TABLES `ipdsummary` WRITE;
/*!40000 ALTER TABLE `ipdsummary` DISABLE KEYS */;
INSERT INTO `ipdsummary` VALUES (3,'2023-09-01 06:53:45.485',9,'2023-09-01 07:39:52.889','{\"chief\": \"Pain abdomen with large RIF swelling since 1 year\", \"gender\": \"Female\", \"address\": \"Yadgiri\", \"surgery\": \"Repair of hernia with Double breasting\", \"diagnosis\": \"Large RIF incisional hernia\", \"treatement\": \"Tab. Amoxyclav 625mg..BD\\nTab. Pan 40…OD\\nTab. Zerodol SP..BD\\n\"}'),(4,'2023-09-01 07:27:35.731',12,'2023-09-02 05:07:46.971','{\"chief\": \"Pain abdomen and On n Off P/V bleeding \", \"gender\": \"Female\", \"address\": \"Horunchi, Yadgiri\", \"surgery\": \"Total Abdominal Hysterectomy with Left Salphingo-oopharectomy\", \"diagnosis\": \"Bulky uterus with cervicitis with Endometriosis\", \"treatement\": \"Tab. Amoxyclav 625mg..BD\\\\n\\nTab. Pan 40…OD\\\\n\\nTab. Zerodol SP..BD\\\\n\\n\", \"investigations\": \"USG\\nBlood reports\"}'),(5,'2023-09-02 04:29:49.163',7,'2023-09-02 05:38:28.291','{\"chief\": \"Pain and swelling in epigastric region since 1 year\\n \\n \\n \", \"gender\": \"F\", \"address\": \"Kurukumbla\", \"surgery\": \"Repair of hernia under Spinal Anaesthesia\\n \\n \\n \", \"clinical\": \" \\n \\n\", \"diagnosis\": \"Epigastric hernia\\n \\n\\n \", \"treatement\": \"Tab. Amoxyclav 625mg..BD\\nTab. Pan 40…OD\\nTab. Zerodol SP..BD\\n\", \"investigations\": \" \\n \"}'),(6,'2023-09-02 05:16:47.506',13,'2023-09-06 14:26:44.255','{\"chief\": \"pain and swelling in Rt LL since 5 days\", \"address\": \"Yadgiri\", \"surgery\": \"Debridement *SA\", \"clinical\": \"\", \"diagnosis\": \"Right lower limb Gangrene with cellulitis\\n\\n \", \"treatement\": \"Tab. Amoxyclav 625mg..BD\\nTab. Pan 40…OD\\nTab. Zerodol SP..BD\\n\", \"investigations\": \"  USG\\nDoppler\\nBlood reports\\n  \"}'),(8,'2023-09-04 04:11:17.308',23,'2023-09-04 06:42:46.833','{\"chief\": \"Pain and irregular menses with severe P/V bleeding since 6 months\\n   \\n \", \"address\": \"Rampur\", \"surgery\": \"Total Abdominal hysterectomy with B/L SO under SA\\n \\n \", \"clinical\": \" \\n \\n \", \"diagnosis\": \"Bulky uterus with Large posterior and left body fibroids\\n  \\n \\n \", \"treatement\": \"Tab. Amoxyclav 625mg..BD\\nTab. Pan 40…OD\\nTab. Zerodol SP..BD\\n\", \"investigations\": \"USG\\nBlood reports attached\\n \\n\"}'),(12,'2023-09-04 07:12:46.248',24,'2023-09-04 07:12:46.248','{\"chief\": \"Pain and tenderness in RIF since 15 days\", \"address\": \"Yadgir\", \"surgery\": \"Open Appendicectomy\", \"clinical\": \"RIF tenderness\", \"diagnosis\": \"Acute appendicitis\", \"treatement\": \"Tab. Amoxyclav 625mg..BD\\nTab. Pan 40…OD\\nTab. Zerodol SP..BD\\n\", \"investigations\": \"USG\"}'),(13,'2023-09-04 07:16:01.777',25,'2023-09-04 08:34:16.612','{\"chief\": \"Pain and tenderness in RIF since 15 days\\n\\n  \", \"address\": \"Yadgir\", \"surgery\": \"Open Appendicectomy under SA\\n\\n \", \"clinical\": \"RIF tenderness\\n\\n  \", \"diagnosis\": \"Acute appendicitis\\n\\n \", \"treatement\": \"Tab. Amoxyclav 625mg..BD\\nTab. Pan 40…OD\\nTab. Zerodol SP..BD\\n\", \"investigations\": \"USG\\n\\n  \"}'),(18,'2023-09-04 08:15:35.470',27,'2023-09-04 08:31:37.012','{\"chief\": \"Pain abdomen and P/V bleeding with LBA since 6 months\\n \\n \", \"surgery\": \"Total Abdominal Hysterectomy with B/L SO under SA\\n \\n \", \"clinical\": \"\\n \\n \", \"diagnosis\": \"Bulky Uterus with cervicitis with Adenomyosis\\n \\n \", \"treatement\": \"Tab. Amoxyclav 625mg..BD\\nTab. Pan 40…OD\\nTab. Zerodol SP..BD\\n\", \"investigations\": \"USG\\n \\n \"}'),(19,'2023-09-04 08:23:20.379',26,'2023-09-04 08:33:22.803','{\"chief\": \"Pain and swelling in B/L cervical region\\n\\n \", \"surgery\": \"Left mass excision Biopsy under Short GA\\n\\n\", \"clinical\": \"\\n\\n\\n \", \"diagnosis\": \"? Lymphoma\\n\\n \", \"treatement\": \"Tab. Amoxyclav 625mg..BD\\nTab. Pan 40…OD\\nTab. Zerodol SP..BD\\n\", \"investigations\": \"USG\\nFNAC\\n \"}'),(20,'2023-09-04 08:26:12.722',20,'2023-09-04 08:35:42.004','{\"chief\": \"Pain abdomen and P/V bleeding with LBA since 6 months\\n\\n\\n\", \"address\": \"Yadgiri\", \"surgery\": \"Total Abdominal Hysterectomy with B/L SO under SA\\n\\n\", \"clinical\": \"\\n \\n \", \"diagnosis\": \"Bulky Uterus with cervicitis with Adenomyosis with Fibroids\\n \\n\", \"treatement\": \"Tab. Amoxyclav 625mg..BD\\nTab. Pan 40…OD\\nTab. Zerodol SP..BD\\n\", \"investigations\": \"USG\\n \\n\"}'),(21,'2023-09-06 05:07:29.225',28,'2023-09-06 06:05:16.991','{\"chief\": \"Pain abdomen and P/V bleeding with LBA since 6 months\\n \\n \", \"address\": \"Basawantpur, Yadgir\", \"surgery\": \"Total Abdominal Hysterectomy with Left SO under SA\\n \\n \", \"clinical\": \"\\n \\n \\n\", \"diagnosis\": \"Bulky Uterus with cervicitis \\n \\n \\n \", \"treatement\": \"Tab. Amoxyclav 625mg..BD\\nTab. Pan 40…OD\\nTab. Zerodol SP..BD\\n\", \"investigations\": \"USG\\n \\n\"}'),(22,'2023-09-06 14:18:16.963',29,'2023-09-06 14:18:16.963','{}'),(23,'2023-09-07 04:11:00.026',30,'2023-09-07 04:20:24.627','{\"chief\": \"Pain and with vomitting since 3 days\\n \", \"address\": \"Yadgiri\", \"surgery\": \"Right URS with steniting under SA\\n \", \"diagnosis\": \"Right distal ureteric calculi with HUN\\n \", \"treatement\": \"Tab. Amoxyclav 625mg..BD\\nTab. Pan 40…OD\\nTab. Zerodol SP..BD\\n\", \"investigations\": \"USG\\n \"}'),(24,'2023-09-07 12:48:23.838',31,'2023-09-07 13:00:08.045','{\"chief\": \"Pain in RIF since 15 days\\n\", \"address\": \" CHAKKARKTTA MAIN ROAD, YADGIRI\", \"surgery\": \"Open Appendicectomy under SA\\n\", \"clinical\": \"Pain and tenderness in RIF since 15 days\\n\", \"diagnosis\": \"Acute Appedicitis\", \"treatement\": \"Tab. Amoxyclav 625mg..BD\\nTab. Pan 40…OD\\nTab. Zerodol SP..BD\", \"investigations\": \"USG\\nBlood reports\\n\"}'),(25,'2023-09-08 12:25:54.822',33,'2023-09-08 12:27:22.476','{\"chief\": \"Pain and discharge from umbilicus since birth\", \"address\": \"Ganga nagar, yadgir\", \"surgery\": \"Excision of granuloma under Sedation\", \"clinical\": \"Wound and discharge from umbilicus\", \"diagnosis\": \"Umbilical granuloma and infected Urachal cyst\", \"treatement\": \"Syp.Amoxyclav 5ml…BD\\nSyp. Ibugesic plus 5ml…BD\\n\", \"investigations\": \"USG\"}'),(26,'2023-09-09 04:34:58.589',32,'2023-09-09 05:08:39.168','{\"chief\": \"Pain and tenderness in RIF since 15 days\\n\", \"address\": \"Kurkunda, Yadgiri\", \"surgery\": \"Open Appendicectomy under SA\\n\", \"clinical\": \"RIF tenderness\", \"diagnosis\": \"Acute appendicitis\\n\", \"treatement\": \"Tab. Amoxyclav 625mg..BD\\nTab. Pan 40…OD\\nTab. Zerodol SP..BD\\n\", \"investigations\": \"USG\"}');
/*!40000 ALTER TABLE `ipdsummary` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-09 12:10:47
