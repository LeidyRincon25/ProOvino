<?php

require_once("configdb.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $post = json_decode(file_get_contents('php://input'), true);     
        if($post["fecha"]!="" && $post["precio"]!="" && $post["cantidad"]!="" && $post["identificacion"]!="" && $post["comprador"]!="" && $post["celular"]!="" && $post["idcategoria"]!="" && $post["idraza"]!="")  
        $bd = new ConfigDb(); {
            $bd = new ConfigDb();
            $conn = $bd->conexion();
            $sql = "INSERT INTO `tbventa`(`IdVenta`, `VenFecha`, `VenPrecio`, `VenCantidad`, `VenIdentificacion`, `VenComprador`, `VenCelular`, `IdCategoria`, `IdRaza`) VALUES 
            (null, :VenFecha, :VenPrecio, :VenCantidad, :VenIdentificacion, :VenComprador, :VenCelular, :IdCategoria, :IdRaza)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":VenFecha",$post["fecha"],PDO::PARAM_STR);
            $stmt->bindParam(":VenPrecio",$post["precio"],PDO::PARAM_INT);
            $stmt->bindParam(":VenCantidad",$post["cantidad"],PDO::PARAM_INT);
            $stmt->bindParam(":VenIdentificacion",$post["identificacion"],PDO::PARAM_STR);
            $stmt->bindParam(":VenComprador",$post["comprador"],PDO::PARAM_STR);
            $stmt->bindParam(":VenCelular",$post["celular"],PDO::PARAM_STR);
            $stmt->bindParam(":IdCategoria",$post["idcategoria"],PDO::PARAM_INT);
            $stmt->bindParam(":IdRaza",$post["idraza"],PDO::PARAM_INT);
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
            $sql = "SELECT v.`IdVenta`, v.`VenFecha`, FORMAT(v.`VenPrecio`,0) AS `VenPrecioF`, v.`VenPrecio`, v.`VenCantidad`, v.`VenIdentificacion`, v.`VenComprador`, v.`VenCelular`, v.`IdCategoria`, v.`IdRaza`, `c`.`CateNombre`, r.RazaNombres FROM `tbventa` v INNER JOIN `tbcategoria` c ON(c.`IdCategoria`=v.`IdCategoria`) INNER JOIN `tbraza` r ON(r.`IdRaza`=v.`IdRaza`) ORDER BY v.`VenFecha` DESC";
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
}
else if($_SERVER["REQUEST_METHOD"]=="DELETE"){
    try {
        $post = json_decode(file_get_contents('php://input'),true);       
        if($post["id"]!=""){
            $bd = new ConfigDb();
            $conn = $bd->conexion();
            $sql = "DELETE FROM `tbventa` WHERE IdVenta= :ID";
            $stmt = $conn ->prepare($sql);
            $stmt->bindParam(":ID",$post["id"],PDO::PARAM_STR);
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
        //exit();
    } catch (PDOException $ex) {
        header("HTTP/1.1 500");
        echo json_encode(['code'=>500,'msg' => 'Error interno al procesar su petici&oacute;n', "ERROR"=>$ex->getMessage()]);
    }
}
else {
    header("HTTP/1.1 400");
    echo json_encode(['code'=>400,'msg' => 'Error, La peticion no se pudo procesar']);
}

?>






























