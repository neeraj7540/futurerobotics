-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 20, 2020 at 02:04 PM
-- Server version: 5.7.31-0ubuntu0.18.04.1
-- PHP Version: 7.2.29-1+ubuntu18.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `futurerobotics`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `email` varchar(80) NOT NULL,
  `password` varchar(140) NOT NULL,
  `role` enum('0','1') NOT NULL,
  `image` varchar(140) NOT NULL,
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `password`, `role`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', 'admin@admin.com', '$2b$10$mHvqyi2kekNgWo9AfaSSU.jAMw6unLcpWeROWfR5YoRKGY7.xRf3e', '1', 'public/images/users/image-1593085294.png', 1554293842, 1554293842);

-- --------------------------------------------------------

--
-- Table structure for table `ads`
--

CREATE TABLE `ads` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `image` varchar(140) NOT NULL,
  `url` text NOT NULL,
  `status` enum('1','0') NOT NULL,
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ads`
--

INSERT INTO `ads` (`id`, `title`, `image`, `url`, `status`, `createdAt`, `updatedAt`) VALUES
(5, 'run add for google', 'http://34.232.2.249:4100/public/images/users/image-1599568174.jpg', 'https://mail.google.com/', '0', 1591629057, 1601910904),
(6, 'KIA ', 'http://34.232.2.249:4100/public/images/users/image-1599477806.png', 'https://www.kia.com/in/home.html', '1', 1591629057, 1601910904),
(7, 'Ads for instagram', 'http://34.232.2.249:4100/public/images/users/image-1599568052.png', 'https://www.instagram.com/', '0', 1591629057, 1601910904),
(17, 'Artificial intelligence', 'http://34.232.2.249:4100/public/images/users/image-1601380362.jpg', 'https://en.wikipedia.org/wiki/Artificial_intelligence', '0', 1601104193, 1601910904),
(18, 'test ad', 'http://34.232.2.249:4100/public/images/users/image-1601459422.jpg', 'www.facebook', '0', 1601450652, 1601910904),
(19, 'Kia 1', 'http://34.232.2.249:4100/public/images/users/image-1601464514.png', 'https://www.kia.com/in/home.html', '0', 1601450652, 1601910904),
(20, 'THIS IS TEST', 'http://34.232.2.249:4100/public/images/users/image-1602132764.jpg', 'www.google.com', '0', 1601910904, 1601910904),
(21, 'ssss', 'http://34.232.2.249:4100/public/images/users/image-1602132853.jpg', 'google.com', '0', 1601910904, 1601910904),
(22, 'sdfsdf', 'http://34.232.2.249:4100/public/images/users/image-1602132906.jpg', 'google.com', '0', 1601910904, 1601910904),
(23, 'Testing', 'http://34.232.2.249:4100/public/images/users/image-1602677838.jpg', 'google.com', '0', 1602601975, 1602601975),
(24, 'Test', 'http://34.232.2.249:4100/public/images/users/image-1602678458.jpg', 'https://www.google.com/', '1', 1602601975, 1602601975),
(25, 'nbvbjc', 'http://34.232.2.249:4100/public/images/users/image-1602678521.jpg', 'https://sequelize.org/master/manual/model-querying-basics.html', '1', 1602601975, 1602679523),
(26, 'cxnm', 'http://34.232.2.249:4100/public/images/users/image-1602678542.jpg', 'http://sequelize.org/master/manual/model-querying-basics.html', '1', 1602601975, 1602601975),
(27, 'gjghhk', 'http://34.232.2.249:4100/public/images/users/image-1602680728.jpg', 'https://www.google.com/', '1', 1602679523, 1602679523),
(28, 'gchh', 'http://34.232.2.249:4100/public/images/users/image-1602680768.jpg', 'https://mail.google.com/', '1', 1602679523, 1602679523);

-- --------------------------------------------------------

--
-- Table structure for table `appusers`
--

CREATE TABLE `appusers` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `dob` varchar(150) NOT NULL,
  `age` varchar(150) NOT NULL,
  `password` varchar(140) NOT NULL,
  `image` varchar(150) NOT NULL,
  `country` varchar(60) NOT NULL,
  `about` text NOT NULL,
  `work` text NOT NULL,
  `additional` text NOT NULL,
  `location` varchar(60) NOT NULL,
  `status` tinyint(11) NOT NULL,
  `deviceType` enum('0','1') NOT NULL,
  `deviceToken` varchar(1000) NOT NULL,
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL,
  `experience` text NOT NULL,
  `hireAvailable` tinyint(1) NOT NULL,
  `occupation` text NOT NULL,
  `company` text NOT NULL,
  `lat` varchar(150) NOT NULL,
  `long` varchar(150) NOT NULL,
  `resetLink` varchar(600) NOT NULL,
  `select_robots` varchar(1000) NOT NULL,
  `select_plc` varchar(1000) NOT NULL,
  `about_me` varchar(1000) NOT NULL,
  `social_type` varchar(600) NOT NULL,
  `social_id` varchar(600) NOT NULL,
  `otp` varchar(60) NOT NULL,
  `emailStatus` varchar(60) NOT NULL,
  `facebook_url` varchar(100) NOT NULL,
  `instagram_url` varchar(100) NOT NULL,
  `linkedin_url` varchar(100) NOT NULL,
  `joined_date` varchar(100) NOT NULL,
  `phone` varchar(200) NOT NULL,
  `email_check` varchar(20) NOT NULL,
  `biodesc` varchar(100) NOT NULL,
  `like` int(11) NOT NULL,
  `deslike` int(11) NOT NULL,
  `ranking_name` varchar(1000) NOT NULL,
  `ranking` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `appusers`
--

INSERT INTO `appusers` (`id`, `name`, `email`, `dob`, `age`, `password`, `image`, `country`, `about`, `work`, `additional`, `location`, `status`, `deviceType`, `deviceToken`, `createdAt`, `updatedAt`, `experience`, `hireAvailable`, `occupation`, `company`, `lat`, `long`, `resetLink`, `select_robots`, `select_plc`, `about_me`, `social_type`, `social_id`, `otp`, `emailStatus`, `facebook_url`, `instagram_url`, `linkedin_url`, `joined_date`, `phone`, `email_check`, `biodesc`, `like`, `deslike`, `ranking_name`, `ranking`) VALUES
(1, 'kanika', 'yadavneerajsonu97@gmail.com', '', '23', '$2b$10$o2x1OG0.tQ9hLLR5IY7mSezV0IoyIISmoaNO.KNlDY6NcS/ZkQ5gm', 'http://34.232.2.249:4100/public/images/users/image-1602505554.jpg', 'India', '', '', '', 'ambla', 1, '1', 'diUIjc8VTQmofd2oJgLWtt:APA91bGV4q64JHX_-XHzP-SEN60b4ry92H8W5_isI_zJO6kSfkJuZJLcPUPFDMFRA76nRv7jZpc0s15jB3CoOjERR2IKaFlUbFdQsY5AkkmR0ZRzL01COTpNNGPUWO0bhua9hLR8FrCR', 1601357358, 1602501523, '2', 1, 'Software Engineer', 'ABCD', '', '', '', '', '46,47', 'Mu self Neeraj from ambla', '', '', '5098', 'Y', '', '', '', '1601357358', '', '', 'new desc', 1, 0, 'New User', 0),
(2, 'kanika', 'sharma.kanika1469@gmail.com', '19-8-2014', '6', '$2b$10$AStiqz9V33kesFYkxMdBCOOS3tWG.JtFlzzp6HKF.zy/w/IohhR9.', 'http://34.232.2.249:4100/public/images/users/image-1601371481.jpeg', 'India', '', '', '', 'yamuna nagar', 1, '0', 'cabZoL3SSG-S8Lc58qUZax:APA91bEt1K6omr7d1ukNt_eOaV9-RW_Fon79aQYr4V_c1Xh-fUvhn68Hru43t07oUf8F4b0rAb9E-Hh9ny0_vTJVhIAgoUkP-pBIpZ3WnGiWy0bO2lkKBdHKqSUcrlhaSlFCpOxCXiZW', 1601357358, 1602501523, '2', 1, 'engineer', 'cqlsys', '', '', '', '38, 39', '50, 46, 47', 'detail description\n', '', '', '5036', 'Y', '', '', '', '1601357358', '', '', '', 6, 7, 'Regular User', 2),
(6, 'mike', 'mike@data.com', '', '5', '$2b$10$e3gw.lKhFwicScKPuHADgu45Z6U5qLZEOpN77fJ0p40VbRpZwp24i', '', 'Belarus', '', '', '', 'delhi', 1, '0', '', 1601365548, 1601365548, '', 0, '', '', '', '', '', '', '', '', '', '', '5093', '', '', '', '', '1601365548', '', '', '', 0, 0, '', 0),
(7, 'AshwAni DhinDsa', 'ashwani.dhindsa@gmail.com', '', '', '', 'https://lh3.googleusercontent.com/a-/AOh14Gh87j-Hf2wd8YoLRb4aJHMS3zM0Tf7u9OVLQwBUwQ=s96-c', '', '', '', '', '', 1, '', 'f0O-5azlQ9CSU-W4XMcM6M:APA91bGN-L9TN4soItCpwZYZXSSYT7sasrIYoMClVQR6AvBYLoMdw7Fwx9OPL4fctjqJvmbUe7GAPgmKiwDZaI7RF284jjhxHi0BFtfO3PzLts1oqTxnqvrrt29VxSA1qiW4-d6Ez8_U', 1601365548, 1601365548, '', 0, '', '', '', '', '', '', '', '', 'gmail', 'V2GSr7TEqNQ8F8s0FMIW4iZuqAP2', '', '', '', '', '', '1601365548', '', '', '', 0, 0, 'New User', 0),
(8, 'Ashwani Dhindsa', 'ashwanid.cql@gmail.com', '16-1-1994', '26', '', 'https://lh3.googleusercontent.com/a-/AOh14GiWkwdUFbb8j74N2wYvvAmuljsVgqdgUNa02lSt=s96-c', 'India', '', '', '', 'Haryana', 1, '', 'dDjbT5j6QCqIXmoR31_S6f:APA91bFn4RrVeg71-ESMeNdG6IOd37Pw116NWlM2ErKn-duqbDzG8AbuSbUlL_h1XImC4i8FlteFEGAyaby7le8ZPAsruPYH1w6jHRuiq3YXjSiJtf9w9Z9hQrdDhQwVC6LbJH0QB70-', 1601365548, 1602601975, '3+', 1, 'Project Manager', 'CQLSYS', '', '', '', '', '', 'Hi There!\nI\'m waiting for your time and consideration 💞 We are your thoughts here is the best thing to do it on the same get a chance to meet you at the moment I am a IT companies minimise the impact that the latest apk file for my son has to do tomorrow and will not available Today mam please find the attached file', 'gmail', 'MhMKfwRIMAYUR7XNZwAkyZ9IJmp2', '', '', '', '', '', '1601365548', '', '', 'IT Project Manager', 8, 1, 'Regular User', 7),
(12, 'kanika', 'sharma481kanu@gmail.com', '14-9-2016', '3', '', 'http://34.232.2.249:4100/public/images/users/image-1602842786.jpg', 'India', '', '', '', 'ynr', 1, '', 'dF0XZExhSvSxzqghaGpm2u:APA91bHZKeqJEPkbLVEwHObnADgW3ktDOr7--i1L8ALcg6ZGZLvImOVGTyjs1MyfraveWbq5GCFur2SowpYFdprDN_ZWaSKXPY4F4n1hu0luzX8rTRSYikOGr1qcXENVq1jfEg0-89-X', 1601464811, 1602844020, '2', 1, 'Software Engineer', 'ABCD', '', '', '', '', '46,47,48,49,52,51', '', 'gmail', 'vnuuIG9mOnZFZirzqo0JWpMp9O83', '', '', '', '', '', '1601464811', '', '', 'new desc', 10, 2, 'Regular User', 9),
(20, 'Ram Kumar', 'yadavneerajsonu1997@gmail.com', '1-9-1986', '34', '$2b$10$0cfyt32eDJfA4Etpb4scp.4Dd9ZAq20dIbBkmx1uEdYq0GH9nRa1m', '', 'Albania', '', '', '', 'ambla', 1, '0', 'diUIjc8VTQmofd2oJgLWtt:APA91bGV4q64JHX_-XHzP-SEN60b4ry92H8W5_isI_zJO6kSfkJuZJLcPUPFDMFRA76nRv7jZpc0s15jB3CoOjERR2IKaFlUbFdQsY5AkkmR0ZRzL01COTpNNGPUWO0bhua9hLR8FrCR', 1601540813, 1601643997, '', 0, '', '', '', '', '', '', '', '', '', '', '5095', 'Y', '', '', '', '1601540813', '', '', '', 0, 0, 'Regular User', 1),
(25, 'dhawan jatin', 'dhawanjatin199@gmail.com', 'Tue Sep 29 2020 00:00:00 GMT+0530 (India Standard Time)', '', '$2b$10$yDgqa0ornmbZWF64y/M.JuzTlzdKdOsT6Sgc0Hy3xJxEzk5RDeTja', 'http://34.232.2.249:4100/public/images/users/image-1601651221.jpg', 'Uruguay', 'aa', 'd', 'j', 'ss', 1, '0', '', 1601643997, 1603082597, 'h', 1, 'g', 'g', '', '', '', '', '48,50', '', '', '', '', 'Y', '', '', '', '1601643997', '', '', '', -2, -2, 'Regular User', 4),
(27, 'adam grzyb', 'ownagebyh4x@gmail.com', '26-8-2012', '8', '', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'Switzerland', '', '', '', 'zurich', 1, '', 'fXzJr0ieSImPxqGF3lxudc:APA91bFLwS58LWtywcrRVsZ3rtfqoL7AMpRpMg6QxeoYRbHnonvZdGsbeQLZXfv_8ZHOKIpIqLKWNi65uVusQfLss2TTqNAa09-rHf_aOQohAutY_pjP1WaxQMczufcLA6gw4sLMDiEr', 1601910904, 1603184673, '', 0, '', '', '', '', '', '', '', 'test field', 'gmail', 'TFomoISlvXQ98his6lbUHyVNEmj1', '', '', 'www.onet.pl', '', '', '1601910904', '', '', '', 0, 0, 'Regular User', 3),
(30, 'Jatin Dhawan', 'jatindhawan02@gmail.com', '', '', '', 'https://lh3.googleusercontent.com/a-/AOh14GiqUscrjQPxzumge_dCiZ0oLrfSStrXRJmBAvIS-A=s96-c', '', '', '', '', '', 1, '', 'fYcvlz9YQ3SMi9uDw6I6LE:APA91bE1odQbyNtN1_ssiX4pgRDM3c80MK77_rxLz3pL3v3zMVkz0Bzqp3BZnqcyr8-dGHrBi2RiavHjOJ9dy1rFVSzhKHH9yrXs6aDumGS4WK6v0OV7f3nlZNDW39y1UD9vS3iQfDdl', 1602679523, 1603184673, '', 0, '', '', '', '', '', '', '', '', 'gmail', 'DGImA5kAbYZFkMOgegj7hjlKjyM2', '', '', '', '', '', '1602679523', '', '', '', -2, -2, 'Regular User', 1),
(32, '', 'jj@jj.jj', '', '', '$2b$10$1nW1gjyv7UmjWpNcsryeFO.aZCUTwOp7GH9GqaT8OXwYnnz4f1NAu', '', '', '', '', '', '', 1, '0', '', 1602679523, 1602679523, '', 0, '', '', '', '', '', '', '', '', '', '', '5072', '', '', '', '', '1602679523', '', '', '', 0, 0, '', 0),
(33, 'Pawan kumat', 'pawan.bhumca15@gmail.com', '', '27', '$2b$10$xtQlUZyRdL/9inBI0hcxSefdMqLVOeZpcaoDypHliGiQ/FhKRiL/q', '', 'India', '', '', '', 'Chandigarh', 1, '0', 'crH0OPKVSm-vA5NDe4PGKF:APA91bH9C_ZqrzXq2M9v7E-a8L0NlRiLrxPKR-KnJJPRowDIjtI1Z_QJA6RJWcRd1UPF5MQWgIwtwAsYwYuqYJOfaLBFt7gmgdqtI1ZZ0iLew6xdIeIC-zBzHUXGSiU-tTo3nkaelV--', 1602831650, 1603199929, '', 0, '', '', '', '', '', '', '', '', '', '', '5081', 'Y', '', '', '', '1602831650', '', '', '', 0, 0, 'New User', 0),
(34, 'Kanika mam', 'sharmaskanika184@gmail.com', '', '14', '$2b$10$M5M1Tv6X6dtWb.5B7hvNJOczAzrHy0xx5cKvQS8WBg4t4ErrJNU3G', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'India', '', '', '', 'ynr', 1, '0', 'cL7qbM6qQfeFbAotavbSic:APA91bEOpYGuUlb8jkaBEe_tsr0RNOemoyEIDz1vpqqG3lUuXq1Cx8sNlP-jF9T5iwDsh1BnivyeF0kbUDf7OxEDg8p7JUoW0nF2natsspji92O3Zmo6uQJqMVRCmfkCKABH0htOcTm6', 1602850127, 1603199929, 'test exp', 1, 'eng', 'pawan', '', '', '', '40,41,42,43,44,45,38', '46,47,48,49,51,52', 'here some description', '', '', '5034', 'Y', '', '', '', '1602850127', '', '', 'ethrth', 0, 0, 'New User', 0),
(35, 'jatin 2000', 'jatindhawan2000@gmail.com', '', '2', '$2b$10$bHJJRMOortJqdAAQzQzDMejep2WTBl0D/3qGpsad5by0QUPvVG5K.', '', 'Armenia', '', '', '', 'ss', 1, '0', 'fYcvlz9YQ3SMi9uDw6I6LE:APA91bE1odQbyNtN1_ssiX4pgRDM3c80MK77_rxLz3pL3v3zMVkz0Bzqp3BZnqcyr8-dGHrBi2RiavHjOJ9dy1rFVSzhKHH9yrXs6aDumGS4WK6v0OV7f3nlZNDW39y1UD9vS3iQfDdl', 1603085990, 1603085990, '', 0, '', '', '', '', '', '', '', '', '', '', '5010', 'Y', '', '', '', '1603085990', '', '', '', 0, 0, 'New User', 0),
(36, 'Pawel', 'testfrapp@gmail.com', '', '4', '$2b$10$EGuYCu/uPaUzsEmhD.UPd.CpX.s2cg2vkp5DGADW1O3rz9NP.OXqu', '', 'Poland', '', '', '', 'Test', 1, '0', '', 1603113948, 1603113948, '', 0, '', '', '', '', '', '', '', '', '', '', '5084', '', '', '', '', '1603113948', '', '', '', 0, 0, '', 0),
(37, 'Pawel Adam', 'testmyfrapp@gmail.com', '', '', '', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', '', '', '', '', '', 1, '', 'c3ytf5d3SOWDH3B3VHR6SM:APA91bF_s6U_zs5x5mk5McDjPSNTOgGJjtlKqpkmCXlbgdBWIUt6k7UvQBR3kSYAp6cFK9ykFWZp7DUtpvrfp76fL9wuBVnWH1zMDuJAVF6lqcp81HlWXLmJCLOr662U49lTIzhtTbm3', 1603113948, 1603170109, '', 0, '', '', '', '', '', '', '', '', 'gmail', 'NdzcSokpuINbyDKhkgiUxDhYugC3', '', '', '', '', '', '1603113948', '', '', '', 0, 0, 'New User', 0);

-- --------------------------------------------------------

--
-- Table structure for table `blocked_user`
--

CREATE TABLE `blocked_user` (
  `userid` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `userby` int(11) NOT NULL,
  `userto` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `userid` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `user2id` int(11) NOT NULL,
  `constantid` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `msg_type` int(11) NOT NULL,
  `deleted_id` int(11) NOT NULL,
  `read_status` int(11) NOT NULL,
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `chat_block`
--

CREATE TABLE `chat_block` (
  `id` int(11) NOT NULL,
  `userBy` int(11) NOT NULL,
  `userTo` int(11) NOT NULL,
  `comment` text NOT NULL,
  `status` int(11) NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `chat_constants`
--

CREATE TABLE `chat_constants` (
  `id` int(11) NOT NULL,
  `senderId` int(11) NOT NULL,
  `receiverId` int(11) NOT NULL,
  `lastMessageId` int(11) NOT NULL,
  `senderUnreadCount` int(11) DEFAULT '0',
  `receiverUnreadCount` int(11) NOT NULL DEFAULT '0',
  `deletedId` int(11) NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chat_constants`
--

INSERT INTO `chat_constants` (`id`, `senderId`, `receiverId`, `lastMessageId`, `senderUnreadCount`, `receiverUnreadCount`, `deletedId`, `created`, `updated`) VALUES
(46, 34, 0, 204, 0, 0, 0, 1603196178, 1603196178),
(47, 33, 0, 203, 0, 0, 0, 1603196216, 1603196216);

-- --------------------------------------------------------

--
-- Table structure for table `comment_likedeslike`
--

CREATE TABLE `comment_likedeslike` (
  `id` int(11) NOT NULL,
  `commentId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `likeDeslike` enum('1','0') NOT NULL,
  `status` enum('0','1') NOT NULL,
  `like_count` int(11) NOT NULL,
  `deslike_count` int(11) NOT NULL,
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `constant`
--

CREATE TABLE `constant` (
  `userid` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `user2id` int(11) NOT NULL,
  `last_msg_id` int(11) NOT NULL,
  `typing` int(11) NOT NULL,
  `deleted_id` int(11) NOT NULL,
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `crmpages`
--

CREATE TABLE `crmpages` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `status` tinyint(11) NOT NULL,
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `crmpages`
--

INSERT INTO `crmpages` (`id`, `title`, `content`, `status`, `createdAt`, `updatedAt`) VALUES
(6, 'About us ', '<p><span style=\"color:#FF0000\">This will be about us content&nbsp;</span></p>\n', 1, 1591333154, 1591629057),
(7, 'Privacy Policy ', '<p>This will be&nbsp;privacy policy&nbsp; conetent&nbsp;</p>\n', 1, 1591629057, 1591629057),
(8, 'Terms and condition content ', '<p><em><strong>This will be terms and condition content&nbsp;</strong></em></p>\n', 1, 1591629057, 1591629057);

-- --------------------------------------------------------

--
-- Table structure for table `feed`
--

CREATE TABLE `feed` (
  `id` int(11) NOT NULL,
  `feedCatId` int(11) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(140) NOT NULL,
  `userId` int(11) NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL,
  `Date` varchar(200) NOT NULL,
  `title` text NOT NULL,
  `like` int(11) NOT NULL,
  `deslike` int(11) NOT NULL,
  `comment_count` int(11) NOT NULL,
  `feed_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `feedcomment`
--

CREATE TABLE `feedcomment` (
  `id` int(11) NOT NULL,
  `commentId` int(11) NOT NULL,
  `feedId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `comment` text NOT NULL,
  `comment_image` varchar(1000) NOT NULL,
  `like` int(11) NOT NULL,
  `deslike` int(11) NOT NULL,
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL,
  `status` enum('1','0') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `feedlikedeslike`
--

CREATE TABLE `feedlikedeslike` (
  `id` int(11) NOT NULL,
  `feedId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `likeDeslike` enum('1','0') NOT NULL COMMENT '0=>disliked\r\n1=>liked',
  `status` enum('0','1') NOT NULL,
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL,
  `like_count` int(11) NOT NULL,
  `deslike_count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `feedscategory`
--

CREATE TABLE `feedscategory` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `description` text NOT NULL,
  `status` tinyint(11) NOT NULL,
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feedscategory`
--

INSERT INTO `feedscategory` (`id`, `name`, `description`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Technology', 'Technology is the sum of techniques, skills, methods, and processes used in the production of goods or services or in the accomplishment of objectives, such as scientific investigation', 1, 1599022908, 1601540813),
(2, 'Artificial Intelligence', 'Artificial intelligence was founded as an academic discipline in 1955, and in the years since has experienced several waves of optimism.', 1, 1599022908, 1601540813),
(3, 'Global information', 'There are a variety of definitions and understandings of a global information system, such as A global information system is an information system which is developed and / or used in a global context', 1, 1599022908, 1601540813);

-- --------------------------------------------------------

--
-- Table structure for table `general`
--

CREATE TABLE `general` (
  `id` int(11) NOT NULL,
  `general_id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `image` varchar(140) NOT NULL,
  `count` int(11) NOT NULL,
  `isSelected` varchar(60) NOT NULL,
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `general`
--

INSERT INTO `general` (`id`, `general_id`, `name`, `image`, `count`, `isSelected`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'ALGEBRA KINEMATICS', 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max', 1, 'Y', 1554293842, 1554293842),
(1, 2, 'AUTOMOTIVE NEWS', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSn61g3r19DQk7iX6wrdsn0lsWs50xB12tF8A&usqp=CAU', 1, 'Y', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `groupaccess`
--

CREATE TABLE `groupaccess` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `groupId` int(11) NOT NULL,
  `status` tinyint(11) NOT NULL,
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `category` varchar(60) NOT NULL,
  `image` varchar(140) NOT NULL,
  `description` text NOT NULL,
  `status` enum('0','1') NOT NULL,
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `isChecked` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`, `category`, `image`, `description`, `status`, `createdAt`, `updatedAt`, `count`, `isChecked`) VALUES
(34, 'GENERAL DISCUSSION', 'GENERAL', 'http://34.232.2.249:4100/public/images/users/image-1601976332.png', 'General Discussion Group', '1', 1601910904, 1603199929, 0, 0),
(35, 'ALGEBRA AND KINEMATICS', 'GENERAL', 'http://34.232.2.249:4100/public/images/users/image-1601976376.png', 'ALGEBRA AND KINEMATICS', '1', 1601910904, 1603199929, 0, 0),
(36, 'NEWS IN AUTOMOTIVE', 'GENERAL', 'http://34.232.2.249:4100/public/images/users/image-1601976421.png', 'NEWS IN AUTOMOTIVE', '1', 1601910904, 1603199929, 0, 0),
(37, 'SUGGESTIONS', 'GENERAL', 'http://34.232.2.249:4100/public/images/users/image-1601976446.png', 'SUGGESTIONS', '1', 1601910904, 1603199929, 0, 0),
(38, 'FANUC ROBOTS', 'ROBOT', 'http://34.232.2.249:4100/public/images/users/image-1601976490.png', 'FANUC ROBOTS', '1', 1601910904, 1603113948, 0, 0),
(39, 'KUKA ROBOTS', 'ROBOT', 'http://34.232.2.249:4100/public/images/users/image-1601976515.png', 'KUKA ROBOTS', '1', 1601910904, 1603113948, 0, 0),
(40, 'ABB ROBOTS', 'ROBOT', 'http://34.232.2.249:4100/public/images/users/image-1601976723.png', 'ABB ROBOTS', '1', 1601910904, 1603113948, 0, 0),
(41, 'COMAU ROBOTS', 'ROBOT', 'http://34.232.2.249:4100/public/images/users/image-1601976972.png', 'COMAU ROBOTS', '1', 1601910904, 1603113948, 0, 0),
(42, 'KAWASAKI ROBOTS', 'ROBOT', 'http://34.232.2.249:4100/public/images/users/image-1601977002.png', 'KAWASAKI ROBOTS', '1', 1601910904, 1603113948, 0, 0),
(43, 'YASKAWA AND MOTOMAN', 'ROBOT', 'http://34.232.2.249:4100/public/images/users/image-1601977086.png', 'YASKAWA AND MOTOMAN', '1', 1601910904, 1603113948, 0, 0),
(44, 'OTHER ROBOTS', 'ROBOT', 'http://34.232.2.249:4100/public/images/users/image-1601977110.png', 'OTHER ROBOTS', '1', 1601910904, 1603113948, 0, 0),
(45, 'SIMULATION SOFTWARE', 'ROBOT', 'http://34.232.2.249:4100/public/images/users/image-1601977138.png', 'SIMULATION SOFTWARE', '1', 1601910904, 1603113948, 0, 0),
(46, 'SIEMENS', 'PLS5', 'http://34.232.2.249:4100/public/images/users/image-1601977234.png', 'SIEMENS', '1', 1601910904, 1603113948, 0, 0),
(47, 'ALLEN-BRADLEY', 'PLS5', 'http://34.232.2.249:4100/public/images/users/image-1601977276.png', 'ALLEN-BRADLEY', '1', 1601910904, 1603113948, 0, 0),
(48, 'MITSUBISHI', 'PLS5', 'http://34.232.2.249:4100/public/images/users/image-1601977300.png', 'MITSUBISHI', '1', 1601910904, 1603113948, 0, 0),
(49, 'OMRON', 'PLS5', 'http://34.232.2.249:4100/public/images/users/image-1601977317.png', 'OMRON', '1', 1601910904, 1603113948, 0, 0),
(50, 'GE', 'PLS5', 'http://34.232.2.249:4100/public/images/users/image-1601977337.png', 'GE GE', '1', 1601910904, 1603113948, 0, 0),
(51, 'OTHER PLC\'s', 'PLS5', 'http://34.232.2.249:4100/public/images/users/image-1601977369.png', 'OTHER PLC\'s', '1', 1601910904, 1603113948, 0, 0),
(52, 'SOFTWARE', 'PLS5', 'http://34.232.2.249:4100/public/images/users/image-1601977385.png', 'SOFTWARE', '1', 1601910904, 1603113948, 0, 0),
(53, 'test', 'GENERAL', 'http://34.232.2.249:4100/public/images/users/image-1602221765.jpg', 'assa', '1', 1601910904, 1603199929, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `group_messages`
--

CREATE TABLE `group_messages` (
  `id` int(11) NOT NULL,
  `senderId` int(11) NOT NULL,
  `receiverId` int(11) NOT NULL,
  `groupId` int(11) NOT NULL,
  `category` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `groupName` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `chatConstantId` int(11) NOT NULL DEFAULT '0',
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `readStatus` int(11) NOT NULL COMMENT '0:unread,1 read',
  `messageType` int(11) NOT NULL COMMENT '1:media msg,0 :default',
  `deletedId` int(11) DEFAULT '0',
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `group_messages`
--

INSERT INTO `group_messages` (`id`, `senderId`, `receiverId`, `groupId`, `category`, `groupName`, `chatConstantId`, `message`, `readStatus`, `messageType`, `deletedId`, `created`, `updated`) VALUES
(187, 33, 0, 34, 'GENERAL', 'GENERAL DISCUSSION', 47, 'sona', 1, 0, 0, 1603198814, 1603198814),
(188, 33, 0, 34, 'GENERAL', 'GENERAL DISCUSSION', 47, 'hchfcdgz', 1, 0, 0, 1603198839, 1603198839),
(189, 33, 0, 34, 'GENERAL', 'GENERAL DISCUSSION', 47, 'hhh', 1, 0, 0, 1603200167, 1603200167),
(190, 33, 0, 34, 'GENERAL', 'GENERAL DISCUSSION', 47, 'ctcfccfg', 1, 0, 0, 1603200176, 1603200176),
(191, 34, 0, 34, 'GENERAL', 'GENERAL DISCUSSION', 46, 'hi', 1, 0, 0, 1603200179, 1603200179),
(192, 34, 0, 34, 'GENERAL', 'GENERAL DISCUSSION', 46, 'hi', 1, 0, 0, 1603200193, 1603200193),
(193, 33, 0, 34, 'GENERAL', 'GENERAL DISCUSSION', 47, 'gggg', 1, 0, 0, 1603200202, 1603200202),
(194, 33, 0, 35, 'GENERAL', 'ALGEBRA AND KINEMATICS', 47, 'dd', 1, 0, 0, 1603200217, 1603200217),
(195, 34, 0, 35, 'GENERAL', 'ALGEBRA AND KINEMATICS', 46, 'hi sir', 1, 0, 0, 1603200226, 1603200226),
(196, 33, 0, 36, 'GENERAL', 'NEWS IN AUTOMOTIVE', 47, 'drxr', 1, 0, 0, 1603200237, 1603200237),
(197, 34, 0, 36, 'GENERAL', 'NEWS IN AUTOMOTIVE', 46, 'hi sir howz u', 1, 0, 0, 1603200248, 1603200248),
(198, 33, 0, 36, 'GENERAL', 'NEWS IN AUTOMOTIVE', 47, 'hi mam', 1, 0, 0, 1603200259, 1603200259),
(199, 34, 0, 36, 'GENERAL', 'NEWS IN AUTOMOTIVE', 46, 'hlw sir', 1, 0, 0, 1603200264, 1603200264),
(200, 33, 0, 37, 'GENERAL', 'SUGGESTIONS', 47, 'xrcfxtc', 1, 0, 0, 1603200273, 1603200273),
(201, 34, 0, 37, 'GENERAL', 'SUGGESTIONS', 46, 'hi sit', 1, 0, 0, 1603200284, 1603200284),
(202, 33, 0, 37, 'GENERAL', 'SUGGESTIONS', 47, 'ok ', 1, 0, 0, 1603200290, 1603200290),
(203, 33, 0, 53, 'GENERAL', 'test', 47, 'hi test', 1, 0, 0, 1603200303, 1603200303),
(204, 34, 0, 53, 'GENERAL', 'test', 46, 'hi', 0, 0, 0, 1603200309, 1603200309);

-- --------------------------------------------------------

--
-- Table structure for table `group_message_read`
--

CREATE TABLE `group_message_read` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `groupId` int(11) NOT NULL,
  `lastReadId` int(11) NOT NULL,
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `group_message_read`
--

INSERT INTO `group_message_read` (`id`, `userId`, `groupId`, `lastReadId`, `createdAt`, `updatedAt`) VALUES
(19, 33, 34, 188, 1603199929, 1603199929),
(20, 34, 34, 193, 1603199929, 1603199929),
(21, 33, 35, 0, 1603199929, 1603199929),
(22, 34, 35, 195, 1603199929, 1603199929),
(23, 34, 36, 199, 1603199929, 1603199929),
(24, 33, 36, 0, 1603199929, 1603199929),
(25, 33, 37, 0, 1603199929, 1603199929),
(26, 34, 37, 202, 1603199929, 1603199929),
(27, 33, 53, 0, 1603199929, 1603199929),
(28, 34, 53, 203, 1603199929, 1603199929);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `senderId` int(11) NOT NULL,
  `receiverId` int(11) NOT NULL,
  `chatConstantId` int(11) NOT NULL DEFAULT '0',
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `readStatus` int(11) NOT NULL COMMENT '0:unread,1 read',
  `messageType` int(11) NOT NULL COMMENT '1:media msg,0 :default',
  `deletedId` int(11) DEFAULT '0',
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `noti_id` int(11) NOT NULL,
  `notification` varchar(1000) NOT NULL,
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `notification_data`
--

CREATE TABLE `notification_data` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `senderName` varchar(1000) NOT NULL,
  `senderImage` varchar(1000) NOT NULL,
  `notification` varchar(1000) NOT NULL,
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1',
  `isRead` tinyint(4) NOT NULL COMMENT '0=>no 1=>yes'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notification_data`
--

INSERT INTO `notification_data` (`id`, `sender_id`, `receiver_id`, `senderName`, `senderImage`, `notification`, `createdAt`, `updatedAt`, `status`, `isRead`) VALUES
(1, 12, 33, 'kanika', 'http://34.232.2.249:4100/public/images/users/image-1602503543.jpg', 'has sent you a message', 1602831650, 1602831650, '1', 0),
(2, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602831650, 1602831650, '1', 0),
(3, 12, 33, 'kanika', 'http://34.232.2.249:4100/public/images/users/image-1602503543.jpg', 'has sent you a message', 1602831650, 1602831650, '1', 0),
(4, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602831650, 1602831650, '1', 0),
(5, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602831650, 1602831650, '1', 0),
(6, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602831650, 1602831650, '1', 0),
(7, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602831650, 1602831650, '1', 0),
(8, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602831650, 1602831650, '1', 0),
(9, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602831650, 1602831650, '1', 0),
(10, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602831650, 1602831650, '1', 0),
(11, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602831650, 1602831650, '1', 0),
(12, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602831650, 1602831650, '1', 0),
(13, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602831650, 1602831650, '1', 0),
(14, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602843718, 1602843718, '1', 0),
(15, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602843718, 1602843718, '1', 0),
(16, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602843718, 1602843718, '1', 0),
(17, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602843718, 1602843718, '1', 0),
(18, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602843895, 1602843895, '1', 0),
(19, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602844020, 1602844020, '1', 0),
(20, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602844020, 1602844020, '1', 0),
(21, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602844020, 1602844020, '1', 0),
(22, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602844020, 1602844020, '1', 0),
(23, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602844020, 1602844020, '1', 0),
(24, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602844020, 1602844020, '1', 0),
(25, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602844020, 1602844020, '1', 0),
(26, 12, 33, 'kanika', 'http://34.232.2.249:4100/public/images/users/image-1602842786.jpg', 'has sent you a message', 1602844020, 1602844020, '1', 0),
(27, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602844020, 1602844020, '1', 0),
(28, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602844020, 1602844020, '1', 0),
(29, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602844020, 1602844020, '1', 0),
(30, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602844020, 1602844020, '1', 0),
(31, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602844020, 1602844020, '1', 0),
(32, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602844020, 1602844020, '1', 1),
(33, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602844020, 1602844020, '1', 1),
(34, 33, 12, 'Pawan kumat', '', 'liked your post', 1602844020, 1602844020, '', 0),
(37, 33, 12, 'Pawan kumat', '', 'liked your post', 1602850127, 1602850127, '1', 0),
(38, 33, 10, 'Pawan kumat', '', 'liked your post', 1602850127, 1602850127, '1', 1),
(39, 34, 25, 'kanika sharma', '', 'has sent a message in the test', 1602850127, 1602850127, '1', 0),
(40, 34, 8, 'kanika sharma', '', 'has sent a message in the test', 1602850127, 1602850127, '1', 0),
(41, 34, 12, 'kanika sharma', '', 'has sent a message in the test', 1602850127, 1602850127, '1', 0),
(43, 34, 31, 'kanika sharma', '', 'has sent a message in the test', 1602850127, 1602850127, '1', 0),
(45, 34, 33, 'kanika sharma', '', 'has sent a message in the test', 1602850127, 1602850127, '1', 0),
(46, 34, 25, 'kanika sharma', '', 'has sent a message in the test', 1602850127, 1602850127, '1', 0),
(47, 34, 8, 'kanika sharma', '', 'has sent a message in the test', 1602850127, 1602850127, '1', 0),
(48, 34, 12, 'kanika sharma', '', 'has sent a message in the test', 1602850127, 1602850127, '1', 0),
(50, 34, 31, 'kanika sharma', '', 'has sent a message in the test', 1602850127, 1602850127, '1', 0),
(52, 34, 33, 'kanika sharma', '', 'has sent a message in the test', 1602850127, 1602850127, '1', 0),
(53, 34, 25, 'kanika sharma', '', 'has sent a message in the test', 1602850127, 1602850127, '1', 0),
(54, 34, 8, 'kanika sharma', '', 'has sent a message in the test', 1602850127, 1602850127, '1', 0),
(55, 34, 12, 'kanika sharma', '', 'has sent a message in the test', 1602850127, 1602850127, '1', 0),
(57, 34, 31, 'kanika sharma', '', 'has sent a message in the test', 1602850127, 1602850127, '1', 0),
(59, 34, 33, 'kanika sharma', '', 'has sent a message in the test', 1602850127, 1602850127, '1', 0),
(60, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602850127, 1602850127, '1', 0),
(61, 33, 12, 'Pawan kumat', '', 'has sent you a message', 1602850127, 1602850127, '1', 0),
(62, 12, 33, 'kanika', 'http://34.232.2.249:4100/public/images/users/image-1602842786.jpg', 'has sent you a message', 1602850127, 1602850127, '1', 0),
(63, 27, 8, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the FANUC ROBOTS', 1603015031, 1603015031, '1', 0),
(64, 27, 12, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the FANUC ROBOTS', 1603015031, 1603015031, '1', 0),
(65, 27, 25, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603015031, 1603082597, '1', 1),
(66, 27, 8, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603015031, 1603015031, '1', 0),
(67, 27, 12, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603015031, 1603015031, '1', 0),
(68, 27, 31, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603015031, 1603015031, '1', 0),
(70, 27, 33, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603015031, 1603015031, '1', 0),
(72, 27, 12, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603015031, 1603015031, '1', 0),
(73, 27, 8, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603015031, 1603015031, '1', 0),
(74, 27, 12, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'liked your post', 1603015031, 1603015031, '1', 0),
(75, 27, 12, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'commented on your post', 1603015031, 1603015031, '1', 0),
(76, 25, 8, 'dhawan jatin', 'http://34.232.2.249:4100/public/images/users/image-1601651221.jpg', 'has sent a message in the test', 1603082597, 1603082597, '1', 0),
(77, 25, 12, 'dhawan jatin', 'http://34.232.2.249:4100/public/images/users/image-1601651221.jpg', 'has sent a message in the test', 1603082597, 1603082597, '1', 0),
(79, 25, 31, 'dhawan jatin', 'http://34.232.2.249:4100/public/images/users/image-1601651221.jpg', 'has sent a message in the test', 1603082597, 1603082597, '1', 0),
(81, 25, 33, 'dhawan jatin', 'http://34.232.2.249:4100/public/images/users/image-1601651221.jpg', 'has sent a message in the test', 1603082597, 1603082597, '1', 0),
(83, 30, 25, 'Jatin Dhawan', 'https://lh3.googleusercontent.com/a-/AOh14GiqUscrjQPxzumge_dCiZ0oLrfSStrXRJmBAvIS-A=s96-c', 'liked your post', 1603082597, 1603082597, '1', 0),
(88, 30, 25, 'Jatin Dhawan', 'https://lh3.googleusercontent.com/a-/AOh14GiqUscrjQPxzumge_dCiZ0oLrfSStrXRJmBAvIS-A=s96-c', 'has sent you a message', 1603082597, 1603082597, '1', 0),
(89, 35, 30, 'jatin 2000', '', 'commented on your post', 1603085990, 1603085990, '1', 0),
(90, 34, 33, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent you a message', 1603085990, 1603085990, '1', 0),
(92, 34, 33, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent you a message', 1603085990, 1603085990, '1', 0),
(95, 33, 34, 'Pawan kumat', '', 'has sent you a message', 1603085990, 1603085990, '1', 1),
(96, 33, 34, 'Pawan kumat', '', 'has sent you a message', 1603085990, 1603085990, '1', 1),
(97, 34, 33, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent you a message', 1603085990, 1603085990, '1', 0),
(98, 33, 34, 'Pawan kumat', '', 'has sent you a message', 1603085990, 1603085990, '1', 1),
(99, 33, 34, 'Pawan kumat', '', 'has sent you a message', 1603085990, 1603085990, '1', 1),
(100, 33, 34, 'Pawan kumat', '', 'has sent you a message', 1603085990, 1603085990, '1', 1),
(101, 33, 34, 'Pawan kumat', '', 'has sent you a message', 1603085990, 1603085990, '1', 1),
(102, 34, 33, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent you a message', 1603085990, 1603085990, '1', 0),
(103, 33, 34, 'Pawan kumat', '', 'has sent you a message', 1603085990, 1603085990, '1', 1),
(104, 34, 33, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent you a message', 1603085990, 1603085990, '1', 0),
(105, 33, 34, 'Pawan kumat', '', 'liked your post', 1603085990, 1603085990, '1', 0),
(106, 33, 34, 'Pawan kumat', '', 'commented on your post', 1603085990, 1603085990, '1', 0),
(107, 33, 34, 'Pawan kumat', '', 'liked your post', 1603102511, 1603102511, '1', 0),
(108, 33, 34, 'Pawan kumat', '', 'liked your post', 1603102511, 1603102511, '1', 0),
(109, 33, 34, 'Pawan kumat', '', 'commented on your post', 1603102511, 1603102511, '1', 0),
(110, 33, 34, 'Pawan kumat', '', 'commented on your post', 1603102511, 1603102511, '1', 0),
(111, 33, 34, 'Pawan kumat', '', 'commented on your post', 1603109226, 1603109226, '1', 0),
(112, 33, 34, 'Pawan kumat', '', 'commented on your post', 1603112296, 1603112296, '1', 0),
(113, 33, 34, 'Pawan kumat', '', 'commented on your post', 1603112296, 1603112296, '1', 0),
(114, 33, 34, 'Pawan kumat', '', 'commented on your post', 1603112670, 1603112670, '1', 0),
(115, 33, 34, 'Pawan kumat', '', 'commented on your post', 1603113948, 1603113948, '1', 0),
(116, 33, 34, 'Pawan kumat', '', 'commented on your post', 1603113948, 1603113948, '1', 0),
(117, 33, 34, 'Pawan kumat', '', 'commented on your post', 1603113948, 1603113948, '1', 0),
(118, 33, 34, 'Pawan kumat', '', 'commented on your post', 1603113948, 1603113948, '1', 0),
(119, 33, 34, 'Pawan kumat', '', 'commented on your post', 1603113948, 1603113948, '1', 0),
(125, 27, 25, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(126, 27, 8, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(127, 27, 12, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(128, 27, 30, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(129, 27, 33, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(130, 27, 34, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(132, 37, 25, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(133, 37, 8, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(134, 37, 12, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(136, 37, 30, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(137, 37, 33, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(138, 37, 34, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(140, 37, 25, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(141, 37, 8, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(142, 37, 12, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(144, 37, 30, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(145, 37, 33, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(146, 37, 34, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(147, 37, 34, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'commented on your post', 1603113948, 1603113948, '1', 0),
(152, 37, 25, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(153, 37, 8, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(154, 37, 12, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(156, 37, 30, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(157, 37, 33, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(158, 37, 34, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(159, 27, 12, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603113948, 1603113948, '1', 0),
(160, 27, 8, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603113948, 1603113948, '1', 0),
(161, 27, 34, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603113948, 1603113948, '1', 0),
(163, 27, 12, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the ALGEBRA AND KINEMATICS', 1603113948, 1603113948, '1', 0),
(164, 27, 34, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the ALGEBRA AND KINEMATICS', 1603113948, 1603113948, '1', 0),
(167, 27, 8, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the SUGGESTIONS', 1603113948, 1603113948, '1', 0),
(169, 27, 25, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(170, 27, 8, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(171, 27, 12, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(172, 27, 30, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(173, 27, 33, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(174, 27, 34, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(176, 27, 8, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the FANUC ROBOTS', 1603113948, 1603113948, '1', 0),
(177, 27, 12, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the FANUC ROBOTS', 1603113948, 1603113948, '1', 0),
(186, 27, 12, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603113948, 1603113948, '1', 0),
(187, 27, 8, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603113948, 1603113948, '1', 0),
(188, 27, 34, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603113948, 1603113948, '1', 0),
(190, 27, 12, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the ALGEBRA AND KINEMATICS', 1603113948, 1603113948, '1', 0),
(191, 27, 34, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the ALGEBRA AND KINEMATICS', 1603113948, 1603113948, '1', 0),
(194, 27, 8, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the SUGGESTIONS', 1603113948, 1603113948, '1', 0),
(196, 27, 25, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(197, 27, 8, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(198, 27, 12, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(199, 27, 30, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(200, 27, 33, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(201, 27, 34, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(203, 27, 12, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603113948, 1603113948, '1', 0),
(204, 27, 8, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603113948, 1603113948, '1', 0),
(205, 27, 34, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603113948, 1603113948, '1', 0),
(207, 27, 12, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the ALGEBRA AND KINEMATICS', 1603113948, 1603113948, '1', 0),
(208, 27, 34, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the ALGEBRA AND KINEMATICS', 1603113948, 1603113948, '1', 0),
(210, 27, 8, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the SUGGESTIONS', 1603113948, 1603113948, '1', 0),
(213, 27, 25, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(214, 27, 8, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(215, 27, 12, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(216, 27, 30, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(217, 27, 33, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(218, 27, 34, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(220, 27, 12, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603113948, 1603113948, '1', 0),
(221, 27, 8, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603113948, 1603113948, '1', 0),
(222, 27, 34, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603113948, 1603113948, '1', 0),
(224, 27, 12, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the ALGEBRA AND KINEMATICS', 1603113948, 1603113948, '1', 0),
(225, 27, 34, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the ALGEBRA AND KINEMATICS', 1603113948, 1603113948, '1', 0),
(228, 27, 8, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the SUGGESTIONS', 1603113948, 1603113948, '1', 0),
(230, 27, 25, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(231, 27, 8, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(232, 27, 12, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(233, 27, 30, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(234, 27, 33, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(235, 27, 34, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(237, 27, 12, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603113948, 1603113948, '1', 0),
(238, 27, 8, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603113948, 1603113948, '1', 0),
(239, 27, 34, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603113948, 1603113948, '1', 0),
(241, 27, 12, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the ALGEBRA AND KINEMATICS', 1603113948, 1603113948, '1', 0),
(242, 27, 34, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the ALGEBRA AND KINEMATICS', 1603113948, 1603113948, '1', 0),
(245, 27, 8, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the SUGGESTIONS', 1603113948, 1603113948, '1', 0),
(247, 27, 25, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(248, 27, 8, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(249, 27, 12, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(250, 27, 30, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(251, 27, 33, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(252, 27, 34, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(254, 27, 8, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the FANUC ROBOTS', 1603113948, 1603113948, '1', 0),
(255, 27, 12, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the FANUC ROBOTS', 1603113948, 1603113948, '1', 0),
(257, 27, 8, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the FANUC ROBOTS', 1603113948, 1603113948, '1', 0),
(258, 27, 12, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent a message in the FANUC ROBOTS', 1603113948, 1603113948, '1', 0),
(261, 37, 12, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603113948, 1603113948, '1', 0),
(262, 37, 8, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603113948, 1603113948, '1', 0),
(263, 37, 34, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603113948, 1603113948, '1', 0),
(265, 37, 8, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the SUGGESTIONS', 1603113948, 1603113948, '1', 0),
(266, 37, 25, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(267, 37, 8, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(268, 37, 12, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(270, 37, 30, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(271, 37, 33, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(272, 37, 34, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(274, 37, 12, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603113948, 1603113948, '1', 0),
(275, 37, 8, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603113948, 1603113948, '1', 0),
(276, 37, 34, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603113948, 1603113948, '1', 0),
(277, 37, 25, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(278, 37, 8, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(279, 37, 12, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(281, 37, 30, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(282, 37, 33, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(283, 37, 34, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'has sent a message in the test', 1603113948, 1603113948, '1', 0),
(284, 33, 34, 'Pawan kumat', '', 'has sent you a message', 1603113948, 1603113948, '1', 0),
(285, 33, 34, 'Pawan kumat', '', 'commented on your post', 1603113948, 1603113948, '1', 0),
(286, 33, 34, 'Pawan kumat', '', 'commented on your post', 1603113948, 1603113948, '1', 0),
(288, 33, 34, 'Pawan kumat', '', 'commented on your post', 1603113948, 1603113948, '1', 0),
(289, 27, 37, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent you a message', 1603113948, 1603113948, '1', 1),
(291, 27, 37, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'has sent you a message', 1603113948, 1603113948, '1', 1),
(294, 27, 34, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'commented on your post', 1603170109, 1603170109, '1', 0),
(296, 33, 34, 'Pawan kumat', '', 'commented on your post', 1603170109, 1603170109, '1', 0),
(297, 33, 34, 'Pawan kumat', '', 'commented on your post', 1603170109, 1603170109, '1', 0),
(298, 33, 34, 'Pawan kumat', '', 'commented on your post', 1603170109, 1603170109, '1', 0),
(299, 37, 37, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg', 'commented on your post', 1603170109, 1603170109, '1', 0),
(300, 27, 37, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg', 'commented on your post', 1603170109, 1603170109, '1', 0),
(301, 33, 34, 'Pawan kumat', '', 'commented on your post', 1603171877, 1603171877, '1', 0),
(302, 33, 34, 'Pawan kumat', '', 'commented on your post', 1603171877, 1603171877, '1', 0),
(303, 33, 34, 'Pawan kumat', '', 'commented on your post', 1603171877, 1603171877, '1', 0),
(304, 33, 34, 'Pawan kumat', '', 'commented on your post', 1603171877, 1603171877, '1', 0),
(305, 33, 34, 'Pawan kumat', '', 'commented on your post', 1603171877, 1603171877, '1', 0),
(306, 33, 34, 'Pawan kumat', '', 'commented on your post', 1603171877, 1603171877, '1', 0),
(307, 34, 34, 'Kanika mam', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'commented on your post', 1603171877, 1603171877, '1', 0),
(308, 34, 34, 'Kanika mam', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'commented on your post', 1603171877, 1603171877, '1', 0),
(309, 34, 34, 'Kanika mam', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'commented on your post', 1603171877, 1603171877, '1', 0),
(310, 33, 34, 'Pawan kumat', '', 'commented on your post', 1603173490, 1603173490, '1', 0),
(311, 33, 34, 'Pawan kumat', '', 'commented on your post', 1603173490, 1603173490, '1', 0),
(312, 34, 34, 'Kanika mam', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'commented on your post', 1603173490, 1603173490, '1', 0),
(313, 34, 8, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the SUGGESTIONS', 1603184673, 1603184673, '1', 0),
(314, 34, 37, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the SUGGESTIONS', 1603184673, 1603184673, '1', 0),
(315, 34, 30, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the SUGGESTIONS', 1603184673, 1603184673, '1', 0),
(316, 34, 8, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the SUGGESTIONS', 1603184673, 1603184673, '1', 0),
(317, 34, 37, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the SUGGESTIONS', 1603184673, 1603184673, '1', 0),
(318, 34, 30, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the SUGGESTIONS', 1603184673, 1603184673, '1', 0),
(319, 34, 27, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603184673, 1603184673, '1', 0),
(320, 34, 12, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603184673, 1603184673, '1', 0),
(321, 34, 8, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603184673, 1603184673, '1', 0),
(322, 34, 37, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603184673, 1603184673, '1', 0),
(323, 34, 8, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the SUGGESTIONS', 1603184673, 1603184673, '1', 0),
(324, 34, 37, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the SUGGESTIONS', 1603184673, 1603184673, '1', 0),
(325, 34, 30, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the SUGGESTIONS', 1603184673, 1603184673, '1', 0),
(326, 34, 33, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the SUGGESTIONS', 1603184673, 1603184673, '1', 0),
(327, 33, 8, 'Pawan kumat', '', 'has sent a message in the SUGGESTIONS', 1603184673, 1603184673, '1', 0),
(328, 33, 37, 'Pawan kumat', '', 'has sent a message in the SUGGESTIONS', 1603184673, 1603184673, '1', 0),
(329, 33, 30, 'Pawan kumat', '', 'has sent a message in the SUGGESTIONS', 1603184673, 1603184673, '1', 0),
(330, 33, 34, 'Pawan kumat', '', 'has sent a message in the SUGGESTIONS', 1603184673, 1603184673, '1', 0),
(331, 33, 27, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603184673, 1603184673, '1', 0),
(332, 33, 12, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603184673, 1603184673, '1', 0),
(333, 33, 8, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603184673, 1603184673, '1', 0),
(334, 33, 34, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603184673, 1603184673, '1', 0),
(335, 33, 37, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603184673, 1603184673, '1', 0),
(336, 34, 27, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603184673, 1603184673, '1', 0),
(337, 34, 12, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603184673, 1603184673, '1', 0),
(338, 34, 8, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603184673, 1603184673, '1', 0),
(339, 34, 37, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603184673, 1603184673, '1', 0),
(340, 34, 33, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603184673, 1603184673, '1', 0),
(341, 33, 34, 'Pawan kumat', '', 'has sent you a message', 1603184673, 1603184673, '1', 0),
(342, 33, 27, 'Pawan kumat', '', 'has sent a message in the NEWS IN AUTOMOTIVE', 1603184673, 1603184673, '1', 0),
(343, 33, 37, 'Pawan kumat', '', 'has sent a message in the NEWS IN AUTOMOTIVE', 1603184673, 1603184673, '1', 0),
(344, 33, 34, 'Pawan kumat', '', 'has sent a message in the NEWS IN AUTOMOTIVE', 1603184673, 1603184673, '1', 0),
(345, 33, 30, 'Pawan kumat', '', 'has sent a message in the NEWS IN AUTOMOTIVE', 1603184673, 1603184673, '1', 0),
(346, 34, 25, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(347, 34, 8, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(348, 34, 12, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(349, 34, 27, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(350, 34, 30, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(351, 34, 33, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(352, 34, 37, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(353, 34, 25, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(354, 34, 8, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(355, 34, 12, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(356, 34, 27, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(357, 34, 30, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(358, 34, 33, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(359, 34, 37, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(360, 33, 25, 'Pawan kumat', '', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(361, 33, 8, 'Pawan kumat', '', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(362, 33, 12, 'Pawan kumat', '', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(363, 33, 27, 'Pawan kumat', '', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(364, 33, 30, 'Pawan kumat', '', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(365, 33, 34, 'Pawan kumat', '', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(366, 33, 37, 'Pawan kumat', '', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(367, 34, 27, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603184673, 1603184673, '1', 0),
(368, 34, 12, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603184673, 1603184673, '1', 0),
(369, 34, 8, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603184673, 1603184673, '1', 0),
(370, 34, 37, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603184673, 1603184673, '1', 0),
(371, 34, 33, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603184673, 1603184673, '1', 0),
(372, 34, 25, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(373, 34, 8, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(374, 34, 12, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(375, 34, 27, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(376, 34, 30, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(377, 34, 33, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(378, 34, 37, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(379, 34, 25, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(380, 34, 8, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(381, 34, 12, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(382, 34, 27, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(383, 34, 30, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(384, 34, 33, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603184673, 1603184673, '1', 0);
INSERT INTO `notification_data` (`id`, `sender_id`, `receiver_id`, `senderName`, `senderImage`, `notification`, `createdAt`, `updatedAt`, `status`, `isRead`) VALUES
(385, 34, 37, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603184673, 1603184673, '1', 0),
(386, 34, 27, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the NEWS IN AUTOMOTIVE', 1603184673, 1603184673, '1', 0),
(387, 34, 37, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the NEWS IN AUTOMOTIVE', 1603184673, 1603184673, '1', 0),
(388, 34, 30, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the NEWS IN AUTOMOTIVE', 1603184673, 1603184673, '1', 0),
(389, 34, 33, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the NEWS IN AUTOMOTIVE', 1603184673, 1603184673, '1', 0),
(390, 34, 8, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the SUGGESTIONS', 1603195108, 1603195108, '1', 0),
(391, 34, 37, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the SUGGESTIONS', 1603195108, 1603195108, '1', 0),
(392, 34, 30, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the SUGGESTIONS', 1603195108, 1603195108, '1', 0),
(393, 34, 33, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the SUGGESTIONS', 1603195108, 1603195108, '1', 0),
(394, 34, 25, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603195108, 1603195108, '1', 0),
(395, 34, 8, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603195108, 1603195108, '1', 0),
(396, 34, 12, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603195108, 1603195108, '1', 0),
(397, 34, 27, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603195108, 1603195108, '1', 0),
(398, 34, 30, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603195108, 1603195108, '1', 0),
(399, 34, 33, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603195108, 1603195108, '1', 0),
(400, 34, 37, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603195108, 1603195108, '1', 0),
(401, 34, 25, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603195108, 1603195108, '1', 0),
(402, 34, 8, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603195108, 1603195108, '1', 0),
(403, 34, 12, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603195108, 1603195108, '1', 0),
(404, 34, 27, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603195108, 1603195108, '1', 0),
(405, 34, 30, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603195108, 1603195108, '1', 0),
(406, 34, 33, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603195108, 1603195108, '1', 0),
(407, 34, 37, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603195108, 1603195108, '1', 0),
(408, 34, 27, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(409, 34, 12, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(410, 34, 8, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(411, 34, 37, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(412, 34, 33, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(413, 33, 25, 'Pawan kumat', '', 'has sent a message in the test', 1603195108, 1603195108, '1', 0),
(414, 33, 8, 'Pawan kumat', '', 'has sent a message in the test', 1603195108, 1603195108, '1', 0),
(415, 33, 12, 'Pawan kumat', '', 'has sent a message in the test', 1603195108, 1603195108, '1', 0),
(416, 33, 27, 'Pawan kumat', '', 'has sent a message in the test', 1603195108, 1603195108, '1', 0),
(417, 33, 30, 'Pawan kumat', '', 'has sent a message in the test', 1603195108, 1603195108, '1', 0),
(418, 33, 34, 'Pawan kumat', '', 'has sent a message in the test', 1603195108, 1603195108, '1', 0),
(419, 33, 37, 'Pawan kumat', '', 'has sent a message in the test', 1603195108, 1603195108, '1', 0),
(420, 33, 27, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(421, 33, 12, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(422, 33, 8, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(423, 33, 34, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(424, 33, 37, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(425, 33, 27, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(426, 33, 12, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(427, 33, 8, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(428, 33, 34, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(429, 33, 37, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(430, 34, 27, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(431, 34, 12, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(432, 34, 8, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(433, 34, 37, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(434, 34, 33, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(435, 34, 27, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(436, 34, 12, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(437, 34, 8, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(438, 34, 37, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(439, 34, 33, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(440, 33, 27, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(441, 33, 12, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(442, 33, 8, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(443, 33, 34, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(444, 33, 37, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(445, 33, 27, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(446, 33, 12, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(447, 33, 8, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(448, 33, 34, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(449, 33, 37, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603195108, 1603195108, '1', 0),
(450, 33, 27, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603199929, 1603199929, '1', 0),
(451, 33, 12, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603199929, 1603199929, '1', 0),
(452, 33, 8, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603199929, 1603199929, '1', 0),
(453, 33, 34, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603199929, 1603199929, '1', 0),
(454, 33, 37, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603199929, 1603199929, '1', 0),
(455, 33, 27, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603199929, 1603199929, '1', 0),
(456, 33, 12, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603199929, 1603199929, '1', 0),
(457, 33, 8, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603199929, 1603199929, '1', 0),
(458, 33, 34, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603199929, 1603199929, '1', 0),
(459, 33, 37, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603199929, 1603199929, '1', 0),
(460, 34, 27, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603199929, 1603199929, '1', 0),
(461, 34, 12, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603199929, 1603199929, '1', 0),
(462, 34, 8, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603199929, 1603199929, '1', 0),
(463, 34, 37, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603199929, 1603199929, '1', 0),
(464, 34, 33, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603199929, 1603199929, '1', 0),
(465, 34, 27, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603199929, 1603199929, '1', 0),
(466, 34, 12, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603199929, 1603199929, '1', 0),
(467, 34, 8, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603199929, 1603199929, '1', 0),
(468, 34, 37, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603199929, 1603199929, '1', 0),
(469, 34, 33, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the GENERAL DISCUSSION', 1603199929, 1603199929, '1', 0),
(470, 33, 27, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603199929, 1603199929, '1', 0),
(471, 33, 12, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603199929, 1603199929, '1', 0),
(472, 33, 8, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603199929, 1603199929, '1', 0),
(473, 33, 34, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603199929, 1603199929, '1', 0),
(474, 33, 37, 'Pawan kumat', '', 'has sent a message in the GENERAL DISCUSSION', 1603199929, 1603199929, '1', 0),
(475, 33, 27, 'Pawan kumat', '', 'has sent a message in the ALGEBRA AND KINEMATICS', 1603199929, 1603199929, '1', 0),
(476, 33, 12, 'Pawan kumat', '', 'has sent a message in the ALGEBRA AND KINEMATICS', 1603199929, 1603199929, '1', 0),
(477, 33, 34, 'Pawan kumat', '', 'has sent a message in the ALGEBRA AND KINEMATICS', 1603199929, 1603199929, '1', 0),
(478, 33, 37, 'Pawan kumat', '', 'has sent a message in the ALGEBRA AND KINEMATICS', 1603199929, 1603199929, '1', 0),
(479, 34, 27, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the ALGEBRA AND KINEMATICS', 1603199929, 1603199929, '1', 0),
(480, 34, 12, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the ALGEBRA AND KINEMATICS', 1603199929, 1603199929, '1', 0),
(481, 34, 37, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the ALGEBRA AND KINEMATICS', 1603199929, 1603199929, '1', 0),
(482, 34, 33, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the ALGEBRA AND KINEMATICS', 1603199929, 1603199929, '1', 0),
(483, 33, 27, 'Pawan kumat', '', 'has sent a message in the NEWS IN AUTOMOTIVE', 1603199929, 1603199929, '1', 0),
(484, 33, 37, 'Pawan kumat', '', 'has sent a message in the NEWS IN AUTOMOTIVE', 1603199929, 1603199929, '1', 0),
(485, 33, 34, 'Pawan kumat', '', 'has sent a message in the NEWS IN AUTOMOTIVE', 1603199929, 1603199929, '1', 0),
(486, 33, 30, 'Pawan kumat', '', 'has sent a message in the NEWS IN AUTOMOTIVE', 1603199929, 1603199929, '1', 0),
(487, 34, 27, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the NEWS IN AUTOMOTIVE', 1603199929, 1603199929, '1', 0),
(488, 34, 37, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the NEWS IN AUTOMOTIVE', 1603199929, 1603199929, '1', 0),
(489, 34, 30, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the NEWS IN AUTOMOTIVE', 1603199929, 1603199929, '1', 0),
(490, 34, 33, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the NEWS IN AUTOMOTIVE', 1603199929, 1603199929, '1', 0),
(491, 33, 27, 'Pawan kumat', '', 'has sent a message in the NEWS IN AUTOMOTIVE', 1603199929, 1603199929, '1', 0),
(492, 33, 37, 'Pawan kumat', '', 'has sent a message in the NEWS IN AUTOMOTIVE', 1603199929, 1603199929, '1', 0),
(493, 33, 34, 'Pawan kumat', '', 'has sent a message in the NEWS IN AUTOMOTIVE', 1603199929, 1603199929, '1', 0),
(494, 33, 30, 'Pawan kumat', '', 'has sent a message in the NEWS IN AUTOMOTIVE', 1603199929, 1603199929, '1', 0),
(495, 34, 27, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the NEWS IN AUTOMOTIVE', 1603199929, 1603199929, '1', 0),
(496, 34, 37, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the NEWS IN AUTOMOTIVE', 1603199929, 1603199929, '1', 0),
(497, 34, 30, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the NEWS IN AUTOMOTIVE', 1603199929, 1603199929, '1', 0),
(498, 34, 33, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the NEWS IN AUTOMOTIVE', 1603199929, 1603199929, '1', 0),
(499, 33, 8, 'Pawan kumat', '', 'has sent a message in the SUGGESTIONS', 1603199929, 1603199929, '1', 0),
(500, 33, 37, 'Pawan kumat', '', 'has sent a message in the SUGGESTIONS', 1603199929, 1603199929, '1', 0),
(501, 33, 30, 'Pawan kumat', '', 'has sent a message in the SUGGESTIONS', 1603199929, 1603199929, '1', 0),
(502, 33, 34, 'Pawan kumat', '', 'has sent a message in the SUGGESTIONS', 1603199929, 1603199929, '1', 0),
(503, 34, 8, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the SUGGESTIONS', 1603199929, 1603199929, '1', 0),
(504, 34, 37, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the SUGGESTIONS', 1603199929, 1603199929, '1', 0),
(505, 34, 30, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the SUGGESTIONS', 1603199929, 1603199929, '1', 0),
(506, 34, 33, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the SUGGESTIONS', 1603199929, 1603199929, '1', 0),
(507, 33, 8, 'Pawan kumat', '', 'has sent a message in the SUGGESTIONS', 1603199929, 1603199929, '1', 0),
(508, 33, 37, 'Pawan kumat', '', 'has sent a message in the SUGGESTIONS', 1603199929, 1603199929, '1', 0),
(509, 33, 30, 'Pawan kumat', '', 'has sent a message in the SUGGESTIONS', 1603199929, 1603199929, '1', 0),
(510, 33, 34, 'Pawan kumat', '', 'has sent a message in the SUGGESTIONS', 1603199929, 1603199929, '1', 0),
(511, 33, 25, 'Pawan kumat', '', 'has sent a message in the test', 1603199929, 1603199929, '1', 0),
(512, 33, 8, 'Pawan kumat', '', 'has sent a message in the test', 1603199929, 1603199929, '1', 0),
(513, 33, 12, 'Pawan kumat', '', 'has sent a message in the test', 1603199929, 1603199929, '1', 0),
(514, 33, 27, 'Pawan kumat', '', 'has sent a message in the test', 1603199929, 1603199929, '1', 0),
(515, 33, 30, 'Pawan kumat', '', 'has sent a message in the test', 1603199929, 1603199929, '1', 0),
(516, 33, 34, 'Pawan kumat', '', 'has sent a message in the test', 1603199929, 1603199929, '1', 0),
(517, 33, 37, 'Pawan kumat', '', 'has sent a message in the test', 1603199929, 1603199929, '1', 0),
(518, 34, 25, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603199929, 1603199929, '1', 0),
(519, 34, 8, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603199929, 1603199929, '1', 0),
(520, 34, 12, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603199929, 1603199929, '1', 0),
(521, 34, 27, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603199929, 1603199929, '1', 0),
(522, 34, 30, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603199929, 1603199929, '1', 0),
(523, 34, 33, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603199929, 1603199929, '1', 0),
(524, 34, 37, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg', 'has sent a message in the test', 1603199929, 1603199929, '1', 0);

-- --------------------------------------------------------

--
-- Table structure for table `one_update_messages`
--

CREATE TABLE `one_update_messages` (
  `id` int(11) NOT NULL,
  `senderId` int(11) NOT NULL,
  `receiverId` int(11) NOT NULL,
  `chatConstantId` int(11) NOT NULL DEFAULT '0',
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `readStatus` int(11) NOT NULL COMMENT '0:unread,1 read',
  `messageType` int(11) NOT NULL COMMENT '1:media msg,0 :default',
  `deletedId` int(11) DEFAULT '0',
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `online_user`
--

CREATE TABLE `online_user` (
  `userid` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `socket_id` varchar(50) NOT NULL,
  `status` int(11) NOT NULL,
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `otherapps`
--

CREATE TABLE `otherapps` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `url` text NOT NULL,
  `platform` varchar(20) NOT NULL,
  `status` tinyint(11) NOT NULL,
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `otherapps`
--

INSERT INTO `otherapps` (`id`, `name`, `url`, `platform`, `status`, `createdAt`, `updatedAt`) VALUES
(12, 'Instagram', 'https://apps.apple.com/in/app/instagram/id389801252', 'IOS', 1, 1601910904, 1601910904);

-- --------------------------------------------------------

--
-- Table structure for table `plclist`
--

CREATE TABLE `plclist` (
  `id` int(11) NOT NULL,
  `plc_id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `image` varchar(140) NOT NULL,
  `count` int(11) NOT NULL,
  `isSelected` varchar(60) NOT NULL,
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `image` varchar(140) NOT NULL,
  `description` text NOT NULL,
  `status` enum('1','0') NOT NULL,
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `title`, `image`, `description`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Mohali news', 'http://34.232.2.249:4100/public/images/users/image-1598719384.jpg', '<p style=\"text-align: justify;\">In traditional web applications, a web server (e.g. IIS) contains the directory structure to manage web pages (html, asp, aspx, etc.). When a request for the page is received, the web server performs the request processing based upon server-side configuration and returns the matching HTML response. This configuration contains information for the page extension and its associated runtime. This is because the hosting environment needs the complete information about the page from the URL, and then accordingly it discovers the page on the server.</p>\n', '0', 1598613008, 1601910904),
(6, 'India China border row: Situation critical in Ladakh after PLA aggression in Chushul', 'http://34.232.2.249:4100/public/images/users/image-1598961179.webp', '<p>The situation in East Ladakh continues to remain tense with the Indian Army matching the heavy weapon posturing of the People&rsquo;s Liberation Army (PLA) on Monday after&nbsp;<a href=\"https://www.hindustantimes.com/india-news/india-pre-empts-china-s-aggressive-move-near-pangong-lake/story-eTQdwP10sb4Q1hfdHN2xqI.html\" title=\"pre-empting China \">pre-empting China&nbsp;</a>from moving into the dominating heights south of Pangong Tso on August 29-30 night, people familiar with the development said.</p>\n\n<p>&ldquo;The situation is very tense in the Chushul area with the PLA fully in aggressive mode and show-casing heavy-calibre weapons to force the Indian Army to give in. The Indian Army has also matched weapons and blunted the Chinese offensive both at south of Pangong Tso and Rezang La by a counter-offensive mounted by the Special Frontier Forces,&rdquo; said a senior military official.</p>\n\n<p>As of now, both the armies are matching each other in strength with the Indian Army present in strength to repel any Chinese aggression along the 1,597 km Line of Control (LAC) in Ladakh.</p>\n', '0', 1598948040, 1601910904),
(7, 'The curious link behind China’s Ladakh moves and a looming food crisis | Analysis', 'http://34.232.2.249:4100/public/images/users/image-1598961423.webp', '<p><span style=\"font-family:comic sans ms,cursive\">President Xi Jinping launched<a href=\"https://www.hindustantimes.com/world-news/launching-frugality-drive-chinese-president-xi-calls-for-sense-of-crisis-on-food-security/story-TJ004dwkrNczTiV0anaT3L.html\" title=\" ‘Operation Clean Plate’\">&nbsp;&lsquo;Operation Clean Plate&rsquo;</a>&nbsp;last fortnight to prepare China for a potential food crisis, contributed in part by the diplomatic muscle-flexing he has pursued abroad to bolster his standing at home. But Beijing&rsquo;s&nbsp;<a href=\"https://www.hindustantimes.com/india-news/india-china-border-situation-critical-in-ladakh-after-pla-aggression-in-chushul/story-4zTfnLKDqoWFuKlkxOX8OJ.html\" title=\"aggressive manoeuvres in Ladakh, \">aggressive manoeuvres in Ladakh,&nbsp;</a>the South China Sea and beyond - seen to have been prompted by a design to divert attention from domestic troubles - have cratered China&rsquo;s relations with its neighbours and soured relations with its three important food suppliers - the United States, Canada and Australia.</span></p>\n\n<p><span style=\"font-family:comic sans ms,cursive\">As it is, China&rsquo;s ultra-nationalistic wolf warrior diplomacy and the aggressive military posture by People&rsquo;s Liberation&thinsp;Army in Ladakh is a throw-back to 1962 when the then paramount leader Mao Zedong used the border skirmish with India to mask the failed Great Leap Foward movement that killed millions of Chinese of hunger.</span></p>\n\n<p><span style=\"font-family:comic sans ms,cursive\">Xi Jinping&rsquo;s renewed focus on the crash diet last month had immediately set off speculation that his government expects its food supply to get worse.</span></p>\n\n<p><span style=\"font-family:comic sans ms,cursive\">China had seen it coming. Back in May, Premier Li Keqiang had promised to draw up a food security plan amid the coronavirus pandemic, assuring parliament that China could ensure food for its 1.4 billion people &lsquo;through our own efforts&rsquo;, reward higher yield of grains and promote the recovery of pig production.</span></p>\n\n<p><span style=\"font-family:comic sans ms,cursive\">Agriculture minister Han Changfu had added that the African swine fever that led to the killing or culling of 100 million pigs was a threat but there won&rsquo;t be a big increase in price of pork, a staple food for many families that makes China its world&rsquo;s biggest consumer. Official statistics, however, indicate food prices went up by 13 per cent in July compared with a year ago and the price of pork, by about 85 per cent.</span></p>\n\n<p><span style=\"font-family:comic sans ms,cursive\">The surge of crippling floods in the Yangtze River basin, the source of most of China&rsquo;s rice, had affected production and transportation, disrupted lives of millions and left behind large swaths of farmland under water. The Qingyi river, an upper Yangtze tributary, saw its worst flooding in a century.</span></p>\n\n<p><span style=\"font-family:comic sans ms,cursive\">Already, according to data from the China General Administration of Customs, China&rsquo;s grain imports had risen by 22.7 per cent (to 74.51 million tonnes) in between January and July as compared to the same period last year. Wheat imports saw a 197 per cent year-on-year increase with import of 910,000 tonnes. During the month, corn imports also went up, year-on-year, by 23 per cent to 880,000 tonnes.</span></p>\n', '0', 1598948040, 1601910904),
(8, 'Pranab Mukherjee was always ready and never said no to the party', 'http://34.232.2.249:4100/public/images/users/image-1598961672.webp', '<p>I was elected in 1977 and met Pranab da within the first year of coming to Parliament. For 43 years, we were in touch constantly, and became especially close when I served as parliamentary secretary to Prime Minister Rajiv Gandhi. That was an eventful time; Pranab da had started a new party in Bengal and then later became the Pradesh Congress Committee (PCC) chief. I was junior to him but he&rsquo;d always treat me like a colleague or even a younger brother.</p>\n\n<p>As PCC chief of Bengal, he had to handle several agitations. I remember once we visited the hospital to see those who were injured in one. Suddenly, things became quite tense. The thing that I most clearly remember about that incident is that he didn&rsquo;t abandon me . He braved the stone-throwing to ensure that I sat in the car with him. He was known to be a tough person but whenever I called him for anything, he wouldn&rsquo;t just hear me out, but get it done. I think it was either in the Bangalore plenary session or in Faizabad one that one minister who was supposed to address the party said that he wouldn&rsquo;t be able to speak. I just asked Pranab da to give the speech ; with 10 minutes&rsquo; notice he spoke very well. He was always ready and never said no to the party.</p>\n\n<p>We then worked together in the time of Sitaram Kesri. Whether it was on Kesri&rsquo;s appointment as the Congress president or his resignation, we worked together.</p>\n\n<p>Of course, he went on to play a major role in government. I remember during the vote on the Indo-US Nuclear deal (2008), we worked very closely to ensure that the vote of confidence went off very smoothly. That&rsquo;s the reason we got exactly the kind of result that we wanted from it.</p>\n\n<p>In core group meetings, where we again worked together, he would often be stern with some minister or member; if they said anything wrong, he&rsquo;d immediately respond. This was typical of him.</p>\n\n<p>The unusual thing about our meetings was that they were mostly held at night. I was usually his last visitor, dropping in at 11:30 pm or midnight or even later at least twice or thrice a week. He would finish that meeting, then shower and eat his dinner. Late night was the best time to talk to him, and it&rsquo;s these exchanges where I got the best kind of guidance from him. He was an encyclopaedia of Indian politics and was well aware of all that was happening across the world. So, you&rsquo;d always gain from these exchanges. Of course, I had a way of gauging his mood during these visits. If he said`Heralal, chai lao&rdquo; (Bring some tea)&rsquo;, then I&rsquo;d know that he was in a good mood. If he simply said &ldquo;Baithiye&rdquo; (Sit)&rsquo; then I&rsquo;d know that he was busy. This continued even when he took up a constitutional role.</p>\n\n<p>When he was chosen to become President, I was the one who went to inform him of the clearance of his name. He was very happy and immediately thanked Soniaji (Sonia Gandhi) and others. Yes, he had arguments with people and differences of opinion but when he was informed of the PM&rsquo;s decision or Soniaji&rsquo;s, he would accept it. This despite the fact that he couldn&rsquo;t become the Prime Minister, and that regret stayed with him. He never said it openly and it wasn&rsquo;t that huge a source of bitterness for him. His goal didn&rsquo;t stop him from doing a stellar job as a cabinet minister or the other assignments that he was given. For instance, when the United Progressive Alliance came to power in 2004, he wanted to be home minister. However, that wasn&rsquo;t to be and he really worked hard at the defence portfolio.</p>\n\n<p>My visits to him as President weren&rsquo;t just official ones. When he was writing his book or even otherwise, if we didn&rsquo;t meet each other for a week or 10 days, he&rsquo;d call me and ask where I was and that I should drop in. When he was invited to visit the Rashtriya Swayamsevak Sangh (RSS) headquarter in Nagpur, he took a long time to decide if he should go. He told me, &ldquo;If I don&rsquo;t go, then it will be a problem ; if I go, it will be a problem. It&rsquo;s better that I go there and give my message.&rsquo;&rsquo; And that&rsquo;s what he did.</p>\n\n<p>He had a big heart. I remember that I wanted him to inaugurate a hospital in my constituency. It wasn&rsquo;t a big hospital at all but just because I asked him, he came all the way to Gujarat for its opening. I just think that I&rsquo;m very lucky to have had the opportunity to have worked with him so closely. He taught me all the things I couldn&rsquo;t learn from books-- history of the party, what happened when the Congress split twice.... He was very clear in his mind about what was right and he followed his principles. He said whatever was in his heart. He shared so much with me but some of them are things that I will never share with others. These are things that went with him and will also go with me to my grave.</p>\n', '0', 1598948040, 1601910904),
(12, 'WhatsApp starts rolling out new storage UI to beta users', 'http://34.232.2.249:4100/public/images/users/image-1601463032.webp', '<p>WhatsApp has been working on new storage optimisations for its users. The storage section is revamped with new features for better storage management. This feature has now started rolling out to WhatsApp beta users on Android.</p>\n\n<p>WhatsApp beta users should start seeing the new storage feature soon, WABetaInfo&nbsp;<a href=\"https://wabetainfo.com/whatsapp-beta-for-android-2-20-201-9-whats-new/\" rel=\"nofollow\" target=\"_blank\">reported</a>. Those who are not on the beta version can enroll through WhatsApp&rsquo;s beta programme. The new WhatsApp beta update is version 2.20.201.9. In the current&nbsp;<a href=\"https://tech.hindustantimes.com/tech/news/whatsapp-is-working-on-new-tools-for-storage-usage-optimisation-71598255549462.html\" target=\"_blank\">storage section on WhatsApp</a>, users have the option to open individual chats and check the amount of storage consumed by different media files.</p>\n', '0', 1601450652, 1601910904),
(13, 'Google Pixel 5, Pixel 4A 5G launch event: Where to watch livestream', 'http://34.232.2.249:4100/public/images/users/image-1601463097.webp', '<p>Google is all set to unveil its&nbsp;<a href=\"https://tech.hindustantimes.com/mobile/news/google-pixel-5-pixel-4a-5g-set-to-launch-tonight-all-you-need-to-know-71601441875139.html\" target=\"_blank\">Pixel 5 and Pixel 4A 5G smartphones</a>&nbsp;at the upcoming virtual event that is about to kick off in less than 12 hours. The search giant has already confirmed the names of the two devices and have shown their side profiles in the teaser as well during the launch of Pixel 4A. Unfortunately, the Pixel 5 and Pixel 4A 5G&nbsp;<a href=\"https://tech.hindustantimes.com/mobile/news/google-teased-pixel-5-pixel-4a-5g-but-none-of-them-are-coming-to-india-71596484918813.html\" target=\"_blank\">won&rsquo;t be coming to India</a>. The country is only supposed to get the Pixel 4A for now.&nbsp;</p>\n\n<p>However, these might not be the only two phones getting launched at this event. The firm might have move products under wraps. So, in case you are interested, you can watch the Google Pixel launch live stream to stay updated.</p>\n\n<p><strong>Also read:&nbsp;</strong><a href=\"https://tech.hindustantimes.com/home-appliances/news/sonos-sues-google-for-infringing-5-more-wireless-audio-patents-across-nest-chromecast-products-71601444182913.html\" target=\"_blank\"><strong>Sonos sues Google for infringing 5 more wireless audio patents across Nest, Chromecast products</strong></a></p>\n\n<p>The September 30 Pixel 5 event&rsquo;s livestream will begin at 2 PM ET/11 AM PT. In India, it will start from 11.30PM IST. You can watch the live stream on Google&rsquo;s own YouTube platform. Here&rsquo;s the video below.</p>\n', '0', 1601450652, 1601910904),
(14, 'Looking for a job?  General Motor is hiring 1,000 new employees!', 'http://34.232.2.249:4100/public/images/users/image-1601978114.png', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu</p>\n', '1', 1601910904, 1601910904),
(15, 'Looking for a job? General Motor is hiring 1,000 new employees!', 'http://34.232.2.249:4100/public/images/users/image-1601978281.png', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu</p>\n', '1', 1601910904, 1601910904),
(16, 'Looking for a job? General Motor is hiring 1,000 new employees ! ', 'http://34.232.2.249:4100/public/images/users/image-1601978271.png', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu</p>\n', '1', 1601910904, 1601910904),
(17, 'Looking for a job ? General Motor is hiring 1,000 new employees !', 'http://34.232.2.249:4100/public/images/users/image-1601978351.png', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu</p>\n', '1', 1601910904, 1601910904);

-- --------------------------------------------------------

--
-- Table structure for table `reportedfeed`
--

CREATE TABLE `reportedfeed` (
  `id` int(11) NOT NULL,
  `feedId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `status` enum('1','0') NOT NULL,
  `reason` text NOT NULL,
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `robotlist`
--

CREATE TABLE `robotlist` (
  `id` int(11) NOT NULL,
  `robot_id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `image` varchar(140) NOT NULL,
  `count` int(11) NOT NULL,
  `isSelected` varchar(10) NOT NULL,
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `roomlist`
--

CREATE TABLE `roomlist` (
  `id` int(11) NOT NULL,
  `groupName` varchar(110) NOT NULL,
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roomlist`
--

INSERT INTO `roomlist` (`id`, `groupName`, `createdAt`, `updatedAt`) VALUES
(1, 'PLC', 1591267193, 1599711778),
(2, 'ROBOT', 1591267193, 1599711778),
(3, 'GERNAL', 1591267193, 1599711778);

-- --------------------------------------------------------

--
-- Table structure for table `socket_group`
--

CREATE TABLE `socket_group` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `socketId` varchar(50) NOT NULL,
  `isOnline` int(11) NOT NULL DEFAULT '0' COMMENT '0:offine,1online',
  `groupId` int(11) NOT NULL,
  `category` varchar(50) NOT NULL,
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL,
  `msg_status` int(11) NOT NULL DEFAULT '0' COMMENT '0:alldata,1:cleardata',
  `notification` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `socket_group`
--

INSERT INTO `socket_group` (`id`, `userId`, `socketId`, `isOnline`, `groupId`, `category`, `createdAt`, `updatedAt`, `msg_status`, `notification`) VALUES
(1, 1, 'yx1UPJxvxqEao7S4AAAM', 1, 2, 'GENERAL', 1601541540, 0, 0, 0),
(2, 20, '3NPiwet4iqaHs4TLAAFi', 1, 2, 'GENERAL', 1601541744, 0, 0, 0),
(3, 12, 'EdKWHdhK8TcgnRcSAAA0', 1, 2, 'GENERAL', 1601541776, 0, 0, 1),
(4, 21, 'NOga2XA3ixub_kU8AABl', 1, 2, 'GENERAL', 1601542586, 0, 0, 0),
(5, 21, 'NOga2XA3ixub_kU8AABl', 1, 5, 'GENERAL', 1601542589, 0, 0, 0),
(6, 21, 'NOga2XA3ixub_kU8AABl', 1, 32, 'ROBOT', 1601542768, 0, 0, 0),
(7, 22, 'kU_OABir0MfyYUsKAADd', 1, 2, 'GENERAL', 1601542945, 0, 0, 0),
(8, 22, 'kU_OABir0MfyYUsKAADd', 1, 32, 'ROBOT', 1601542949, 0, 0, 0),
(9, 23, 'XWdTU8Ke_rcH7TUaAABY', 1, 32, 'ROBOT', 1601544814, 0, 0, 0),
(10, 2, 'hFDS_SFqRcZ8TF8nAABe', 1, 2, 'GENERAL', 1601553938, 0, 0, 0),
(11, 24, 'kWSLjdMf1mMS7Is3AAAG', 1, 2, 'GENERAL', 1601554226, 0, 0, 0),
(12, 2, 'hFDS_SFqRcZ8TF8nAABe', 1, 5, 'GENERAL', 1601554376, 0, 0, 0),
(13, 24, 'kWSLjdMf1mMS7Is3AAAG', 1, 5, 'GENERAL', 1601554621, 0, 0, 0),
(14, 24, 'kWSLjdMf1mMS7Is3AAAG', 1, 28, 'GENERAL', 1601614785, 0, 0, 0),
(15, 20, '3NPiwet4iqaHs4TLAAFi', 1, 28, 'GENERAL', 1601618036, 0, 0, 0),
(16, 8, '-90SKGfPSIZn2_HsAAAF', 1, 2, 'GENERAL', 1601715353, 0, 0, 0),
(17, 10, 'sll-w8agzRVQyWTHAAAl', 1, 2, 'GENERAL', 1601722528, 0, 0, 0),
(18, 23, 'XWdTU8Ke_rcH7TUaAABY', 1, 2, 'GENERAL', 1601726635, 0, 0, 0),
(19, 25, 'gdV9tyIKDETcIC9kAAAV', 1, 2, 'GENERAL', 1601726641, 0, 0, 0),
(20, 12, 'EdKWHdhK8TcgnRcSAAA0', 1, 5, 'GENERAL', 1601729828, 0, 0, 0),
(21, 2, 'hFDS_SFqRcZ8TF8nAABe', 1, 28, 'GENERAL', 1601731630, 0, 0, 0),
(22, 26, 'WLjr5eHKSsn7cLJwAAAM', 1, 2, 'GENERAL', 1601911777, 0, 0, 0),
(23, 27, 'b-1ZVG-h3XDriFY7AABH', 1, 2, 'GENERAL', 1601918646, 0, 0, 0),
(24, 27, 'b-1ZVG-h3XDriFY7AABH', 1, 5, 'GENERAL', 1601918698, 0, 0, 0),
(25, 27, 'b-1ZVG-h3XDriFY7AABH', 1, 28, 'GENERAL', 1601919257, 0, 0, 0),
(26, 8, '-90SKGfPSIZn2_HsAAAF', 1, 38, 'ROBOT', 1601977607, 0, 0, 0),
(27, 27, 'b-1ZVG-h3XDriFY7AABH', 1, 34, 'GENERAL', 1601988292, 0, 89, 0),
(28, 27, 'b-1ZVG-h3XDriFY7AABH', 1, 35, 'GENERAL', 1601988295, 0, 0, 0),
(29, 27, 'b-1ZVG-h3XDriFY7AABH', 1, 36, 'GENERAL', 1601989406, 0, 0, 0),
(30, 27, 'b-1ZVG-h3XDriFY7AABH', 1, 37, 'GENERAL', 1601989408, 0, 0, 1),
(31, 24, 'kWSLjdMf1mMS7Is3AAAG', 1, 34, 'GENERAL', 1602000400, 0, 0, 0),
(32, 24, 'kWSLjdMf1mMS7Is3AAAG', 1, 46, 'PLS5', 1602058180, 0, 0, 0),
(33, 24, 'kWSLjdMf1mMS7Is3AAAG', 1, 47, 'PLS5', 1602058184, 0, 0, 0),
(34, 24, 'kWSLjdMf1mMS7Is3AAAG', 1, 48, 'PLS5', 1602058186, 0, 0, 0),
(35, 12, 'EdKWHdhK8TcgnRcSAAA0', 1, 34, 'GENERAL', 1602138353, 0, 0, 0),
(36, 12, 'EdKWHdhK8TcgnRcSAAA0', 1, 35, 'GENERAL', 1602139182, 0, 0, 0),
(37, 28, '8pr4ma-9dAdTFdShAAGe', 1, 34, 'GENERAL', 1602168185, 0, 0, 0),
(38, 28, '8pr4ma-9dAdTFdShAAGe', 1, 35, 'GENERAL', 1602168230, 0, 0, 0),
(39, 28, '8pr4ma-9dAdTFdShAAGe', 1, 36, 'GENERAL', 1602168233, 0, 0, 0),
(40, 28, '8pr4ma-9dAdTFdShAAGe', 1, 37, 'GENERAL', 1602168236, 0, 0, 0),
(41, 8, '-90SKGfPSIZn2_HsAAAF', 1, 34, 'GENERAL', 1602219397, 0, 0, 0),
(42, 8, '-90SKGfPSIZn2_HsAAAF', 1, 37, 'GENERAL', 1602219413, 0, 0, 0),
(43, 24, 'kWSLjdMf1mMS7Is3AAAG', 1, 37, 'GENERAL', 1602221483, 0, 0, 0),
(44, 24, 'kWSLjdMf1mMS7Is3AAAG', 1, 53, 'GENERAL', 1602221772, 0, 0, 0),
(45, 25, 'gdV9tyIKDETcIC9kAAAV', 1, 53, 'GENERAL', 1602221829, 0, 0, 0),
(46, 8, '-90SKGfPSIZn2_HsAAAF', 1, 53, 'GENERAL', 1602225506, 0, 0, 0),
(47, 12, 'EdKWHdhK8TcgnRcSAAA0', 1, 53, 'GENERAL', 1602225693, 0, 0, 0),
(48, 27, 'b-1ZVG-h3XDriFY7AABH', 1, 53, 'GENERAL', 1602289523, 0, 0, 0),
(49, 31, 'YKRWR555yifh0Bc1AAAb', 1, 53, 'GENERAL', 1602739095, 0, 0, 0),
(50, 30, 'cDdXGoyIVjCnoy11AAAD', 1, 53, 'GENERAL', 1602739314, 0, 0, 0),
(51, 31, 'fxcCrjWbgQNHAHovAABG', 1, 35, 'GENERAL', 1602741066, 0, 0, 0),
(52, 12, 'EdKWHdhK8TcgnRcSAAA0', 1, 38, 'ROBOT', 1602840869, 0, 0, 0),
(53, 33, 'L7rrgQU2vDzAysm7AAAD', 1, 53, 'GENERAL', 1602841995, 0, 0, 0),
(54, 34, 'Rg86UvtK8pl1vGeXAAAC', 1, 53, 'GENERAL', 1602852033, 0, 0, 0),
(55, 27, 'b-1ZVG-h3XDriFY7AABH', 1, 38, 'ROBOT', 1603076830, 0, 0, 0),
(56, 27, 'b-1ZVG-h3XDriFY7AABH', 1, 39, 'ROBOT', 1603076851, 0, 0, 0),
(57, 27, 'b-1ZVG-h3XDriFY7AABH', 1, 49, 'PLS5', 1603076880, 0, 0, 0),
(58, 34, 'Rg86UvtK8pl1vGeXAAAC', 1, 34, 'GENERAL', 1603093069, 0, 0, 0),
(59, 34, 'Rg86UvtK8pl1vGeXAAAC', 1, 35, 'GENERAL', 1603093077, 0, 0, 0),
(60, 37, '5uSiMm3lPD2fU3O6AAA8', 1, 34, 'GENERAL', 1603162287, 0, 0, 0),
(61, 37, '5uSiMm3lPD2fU3O6AAA8', 1, 35, 'GENERAL', 1603162301, 0, 70, 0),
(62, 37, '5uSiMm3lPD2fU3O6AAA8', 1, 53, 'GENERAL', 1603162304, 0, 0, 0),
(63, 37, '5uSiMm3lPD2fU3O6AAA8', 1, 39, 'ROBOT', 1603162370, 0, 0, 0),
(64, 37, '5uSiMm3lPD2fU3O6AAA8', 1, 38, 'ROBOT', 1603162412, 0, 0, 0),
(65, 27, 'b-1ZVG-h3XDriFY7AABH', 1, 40, 'ROBOT', 1603162422, 0, 0, 0),
(66, 37, '5uSiMm3lPD2fU3O6AAA8', 1, 40, 'ROBOT', 1603162432, 0, 0, 0),
(67, 27, 'b-1ZVG-h3XDriFY7AABH', 1, 46, 'PLS5', 1603162461, 0, 0, 0),
(68, 37, '5uSiMm3lPD2fU3O6AAA8', 1, 46, 'PLS5', 1603162467, 0, 0, 0),
(69, 37, '5uSiMm3lPD2fU3O6AAA8', 1, 36, 'GENERAL', 1603163070, 0, 0, 0),
(70, 37, '5uSiMm3lPD2fU3O6AAA8', 1, 37, 'GENERAL', 1603163072, 0, 0, 0),
(71, 27, 'b-1ZVG-h3XDriFY7AABH', 1, 41, 'ROBOT', 1603167152, 0, 0, 0),
(72, 37, '5uSiMm3lPD2fU3O6AAA8', 1, 41, 'ROBOT', 1603167245, 0, 0, 0),
(73, 37, '5uSiMm3lPD2fU3O6AAA8', 1, 42, 'ROBOT', 1603167282, 0, 0, 0),
(74, 27, 'b-1ZVG-h3XDriFY7AABH', 1, 42, 'ROBOT', 1603167286, 0, 0, 0),
(75, 37, '5uSiMm3lPD2fU3O6AAA8', 1, 43, 'ROBOT', 1603167297, 0, 0, 0),
(76, 37, '5uSiMm3lPD2fU3O6AAA8', 1, 44, 'ROBOT', 1603167302, 0, 0, 0),
(77, 37, '5uSiMm3lPD2fU3O6AAA8', 1, 45, 'ROBOT', 1603167308, 0, 0, 0),
(78, 27, 'b-1ZVG-h3XDriFY7AABH', 1, 47, 'PLS5', 1603167415, 0, 0, 0),
(79, 27, 'b-1ZVG-h3XDriFY7AABH', 1, 48, 'PLS5', 1603167419, 0, 0, 0),
(80, 27, 'b-1ZVG-h3XDriFY7AABH', 1, 50, 'PLS5', 1603167484, 0, 0, 0),
(81, 27, 'b-1ZVG-h3XDriFY7AABH', 1, 51, 'PLS5', 1603167491, 0, 0, 0),
(82, 27, 'b-1ZVG-h3XDriFY7AABH', 1, 52, 'PLS5', 1603167498, 0, 0, 0),
(83, 27, 'b-1ZVG-h3XDriFY7AABH', 1, 43, 'ROBOT', 1603168554, 0, 0, 0),
(84, 27, 'b-1ZVG-h3XDriFY7AABH', 1, 44, 'ROBOT', 1603168557, 0, 0, 0),
(85, 27, 'b-1ZVG-h3XDriFY7AABH', 1, 45, 'ROBOT', 1603168559, 0, 0, 0),
(86, 30, 'cDdXGoyIVjCnoy11AAAD', 1, 37, 'GENERAL', 1603185496, 0, 0, 0),
(87, 34, 'Rg86UvtK8pl1vGeXAAAC', 1, 36, 'GENERAL', 1603185572, 0, 0, 0),
(88, 34, 'Rg86UvtK8pl1vGeXAAAC', 1, 37, 'GENERAL', 1603185593, 0, 0, 0),
(89, 30, 'jRSj-BdIsGALyaYUAAAG', 1, 36, 'GENERAL', 1603186519, 0, 0, 0),
(90, 33, 'L7rrgQU2vDzAysm7AAAD', 1, 37, 'GENERAL', 1603187340, 0, 0, 0),
(91, 33, 'L7rrgQU2vDzAysm7AAAD', 1, 34, 'GENERAL', 1603187374, 0, 0, 0),
(92, 33, 'L7rrgQU2vDzAysm7AAAD', 1, 36, 'GENERAL', 1603187433, 0, 0, 0),
(93, 33, 'L7rrgQU2vDzAysm7AAAD', 1, 35, 'GENERAL', 1603187435, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `socket_user`
--

CREATE TABLE `socket_user` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `socketId` varchar(50) NOT NULL,
  `isOnline` int(11) NOT NULL DEFAULT '0' COMMENT '0:offine,1online',
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL,
  `msg_status` int(11) NOT NULL DEFAULT '0' COMMENT '0:alldata,1:cleardata',
  `notification` int(11) NOT NULL DEFAULT '0',
  `receiverId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `socket_user`
--

INSERT INTO `socket_user` (`id`, `userId`, `socketId`, `isOnline`, `createdAt`, `updatedAt`, `msg_status`, `notification`, `receiverId`) VALUES
(1, 20, '3NPiwet4iqaHs4TLAAFi', 0, 1601541755, 0, 0, 0, 1),
(2, 1, 'hWK_8gYY-w4QtNL-AAA5', 0, 1601541802, 0, 0, 0, 20),
(3, 12, 'vmJ6K89Z5bi5LOraAAAr', 0, 1601541803, 0, 0, 0, 1),
(4, 20, 'uOW22fVJhACwYmBJAAFM', 0, 1601542701, 0, 0, 0, 12),
(5, 12, 'dPQJq7wqY_WHrJZFAAAH', 0, 1601542819, 0, 0, 0, 20),
(6, 1, 'hWK_8gYY-w4QtNL-AAA5', 0, 1601542913, 0, 0, 0, 12),
(7, 21, 'cCPXyJWmwxEY_7OHAAB1', 0, 1601543076, 0, 12, 0, 22),
(8, 22, '7oPee7EBydN49quLAAB2', 0, 1601543095, 0, 0, 0, 21),
(9, 23, 'JN-T_ohz7ez1ukZHAAAD', 0, 1601544818, 0, 0, 0, 22),
(10, 22, 'z9XxZ28SYBCbY0bVAAAE', 0, 1601544839, 0, 0, 0, 23),
(11, 24, 'KynNUxEPpGdrf-c-AADY', 0, 1601554631, 0, 0, 0, 1),
(12, 24, '5NagLqgDGMFaeiXQAAGL', 0, 1601554712, 0, 0, 0, 22),
(13, 22, 'R_-oGB_5zCowxva6AAEz', 0, 1601554736, 0, 0, 0, 24),
(14, 2, 'j8Br5vvlYWNfwFw9AAFJ', 0, 1601560916, 0, 0, 0, 22),
(15, 24, 'laGoaunW9lci59R_AAFL', 0, 1601617588, 0, 0, 0, 2),
(16, 2, 'vHrQkrURxs3y2K2bAAAw', 0, 1601619126, 0, 0, 0, 24),
(17, 7, 'lzqmh_XYlt1fhosxAADJ', 0, 1601652178, 0, 0, 0, 2),
(18, 25, 'Tiw6I3ydo-J_Rz6MAAAT', 0, 1601655328, 0, 0, 0, 24),
(19, 24, 'O--PnqrYxb8mHP-VAAAW', 0, 1601655353, 0, 0, 0, 25),
(20, 12, 'dPQJq7wqY_WHrJZFAAAH', 0, 1601710205, 0, 0, 0, 2),
(21, 2, 'hFDS_SFqRcZ8TF8nAABe', 0, 1601710402, 0, 0, 0, 12),
(22, 8, '-90SKGfPSIZn2_HsAAAF', 0, 1601715373, 0, 0, 0, 12),
(24, 8, 'MXDR-vcVDaGDzY0SAAAv', 0, 1601715585, 0, 0, 0, 2),
(25, 12, 'vmJ6K89Z5bi5LOraAAAr', 0, 1601716771, 0, 0, 0, 8),
(26, 23, '3bD9OkOVxHy-gLXaAAAT', 0, 1601721414, 0, 0, 0, 20),
(27, 20, 'z75b6vlAOCyYvI2fAAAS', 0, 1601721418, 0, 0, 0, 23),
(28, 10, 'ZxP0gCeKHDqoSyFQAAAC', 0, 1601722535, 0, 0, 0, 24),
(29, 24, 'dZR0EXuCSBDnudbOAAAq', 0, 1601724971, 0, 0, 0, 10),
(30, 25, 'IZzHJHovhoia5yKhAAAP', 0, 1601726741, 0, 0, 0, 23),
(31, 23, 'I9YIlCcuWVe7WFwZAABC', 0, 1601726750, 0, 0, 0, 25),
(32, 2, '3uQA2N9t5eKFNVqIAABc', 0, 1601726820, 0, 0, 0, 7),
(33, 2, '3uQA2N9t5eKFNVqIAABc', 0, 1601731548, 0, 0, 0, 8),
(34, 2, 'hFDS_SFqRcZ8TF8nAABe', 0, 1601731668, 0, 0, 0, 10),
(35, 8, '1Ph0_mUoxIRinU1gAABI', 0, 1601735327, 0, 157, 0, 23),
(36, 10, 'ZxP0gCeKHDqoSyFQAAAC', 0, 1601911329, 0, 0, 0, 12),
(37, 10, 'ZxP0gCeKHDqoSyFQAAAC', 0, 1601911679, 0, 0, 0, 23),
(38, 24, 'icUnCuEuyxCD-dj9AAAR', 0, 1601911791, 0, 0, 0, 26),
(39, 26, 'tG6wT4I2A3APF08AAAAO', 0, 1601911810, 0, 0, 0, 24),
(40, 24, 'EaVs11YLgvYQ3o4lAAAV', 0, 1601912746, 0, 0, 0, 12),
(41, 27, 'qKhWURfdmNZh6AygAACF', 0, 1601998923, 0, 0, 0, 24),
(42, 27, 'GKwY2Q25L4d9gUviAAAK', 0, 1601999221, 0, 0, 0, 27),
(43, 2, 'xeVybAvFUygvSeOGAACo', 0, 1602042839, 0, 0, 0, 6),
(44, 1, 'H3wo79z9LBAziZw8AACp', 0, 1602043024, 0, 0, 0, 7),
(45, 12, 'w60Kut0G-2SusKg6AAAI', 0, 1602158116, 0, 0, 0, 24),
(46, 12, 'vmJ6K89Z5bi5LOraAAAr', 0, 1602158119, 0, 0, 0, 10),
(47, 27, 'GKwY2Q25L4d9gUviAAAK', 0, 1602163051, 0, 0, 0, 12),
(48, 12, 'XUYw0jm2ZpnUw8WdAAAt', 0, 1602592423, 0, 0, 0, 27),
(49, 30, 'I37WiP2PegXHWefeAAA1', 0, 1602739581, 0, 0, 0, 31),
(50, 31, 'k7Nv8epsqXS2hOX4AAA8', 0, 1602739620, 0, 0, 0, 30),
(51, 25, 'ssFD1PXTfmmJNDjCAAAS', 0, 1602740011, 0, 0, 0, 30),
(52, 30, 'MIGMrh88yjZULAhTAAAX', 0, 1602740095, 0, 0, 0, 25),
(53, 12, 'EdKWHdhK8TcgnRcSAAA0', 0, 1602840879, 0, 0, 0, 30),
(54, 12, 'XUYw0jm2ZpnUw8WdAAAt', 0, 1602840965, 0, 0, 0, 31),
(55, 33, 'iz_b2mXucBnQvg7hAAAG', 0, 1602842048, 0, 0, 0, 12),
(56, 12, 'IQb3Mz4iXU8RrStaAAAN', 0, 1602842072, 0, 0, 0, 33),
(57, 34, 'brHrVS3nYQbHC8uvAAAQ', 0, 1602852098, 0, 0, 0, 30),
(58, 33, 'AfcFQYsIVTCgr-8RAAAH', 0, 1603089118, 0, 0, 0, 34),
(59, 34, '8nq1GGG4onA40vzKAAAS', 0, 1603089146, 0, 0, 0, 33),
(60, 27, 'lqO7G9iHbQB5GGh0AABI', 0, 1603169579, 0, 0, 0, 37),
(61, 37, 'xFfnsnOA4QCdw4LLAABG', 0, 1603169651, 0, 0, 0, 27);

-- --------------------------------------------------------

--
-- Table structure for table `update_messages`
--

CREATE TABLE `update_messages` (
  `id` int(11) NOT NULL,
  `senderId` int(11) NOT NULL,
  `receiverId` int(11) NOT NULL,
  `groupId` int(11) NOT NULL,
  `category` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `groupName` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `chatConstantId` int(11) NOT NULL DEFAULT '0',
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `readStatus` int(11) NOT NULL COMMENT '0:unread,1 read',
  `messageType` int(11) NOT NULL COMMENT '1:media msg,0 :default',
  `deletedId` int(11) DEFAULT '0',
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `senderName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `senderProfileImage` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `update_messages`
--

INSERT INTO `update_messages` (`id`, `senderId`, `receiverId`, `groupId`, `category`, `groupName`, `chatConstantId`, `message`, `readStatus`, `messageType`, `deletedId`, `created`, `updated`, `senderName`, `senderProfileImage`) VALUES
(1, 1, 0, 2, 'GENERAL', 'first', 0, 'hlo testing', 0, 0, 0, 1601541552, 1601541552, 'Neeraj Kumar', 'http://34.232.2.249:4100/public/images/users/image-1601361657.jpg'),
(2, 12, 0, 53, 'GENERAL', 'test', 3, '1602237464.docx', 0, 1, 0, 1602237464, 1602237464, 'kanika sharma', 'https://lh6.googleusercontent.com/-k_5b6kfugRY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclziKJZ5cEAH7qyU4IxL1qPtNE0JA/s96-c/photo.jpg'),
(3, 21, 0, 32, 'ROBOT', 'newww', 0, 'hi', 0, 0, 0, 1601542980, 1601542980, 'Jatin Dhawan', ''),
(4, 22, 0, 2, 'GENERAL', 'first', 7, 'h', 0, 0, 0, 1601554699, 1601554699, 'Dhawan Jatin', 'http://34.232.2.249:4100/public/images/users/image-1601543371.jpg'),
(5, 24, 0, 53, 'GENERAL', 'test', 10, 'hshsggsgsgsgs', 0, 0, 0, 1602225629, 1602225629, 'Jatin Dhawan', 'https://lh3.googleusercontent.com/a-/AOh14GiqUscrjQPxzumge_dCiZ0oLrfSStrXRJmBAvIS-A=s96-c'),
(6, 2, 0, 2, 'GENERAL', 'first', 12, '1601726715.jpg', 0, 1, 0, 1601726716, 1601726716, 'kanika', 'http://34.232.2.249:4100/public/images/users/image-1601371481.jpeg'),
(7, 10, 0, 2, 'GENERAL', 'first', 21, 'hi', 0, 0, 0, 1601965154, 1601965154, '', ''),
(8, 23, 0, 2, 'GENERAL', 'first', 9, '1601729971.jpg', 0, 1, 0, 1601729972, 1601729972, 'Jatin 2000', 'http://34.232.2.249:4100/public/images/users/image-1601544782.jpg'),
(9, 25, 0, 53, 'GENERAL', 'test', 16, 'hey', 0, 0, 0, 1603084919, 1603084919, 'dhawan jatin', 'http://34.232.2.249:4100/public/images/users/image-1601651221.jpg'),
(10, 26, 0, 2, 'GENERAL', 'first', 0, 'h', 0, 0, 0, 1601911780, 1601911780, 'jd', ''),
(11, 27, 0, 38, 'ROBOT', 'FANUC ROBOTS', 29, '3', 0, 0, 0, 1603167969, 1603167969, 'adam grzyb', 'https://lh4.googleusercontent.com/-iNNxYRVMLjM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn8XMXmJZihVLYOuy4i1j0WvPZMLQ/s96-c/photo.jpg'),
(12, 8, 0, 53, 'GENERAL', 'test', 18, '1602225666.jpg', 0, 1, 0, 1602225666, 1602225666, 'Ashwani Dhindsa', 'https://lh3.googleusercontent.com/a-/AOh14GiWkwdUFbb8j74N2wYvvAmuljsVgqdgUNa02lSt=s96-c'),
(13, 31, 0, 53, 'GENERAL', 'test', 0, 'hi', 0, 0, 0, 1602739304, 1602739304, 'Dhawan Jatin', ''),
(14, 30, 0, 53, 'GENERAL', 'test', 0, 'hey', 0, 0, 0, 1602739321, 1602739321, 'Jatin Dhawan', 'https://lh3.googleusercontent.com/a-/AOh14GiqUscrjQPxzumge_dCiZ0oLrfSStrXRJmBAvIS-A=s96-c'),
(15, 34, 0, 53, 'GENERAL', 'test', 46, 'hi', 0, 0, 0, 1603200309, 1603200309, 'kanika sharma', 'http://34.232.2.249:4100/public/images/users/image-1602852009.jpg'),
(16, 37, 0, 53, 'GENERAL', 'test', 44, 'test', 0, 0, 0, 1603169175, 1603169175, 'Pawel Adam', 'https://lh6.googleusercontent.com/-nvJrTIbuqT8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYLVgyPJ84VbYtbODBT8JIMV_klg/s96-c/photo.jpg'),
(17, 33, 0, 53, 'GENERAL', 'test', 47, 'hi test', 0, 0, 0, 1603200303, 1603200303, 'Pawan kumat', '');

-- --------------------------------------------------------

--
-- Table structure for table `userblocks`
--

CREATE TABLE `userblocks` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `blockUserId` int(11) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '1' COMMENT '0 for unblock, 1 for block',
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_post`
--

CREATE TABLE `user_post` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `title` text NOT NULL,
  `image` varchar(140) NOT NULL,
  `description` text NOT NULL,
  `status` enum('1','0') NOT NULL,
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ads`
--
ALTER TABLE `ads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `appusers`
--
ALTER TABLE `appusers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blocked_user`
--
ALTER TABLE `blocked_user`
  ADD PRIMARY KEY (`userid`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`userid`);

--
-- Indexes for table `chat_block`
--
ALTER TABLE `chat_block`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat_constants`
--
ALTER TABLE `chat_constants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comment_likedeslike`
--
ALTER TABLE `comment_likedeslike`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `constant`
--
ALTER TABLE `constant`
  ADD PRIMARY KEY (`userid`);

--
-- Indexes for table `crmpages`
--
ALTER TABLE `crmpages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feed`
--
ALTER TABLE `feed`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedcomment`
--
ALTER TABLE `feedcomment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedlikedeslike`
--
ALTER TABLE `feedlikedeslike`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedscategory`
--
ALTER TABLE `feedscategory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `general`
--
ALTER TABLE `general`
  ADD PRIMARY KEY (`general_id`);

--
-- Indexes for table `groupaccess`
--
ALTER TABLE `groupaccess`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `group_messages`
--
ALTER TABLE `group_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `group_message_read`
--
ALTER TABLE `group_message_read`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`noti_id`);

--
-- Indexes for table `notification_data`
--
ALTER TABLE `notification_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `one_update_messages`
--
ALTER TABLE `one_update_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `online_user`
--
ALTER TABLE `online_user`
  ADD PRIMARY KEY (`userid`);

--
-- Indexes for table `otherapps`
--
ALTER TABLE `otherapps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `plclist`
--
ALTER TABLE `plclist`
  ADD PRIMARY KEY (`plc_id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reportedfeed`
--
ALTER TABLE `reportedfeed`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `robotlist`
--
ALTER TABLE `robotlist`
  ADD PRIMARY KEY (`robot_id`);

--
-- Indexes for table `roomlist`
--
ALTER TABLE `roomlist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `socket_group`
--
ALTER TABLE `socket_group`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `socket_user`
--
ALTER TABLE `socket_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `update_messages`
--
ALTER TABLE `update_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userblocks`
--
ALTER TABLE `userblocks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_delete` (`userId`),
  ADD KEY `user_deleteblock` (`blockUserId`);

--
-- Indexes for table `user_post`
--
ALTER TABLE `user_post`
  ADD PRIMARY KEY (`post_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `ads`
--
ALTER TABLE `ads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT for table `appusers`
--
ALTER TABLE `appusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
--
-- AUTO_INCREMENT for table `blocked_user`
--
ALTER TABLE `blocked_user`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `chat_block`
--
ALTER TABLE `chat_block`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `chat_constants`
--
ALTER TABLE `chat_constants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;
--
-- AUTO_INCREMENT for table `comment_likedeslike`
--
ALTER TABLE `comment_likedeslike`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;
--
-- AUTO_INCREMENT for table `constant`
--
ALTER TABLE `constant`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `crmpages`
--
ALTER TABLE `crmpages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `feed`
--
ALTER TABLE `feed`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;
--
-- AUTO_INCREMENT for table `feedcomment`
--
ALTER TABLE `feedcomment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;
--
-- AUTO_INCREMENT for table `feedlikedeslike`
--
ALTER TABLE `feedlikedeslike`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=225;
--
-- AUTO_INCREMENT for table `feedscategory`
--
ALTER TABLE `feedscategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `general`
--
ALTER TABLE `general`
  MODIFY `general_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `groupaccess`
--
ALTER TABLE `groupaccess`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
--
-- AUTO_INCREMENT for table `group_messages`
--
ALTER TABLE `group_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=205;
--
-- AUTO_INCREMENT for table `group_message_read`
--
ALTER TABLE `group_message_read`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=251;
--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `noti_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `notification_data`
--
ALTER TABLE `notification_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=525;
--
-- AUTO_INCREMENT for table `one_update_messages`
--
ALTER TABLE `one_update_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;
--
-- AUTO_INCREMENT for table `online_user`
--
ALTER TABLE `online_user`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `otherapps`
--
ALTER TABLE `otherapps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `plclist`
--
ALTER TABLE `plclist`
  MODIFY `plc_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `reportedfeed`
--
ALTER TABLE `reportedfeed`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `robotlist`
--
ALTER TABLE `robotlist`
  MODIFY `robot_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `roomlist`
--
ALTER TABLE `roomlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `socket_group`
--
ALTER TABLE `socket_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;
--
-- AUTO_INCREMENT for table `socket_user`
--
ALTER TABLE `socket_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;
--
-- AUTO_INCREMENT for table `update_messages`
--
ALTER TABLE `update_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `userblocks`
--
ALTER TABLE `userblocks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `user_post`
--
ALTER TABLE `user_post`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
