-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: careerguidance
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`email`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'careerelevate2025@gmail.com','$2b$10$rxXWgjk.XEY/EtgIND4gC.5NU1aeO88lQkYCP/tXCo1F9ezSHWBry');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `career_domain` varchar(100) NOT NULL,
  `preferred_date` date NOT NULL,
  `preferred_time` varchar(10) DEFAULT NULL,
  `mode_of_consultation` enum('Online','Offline') NOT NULL,
  `additional_message` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (1,'Aradhya Kulkarni','aradhyakulkarni2005@gmail.com','8668586135','IT Career Mentoring','2025-03-18','01:30 PM','Online',NULL,'2025-03-16 05:50:59'),(2,'Nilesh Kulkarni','nileshkulkarni398@gmail.com','9823055616','HSC Mentoring','2025-03-18','11:30 AM','Offline',NULL,'2025-03-16 08:14:07'),(3,'Aradhya  Kulkarni','aradhyakulkarni2005@gmail.com','8668586135','HSC Mentoring','2025-03-20','10:30 AM','Offline',NULL,'2025-03-16 09:07:38'),(4,'Aradhya Kulkarni','aradhyakulkarni2005@gmail.com','8668586135','Arts & Humanities','2025-03-16','08:30 PM','Online',NULL,'2025-03-16 14:42:15'),(5,'Aradhya Kulkarni','aradhyakulkarni2005@gmail.com','8668586135','Government & Public Sector','2025-03-16','09:00 PM','Online',NULL,'2025-03-16 15:39:35'),(10,'Vinita Kulkarni','vinitakulkarni111@gmail.com','9923850306','Arts & Humanities','2025-04-01','10:30 AM','Online','No','2025-03-29 07:06:55'),(11,'Aradhya Nilesh Kulkarni','aradhyakulkarni2005@gmail.com','8668586135','Law & Legal Services','2025-03-26','12:00 PM','Online','No message','2025-03-30 03:26:34');
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `opportunities`
--

DROP TABLE IF EXISTS `opportunities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opportunities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `category` enum('Career Opportunity','Job Opportunity','Internship Opportunity') NOT NULL,
  `company` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `apply_link` varchar(500) DEFAULT NULL,
  `description` text NOT NULL,
  `posted_by` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `posted_by` (`posted_by`),
  CONSTRAINT `opportunities_ibfk_1` FOREIGN KEY (`posted_by`) REFERENCES `admin` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opportunities`
--

LOCK TABLES `opportunities` WRITE;
/*!40000 ALTER TABLE `opportunities` DISABLE KEYS */;
/*!40000 ALTER TABLE `opportunities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `education_level` varchar(100) DEFAULT NULL,
  `interests` text,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Aradhya Nilesh Kulkarni','aradhyakulkarni2005@gmail.com','8668586135','Bachelor\'s Degree','no interests','$2b$10$ds4pBaOIuNDadQxLxJBKMOWKzG4wfudSTIhytJ3D8UkWCx76q/B9i','2025-03-16 05:50:14'),(2,'Nilesh Kulkarni','nileshkulkarni398@gmail.com',NULL,NULL,NULL,'$2b$10$0HOCuTAXuAGulhKn0LOxX.LTZ6v046hS7EAwxMtDKSuc7G6gjpjNW','2025-03-16 06:58:13'),(4,'Uday Nagar','nagarsuresh170@gmail.com',NULL,NULL,NULL,'$2b$10$kmJFZcYQdjaPYT8CZAl25eyV0rFaVmVQWxtlKWv9BDCWjaxHL1soK','2025-03-24 16:50:33'),(5,'Vinita Kulkarni','vinitakulkarni111@gmail.com',NULL,NULL,NULL,'$2b$10$cQuBQT5bmRYPLTsY5i40m.XhPL4tNKFtubOh14nAoMLcyM2nY3aqq','2025-03-29 07:05:48');
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

-- Dump completed on 2025-03-31 11:33:06
