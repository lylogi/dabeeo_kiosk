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
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `event` (
  `id` bigint NOT NULL,
  `seq_code` varchar(50) NOT NULL,
  `type` int NOT NULL DEFAULT '1',
  `start_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `full_screen` varchar(2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `title` json NOT NULL,
  `content` json NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e0ee1f807cca1b04ae0640a0e4` (`seq_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (2,'string222444',1,'2023-04-26 00:18:58','2023-04-26 00:18:58','1','2023-05-11 06:29:43','\"json\"','\"json\"'),(3,'event3',1,'2023-06-26 11:25:57','2023-07-01 11:26:01','','2023-05-30 11:26:12','{\"en\": \"Happy Children\'s day\", \"vi\": \"Vui Tết thiếu nhi - Ưu đãi hết ý\"}','{\"en\": \"Celebrating International Children\'s Day 1.6, let\'s explore exciting offers and events coming up at Lotte Department Store with your baby!\\n- Offers from a range of children\'s fashion brands, toys, baby supplies, .. up to 50%++\\n- Experience mind games for free\\n- Lucky draw with a total prize value of up to 25 million VND!\\n- Free 50% discount voucher at Playtime amusement park for bill from 500k\\n- Give a beautiful ball to the baby\", \"vi\": \"Mừng ngày Quốc tế thiếu nhi 1.6, hãy cùng bé yêu khám phá những ưu đãi và sự kiện hấp dẫn sắp diễn ra tại Lotte Department Store nhé!\\n-  Ưu đãi từ loạt thương hiệu thời trang trẻ em, đồ chơi, đồ dùng cho bé,.. lên tới 50%++\\n- Trải nghiệm các trò chơi trí tuệ miễn phí\\n- Bốc thăm may mắn với tổng giá trị giải thưởng lên đến 25 triệu đồng!\\n- Tặng thêm Voucher giảm giá 50% tại khu vui chơi Playtime cho hóa đơn từ 500k\\n- Tặng bóng xinh cho bé\"}'),(4,'event4',1,'2023-06-15 11:25:57','2023-07-15 11:26:01','','2023-05-30 11:26:12','{\"en\": \"GIFT FOR YOUR LOVERS\", \"vi\": \"QUÀ TẶNG 1/6 CHO CÁC CON YÊU\"}','{\"en\": \"The coming 1/6 is also the end of a year of hard work for your children. Parents, let\'s join Lotte Mall Tay Ho to choose very interesting gifts for our children on the occasion of International Children\'s Day.\\n1. One ticket to the TiNi World children\'s play area\\n2. Watching movies with family\\n3. A cozy meal\\n4. A toy that your child likes\", \"vi\": \"1/6 sắp đến cũng là thời điểm kết thúc một năm học tập chăm chỉ của các con, bố mẹ hãy cùng Lotte Mall Tây Hồ chọn ra những phần quà cực thú vị cho các nhóc tì nhà mình nhân ngày Quốc Tế Thiếu Nhi nhé\\n1. Một vé vào cổng khu vui chơi dành cho trẻ em TiNi World\\n2. Xem phim cùng gia đình\\n3. Một bữa ăn ấm cúng\\n4. Một món đồ chơi mà con thích\"}'),(5,'event5',1,'2023-06-14 11:25:57','2023-07-14 11:26:01','','2023-05-30 11:26:12','{\"en\": \"MEMBERSHIP CHANGE NOTICE\", \"vi\": \"THÔNG BÁO THAY ĐỔI CHƯƠNG TRÌNH HỘI VIÊN\"}','{\"en\": \"Dear Members,\\\\nFrom May 8, 2023, the L.POINT Membership program will officially stop operating.\\\\nThe new membership program will be transferred to the exclusive mobile application for LOTTE MALL. Please bring your old L.POINT card to transfer your points to the new system.\\\\nFor more information, contact the Customer Service counter: 024 3333 2488\\\\nBest regards!\", \"vi\": \"Kính gửi quý Hội viên,\\\\nTừ ngày 08.05.2023, chương trình Hội viên L.POINT sẽ chính thức dừng hoạt động.\\\\nChương trình hội viên mới sẽ được chuyển sang ứng dụng điện thoại dành riêng cho LOTTE MALL. Quý khách vui lòng mang theo thẻ L.POINT cũ để được chuyển điểm sang hệ thống mới. \\\\nMọi chi tiết liên hệ quầy Dịch vụ Khách hàng: 024 3333 2488 \\\\nTrân trọng!\"}'),(6,'event6',1,'2023-06-25 11:25:57','2023-07-25 11:26:01','','2023-05-30 11:26:12','{\"en\": \"15 BEST, DELICIOUS RESTAURANT IN LOTTE\", \"vi\": \"15 QUÁN ĂN NGON, NỔI TIẾNG NHẤT TẠI LOTTE\"}','{\"en\": \"1. Team grilling hot pot\\n- Manwah - Taiwanese hot pot\\n- Shogun - Japanese BBQ grill\\n- Gojumong Casual - Korean Restaurant\\n- Thai Express- Thai cuisine\\n- Hotpot Story - Thai hot pot buffet\\n- Tasaki BBQ - Grilled Japanese BBQ\\n2. Team dimsum\\n- Meiwei - Chinese Cuisine\\n3. Team European food & pizza\\n- Pizza 4Ps\\n4. Vietnamese cuisine team\\n- Delicious street 37\\n- Truly Vietnamese\\n5. Team cafe cakes\\n- Starbucks\\n- Artisee\\n- Mochi Sweets - Japanese dessert\", \"vi\": \"1. Team nướng lẩu\\n- Manwah - lẩu Đài Loan\\n- Shogun - nướng BBQ Nhật Bản\\n- Gojumong Casual - Nhà hàng Hàn Quốc\\n- Thai Express- Ẩm thực Thái Lan\\n- Hotpot Story - Buffet lẩu Thái\\n- Tasaki BBQ - Nướng BBQ Nhật Bản\\n2. Team dimsum\\n- Meiwei - Ẩm thực Trung Hoa\\n3. Team đồ Âu & pizza\\n- Pizza 4Ps\\n4. Team ẩm thực Việt Nam\\n- Phố ngon 37\\n- Truly Việt\\n5. Team cafe bánh ngọt\\n- Starbucks\\n- Artisee\\n- Mochi Sweets - Japanese dessert\"}'),(7,'event7',1,'2023-07-01 11:25:57','2023-07-30 11:26:01','','2023-05-30 11:26:12','{\"en\": \"Excitedly welcome Black Friday with LOTTE MALL Tay Ho\", \"vi\": \"Rộn ràng đón ngày Black Friday cùng LOTTE MALL TÂY HỒ\"}','{\"en\": \"From November 18 to November 27, AEON MALL welcomes customers with a bustling sale on the occasion of Black Friday at the entire LOTTE MAL Tay Ho.\", \"vi\": \"Từ ngày 18/11 đến 27/11, AEON MALL chào đón quý khách hàng với chương trình sale rộn ràng nhân dịp Black Friday tại toàn bộ trung tâm thương mại LOTTE MALL Tây Hồ\"}'),(8,'event8',1,'2023-06-30 17:01:44','2023-07-30 17:01:47','1','2023-05-31 10:09:23','{\"en\": \"PARTICIPATION IN RECYCLING - Small Recycled Old Item\", \"vi\": \"THAM GIA TÁI CHẾ - ĐỒ CŨ TÁI SINH \"}','{\"en\": \"The journey will start from May 27 to June 5 at LOTTE MALL TAY HO shopping centers.\\nPositive activities bring back lovely finished products like this, so you have to invite your family to join in to compete skillfully.\\n- The important thing is that when participating in this \\\"green\\\" bus, the whole family has contributed to \\\"healing\\\" the earth. Let\'s go green with AEON for a green future!\\n- And don\'t forget, AEON still has many other equally attractive \\\"green\\\" activities waiting for you to join. See you at my house at LOTTE MALL!\\n- Instead of painting a star painting this weekend, I will not change the wind to visit AEON to \\\"green\\\" the earth by joining a green journey and bring back \\\"good\\\" gifts!\\nPlease take a look at the green charging stations on this exciting journey:\\n- DEPARTMENT STATION: Start gently by enjoying your shopping moments, have a purchase receipt from 300k at TTBHTH & ST AEON, then proceed to the next station.\\n- GREEN RECYCLE STATION: Here, you will experience meaningful activities - together \\\"change new clothes\\\", create new looks and bring many new uses to old cartons/cartons.\\n- STATION RECEIVE GIFTS: When you complete the task at station 2, you can bring back beautiful but also \\\"green\\\" results to show off to your loved ones and spread a positive message about environmental protection. there!\", \"vi\": \"- Thay vì tô tượng vẽ tranh sao cuối tuần này mình không đổi gió ghé AEON “tô xanh” trái đất bằng cách tham gia chuyến hành trình xanh và mang về những món quà thật “lành\\\" nào! \\nXin mời nhà mình ngó nhẹ qua những chiếc trạm sạc xanh trong chuyến hành trình thú vị này nha: \\n- TRẠM KHỞI HÀNH: Khởi động nhẹ nhàng bằng cách tận hưởng phút giây mua sắm của mình, có trong tay hoá đơn mua hàng từ 300k tại TTBHTH & ST AEON xong nhà mình tiến ngay đến trạm kế tiếp. \\n- TRẠM TÁI CHẾ XANH: Tại đây, bạn sẽ được trải nghiệm hoạt động ý nghĩa - cùng nhau “thay áo mới”, sáng tạo nên diện mạo mới và mang đến nhiều công dụng mới cho những chiếc thùng giấy/carton cũ. \\n- TRẠM NHẬN QUÀ LÀNH: Khi hoàn thành xong nhiệm vụ ở trạm 2 là bạn có thể mang về thành quả xinh xắn mà còn rất “xanh\\\" để khoe với người thân và cùng lan tỏa thông điệp tích cực về bảo vệ môi trường rồi đó!\\nHành trình sẽ bắt đầu từ ngày 27/05 - 05/06 tại các trung tâm thương mại LOTTE MALL TÂY HỒ.\\nHoạt động tích cực lại mang về thành phẩm đáng yêu như này thì phải rủ ngay gia đình cùng tham gia để so tài khéo tay nha. \\n- Quan trọng là khi tham gia chuyến xe “xanh” này là cả nhà đã đã góp phần “chữa lành” trái đất rồi đó. Hãy cùng AEON tái chế xanh vì một tương lai thật xanh bạn nhé! \\n- Và đừng quên,  AEON vẫn còn siêu nhiều hoạt động \\\"xanh\\\" khác cũng hấp dẫn không kém đang đợi bạn đến tham gia. Hẹn gặp nhà mình ở LOTTE MALL nha!\\n\"}'),(9,'event9',1,'2023-06-30 10:12:21','2023-07-31 10:12:21','1','2023-05-31 10:12:21','{\"en\": \"FRIDAY SALE PARTY, WELCOME THE TOP DEAL\\n\", \"vi\": \"THỨ 6 TIỆC SALE, ĐÓN TRỌN DEAL ĐỈNH​\"}','{\"en\": \"FRIDAY SALE PARTY, WELCOME THE TOP DEAL\\nThe heat of summer is nothing compared to the hot deals from brands at AEON MALL Ha Dong right now.​\\nA lot of products are being sold up to 50% to welcome the summer, rest assured to shop without worrying about wallet pain\\n- Fashionable, dynamic with FASHION ACCESSORIES products\\n- Break the world of Culinary with great deals\\n- Renovate your home with modern home appliances\\nCome to LOTTE MALL TAY HOUSE to get the full deal!\", \"vi\": \"THỨ 6 TIỆC SALE, ĐÓN TRỌN DEAL ĐỈNH​\\nSức nóng của mùa hè cũng không là gì so với những \\\"deal\\\" cực nóng đến từ các thương hiệu tại AEON MALL Hà Đông ngay lúc này.​\\nRất nhiều sản phẩm đang được sale up to 50% để chào hè sang cực đã, yên tâm mua sắm mà không lo đau ví​\\n- Thời thượng, năng động với các sản phẩm THỜI TRANG PHỤ KIỆN​\\n- Phá đảo thế giới ẨM THỰC cùng các deal hời\\n- Tân trang nhà cửa cùng các thiết bị đồ gia dụng hiện đại \\nĐến ngay LOTTE MALL TÂY HỒ để rinh trọn deal hời bạn nhé !\"}');
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-09 14:20:15
