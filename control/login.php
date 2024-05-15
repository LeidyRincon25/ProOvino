<?php
require_once("configdb");

//header('Content-Type: application/json');
if($_SERVER["REQUEST_METHOD"]=="POST"){
    try {
        $_post = json_decode(file_get_contents('php://input'),true);
        //var_dump($_post);
        if($_post["user"]!="" && $_post["pass"]!=""){
            //echo $_post["user"]; 
            $bd = new ConfigDb();
            $conn = $bd->conexion();
            /*$sql = "select 1";
            $stmt = $conn ->prepare($sql);
            if($stmt->execute()){
                echo "SQL realizada correctamente";
            }else{
                echo "SQL no aplicada";
            }*/
            
            header("HTTP/1.1 200 OK");
            echo json_encode(['code'=>200,'msg' => 'Consulta finalizada correctamente']);
        }
        //exit();
    } catch (Exception $ex) {
        header("HTTP/1.1 500");
        echo json_encode(['code'=>500,'msg' => 'Error interno al procesar su petici&oacute;n', "ERROR"=>$ex->getMessage()]);
        //echo json_encode(['code'=>500,'msg' => 'Error interno al procesar su peticion'.$ex->getMessage()]);
    }
}else {
    header("HTTP/1.1 400");
    echo json_encode(['code'=>400,'msg' => 'Error, La peticion no se pudo procesar']);
}

?>