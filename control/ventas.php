<?php

require_once("configdb.php");

//header('Content-Type: application/json');
if($_SERVER["REQUEST_METHOD"]=="POST"){
    try {
        $post = json_decode(file_get_contents('php://input'),true);       
        if($post["fecha"]!="" && $post["precio"]!="" && $post["cantidad"]!="" && $post["comprador"]!="" && $post["celular"]!="" && $post["idcategoria"]!="" && $post["idraza"]!="" && $post["idovino"]!="")
        {
            //echo $_post["user"]; 
            $bd = new ConfigDb();
            $conn = $bd->conexion();
            $sql = "INSERT INTO `tbventa`(`IdVenta`, `VenFecha`, `VenPrecio`, `VenCantidad`, `VenComprador`, `VenCelular`, `IdCategoria`, `IdRaza`, `IdOvino`)VALUES ".
            "(null,:FECHA,:PRECIO,:CANTIDAD,:COMPRADOR,:CELULAR,: IDCATEGORIA,:IDRAZA,: IDOVINO)";
            $stmt = $conn ->prepare($sql);
            $stmt->bindParam(":FECHA",$post["fecha"],PDO::PARAM_STR);
            $stmt->bindParam(":PRECIO",$post["precio"],PDO::PARAM_STR);
            $stmt->bindParam(":CANTIDAD",$post["cantidad"],PDO::PARAM_STR);
            $stmt->bindParam(":COMPRADOR",$post["comprador"],PDO::PARAM_STR);
            $stmt->bindParam(":CELULAR",$post["celular"],PDO::PARAM_STR);
            $stmt->bindParam(":IDCATEGORIA",$post["idcategoria"],PDO::PARAM_INT);
            $stmt->bindParam(":IDRAZA",$post["idraza"],PDO::PARAM_INT);
            $stmt->bindParam(":IDOVINO",$post["idovino"],PDO::PARAM_INT);
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
            $sql = "SELECT v.`IdVenta`, v.`VenFecha`, v.`VenPrecio`, v.`VenCantidad`, v.`VenComprador`, v.`VenCelular`, v.`IdOvino`, c.`CateNombre`, r.
            `RazaNombres` AS 'Raza'
                     FROM `tbVenta` v
                     JOIN `tbcategoria` c ON v.`IdCategoria` = c.`IdCategoria`
                     JOIN `tbraza` r ON v.`IdRaza` = r.`IdRaza`
                     WHERE v.`IdOvino` = :id
                     ORDER BY v.`VenFecha` DESC";
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