-- phpMyAdmin SQL Dump
-- version 4.2.3
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 29, 2021 at 06:45 PM
-- Server version: 5.5.68-MariaDB
-- PHP Version: 5.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `govesite_com`
--

--
-- Dumping data for table `province`
--

INSERT INTO `provinces` (`province_id`, `province_name`, `province_abbrev`, `region_id`, `seq`) VALUES
('10', 'กรุงเทพมหานคร', 'ก.ท.', '3', 0),
('11', 'สมุทรปราการ', 'ส.ป.', '3', 1),
('12', 'นนทบุรี', 'น.บ.', '3', 1),
('13', 'ปทุมธานี', 'ป.ท.', '3', 1),
('14', 'พระนครศรีอยุธยา', 'อ.ย.', '3', 1),
('15', 'อ่างทอง', 'อ.ท.', '3', 1),
('16', 'ลพบุรี', 'ล.บ.', '3', 1),
('17', 'สิงห์บุรี', 'ส.ห.', '3', 1),
('18', 'ชัยนาท', 'ช.น.', '3', 1),
('19', 'สระบุรี', 'ส.บ.', '3', 1),
('20', 'ชลบุรี', 'ช.บ.', '4', 1),
('21', 'ระยอง', 'ร.ย.', '4', 1),
('22', 'จันทบุรี', 'จ.บ.', '4', 1),
('23', 'ตราด', 'ต.ร.', '4', 1),
('24', 'ฉะเชิงเทรา', 'ฉ.ช.', '4', 1),
('25', 'ปราจีนบุรี', 'ป.จ.', '4', 1),
('26', 'นครนายก', 'น.ย.', '4', 1),
('27', 'สระแก้ว', 'ส.ก.', '4', 1),
('30', 'นครราชสีมา', 'น.ม.', '2', 1),
('31', 'บุรีรัมย์', 'บ.ร.', '2', 1),
('32', 'สุรินทร์', 'ส.ร.', '2', 1),
('33', 'ศรีสะเกษ', 'ศ.ก.', '2', 1),
('34', 'อุบลราชธานี', 'อ.บ.', '2', 1),
('35', 'ยโสธร', 'ย.ส.', '2', 1),
('36', 'ชัยภูมิ', 'ช.ย.', '2', 1),
('37', 'อำนาจเจริญ', 'อ.จ.', '2', 1),
('39', 'หนองบัวลำภู', 'น.ภ.', '2', 1),
('40', 'ขอนแก่น', 'ข.ก.', '2', 1),
('41', 'อุดรธานี', 'อ.ด.', '2', 1),
('42', 'เลย', 'ล.ย.', '2', 1),
('43', 'หนองคาย', 'น.ค.', '2', 1),
('44', 'มหาสารคาม', 'ม.ค.', '2', 1),
('45', 'ร้อยเอ็ด', 'ร.อ.', '2', 1),
('46', 'กาฬสินธุ์', 'ก.ส.', '2', 1),
('47', 'สกลนคร', 'ส.น.', '2', 1),
('48', 'นครพนม', 'น.พ.', '2', 1),
('49', 'มุกดาหาร', 'ม.ห.', '2', 1),
('50', 'เชียงใหม่', 'ช.ม.', '1', 1),
('51', 'ลำพูน', 'ล.พ.', '1', 1),
('52', 'ลำปาง', 'ล.ป.', '1', 1),
('53', 'อุตรดิตถ์', 'อ.ต.', '1', 1),
('54', 'แพร่', 'พ.ร.', '1', 1),
('55', 'น่าน', 'น.น.', '1', 1),
('56', 'พะเยา', 'พ.ย.', '1', 1),
('57', 'เชียงราย', 'ช.ร.', '1', 1),
('58', 'แม่ฮ่องสอน', 'ม.ส.', '1', 1),
('60', 'นครสวรรค์', 'น.ว.', '1', 1),
('61', 'อุทัยธานี', 'อ.น.', '1', 1),
('62', 'กำแพงเพชร', 'ก.พ.', '1', 1),
('63', 'ตาก', 'ต.ก.', '1', 1),
('64', 'สุโขทัย', 'ส.ท.', '1', 1),
('65', 'พิษณุโลก', 'พ.ล.', '1', 1),
('66', 'พิจิตร', 'พ.จ.', '1', 1),
('67', 'เพชรบูรณ์', 'พ.ช.', '1', 1),
('70', 'ราชบุรี', 'ร.บ.', '5', 1),
('71', 'กาญจนบุรี', 'ก.จ.', '5', 1),
('72', 'สุพรรณบุรี', 'ส.พ.', '5', 1),
('73', 'นครปฐม', 'น.ฐ.', '5', 1),
('74', 'สมุทรสาคร', 'ส.ค.', '5', 1),
('75', 'สมุทรสงคราม', 'ส.ส.', '5', 1),
('76', 'เพชรบุรี', 'พ.บ.', '5', 1),
('77', 'ประจวบคีรีขันธ์', 'ป.ข.', '5', 1),
('80', 'นครศรีธรรมราช', 'น.ศ.', '6', 1),
('81', 'กระบี่', 'ก.บ.', '6', 1),
('82', 'พังงา', 'พ.ง.', '6', 1),
('83', 'ภูเก็ต', 'ภ.ก.', '6', 1),
('84', 'สุราษฎร์ธานี', 'ส.ฎ.', '6', 1),
('85', 'ระนอง', 'ร.น.', '6', 1),
('86', 'ชุมพร', 'ช.พ.', '6', 1),
('90', 'สงขลา', 'ส.ข.', '6', 1),
('91', 'สตูล', 'ส.ต.', '6', 1),
('92', 'ตรัง', 'ต.ง.', '6', 1),
('93', 'พัทลุง', 'พ.ท.', '6', 1),
('94', 'ปัตตานี', 'ป.น.', '6', 1),
('95', 'ยะลา', 'ย.ล.', '6', 1),
('96', 'นราธิวาส', 'น.ธ.', '6', 1),
('99', 'บึงกาฬ', 'บ.ก.', '2', 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;