<?php
require_once("configdb.php");

//header('Content-Type: application/json');
if($_SERVER["REQUEST_METHOD"]=="GET"){
    try {
        //if($_GET["id"]!=""){}
            $info = array();
            $bd = new ConfigDb();
            $conn = $bd->conexion(); 
            if(isset($_GET["id"])) $sql = "SELECT m.`IdMortalidad`, m.`MortaFecha`, m.`MortaCausa`, m.`IdRegOvino` FROM `tbmortalidad` m INNER JOIN `tbregovino`";
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
}else {
    header("HTTP/1.1 400");
    echo json_encode(['code'=>400,'msg' => 'Error, La peticion no se pudo procesar']);
}

?>
