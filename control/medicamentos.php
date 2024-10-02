





<?php

require_once("configdb.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $post = json_decode(file_get_contents('php://input'), true);       
        if ($post["MediNombre"] != "" && $post["MediPresentacion"] != "") {
            $bd = new ConfigDb();
            $conn = $bd->conexion();
            $sql = "INSERT INTO `tbmedicamentos`(`IdMedicamentos`, `MediNombre`, `MediPresentacion`) 
                    VALUES (null, :MediNombre, :MediPresentacion)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":MediNombre", $post["MediNombre"], PDO::PARAM_STR);
            $stmt->bindParam(":MediPresentacion", $post["MediPresentacion"], PDO::PARAM_STR);
            if ($stmt->execute()) {                
                header("HTTP/1.1 200 OK");
                echo json_encode(['code' => 200, 'msg' => "OK"]);
            } else {
                header("HTTP/1.1 403 OK");
                echo json_encode(['code' => 203, 'msg' => "Inconvenientes al gestionar la consulta"]);
            }
            $stmt = null;
            $conn = null;
        }
    } catch (Exception $ex) {
        header("HTTP/1.1 500");
        echo json_encode(['code' => 500, 'msg' => 'Error interno al procesar su petición', "ERROR" => $ex->getMessage()]);
    }
} else if($_SERVER["REQUEST_METHOD"]=="GET"){
    try {
        //if($_GET["id"]!=""){}
            $info = array();
            $bd = new ConfigDb();
            $conn = $bd->conexion();
            $sql = "SELECT `IdMedicamentos`, `MediNombre`, `MediPresentacion` FROM `tbmedicamentos` ORDER BY `MediNombre` ASC";
            $stmt = $conn ->prepare($sql);
            if($stmt->execute()){                
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                //var_dump($result);
                header("HTTP/1.1 200 OK");
                echo json_encode(['code'=>200,'data'=>$result,'msg' => "OK"]); 
            }else{
                header("HTTP/1.1 400");
                echo json_encode(['code'=>400,'msg' => 'Error, La peticion no se pudo procesar']);
            }                       
            $stmt = null;
            $conn = null;
    } catch (Exception $ex) {
        header("HTTP/1.1 500");
        echo json_encode(['code'=>500,'msg' => 'Error interno al procesar su petici&oacute;n', "ERROR"=>$ex->getMessage
()]);
    }
} else {
    header("HTTP/1.1 400");
    echo json_encode(['code'=>400,'msg' => 'Error, La peticion no se pudo procesar']);
}

?>