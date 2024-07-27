-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-07-2024 a las 06:30:15
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proovinos`
--
CREATE DATABASE IF NOT EXISTS `proovinos` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `proovinos`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbcategoria`
--

DROP TABLE IF EXISTS `tbcategoria`;
CREATE TABLE `tbcategoria` (
  `IdCategoria` int(10) NOT NULL,
  `CateNombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbcategoria`
--

INSERT INTO `tbcategoria` (`IdCategoria`, `CateNombre`) VALUES
(1, 'Oveja'),
(2, 'Borrego'),
(3, 'Cordero'),
(4, 'Equino');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbcomprador`
--

DROP TABLE IF EXISTS `tbcomprador`;
CREATE TABLE `tbcomprador` (
  `IdComprador` int(10) NOT NULL,
  `ComIdentificacion` varchar(100) NOT NULL,
  `ComNombre` varchar(100) NOT NULL,
  `ComApellido` varchar(100) NOT NULL,
  `ComCelular` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbcomprador`
--

INSERT INTO `tbcomprador` (`IdComprador`, `ComIdentificacion`, `ComNombre`, `ComApellido`, `ComCelular`) VALUES
(1, '1044567832', 'Javier', 'Chaparro', '3102922154'),
(2, '24567305', 'Jose', 'Gonzales', '312456789'),
(3, '1055244670', 'Martha', 'Medina', '3166438870');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbmedicamentos`
--

DROP TABLE IF EXISTS `tbmedicamentos`;
CREATE TABLE `tbmedicamentos` (
  `IdMedicamentos` int(10) NOT NULL,
  `MediNombre` varchar(100) NOT NULL,
  `MediPresentacion` varchar(100) NOT NULL,
  `MediDosis` varchar(100) NOT NULL,
  `MediVia` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbmedicamentos`
--

INSERT INTO `tbmedicamentos` (`IdMedicamentos`, `MediNombre`, `MediPresentacion`, `MediDosis`, `MediVia`) VALUES
(1, 'Oxitetraciclina', 'Solucion', '10mg/kg', 'Intramuscular'),
(2, 'Ivermectina', 'Solucion inyectable', '200mg/kg', 'Subcutanea');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbraza`
--

DROP TABLE IF EXISTS `tbraza`;
CREATE TABLE `tbraza` (
  `IdRaza` int(10) NOT NULL,
  `RazaNombres` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbraza`
--

INSERT INTO `tbraza` (`IdRaza`, `RazaNombres`) VALUES
(1, 'Criolla'),
(2, 'Dorper'),
(3, 'Hampshire'),
(4, 'Merina');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbregovino`
--

DROP TABLE IF EXISTS `tbregovino`;
CREATE TABLE `tbregovino` (
  `IdRegOvino` int(10) NOT NULL,
  `RegFechadeNacimiento` date NOT NULL,
  `RegSexo` varchar(20) NOT NULL,
  `RegPeso` varchar(100) NOT NULL,
  `RegAntecedentes` text NOT NULL,
  `Idcategoria` int(10) NOT NULL,
  `IdRaza` int(10) NOT NULL,
  `IdUsuario` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbregovino`
--

INSERT INTO `tbregovino` (`IdRegOvino`, `RegFechadeNacimiento`, `RegSexo`, `RegPeso`, `RegAntecedentes`, `Idcategoria`, `IdRaza`, `IdUsuario`) VALUES
(1, '2019-12-10', 'Hembra', '80', 'Ninguno', 1, 1, 3),
(2, '2023-05-24', 'Macho', '20', 'Ninguno', 2, 3, 3),
(6, '2024-06-05', 'Macho', '20', 'Le faltan todas sus vacunas', 3, 1, 1),
(7, '2024-05-14', 'Hembra', '8', 'Al dia con sus vacunas', 3, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbregsalud`
--

DROP TABLE IF EXISTS `tbregsalud`;
CREATE TABLE `tbregsalud` (
  `IdRegSalud` int(10) NOT NULL,
  `RegFecha` date NOT NULL,
  `RegEnfermedades` varchar(100) NOT NULL,
  `RegTratamiento` text NOT NULL,
  `IdMedicamentos` int(10) NOT NULL,
  `IdRegOvino` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbregsalud`
--

INSERT INTO `tbregsalud` (`IdRegSalud`, `RegFecha`, `RegEnfermedades`, `RegTratamiento`, `IdMedicamentos`, `IdRegOvino`) VALUES
(1, '2023-12-12', 'tetano', '10mg/kg', 1, 1),
(2, '2023-12-12', 'antiparasitario', '1ml/50kg ', 2, 2),
(3, '2023-12-13', 'tetano', '10mg/kg', 1, 1),
(4, '2023-12-14', 'tetano', '10mg/kg', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbrol`
--

DROP TABLE IF EXISTS `tbrol`;
CREATE TABLE `tbrol` (
  `IdRol` int(10) NOT NULL,
  `RolNombres` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbrol`
--

INSERT INTO `tbrol` (`IdRol`, `RolNombres`) VALUES
(1, 'Desarrollador'),
(2, 'Administrador'),
(3, 'Empleada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbusuario`
--

DROP TABLE IF EXISTS `tbusuario`;
CREATE TABLE `tbusuario` (
  `IdUsuario` int(10) NOT NULL,
  `UsuNombre` varchar(100) NOT NULL,
  `UsuApellido` varchar(100) NOT NULL,
  `Identificacion` varchar(100) NOT NULL,
  `UsuTelefono` varchar(100) NOT NULL,
  `UsuCorreo` varchar(100) NOT NULL,
  `UsuContrasena` varchar(100) NOT NULL,
  `IdRol` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbusuario`
--

INSERT INTO `tbusuario` (`IdUsuario`, `UsuNombre`, `UsuApellido`, `Identificacion`, `UsuTelefono`, `UsuCorreo`, `UsuContrasena`, `IdRol`) VALUES
(1, 'Leidy Maela', 'Nempeque Rincon', '1057608937', '3228383579', 'rinconleidy020@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', 1),
(2, 'Ricardo Andres', 'Diaz Alba', '1055315244', '3112656859', 'ricardo3112656859@gmail.com', 'f99f135f65b6a774614c2e05744290e9', 2),
(3, 'Nicol Dayana', 'Castro Nempeque', '23165103', '3202583966', 'nicolcastro2013@hotmail.com', '0ffb605ed5a3c7ce2b71b17f49104a15', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbventa`
--

DROP TABLE IF EXISTS `tbventa`;
CREATE TABLE `tbventa` (
  `IdVenta` int(10) NOT NULL,
  `VenFecha` date NOT NULL,
  `VenPrecio` float NOT NULL,
  `VenCantidad` varchar(100) NOT NULL,
  `IdCategoria` int(10) NOT NULL,
  `IdRaza` int(10) NOT NULL,
  `IdComprador` int(10) NOT NULL,
  `IdOvino` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbventa`
--

INSERT INTO `tbventa` (`IdVenta`, `VenFecha`, `VenPrecio`, `VenCantidad`, `IdCategoria`, `IdRaza`, `IdComprador`, `IdOvino`) VALUES
(1, '2023-12-12', 300, '1', 1, 3, 2, 1),
(2, '2023-12-12', 600, '3', 2, 1, 1, 2),
(3, '2023-12-12', 800, '1', 3, 2, 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `token_acceso`
--

DROP TABLE IF EXISTS `token_acceso`;
CREATE TABLE `token_acceso` (
  `ID_TOKEN` varchar(100) NOT NULL,
  `ID_USUARIO_FK` varchar(50) NOT NULL,
  `USUARIO` varchar(200) NOT NULL,
  `FECHA_REG` varchar(20) NOT NULL,
  `HORA_REG` varchar(20) NOT NULL,
  `ESTADO` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `token_acceso`
--

INSERT INTO `token_acceso` (`ID_TOKEN`, `ID_USUARIO_FK`, `USUARIO`, `FECHA_REG`, `HORA_REG`, `ESTADO`) VALUES
('2b27688dc27220ef74283e910f41e8a1', '1', 'Leidy Maela Nempeque Rincon', '2024-06-18', '19:38:53', 'INACTIVO'),
('fd869cc54b059b66dba13bf379fb72d0', '1', 'Leidy Maela Nempeque Rincon', '2024-07-05', '20:11:04', 'INACTIVO'),
('90a25e0d06bd1e3c4ce5843eff3bfa30', '1', 'Leidy Maela Nempeque Rincon', '2024-07-05', '20:13:27', 'INACTIVO'),
('7002f4c15ae1e6463e106bfa51740fbe', '1', 'Leidy Maela Nempeque Rincon', '2024-07-05', '20:20:21', 'INACTIVO'),
('fe85a50c3b69378f320d4eaafd2c4cc2', '1', 'Leidy Maela Nempeque Rincon', '2024-07-09', '19:43:55', 'INACTIVO'),
('ad0bef55c2f3565480cb1139692a4e4c', '1', 'Leidy Maela Nempeque Rincon', '2024-07-09', '19:45:15', 'INACTIVO'),
('4a259b247df968668f4cad7efefa136d', '1', 'Leidy Maela Nempeque Rincon', '2024-07-11', '21:45:45', 'INACTIVO'),
('d989a069161e5605d610ff3fa28f9c8b', '1', 'Leidy Maela NempequE', '2024-07-11', '21:46:40', 'INACTIVO'),
('2faa4d5c50d3724d5a37925212899625', '1', 'Leidy Maela NempequE', '2024-07-16', '19:20:01', 'INACTIVO'),
('eb50c5659f616c30c1dfe08b97532ba7', '1', 'Leidy Maela NempequE', '2024-07-23', '19:53:05', 'INACTIVO'),
('6cd8257a6a92655f2962ba01dcbe6a14', '1', 'Leidy Maela NempequE', '2024-07-25', '23:27:44', 'INACTIVO');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tbcategoria`
--
ALTER TABLE `tbcategoria`
  ADD PRIMARY KEY (`IdCategoria`);

--
-- Indices de la tabla `tbcomprador`
--
ALTER TABLE `tbcomprador`
  ADD PRIMARY KEY (`IdComprador`);

--
-- Indices de la tabla `tbmedicamentos`
--
ALTER TABLE `tbmedicamentos`
  ADD PRIMARY KEY (`IdMedicamentos`);

--
-- Indices de la tabla `tbraza`
--
ALTER TABLE `tbraza`
  ADD PRIMARY KEY (`IdRaza`);

--
-- Indices de la tabla `tbregovino`
--
ALTER TABLE `tbregovino`
  ADD PRIMARY KEY (`IdRegOvino`),
  ADD KEY `TbRegOvino_fk0` (`Idcategoria`),
  ADD KEY `TbRegOvino_fk1` (`IdRaza`),
  ADD KEY `TbRegOvino_fk2` (`IdUsuario`);

--
-- Indices de la tabla `tbregsalud`
--
ALTER TABLE `tbregsalud`
  ADD PRIMARY KEY (`IdRegSalud`),
  ADD KEY `TbRegSalud_fk0` (`IdMedicamentos`),
  ADD KEY `TbRegSalud_fk1` (`IdRegOvino`);

--
-- Indices de la tabla `tbrol`
--
ALTER TABLE `tbrol`
  ADD PRIMARY KEY (`IdRol`);

--
-- Indices de la tabla `tbusuario`
--
ALTER TABLE `tbusuario`
  ADD PRIMARY KEY (`IdUsuario`),
  ADD KEY `TbUsuario_fk0` (`IdRol`);

--
-- Indices de la tabla `tbventa`
--
ALTER TABLE `tbventa`
  ADD PRIMARY KEY (`IdVenta`),
  ADD KEY `TbVenta_fk0` (`IdCategoria`),
  ADD KEY `TbVenta_fk1` (`IdRaza`),
  ADD KEY `TbVenta_fk2` (`IdComprador`),
  ADD KEY `TbVenta_fk3` (`IdOvino`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tbmedicamentos`
--
ALTER TABLE `tbmedicamentos`
  MODIFY `IdMedicamentos` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tbregovino`
--
ALTER TABLE `tbregovino`
  MODIFY `IdRegOvino` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tbregsalud`
--
ALTER TABLE `tbregsalud`
  MODIFY `IdRegSalud` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tbregovino`
--
ALTER TABLE `tbregovino`
  ADD CONSTRAINT `TbRegOvino_fk0` FOREIGN KEY (`Idcategoria`) REFERENCES `tbcategoria` (`IdCategoria`),
  ADD CONSTRAINT `TbRegOvino_fk1` FOREIGN KEY (`IdRaza`) REFERENCES `tbraza` (`IdRaza`),
  ADD CONSTRAINT `TbRegOvino_fk2` FOREIGN KEY (`IdUsuario`) REFERENCES `tbusuario` (`IdUsuario`);

--
-- Filtros para la tabla `tbregsalud`
--
ALTER TABLE `tbregsalud`
  ADD CONSTRAINT `TbRegSalud_fk0` FOREIGN KEY (`IdMedicamentos`) REFERENCES `tbmedicamentos` (`IdMedicamentos`),
  ADD CONSTRAINT `TbRegSalud_fk1` FOREIGN KEY (`IdRegOvino`) REFERENCES `tbregovino` (`IdRegOvino`);

--
-- Filtros para la tabla `tbusuario`
--
ALTER TABLE `tbusuario`
  ADD CONSTRAINT `TbUsuario_fk0` FOREIGN KEY (`IdRol`) REFERENCES `tbrol` (`IdRol`);

--
-- Filtros para la tabla `tbventa`
--
ALTER TABLE `tbventa`
  ADD CONSTRAINT `TbVenta_fk0` FOREIGN KEY (`IdCategoria`) REFERENCES `tbcategoria` (`IdCategoria`),
  ADD CONSTRAINT `TbVenta_fk1` FOREIGN KEY (`IdRaza`) REFERENCES `tbraza` (`IdRaza`),
  ADD CONSTRAINT `TbVenta_fk2` FOREIGN KEY (`IdComprador`) REFERENCES `tbcomprador` (`IdComprador`),
  ADD CONSTRAINT `TbVenta_fk3` FOREIGN KEY (`IdOvino`) REFERENCES `tbregovino` (`IdRegOvino`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
