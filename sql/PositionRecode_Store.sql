-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: 0.0.0.0    Database: PositionRecode
-- ------------------------------------------------------
-- Server version	8.1.0

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
-- Table structure for table `Store`
--

DROP TABLE IF EXISTS `Store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Store` (
  `id` int NOT NULL AUTO_INCREMENT,
  `StoreName` varchar(200) DEFAULT NULL,
  `User` varchar(200) NOT NULL,
  `Latitude` float NOT NULL DEFAULT '0',
  `Longitude` double NOT NULL DEFAULT '0',
  `Favorite` int NOT NULL DEFAULT '0',
  `Evaluation` double NOT NULL DEFAULT '0',
  `RegistDate` datetime NOT NULL,
  `Country` varchar(200) DEFAULT NULL,
  `CountryCode` varchar(5) DEFAULT NULL,
  `County` varchar(200) DEFAULT NULL,
  `Neighbourhood` varchar(200) DEFAULT NULL,
  `Postcode` varchar(10) DEFAULT NULL,
  `Province` varchar(200) DEFAULT NULL,
  `Town` varchar(200) DEFAULT NULL,
  `City` varchar(200) DEFAULT NULL,
  `Note` longtext,
  `UpdateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Store`
--

LOCK TABLES `Store` WRITE;
/*!40000 ALTER TABLE `Store` DISABLE KEYS */;
INSERT INTO `Store` VALUES (1,'竹風（上三川）','geek.or.freak.and.gimmick@gmail.com',36.4457,139.91891384125,1,3,'2023-09-29 19:06:00','日本','','河内郡','しらさぎ３丁目２９ー７','329-0618','栃木県','','上三川町','aaaaaaa\naaaaaa\naaaa\naaa\na','2023-10-02 19:02:41'),(3,'峰食堂','geek.or.freak.and.gimmick@gmail.com',36.4419,139.91093158722,0,1,'2023-09-29 19:16:55','日本','','河内郡','しらさぎ１丁目２８ー１０','329-0618','栃木県','','上三川町','食べたことない','2023-10-02 19:20:38'),(6,NULL,'geek.or.freak.and.gimmick@gmail.com',36.445,139.9191206,0,0,'2023-09-29 19:48:50','日本','jp','河内郡','しらさぎ三丁目','329-0611','栃木県','上三川町',NULL,NULL,NULL),(7,'','geek.or.freak.and.gimmick@gmail.com',36.445,139.9191206,1,0,'2023-09-29 19:48:55','日本','jp','河内郡','しらさぎ三丁目','329-0611','栃木県','上三川町','','','2023-10-03 10:55:43'),(8,NULL,'geek.or.freak.and.gimmick@gmail.com',36.445,139.9191206,0,0,'2023-09-29 19:49:23','日本','jp','河内郡','しらさぎ三丁目','329-0611','栃木県','上三川町',NULL,NULL,NULL),(9,NULL,'geek.or.freak.and.gimmick@gmail.com',36.445,139.9191206,0,0,'2023-09-29 19:51:08','日本','jp','河内郡','しらさぎ三丁目','329-0611','栃木県','上三川町',NULL,NULL,NULL),(10,NULL,'geek.or.freak.and.gimmick@gmail.com',36.445,139.9191206,0,0,'2023-09-29 19:51:17','日本','jp','河内郡','しらさぎ三丁目','329-0611','栃木県','上三川町',NULL,NULL,NULL),(11,NULL,'geek.or.freak.and.gimmick@gmail.com',36.445,139.9190989,0,0,'2023-09-29 21:50:29','日本','jp','河内郡','しらさぎ三丁目','329-0611','栃木県','上三川町',NULL,NULL,NULL),(12,NULL,'geek.or.freak.and.gimmick@gmail.com',36.4465,139.9074316,0,0,'2023-09-29 21:54:33','日本','jp','河内郡','しらさぎ二丁目','329-0617','栃木県','上三川町',NULL,NULL,NULL),(13,NULL,'geek.or.freak.and.gimmick@gmail.com',36.4451,139.9191216,0,0,'2023-09-30 11:42:57','日本','jp','河内郡','しらさぎ三丁目','329-0611','栃木県','上三川町',NULL,NULL,NULL),(14,NULL,'geek.or.freak.and.gimmick@gmail.com',36.4445,139.9896049,0,0,'2023-09-30 18:28:19','日本','jp','','上高間木一丁目','321-4361','栃木県','','真岡市',NULL,NULL),(15,NULL,'geek.or.freak.and.gimmick@gmail.com',36.4451,139.9191208,0,0,'2023-10-01 01:21:32','日本','jp','河内郡','しらさぎ三丁目','329-0611','栃木県','上三川町','',NULL,NULL),(16,NULL,'geek.or.freak.and.gimmick@gmail.com',36.4451,139.919131,0,0,'2023-10-01 16:10:49','日本','jp','河内郡','しらさぎ三丁目','329-0611','栃木県','上三川町','',NULL,NULL),(17,NULL,'geek.or.freak.and.gimmick@gmail.com',36.4451,139.9191178,0,0,'2023-10-02 02:46:34','日本','jp','河内郡','しらさぎ三丁目','329-0611','栃木県','上三川町','',NULL,NULL),(18,NULL,'geek.or.freak.and.gimmick@gmail.com',36.4451,139.9191178,0,0,'2023-10-02 02:47:11','日本','jp','河内郡','しらさぎ三丁目','329-0611','栃木県','上三川町','',NULL,NULL),(19,NULL,'geek.or.freak.and.gimmick@gmail.com',36.4451,139.9191287,0,0,'2023-10-02 10:54:31','日本','jp','河内郡','しらさぎ三丁目','329-0611','栃木県','上三川町','',NULL,NULL),(20,NULL,'geek.or.freak.and.gimmick@gmail.com',36.4451,139.9191323,0,0,'2023-10-02 11:57:05','日本','','河内郡','しらさぎ３丁目４３ー１','329-0618','栃木県','','上三川町',NULL,NULL),(21,NULL,'geek.or.freak.and.gimmick@gmail.com',36.4451,139.9190982,0,0,'2023-10-02 13:27:05','日本','','河内郡','しらさぎ３丁目４３ー１','329-0618','栃木県','','上三川町',NULL,NULL),(23,NULL,'geek.or.freak.and.gimmick@gmail.com',36.4449,139.9190562,0,0,'2023-10-02 19:22:14','日本','','河内郡','しらさぎ３丁目４１ー２５','329-0618','栃木県','','上三川町',NULL,NULL);
/*!40000 ALTER TABLE `Store` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-03 12:09:49
