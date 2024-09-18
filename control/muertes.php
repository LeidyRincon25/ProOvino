<?php

require_once("configdb.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $post = json_decode(file_get_contents('php://input'), true);       
        if($post["fecha"]!="" && $post["causa"]!="" && $post["id_animal"]!="")
        $bd = new ConfigDb(); {
            $bd = new ConfigDb();
            $conn = $bd->conexion();
            $sql = "INSERT INTO `tbmortalidad`(`IdMortalidad`, `MortaFecha`, `MortaCausa`, `IdRegOvino`) VALUES (null, :MortaFecha, :MortaCausa, :Id_Animal)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":MortaFecha",$post["fecha"],PDO::PARAM_STR);
            $stmt->bindParam(":MortaCausa",$post["causa"],PDO::PARAM_STR);
            $stmt->bindParam(":Id_Animal",$post["id_animal"],PDO::PARAM_INT);
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
            //$sql = "SELECT `IdMortalidad`, `MortaFecha`, `MortaCausa`, `IdRegOvino` FROM `tbmortalidad` ORDER BY `MortaFecha` ASC";
            $sql="SELECT m.`IdMortalidad`, m.`MortaFecha`, m.`MortaCausa`, m.`IdRegOvino`, o.`RegFechadeNacimiento`, o.`RegSexo`, o.`RegPeso`, o.`RegAntecedentes` FROM `tbmortalidad` m INNER JOIN `tbregovino` o ON (m.IdRegOvino=o.IdRegOvino) ORDER BY `MortaFecha` ASC";
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