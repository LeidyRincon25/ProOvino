-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-08-2024 a las 03:25:24
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbcategoria`
--

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
-- Estructura de tabla para la tabla `tbmedicamentos`
--

CREATE TABLE `tbmedicamentos` (
  `IdMedicamentos` int(10) NOT NULL,
  `MediNombre` varchar(100) NOT NULL,
  `MediPresentacion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbmedicamentos`
--

INSERT INTO `tbmedicamentos` (`IdMedicamentos`, `MediNombre`, `MediPresentacion`) VALUES
(1, 'Oxitetraciclina', 'inyectable'),
(2, 'Ivermectina', 'tabletas'),
(3, 'oxisol', 'Locion ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbmortalidad`
--

CREATE TABLE `tbmortalidad` (
  `IdMortalidad` int(10) NOT NULL,
  `MortaFecha` date NOT NULL,
  `MortaSexo` varchar(20) NOT NULL,
  `MortaCausa` text NOT NULL,
  `IdRegOvino` int(10) NOT NULL,
  `IdCategoria` int(10) NOT NULL,
  `IdRaza` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbraza`
--

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
(1, '2019-12-10', 'Macho', '90', 'ninguno', 3, 3, 3),
(2, '2023-05-24', 'Hembra', '78', 'Ninguno', 2, 3, 3),
(3, '2018-10-27', 'Macho', '21', 'Ninguno', 3, 2, 3),
(4, '2023-06-16', 'Hembra', '45', 'ninguno', 1, 1, 1),
(5, '2023-06-16', 'Hembra', '45', 'ninguno', 1, 1, 1),
(7, '2024-08-13', 'Hembra', '50', 'Ninguno', 2, 1, 1),
(8, '2024-08-23', 'Macho', '67', 'no tiene vacunas', 2, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbregsalud`
--

CREATE TABLE `tbregsalud` (
  `IdRegSalud` int(10) NOT NULL,
  `RegFecha` date NOT NULL,
  `RegEnfermedades` varchar(100) NOT NULL,
  `RegTratamiento` text NOT NULL,
  `IdMedicamentos` int(10) NOT NULL,
  `IdRegOvino` int(10) NOT NULL,
  `RegVia` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbregsalud`
--

INSERT INTO `tbregsalud` (`IdRegSalud`, `RegFecha`, `RegEnfermedades`, `RegTratamiento`, `IdMedicamentos`, `IdRegOvino`, `RegVia`) VALUES
(1, '2024-07-11', 'tetano', '3mg', 2, 3, 1),
(2, '2024-06-20', 'Sarna', '10mg/ml', 2, 2, 1),
(5, '2024-08-13', 'tetano', '3ml cada 3 dias', 2, 1, 2),
(6, '2024-08-09', 'tetano', '3ml cada 3 dias', 1, 1, 4),
(7, '2021-02-15', 'Parasitosis', '6 ml cada 2 dia', 1, 2, 2),
(8, '2021-02-15', 'Parasitosis', '6 ml cada 2 dia', 1, 2, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbrol`
--

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
(2, 'Diana', 'Rincon', '34567234', '320245689', 'dianarincon07@gmail.com', 'f99f135f65b6a774614c2e05744290e9', 2),
(3, 'Nicol Dayana', 'Castro Nempeque', '23165103', '3202583966', 'nicolcastro2013@hotmail.com', '0ffb605ed5a3c7ce2b71b17f49104a15', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbventa`
--

CREATE TABLE `tbventa` (
  `IdVenta` int(10) NOT NULL,
  `VenFecha` date NOT NULL,
  `VenPrecio` varchar(100) NOT NULL,
  `VenCantidad` varchar(100) NOT NULL,
  `VenComprador` varchar(100) NOT NULL,
  `VenCelular` varchar(100) NOT NULL,
  `IdCategoria` int(10) NOT NULL,
  `IdRaza` int(10) NOT NULL,
  `IdRegOvino` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbventa`
--

INSERT INTO `tbventa` (`IdVenta`, `VenFecha`, `VenPrecio`, `VenCantidad`, `VenComprador`, `VenCelular`, `IdCategoria`, `IdRaza`, `IdRegOvino`) VALUES
(1, '2023-12-12', '300', '1', 'Juan Perez', '3226789023', 1, 3, 1),
(2, '2023-12-12', '600', '3', 'Marco Rojas', '3122456789', 2, 1, 2),
(3, '2023-12-12', '800', '1', 'Armando Mendoza', '3102376459', 3, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbvia`
--

CREATE TABLE `tbvia` (
  `IdVia` int(10) NOT NULL,
  `ViaNombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbvia`
--

INSERT INTO `tbvia` (`IdVia`, `ViaNombre`) VALUES
(1, 'oral'),
(2, 'intramuscular'),
(3, 'Subcutanea'),
(4, 'Intravenosa'),
(5, 'Intramamaria'),
(10, 'nasal'),
(11, 'transdermica'),
(12, 'ocular');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `token_acceso`
--

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
('5763aca81b1aa87490a6791bd7ddf116', '1', 'Leidy Maela Nempeque Rincon', '2024-06-18', '21:51:50', 'INACTIVO'),
('3cd685fa96198b5ba656e985c629f1e7', '1', 'Leidy Maela Nempeque Rincon', '2024-06-24', '18:48:47', 'INACTIVO'),
('1924a50ca94973288602ac75f8b42769', '1', 'Leidy Maela Nempeque Rincon', '2024-06-26', '19:26:15', 'ACTIVO'),
('fbae05e8e7a998a954c66dab2c734aaf', '1', 'Leidy Maela Nempeque Rincon', '2024-06-27', '18:31:14', 'ACTIVO'),
('2368993c51b0e162fbe89f6019fe08b8', '1', 'Leidy Maela Nempeque Rincon', '2024-06-27', '19:03:05', 'INACTIVO'),
('25bc9f1cf81536bca15040387e2c9027', '1', 'Leidy Maela Nempeque Rincon', '2024-06-27', '20:06:59', 'ACTIVO'),
('a89a3c5d3f9a6b88741faab7b6ef95f5', '1', 'Leidy Maela Nempeque Rincon', '2024-07-03', '18:44:04', 'ACTIVO'),
('b7bedb7d927aeb1a50f0114e4c0cba45', '1', 'Leidy Maela Nempeque Rincon', '2024-07-19', '20:00:14', 'ACTIVO');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tbcategoria`
--
ALTER TABLE `tbcategoria`
  ADD PRIMARY KEY (`IdCategoria`);

--
-- Indices de la tabla `tbmedicamentos`
--
ALTER TABLE `tbmedicamentos`
  ADD PRIMARY KEY (`IdMedicamentos`);

--
-- Indices de la tabla `tbmortalidad`
--
ALTER TABLE `tbmortalidad`
  ADD PRIMARY KEY (`IdMortalidad`),
  ADD KEY `TbMortalidad_fk0` (`IdRegOvino`),
  ADD KEY `TbMortalidad_fk1` (`IdCategoria`),
  ADD KEY `TbMortalidad_fk2` (`IdRaza`);

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
  ADD KEY `TbRegSalud_fk2` (`RegVia`),
  ADD KEY `TbRegSalud_animal` (`IdRegOvino`);

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
  ADD KEY `tbVenta_fk3` (`IdRegOvino`) USING BTREE;

--
-- Indices de la tabla `tbvia`
--
ALTER TABLE `tbvia`
  ADD PRIMARY KEY (`IdVia`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tbmedicamentos`
--
ALTER TABLE `tbmedicamentos`
  MODIFY `IdMedicamentos` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tbmortalidad`
--
ALTER TABLE `tbmortalidad`
  MODIFY `IdMortalidad` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tbregovino`
--
ALTER TABLE `tbregovino`
  MODIFY `IdRegOvino` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `tbregsalud`
--
ALTER TABLE `tbregsalud`
  MODIFY `IdRegSalud` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `tbvia`
--
ALTER TABLE `tbvia`
  MODIFY `IdVia` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tbmortalidad`
--
ALTER TABLE `tbmortalidad`
  ADD CONSTRAINT `TbMortalidad_fk0` FOREIGN KEY (`IdRegOvino`) REFERENCES `tbregovino` (`IdRegOvino`),
  ADD CONSTRAINT `TbMortalidad_fk1` FOREIGN KEY (`IdCategoria`) REFERENCES `tbcategoria` (`IdCategoria`),
  ADD CONSTRAINT `TbMortalidad_fk2` FOREIGN KEY (`IdRaza`) REFERENCES `tbraza` (`IdRaza`);

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
  ADD CONSTRAINT `TbRegSalud_animal` FOREIGN KEY (`IdRegOvino`) REFERENCES `tbregovino` (`IdRegOvino`),
  ADD CONSTRAINT `TbRegSalud_fk0` FOREIGN KEY (`IdMedicamentos`) REFERENCES `tbmedicamentos` (`IdMedicamentos`),
  ADD CONSTRAINT `tbregsalud_via` FOREIGN KEY (`RegVia`) REFERENCES `tbvia` (`IdVia`);

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
  ADD CONSTRAINT `tbVenta_fk3` FOREIGN KEY (`IdRegOvino`) REFERENCES `tbregovino` (`IdRegOvino`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
