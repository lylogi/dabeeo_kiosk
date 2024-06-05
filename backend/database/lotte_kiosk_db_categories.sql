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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` bigint NOT NULL,
  `map_cat_id` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `title` json NOT NULL,
  `parent_code` varchar(100) NOT NULL,
  `sort_order` varchar(2) NOT NULL,
  `children_count` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (5,'104','2023-05-11 06:29:43','{\"en\": \"Asian food\", \"vi\": \"Ẩm thực Châu Á\"}','001','',0),(6,'105','2023-05-11 06:29:43','{\"en\": \"Korean food\", \"vi\": \"Ẩm thực Hàn Quốc\"}','001','',0),(7,'106','2023-05-11 06:29:43','{\"en\": \"Japan food\", \"vi\": \"Ẩm thực Nhật Bản\"}','001','',0),(8,'107','2023-05-11 06:29:43','{\"en\": \"Western food\", \"vi\": \"Ẩm thực phương Tây\"}','001','',0),(9,'108','2023-05-11 06:29:43','{\"en\": \"China food\", \"vi\": \"Ẩm thực Trung Hoa\"}','001','',0),(10,'109','2023-05-11 06:29:43','{\"en\": \"Food court\", \"vi\": \"Khu ẩm thực\"}','001','',0),(11,'110','2023-05-11 06:29:43','{\"en\": \"Bakery/Dessert\", \"vi\": \"Bánh mỳ/Tráng miệng\"}','001','',0),(12,'111','2023-05-11 06:29:43','{\"en\": \"Cafe\", \"vi\": \"Quán cà phê\"}','001','',0),(13,'112','2023-05-30 09:23:11','{\"en\": \"Facilities\", \"vi\": \"Tiện ích\"}','','',11),(14,'113','2023-05-30 09:44:36','{\"en\": \"Sports\", \"vi\": \"Thể thao\"}','','',0),(15,'002','2023-06-02 09:05:31','{\"en\": \"Escalator\", \"vi\": \"Thang cuốn\"}','112','',0),(16,'003','2023-06-02 09:08:03','{\"en\": \"Elevator\", \"vi\": \"Thang máy\"}','112','',0),(17,'004','2023-06-02 09:08:57','{\"en\": \"Information\", \"vi\": \"Quầy thông tin\"}','112','',0),(18,'005','2023-06-02 09:10:01','{\"en\": \"Lounge\", \"vi\": \"Dịch vụ CSKH\"}','112','',0),(19,'006','2023-06-02 09:10:30','{\"en\": \"Restroom\", \"vi\": \"Nhà vệ sinh\"}','112','',0),(20,'007','2023-06-02 09:11:33','{\"en\": \"Smoking room\", \"vi\": \"Phòng hút thuốc\"}','112','',0),(21,'008','2023-06-02 09:13:22','{\"en\": \"Rest area\", \"vi\": \"Khu nghỉ chân\"}','112','',0),(22,'009','2023-06-02 09:13:31','{\"en\": \"Baby lounge\", \"vi\": \"Phòng mẹ và bé\"}','112','',0),(23,'010','2023-06-02 09:14:50','{\"en\": \"Medical room\", \"vi\": \"Phòng y tế\"}','112','',0),(24,'011','2023-06-02 09:16:14','{\"en\": \"Parking lot\", \"vi\": \"Bãi đỗ xe\"}','112','',0),(25,'012','2023-06-02 09:17:29','{\"en\": \"Alteration room\", \"vi\": \"Dịch vụ sửa đồ\"}','112','',0),(26,'001','2023-06-02 09:19:47','{\"en\": \"F&B\", \"vi\": \"Ẩm thực\"}','','',7),(27,'114','2023-06-06 08:54:40','{\"en\": \"Children\'s play area\", \"vi\": \"Khu vui chơi trẻ em\"}','','',0),(28,'115','2023-06-06 08:54:40','{\"en\": \"Women fashion\", \"vi\": \"Thời trang nữ\"}','','',0),(29,'116','2023-06-06 08:54:40','{\"en\": \"Men fashion\", \"vi\": \"Thời trang nam\"}','','',0),(30,'117','2023-06-06 08:54:40','{\"en\": \"Young Fashion\", \"vi\": \"Thời trang trẻ\"}','','',0),(31,'118','2023-06-06 08:54:40','{\"en\": \"Fashion accessory\", \"vi\": \"Phụ kiện thời trang\"}','','',0),(32,'119','2023-06-06 08:54:40','{\"en\": \"Cosmetics\", \"vi\": \"Mỹ phẩm\"}','','',0),(33,'120','2023-06-09 06:33:20','{\"en\": \"Leisure/sports\", \"vi\": \"Đồ thể thao\"}','','',0),(34,'121','2023-06-09 06:33:20','{\"en\": \"Kids/infants\", \"vi\": \"Đồ trẻ em\"}','','',0),(35,'122','2023-06-09 06:33:20','{\"en\": \"Luxury fashion\", \"vi\": \"Thời trang cao cấp\"}','','',0),(36,'123','2023-06-09 06:33:20','{\"en\": \"Living\", \"vi\": \"Đời sống\"}','','',0),(37,'124','2023-06-09 06:33:20','{\"en\": \"Food store\", \"vi\": \"Cửa hàng thực phẩm\"}','','',0),(38,'125','2023-06-09 06:33:20','{\"en\": \"Event hall\", \"vi\": \"Sảnh sự kiện\"}','','',0),(39,'126','2023-06-09 06:33:20','{\"en\": \"Other\", \"vi\": \"Khác\"}','','',0);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-09 14:20:17
