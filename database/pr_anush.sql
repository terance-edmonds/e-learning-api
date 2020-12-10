-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 18, 2020 at 06:38 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pr_anush`
--

-- --------------------------------------------------------

--
-- Table structure for table `clients_paid_meetings`
--

CREATE TABLE `clients_paid_meetings` (
  `Index_id` int(255) NOT NULL,
  `student_id` varchar(200) NOT NULL,
  `meeting_id` varchar(200) NOT NULL,
  `receipt_number` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `clients_paid_meetings`
--

INSERT INTO `clients_paid_meetings` (`Index_id`, `student_id`, `meeting_id`, `receipt_number`) VALUES
(1, '3', '123', '5702637393055'),
(2, '3', '1234', '829712911982'),
(3, '4', '1234', '7174513579447'),
(11, '4', '123456', '8155894936834');

-- --------------------------------------------------------

--
-- Table structure for table `client_users`
--

CREATE TABLE `client_users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(200) NOT NULL,
  `last_name` varchar(200) NOT NULL,
  `email` varchar(150) NOT NULL,
  `school` varchar(200) NOT NULL,
  `grade` int(2) NOT NULL,
  `birth_date` varchar(200) NOT NULL,
  `year_of_advance_level` int(4) NOT NULL,
  `shy` varchar(20) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `home_address` varchar(500) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client_users`
--

INSERT INTO `client_users` (`id`, `first_name`, `last_name`, `email`, `school`, `grade`, `birth_date`, `year_of_advance_level`, `shy`, `phone_number`, `home_address`, `password`) VALUES
(2, '1', '1', 'test@test.com', '1', 1, '1', 1, '1', '1', '1', '$2b$10$xZZc3J3FJeYA3xtN.voLC.fG9C4nwSztExvlGo2mi7Ld/z1T2FHMi'),
(3, 'name1', 'fasdadsasdasdas', 'test@test3', 'fasdadsasdasdas', 12, '12/02/2001', 2020, '2', '0768519906', 'asdasdasdasdsdasdasdsadasdasdasdasd', '$2b$10$yqqh8V/piNO1YAxDWCK46OJ/tn5iKa1hioquGo9UFW7olLeq5DYGm'),
(4, 'name2', 'fasdadsasdasdas', 'test@test4', 'fasdadsasdasdas', 12, '12/02/2001', 2020, '2', '0768519906', 'asdasdasdasdsdasdasdsadasdasdasdasd', '$2b$10$yqqh8V/piNO1YAxDWCK46OJ/tn5iKa1hioquGo9UFW7olLeq5DYGm'),
(5, 'name3', 'fasdadsasdasdas', 'test@test5', 'fasdadsasdasdas', 12, '12/02/2001', 2020, '2', '0768519906', 'asdasdasdasdsdasdasdsadasdasdasdasd', '$2b$10$yqqh8V/piNO1YAxDWCK46OJ/tn5iKa1hioquGo9UFW7olLeq5DYGm');

-- --------------------------------------------------------

--
-- Table structure for table `host_users`
--

CREATE TABLE `host_users` (
  `id` int(255) NOT NULL,
  `first_name` varchar(200) NOT NULL,
  `last_name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `private_meeting_schedule`
--

CREATE TABLE `private_meeting_schedule` (
  `student_id` int(11) NOT NULL,
  `meeting_id` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `private_meeting_schedule`
--

INSERT INTO `private_meeting_schedule` (`student_id`, `meeting_id`) VALUES
(3, ',123,1234,12345'),
(4, ',123,1234'),
(5, ',123');

-- --------------------------------------------------------

--
-- Table structure for table `zoom_meetings`
--

CREATE TABLE `zoom_meetings` (
  `meeting_host_name` varchar(200) NOT NULL,
  `meeting_host_email` varchar(200) NOT NULL,
  `meeting_id` varchar(20) NOT NULL,
  `meeting_topic` varchar(200) NOT NULL,
  `meeting_password` varchar(200) NOT NULL,
  `meeting_date` varchar(20) NOT NULL,
  `meeting_start_time` varchar(200) NOT NULL,
  `meeting_duration` varchar(20) NOT NULL,
  `meeting_description` text NOT NULL,
  `meeting_fee` varchar(100) NOT NULL,
  `meeting_start_link` varchar(500) NOT NULL,
  `meeting_join_link` varchar(500) NOT NULL,
  `meeting_type` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `zoom_meetings`
--

INSERT INTO `zoom_meetings` (`meeting_host_name`, `meeting_host_email`, `meeting_id`, `meeting_topic`, `meeting_password`, `meeting_date`, `meeting_start_time`, `meeting_duration`, `meeting_description`, `meeting_fee`, `meeting_start_link`, `meeting_join_link`, `meeting_type`) VALUES
('a', 'a@a.com', '123', 'a1', 'a', 'a', 'a', 'a', 'a', '100', 'a', 'a', 'Private'),
('a', 'a@a.com', '1234', 'a2', 'a', 'a', 'a', 'a', 'a', '', 'a', 'a', 'Private'),
('a', 'a@a.com', '12345', 'a3', 'a', 'a', 'a', 'a', 'a', '1000', 'a', 'a', 'Private'),
('a', 'a@a.com', '123456', 'a4', 'a', 'a', 'a', 'a', 'a', '100', 'a', 'a', 'Mass'),
('a', 'a@a.com', '1234567', 'a5', 'a', 'a', 'a', 'a', 'a', '9000', 'a', 'a', 'Mass');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clients_paid_meetings`
--
ALTER TABLE `clients_paid_meetings`
  ADD PRIMARY KEY (`Index_id`),
  ADD UNIQUE KEY `receipt_number` (`receipt_number`);

--
-- Indexes for table `client_users`
--
ALTER TABLE `client_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `host_users`
--
ALTER TABLE `host_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clients_paid_meetings`
--
ALTER TABLE `clients_paid_meetings`
  MODIFY `Index_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `client_users`
--
ALTER TABLE `client_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `host_users`
--
ALTER TABLE `host_users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
