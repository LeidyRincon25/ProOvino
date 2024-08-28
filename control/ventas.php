<?php

require_once("configdb.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $post = json_decode(file_get_contents('php://input'), true);     
        if($post["fecha"]!="" && $post["precio"]!="" && $post["cantidad"]!="" && $post["comprador"]!="" && $post["celular"]!="" && $post["idcategoria"]
        !="" && $post["idraza"]!="" && $post["id_animal"]!="")  
        $bd = new ConfigDb(); {
            $bd = new ConfigDb();
            $conn = $bd->conexion();
            $sql = "INSERT INTO INSERT INTO `tbventa`(`IdVenta`, `VenFecha`, `VenPrecio`, `VenCantidad`, `VenComprador`, `VenCelular`, `IdCategoria`, `IdRaza`, `IdRegOvino`) VALUES 
            (null, :VenFecha, :VenPrecio, :VenCantidad, :VenComprador, :VenCelular,  :IdAnimal, :IdCategoria, :IdRaza)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":VenFecha",$post["fecha"],PDO::PARAM_STR);
            $stmt->bindParam(":VenPrecio",$post["precio"],PDO::PARAM_INT);
            $stmt->bindParam(":VenCantidad",$post["cantidad"],PDO::PARAM_INT);
            $stmt->bindParam(":VenComprador",$post["comprador"],PDO::PARAM_STR);
            $stmt->bindParam(":VenCelular",$post["celular"],PDO::PARAM_STR);
            $stmt->bindParam(":IdAnimal",$post["id_animal"],PDO::PARAM_INT);
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
            $sql = "SELECT `IdMortalidad`, `MortaFecha`, `MortaSexo`, `MortaCausa`, `IdRegOvino`, `IdCategoria`, `IdRaza` FROM `tbmortalidad` ORDER BY `MortaFecha` ASC";
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






























