<?php
require_once("configdb.php");

//header('Content-Type: application/json');
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    try {
        $bd = new ConfigDb();
        $conn = $bd->conexion(); 

        // INNER JOIN entre tbreproducción y tbovino
        $sql = "SELECT r.IdReproduccion, r.ReFechadelServicio, r.ReMetododeServicio, r.ReResultadodelServicio, 
                       r.ReFechadeParto, r.ReHoradelParto, r.ReNumerodeVivos, r.ReNumerodeMuertos, r.ReNumerodeMachos, 
                       r.ReNumerodeHembras, o.NombreOvino
                FROM tbreproducción AS r
                INNER JOIN tbovino AS o ON r.IdRegOvino = o.IdOvino";

        $stmt = $conn->prepare($sql);

        if ($stmt->execute()) {                
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            // Enviar los resultados como JSON
            header("HTTP/1.1 200 OK");
            echo json_encode(['code' => 200, 'data' => $result, 'msg' => "OK"]); 
        } else {
            header("HTTP/1.1 400");
            echo json_encode(['code' => 400, 'msg' => 'Error, la petición no se pudo procesar']);
        }

        $stmt = null;
        $conn = null;
    } catch (PDOException $ex) {
        header("HTTP/1.1 500");
        echo json_encode(['code' => 500, 'msg' => 'Error interno al procesar su petición', "ERROR" => $ex->getMessage()]);
    }
}
?>
