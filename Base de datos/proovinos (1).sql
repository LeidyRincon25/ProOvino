-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-06-2024 a las 02:45:29
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET FOREIGN_KEY_CHECKS=0;
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
(2, 'Borrega'),
(3, 'Cordero'),
(4, 'Borrego');

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
  `MediVia` varchar(100) NOT NULL,
  `IdRegOvino` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbmedicamentos`
--

INSERT INTO `tbmedicamentos` (`IdMedicamentos`, `MediNombre`, `MediPresentacion`, `MediDosis`, `MediVia`, `IdRegOvino`) VALUES
(1, 'Oxitetraciclina', 'Solucion', '10mg/kg', 'Intramuscular', 1),
(2, 'Ivermectina', 'Solucion inyectable', '200mg/kg', 'Subcutanea', 3);

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
(3, 'Hampshire');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbregovino`
--

DROP TABLE IF EXISTS `tbregovino`;
CREATE TABLE `tbregovino` (
  `IdRegOvino` int(10) NOT NULL,
  `RegFechadeNacimiento` date NOT NULL,
  `RegEdad` varchar(20) NOT NULL,
  `RegPeso` varchar(100) NOT NULL,
  `RegAntecedentes` text NOT NULL,
  `Idcategoria` int(10) NOT NULL,
  `IdRaza` int(10) NOT NULL,
  `IdUsuario` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbregovino`
--

INSERT INTO `tbregovino` (`IdRegOvino`, `RegFechadeNacimiento`, `RegEdad`, `RegPeso`, `RegAntecedentes`, `Idcategoria`, `IdRaza`, `IdUsuario`) VALUES
(1, '2019-12-10', '4 años', '80kg', 'Ninguno', 1, 1, 3),
(2, '2023-05-24', ' 7meses', '20kg', 'Ninguno', 2, 3, 3),
(3, '2018-10-27', '6 años', '100kg', 'Ninguno', 3, 2, 3),
(4, '2022-12-06', '1 año', '45kg', 'Ninguno', 4, 3, 3);

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
  `IdRegOvino` int(10) NOT NULL,
  `Idcategoria` int(10) NOT NULL,
  `IdRaza` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbregsalud`
--

INSERT INTO `tbregsalud` (`IdRegSalud`, `RegFecha`, `RegEnfermedades`, `RegTratamiento`, `IdMedicamentos`, `IdRegOvino`, `Idcategoria`, `IdRaza`) VALUES
(1, '2023-12-12', 'tetano', '10mg/kg/3dias', 1, 1, 3, 2),
(2, '2023-12-12', 'antiparasitario', '1ml/50kg ', 2, 2, 1, 3);

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
(1, 'Leidy Maela', 'Nempeque Rincon', '1057608937', '3228383579', 'rinconleidy020@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 1),
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
('2b27688dc27220ef74283e910f41e8a1', '1', 'Leidy Maela Nempeque Rincon', '2024-06-18', '19:38:53', 'ACTIVO');

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
  ADD PRIMARY KEY (`IdMedicamentos`),
  ADD KEY `TbMedicamentos_fk0` (`IdRegOvino`);

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
  ADD KEY `TbRegSalud_fk1` (`IdRegOvino`),
  ADD KEY `TbRegSalud_fk2` (`Idcategoria`),
  ADD KEY `TbRegSalud_fk3` (`IdRaza`);

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
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tbmedicamentos`
--
ALTER TABLE `tbmedicamentos`
  ADD CONSTRAINT `TbMedicamentos_fk0` FOREIGN KEY (`IdRegOvino`) REFERENCES `tbregovino` (`IdRegOvino`);

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
  ADD CONSTRAINT `TbRegSalud_fk1` FOREIGN KEY (`IdRegOvino`) REFERENCES `tbregovino` (`IdRegOvino`),
  ADD CONSTRAINT `TbRegSalud_fk2` FOREIGN KEY (`Idcategoria`) REFERENCES `tbcategoria` (`IdCategoria`),
  ADD CONSTRAINT `TbRegSalud_fk3` FOREIGN KEY (`IdRaza`) REFERENCES `tbraza` (`IdRaza`);

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
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
