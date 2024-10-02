<?php
require_once("configdb.php");

//header('Content-Type: application/json');
if($_SERVER["REQUEST_METHOD"]=="GET"){
    try {
        //if($_GET["id"]!=""){}
            $info = array();
            $bd = new ConfigDb();
            $conn = $bd->conexion();
            if(isset($_GET["id"]))  $sql = "SELECT v.`IdVenta`, v.`VenFecha`, FORMAT(v.`VenPrecio`,0) AS `VenPrecioF`, v.`VenPrecio`, v.`VenCantidad`, v.`VenIdentificacion`, v.`VenComprador`, v.`VenCelular`, v.`IdCategoria`, v.`IdRaza`, `c`.`CateNombre`, r.RazaNombres FROM `tbventa` v INNER JOIN `tbcategoria` c ON(c.`IdCategoria`=v.`IdCategoria`) INNER JOIN `tbraza` r ON(r.`IdRaza`=v.`IdRaza`) ORDER BY v.`VenFecha` DESC";
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