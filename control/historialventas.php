<?php

require_once("configdb.php");

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    try {
        $info = array();
        $bd = new ConfigDb();
        $conn = $bd->conexion();
        
        if (isset($_GET["id"])) {
            $id = trim($_GET["id"]);
            $sql = "SELECT v.`IdVenta`, v.`VenFecha`, v.`VenPrecio`, v.`VenCantidad`, v.`VenComprador`, v.`VenCelular`, v.`IdOvino`, c.`CateNombre`, r.`RazaNombres` AS 'Raza'
                    FROM `tbVenta` v
                    JOIN `tbcategoria` c ON v.`IdCategoria` = c.`IdCategoria`
                    JOIN `tbraza` r ON v.`IdRaza` = r.`IdRaza`
                    WHERE v.`IdRegOvino` = :id
                    ORDER BY v.`VenFecha` DESC";
        }
        
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_STR);
        
        if ($stmt->execute()) {                
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            header("HTTP/1.1 200 OK"); 
            echo json_encode(['code' => 200, 'data' => $result, 'msg' => "OK"]); 
        } else {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(['code' => 400, 'msg' => 'Error, La petición no se pudo procesar']);
        }                        
        $stmt = null;
        $conn = null;
    } catch (Exception $ex) {
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode(['code' => 500, 'msg' => 'Error interno al procesar su petición', "ERROR" => $ex->getMessage()]);
    }
} else {
    header("HTTP/1.1 400 Bad Request");
    echo json_encode(['code' => 400, 'msg' => 'Error, La petición no se pudo procesar']);
}
?>
