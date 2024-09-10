<?php
require_once("configdb.php");

//header('Content-Type: application/json');
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        try {
            $post = json_decode(file_get_contents('php://input'), true);
            if (!empty($post["fechadelservicio"]) && !empty($post["metododeservicio"]) && !empty($post["resultadodelservicio"]) &&
                !empty($post["fechadeparto"]) && !empty($post["horadelparto"]) && isset($post["numerodevivos"]) &&
                isset($post["numerodemachos"]) && isset($post["numerodemachos"]) && isset($post["numerodehembras"]) &&
                isset($post["id_animal"])) {
    
                $bd = new ConfigDb();
                $conn = $bd->conexion();
                $sql = "INSERT INTO `tbreproducción`(`IdReproduccion`, `ReFechadelServicio`, `ReMetododeServicio`, `ReResultadodelServicio`, `ReFechadeParto`, `ReHoradelParto`, `ReNumerodeVivos`, `ReNumerodeMuertos`, `ReNumerodeMachos`, `ReNumerodeHembras`, `IdRegOvino`) 
                VALUES (null, :FechadelServicio, :MetododeServicio, :ResultadodelServicio, :FechadeParto, :HoradelParto, :NumerodeVivos, :NumerodeMuertos, :NumerodeMachos, :NumerodeHembras, :Id_Animal )";
                
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(":FechadelServicio", $post["fechadelservicio"], PDO::PARAM_STR);
                $stmt->bindParam(":MetododeServicio", $post["metododeservicio"], PDO::PARAM_STR);
                $stmt->bindParam(":ResultadodelServicio", $post["resultadodelservicio"], PDO::PARAM_STR);
                $stmt->bindParam(":FechadeParto", $post["fechadeparto"], PDO::PARAM_STR);
                $stmt->bindParam(":HoradelParto", $post["horadelparto"], PDO::PARAM_STR);
                $stmt->bindParam(":NumerodeVivos", $post["numerodevivos"], PDO::PARAM_INT);
                $stmt->bindParam(":NumerodeMuertos", $post["numerodemuertos"], PDO::PARAM_INT);
                $stmt->bindParam(":NumerodeMachos", $post["numerodemachos"], PDO::PARAM_INT);
                $stmt->bindParam(":NumerodeHembras", $post["numerodehembras"], PDO::PARAM_INT);
                $stmt->bindParam(":Id_Animal", $post["id_animal"], PDO::PARAM_INT);
    
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
    

 else if($_SERVER["REQUEST_METHOD"]=="GET"){
    try {
        $bd = new ConfigDb();
        $conn = $bd->conexion(); 
        $sql = "SELECT `IdReproduccion`, `ReFechadelServicio`, `ReMetododeServicio`, `ReResultadodelServicio`, `ReFechadeParto`, `ReHoradelParto`, `ReNumerodeVivos`, `ReNumerodeMuertos`, `ReNumerodeMachos`, `ReNumerodeHembras`, `IdRegOvino` FROM `tbreproducción`";
        $stmt = $conn->prepare($sql);
        if($stmt->execute()){                
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            //var_dump($result);
            header("HTTP/1.1 200 OK");
            echo json_encode(['code'=>200,'data'=>$result,'msg' => "OK"]); 
        } else {
            header("HTTP/1.1 400");
            echo json_encode(['code'=>400,'msg' => 'Error, La peticion no se pudo procesar']);
        }  
        $stmt = null;
        $conn = null;
    } catch (PDOException $ex) {
        header("HTTP/1.1 500");
        echo json_encode(['code'=>500,'msg' => 'Error interno al procesar su petición', "ERROR"=>$ex->getMessage()]);
    }
}

