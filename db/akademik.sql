-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 27, 2019 at 09:59 AM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `akademik`
--

-- --------------------------------------------------------

--
-- Table structure for table `dosen`
--

CREATE TABLE `dosen` (
  `NIP` varchar(50) NOT NULL,
  `Nama_Dosen` varchar(50) NOT NULL,
  `Tanggal_Lahir` date NOT NULL,
  `JK` enum('L','P') NOT NULL,
  `No_Telp` varchar(50) NOT NULL,
  `Alamat` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dosen`
--

INSERT INTO `dosen` (`NIP`, `Nama_Dosen`, `Tanggal_Lahir`, `JK`, `No_Telp`, `Alamat`) VALUES
('1301142403', 'Jokowi', '2019-06-27', 'L', '081122334455', 'Jakarta');

-- --------------------------------------------------------

--
-- Table structure for table `jadwal`
--

CREATE TABLE `jadwal` (
  `Id_Jadwal` int(11) NOT NULL,
  `Kode_Matakuliah_Jadwal` varchar(50) NOT NULL,
  `NIP_Jadwal` varchar(50) NOT NULL,
  `Kode_Ruangan_Jadwal` varchar(50) NOT NULL,
  `Kode_Jurusan_Jadwal` varchar(50) NOT NULL,
  `Hari` varchar(50) NOT NULL,
  `Jam` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `jadwal`
--

INSERT INTO `jadwal` (`Id_Jadwal`, `Kode_Matakuliah_Jadwal`, `NIP_Jadwal`, `Kode_Ruangan_Jadwal`, `Kode_Jurusan_Jadwal`, `Hari`, `Jam`) VALUES
(16, 'IF01', '1301142403', 'A01', 'IF', 'Senin', '10:42-12:36'),
(17, 'IF02', '1301142403', 'A02', 'IF', 'Selasa', '10:46-12:46'),
(18, 'IF03', '1301142403', 'A03', 'IF', 'Rabu', '10:46-12:46');

-- --------------------------------------------------------

--
-- Table structure for table `jenjang`
--

CREATE TABLE `jenjang` (
  `Kode_Jenjang` varchar(50) NOT NULL,
  `Nama_Jenjang` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `jenjang`
--

INSERT INTO `jenjang` (`Kode_Jenjang`, `Nama_Jenjang`) VALUES
('S1', 'Sarjana');

-- --------------------------------------------------------

--
-- Table structure for table `jurusan`
--

CREATE TABLE `jurusan` (
  `Kode_Jurusan` varchar(50) NOT NULL,
  `Nama_Jurusan` varchar(50) NOT NULL,
  `Kode_Jenjang_Jrs` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `jurusan`
--

INSERT INTO `jurusan` (`Kode_Jurusan`, `Nama_Jurusan`, `Kode_Jenjang_Jrs`) VALUES
('IF', 'TEKNIK INFORMATIKA', 'S1');

-- --------------------------------------------------------

--
-- Table structure for table `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `NIM` varchar(50) NOT NULL,
  `Nama_Mahasiswa` varchar(50) NOT NULL,
  `Tanggal_Lahir` date NOT NULL,
  `JK` enum('L','P') NOT NULL,
  `No_Telp` varchar(50) NOT NULL,
  `Alamat` varchar(150) NOT NULL,
  `Kode_Jurusan_Mhs` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mahasiswa`
--

INSERT INTO `mahasiswa` (`NIM`, `Nama_Mahasiswa`, `Tanggal_Lahir`, `JK`, `No_Telp`, `Alamat`, `Kode_Jurusan_Mhs`) VALUES
('1301142001', 'Fernando', '2019-06-27', 'L', '082260583661', 'Purwakarta', 'IF');

-- --------------------------------------------------------

--
-- Table structure for table `matakuliah`
--

CREATE TABLE `matakuliah` (
  `Kode_Matakuliah` varchar(50) NOT NULL,
  `Nama_Matakuliah` varchar(50) NOT NULL,
  `SKS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `matakuliah`
--

INSERT INTO `matakuliah` (`Kode_Matakuliah`, `Nama_Matakuliah`, `SKS`) VALUES
('IF01', 'Java', 3),
('IF02', 'PYTHON', 3),
('IF03', 'KALKULUS', 4),
('IF04', 'C++', 3),
('IF05', 'Web', 3),
('IF06', 'Agama', 3),
('IF07', 'PBO', 3),
('IF08', 'PTI', 3),
('IF09', 'ASD', 3),
('IF10', 'AI', 4),
('IF11', 'Strukdat', 3);

-- --------------------------------------------------------

--
-- Table structure for table `nilai`
--

CREATE TABLE `nilai` (
  `Id_Nilai` int(11) NOT NULL,
  `NIM_Nilai` varchar(50) NOT NULL,
  `Kode_Matakuliah_Nilai` varchar(50) NOT NULL,
  `Nilai` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `nilai`
--

INSERT INTO `nilai` (`Id_Nilai`, `NIM_Nilai`, `Kode_Matakuliah_Nilai`, `Nilai`) VALUES
(8, '1301142001', 'IF01', 'A'),
(9, '1301142001', 'IF02', 'A'),
(10, '1301142001', 'IF03', 'A');

-- --------------------------------------------------------

--
-- Table structure for table `ruangan`
--

CREATE TABLE `ruangan` (
  `Kode_Ruangan` varchar(50) NOT NULL,
  `Nama_Ruangan` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ruangan`
--

INSERT INTO `ruangan` (`Kode_Ruangan`, `Nama_Ruangan`) VALUES
('A01', 'Pemograman-A01'),
('A02', 'Python-A02'),
('A03', 'Kalkulus-A03');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `Id_User` int(11) NOT NULL,
  `Id_Usergroup_User` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Foto` varchar(150) NOT NULL DEFAULT 'mahasiswa.png'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`Id_User`, `Id_Usergroup_User`, `Username`, `Password`, `Foto`) VALUES
(1, 1, 'admin', '$2y$10$V7zDd2Fz3QBmWFz3UnZBM.vjDK.AOTTjIdssUY8rhcBjEEJrxY7ma', 'mahasiswa.png'),
(22, 2, '1301142403', '$2y$10$GZLOcUezcO5OHMwfKFwt4e.L3zIgbi3.eP8gP2tmj820EX8dqAfD2', 'mahasiswa.png'),
(23, 3, '1301142001', '$2y$10$v85BgVwpv9VFpjZsHB1a8uFpSdckQnAYx5q7ZH6tew0Mlxz.HSqYO', 'mahasiswa.png');

-- --------------------------------------------------------

--
-- Table structure for table `usergroup`
--

CREATE TABLE `usergroup` (
  `Id_Usergroup` int(11) NOT NULL,
  `Nama_Usergroup` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usergroup`
--

INSERT INTO `usergroup` (`Id_Usergroup`, `Nama_Usergroup`) VALUES
(1, 'Administrator'),
(2, 'Dosen'),
(3, 'Mahasiswa');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dosen`
--
ALTER TABLE `dosen`
  ADD PRIMARY KEY (`NIP`);

--
-- Indexes for table `jadwal`
--
ALTER TABLE `jadwal`
  ADD PRIMARY KEY (`Id_Jadwal`),
  ADD KEY `FK_jadwal_dosen` (`NIP_Jadwal`),
  ADD KEY `FK_jadwal_ruangan` (`Kode_Ruangan_Jadwal`),
  ADD KEY `FK_jadwal_matakuliah` (`Kode_Matakuliah_Jadwal`),
  ADD KEY `FK_jadwal_jurusan` (`Kode_Jurusan_Jadwal`);

--
-- Indexes for table `jenjang`
--
ALTER TABLE `jenjang`
  ADD PRIMARY KEY (`Kode_Jenjang`);

--
-- Indexes for table `jurusan`
--
ALTER TABLE `jurusan`
  ADD PRIMARY KEY (`Kode_Jurusan`),
  ADD KEY `FK_jurusan_jenjang` (`Kode_Jenjang_Jrs`);

--
-- Indexes for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD PRIMARY KEY (`NIM`),
  ADD KEY `FK_mahasiswa_jurusan` (`Kode_Jurusan_Mhs`);

--
-- Indexes for table `matakuliah`
--
ALTER TABLE `matakuliah`
  ADD PRIMARY KEY (`Kode_Matakuliah`);

--
-- Indexes for table `nilai`
--
ALTER TABLE `nilai`
  ADD PRIMARY KEY (`Id_Nilai`),
  ADD KEY `FK_nilai_mahasiswa` (`NIM_Nilai`),
  ADD KEY `FK_nilai_matakuliah` (`Kode_Matakuliah_Nilai`);

--
-- Indexes for table `ruangan`
--
ALTER TABLE `ruangan`
  ADD PRIMARY KEY (`Kode_Ruangan`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Id_User`),
  ADD KEY `FK_user_usergroup` (`Id_Usergroup_User`);

--
-- Indexes for table `usergroup`
--
ALTER TABLE `usergroup`
  ADD PRIMARY KEY (`Id_Usergroup`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `jadwal`
--
ALTER TABLE `jadwal`
  MODIFY `Id_Jadwal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `nilai`
--
ALTER TABLE `nilai`
  MODIFY `Id_Nilai` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `Id_User` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `usergroup`
--
ALTER TABLE `usergroup`
  MODIFY `Id_Usergroup` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `jadwal`
--
ALTER TABLE `jadwal`
  ADD CONSTRAINT `FK_jadwal_dosen` FOREIGN KEY (`NIP_Jadwal`) REFERENCES `dosen` (`NIP`),
  ADD CONSTRAINT `FK_jadwal_jurusan` FOREIGN KEY (`Kode_Jurusan_Jadwal`) REFERENCES `jurusan` (`Kode_Jurusan`),
  ADD CONSTRAINT `FK_jadwal_matakuliah` FOREIGN KEY (`Kode_Matakuliah_Jadwal`) REFERENCES `matakuliah` (`Kode_Matakuliah`) ON DELETE CASCADE;

--
-- Constraints for table `jurusan`
--
ALTER TABLE `jurusan`
  ADD CONSTRAINT `FK_jurusan_jenjang` FOREIGN KEY (`Kode_Jenjang_Jrs`) REFERENCES `jenjang` (`Kode_Jenjang`);

--
-- Constraints for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD CONSTRAINT `FK_mahasiswa_jurusan` FOREIGN KEY (`Kode_Jurusan_Mhs`) REFERENCES `jurusan` (`Kode_Jurusan`);

--
-- Constraints for table `nilai`
--
ALTER TABLE `nilai`
  ADD CONSTRAINT `FK_nilai_mahasiswa` FOREIGN KEY (`NIM_Nilai`) REFERENCES `mahasiswa` (`NIM`),
  ADD CONSTRAINT `FK_nilai_matakuliah` FOREIGN KEY (`Kode_Matakuliah_Nilai`) REFERENCES `matakuliah` (`Kode_Matakuliah`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_user_usergroup` FOREIGN KEY (`Id_Usergroup_User`) REFERENCES `usergroup` (`Id_Usergroup`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
