-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 14 Lis 2016, 22:59
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `edziennik`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `group`
--

CREATE TABLE IF NOT EXISTS `group` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf16 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `note`
--

CREATE TABLE IF NOT EXISTS `note` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `note` int(1) NOT NULL,
  `student_ID` int(11) NOT NULL,
  `subject_ID` int(11) NOT NULL,
  `category_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `student_ID` (`student_ID`,`subject_ID`,`category_ID`),
  KEY `category_ID` (`category_ID`),
  KEY `subject_ID` (`subject_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf16 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `note_category`
--

CREATE TABLE IF NOT EXISTS `note_category` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `teacher_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf16 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `student`
--

CREATE TABLE IF NOT EXISTS `student` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `surname` varchar(20) NOT NULL,
  `login` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `group_ID` int(11) NOT NULL,
  `visited` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `group_ID` (`group_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf16 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `subject`
--

CREATE TABLE IF NOT EXISTS `subject` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf16 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `subject_teacher`
--

CREATE TABLE IF NOT EXISTS `subject_teacher` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `subject_ID` int(11) NOT NULL,
  `teacher_ID` int(11) NOT NULL,
  `group_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `subject_ID` (`subject_ID`),
  KEY `teacher_ID` (`teacher_ID`),
  KEY `group_ID` (`group_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf16 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `teacher`
--

CREATE TABLE IF NOT EXISTS `teacher` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `surname` varchar(20) NOT NULL,
  `login` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `type` int(1) NOT NULL DEFAULT '2',
  `is_active` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf16 AUTO_INCREMENT=1 ;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `note`
--
ALTER TABLE `note`
  ADD CONSTRAINT `note_category_note` FOREIGN KEY (`category_ID`) REFERENCES `note_category` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `student_note` FOREIGN KEY (`student_ID`) REFERENCES `student` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `subject_note` FOREIGN KEY (`subject_ID`) REFERENCES `subject` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `group_student` FOREIGN KEY (`group_ID`) REFERENCES `group` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `subject_teacher`
--
ALTER TABLE `subject_teacher`
  ADD CONSTRAINT `teach` FOREIGN KEY (`teacher_ID`) REFERENCES `teacher` (`ID`),
  ADD CONSTRAINT `gr` FOREIGN KEY (`group_ID`) REFERENCES `group` (`ID`),
  ADD CONSTRAINT `sub` FOREIGN KEY (`subject_ID`) REFERENCES `subject` (`ID`);

--
-- Ograniczenia dla tabeli `note_category`
--
ALTER TABLE `note_category`
  ADD CONSTRAINT `teacher_category` FOREIGN KEY (`teacher_ID`) REFERENCES `teacher` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
