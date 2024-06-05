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
-- Table structure for table `floors`
--

DROP TABLE IF EXISTS `floors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `floors` (
  `id` int NOT NULL,
  `map_floor_id` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `order` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `subject` json NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `floors`
--

LOCK TABLES `floors` WRITE;
/*!40000 ALTER TABLE `floors` DISABLE KEYS */;
INSERT INTO `floors` VALUES (4,'FL-2RgrriDiE1221','B1F',1,'2023-05-11 06:29:43','{\"en\": \"Baby shop\", \"vi\": \"Thời trangㅣMỹ phẩmㅣCà phêㅣSiêu thị\"}'),(5,'FL-oQ33DFwJk8835','1F',2,'2023-05-12 14:43:57','{\"en\": \"Baby shop\", \"vi\": \"Thời trangㅣMỹ phẩmㅣCà phêㅣSiêu thị\"}'),(6,'FL-Q7b9m8Ly73110','2F',3,'2023-05-12 14:45:25','{\"en\": \"Baby shop\", \"vi\": \"Thời trangㅣMỹ phẩmㅣCà phêㅣSiêu thị 2\"}'),(7,'FL-PKTf7H2oLJ3486','3F',4,'2023-05-12 14:45:25','{\"en\": \"Baby shop\", \"vi\": \"Thời trangㅣMỹ phẩmㅣCà phêㅣSiêu thị 3\"}'),(8,'FL-ziQ3RKtohg3838','4F',5,'2023-05-12 14:45:25','{\"en\": \"Baby shop\", \"vi\": \"Thời trangㅣMỹ phẩmㅣCà phêㅣSiêu thị 4\"}'),(9,'FL-c9ANEsq4D4206','5F',6,'2023-05-12 14:45:25','{\"en\": \"Baby shop\", \"vi\": \"Thời trangㅣMỹ phẩmㅣCà phêㅣSiêu thị 5\"}');
/*!40000 ALTER TABLE `floors` ENABLE KEYS */;
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
