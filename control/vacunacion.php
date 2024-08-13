<?php

require_once("configdb.php");

//header('Content-Type: application/json');
if($_SERVER["REQUEST_METHOD"]=="POST"){
    try {
        $post = json_decode(file_get_contents('php://input'),true);       
        if($post["medi"]!="" && $post["fecha"]!="" && $post["enfe"]!="" && $post["via"]!="" && $post["dosis"]!="" && $post["iduser"]!="" && $post["id_animal"]!="")
        {
            //echo $_post["user"]; 
            $bd = new ConfigDb();
            $conn = $bd->conexion();
            $sql = "INSERT INTO `tbregsalud`(`IdRegSalud`, `RegFecha`, `RegVia`, `RegEnfermedades`, `RegTratamiento`, `IdMedicamentos`, `IdRegOvino`) VALUES ".
            "(null,:FECHA,:VIA,:ENFE,:DOSIS,:IDMEDI,:IDANIMAL)";
            $stmt = $conn ->prepare($sql);
            $stmt->bindParam(":FECHA",$post["fecha"],PDO::PARAM_STR);
            $stmt->bindParam(":VIA",$post["via"],PDO::PARAM_STR);
            $stmt->bindParam(":ENFE",$post["enfe"],PDO::PARAM_STR);
            $stmt->bindParam(":DOSIS",$post["dosis"],PDO::PARAM_STR);
            $stmt->bindParam(":IDMEDI",$post["medi"],PDO::PARAM_INT);
            $stmt->bindParam(":IDANIMAL",$post["id_animal"],PDO::PARAM_INT);
            if($stmt->execute()){                
                    header("HTTP/1.1 200 OK");
                    echo json_encode(['code'=>200,'msg' => "OK"]);
                
            }else{
                header("HTTP/1.1 403 OK");
                echo json_encode(['code'=>203,'msg' => "Inconvenientes al gestionar la consulta"]);
            }
            $stmt = null;
            $conn = null;
        }
    } catch (Exception $ex) {
        header("HTTP/1.1 500");
        echo json_encode(['code'=>500,'msg' => 'Error interno al procesar su petici&oacute;n', "ERROR"=>$ex->getMessage()]);
    }
}else if($_SERVER["REQUEST_METHOD"]=="GET"){
    try {
            $bd = new ConfigDb();
            $conn = $bd->conexion();
            $sql= "SELECT `IdRegSalud` as 'id', t2.MediNombre as 'medi', t3.ViaNombre as 'via',`RegFecha` as 'fn', `RegEnfermedades` as 'enfe', 
            `RegTratamiento` as 'dosis' FROM `tbregsalud` t1, `tbmedicamentos` t2, `tbvia` t3 WHERE t1.IdMedicamentos=t2.IdMedicamentos AND t1.IdVia=t3.IdVia ORDER BY t1.IdRegSalud";
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
        echo json_encode(['code'=>500,'msg' => 'Error interno al procesar su petici&oacute;n', "ERROR"=>$ex->getMessage()]);
    }
} else {
    header("HTTP/1.1 400");
    echo json_encode(['code'=>400,'msg' => 'Error, La peticion no se pudo procesar']);
}
    

?>