<?php
require_once("configdb.php");

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    try {
        $info = array();
        $bd = new ConfigDb();
        $conn = $bd->conexion();

        if (isset($_GET["id"]) && !empty($_GET["id"])) {
            // Aseguramos que el id recibido por GET es un entero para evitar inyecciones SQL.
            $id = intval($_GET["id"]);
            $sql = "SELECT tbmortalidad.MortaFecha, tbmortalidad.MortaCausa, tbregovino.IdRegOvino 
                    FROM tbmortalidad 
                    INNER JOIN tbregovino 
                    ON tbmortalidad.IdRegOvino = tbregovino.IdRegOvino
                    WHERE tbmortalidad.IdRegOvino = :id";
        } else {
            $sql = "SELECT tbmortalidad.MortaFecha, tbmortalidad.MortaCausa, tbregovino.IdRegOvino 
                    FROM tbmortalidad 
                    INNER JOIN tbregovino 
                    ON tbmortalidad.IdRegOvino = tbregovino.IdRegOvino";
        }

        $stmt = $conn->prepare($sql);

        if (isset($id)) {
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        }

        if ($stmt->execute()) {
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            header("HTTP/1.1 200 OK");
            echo json_encode(['code' => 200, 'data' => $result, 'msg' => "OK"]);
        } else {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(['code' => 400, 'msg' => 'Error, la petición no se pudo procesar']);
        }

        $stmt = null;
        $conn = null;
    } catch (Exception $ex) {
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode(['code' => 500, 'msg' => 'Error interno al procesar su petición', "ERROR" => $ex->getMessage()]);
    } finally {
        $conn = null;
    }
} else {
    header("HTTP/1.1 400 Bad Request");
    echo json_encode(['code' => 400, 'msg' => 'Error, la petición no se pudo procesar']);
}
?>


?>