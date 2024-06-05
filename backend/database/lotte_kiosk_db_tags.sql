-- MySQL dump 10.13  Distrib 8.0.27, for macos11 (x86_64)
--
-- Host: 192.168.88.92    Database: lotte_kiosk_db
-- ------------------------------------------------------
-- Server version	8.0.33-0ubuntu0.20.04.2

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
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `tags` (
  `id` bigint NOT NULL,
  `content` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'#nuochoa','2023-05-11 06:29:43'),(2,'#perfume','2023-05-15 07:05:39'),(3,'#amthuchanquoc','2023-05-15 07:05:39'),(4,'#Koreanfood','2023-05-15 07:05:39'),(5,'#amthuctrunghoa','2023-06-06 09:47:15'),(6,'#Chinafood','2023-05-15 07:07:01'),(7,'#amthucNhatBan','2023-05-15 07:07:01'),(10,'#Japanfood','2023-05-15 07:05:39'),(11,'#banhmi','2023-05-26 04:12:31'),(12,'#Bakery','2023-05-26 04:12:31'),(13,'#trangmieng','2023-05-26 04:12:31'),(14,'#dessert','2023-05-26 04:12:31'),(15,'#Juice','2023-05-26 04:12:31'),(16,'#nuocep','2023-05-26 04:12:31'),(17,'#coffe','2023-05-26 04:12:31'),(18,'#caphe','2023-05-26 04:12:31'),(19,'#sushi','2023-05-26 04:12:31'),(20,'#thoitrangnam','2023-05-26 04:12:31'),(21,'#thoitrangnu','2023-05-26 04:12:31'),(22,'#thoitrangtreem','2023-05-26 04:12:31'),(23,'#thethao','2023-05-26 04:12:31'),(24,'#sports','2023-05-26 04:12:31'),(25,'#trasua','2023-05-26 04:12:31'),(26,'#milktea','2023-05-26 04:12:31'),(27,'#hoa','2023-05-26 04:12:31'),(28,'#flower','2023-05-26 04:12:31'),(29,'#noithat','2023-05-26 04:12:31'),(30,'#thoitrang','2023-05-26 04:12:31'),(31,'#trangsuc','2023-05-26 04:12:31'),(32,'#phukien','2023-05-26 04:12:31'),(33,'#noithatnhapngoai','2023-05-26 04:12:31'),(34,'#noithattrongnuoc','2023-05-26 04:12:31'),(35,'#doannhe','2023-05-26 04:12:31'),(36,'#doanvat','2023-05-26 04:12:31'),(37,'#lau','2023-05-26 04:12:31'),(38,'#nuong','2023-05-26 04:12:31'),(39,'#anflower','2023-05-26 04:12:31'),(40,'#annbook','2023-05-26 04:12:31'),(41,'#anhdep','2023-06-01 10:31:33'),(42,'#anhxau','2023-06-09 04:17:45'),(43,'#anhlunglinh','2023-06-09 04:17:45'),(44,'#anhlonglay','2023-06-09 04:17:45');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-09 14:20:16
