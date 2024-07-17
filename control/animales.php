<?php
require_once("configdb.php");

//header('Content-Type: application/json');
if($_SERVER["REQUEST_METHOD"]=="POST"){
    try {
        $post = json_decode(file_get_contents('php://input'),true);       
        if($post["ident"]!="" && $post["fn"]!="" && $post["peso"]!="" && $post["raza"]!="" && $post["sexo"]!="" && $post["cat"]!="" && $post["antecedentes"]!="" && $post["iduser"]!=""){
            //echo $_post["user"]; 
            $bd = new ConfigDb();
            $conn = $bd->conexion();
            $sql = "INSERT INTO `tbregovino` ( `RegFechadeNacimiento`, `RegSexo`, `RegPeso`, `RegAntecedentes`, `Idcategoria`, `IdRaza`, `IdUsuario`)"
            ." VALUES (:FN, :SEXO, :PESO, :ANTE, :IDCAT, :IDRAZA, :IDUSER)";
            $stmt = $conn ->prepare($sql);
            $stmt->bindParam(":FN",$post["fn"],PDO::PARAM_STR);
            $stmt->bindParam(":SEXO",$post["sexo"],PDO::PARAM_STR);
            $stmt->bindParam(":PESO",$post["peso"],PDO::PARAM_STR);
            $stmt->bindParam(":ANTE",$post["antecedentes"],PDO::PARAM_STR);
            $stmt->bindParam(":IDCAT",$post["cat"],PDO::PARAM_INT);
            $stmt->bindParam(":IDRAZA",$post["raza"],PDO::PARAM_INT);
            $stmt->bindParam(":IDUSER",$post["iduser"],PDO::PARAM_INT);
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