<?php
require_once("configdb.php");

//header('Content-Type: application/json');
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        try {
            $post = json_decode(file_get_contents('php://input'), true);
            if (!empty($post["UsuCorreo"])) {
    
                $bd = new ConfigDb();
                $conn = $bd->conexion();
                $sql = "INSERT INTO `tbusuario`(`IdUsuario`, `UsuNombre`, `UsuApellido`, `Identificacion`, `UsuTelefono`, `UsuCorreo`, `UsuContrasena`, `IdRol`) VALUES ('UsuCorreo')";
                
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(":UsuCorreo", $post["UsuCorreo"], PDO::PARAM_STR);
                if ($stmt->execute()) {
                    header("HTTP/1.1 200 OK");
                    echo json_encode(['code' => 200, 'msg' => "OK"]);
                } else {
                    header("HTTP/1.1 403");
                    echo json_encode(['code' => 203, 'msg' => "Inconvenientes al gestionar la consulta"]);
                }
                $stmt = null;
                $conn = null;
            } else {
                header("HTTP/1.1 400");
                echo json_encode(['code' => 400, 'msg' => 'Campos faltantes o inválidos']);
            }
        } catch (PDOException $ex) {
            header("HTTP/1.1 500");
            echo json_encode(['code' => 500, 'msg' => 'Error interno', 'ERROR' => $ex->getMessage()]);
        }
    }
    