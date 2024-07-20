<?php
require_once("configdb.php");

//header('Content-Type: application/json');
if($_SERVER["REQUEST_METHOD"]=="POST"){
    try {
        $post = json_decode(file_get_contents('php://input'),true);       
        if($post["fn"]!="" && $post["enfermedades"]!="" && $post["tratamiento"]!="" && $post["medicamentos"]!="" && $post["ovino"]!="" && $post["iduser"]!="")
        {
            //echo $_post["user"]; 
            $bd = new ConfigDb();
            $conn = $bd->conexion();
            $sql = "INSERT INTO  `tbregsalud` (`IdRegSalud`, `RegFecha`, `RegEnfermedades`, `RegTratamiento`, `IdMedicamentos`, `IdRegOvino`)"
            ." VALUES (:FN, :ENFER, :TRATA, :IDMEDI, :, :IDOVINO, :IDUSER)";
            $stmt = $conn ->prepare($sql);
            $stmt->bindParam(":FN",$post["fn"],PDO::PARAM_STR);
            $stmt->bindParam(":ENFER",$post["enfermedades"],PDO::PARAM_STR);
            $stmt->bindParam(":TRATA",$post["tratamiento"],PDO::PARAM_STR);
            $stmt->bindParam(":IDMEDI",$post["medicamentos"],PDO::PARAM_STR);
            $stmt->bindParam(":IDOVINO",$post["ovino"],PDO::PARAM_INT);
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
        echo json_encode(['code'=>500,'msg' => 'Error interno al procesar su petici&oacute;n', "ERROR"=>$ex->getMessage
()]);
        //echo json_encode(['code'=>500,'msg' => 'Error interno al procesar su peticion'.$ex->getMessage()]);
    }
}else if($_SERVER["REQUEST_METHOD"]=="GET"){
    try {
            $bd = new ConfigDb();
            $conn = $bd->conexion();
            //SELECT `IdRegOvino` as 'id', t2.CateNombre as 'cate', t3.RazaNombres as 'raza',`RegFechadeNacimiento` as 
'fn', `RegSexo` as 'sexo', `RegPeso` as 'peso', `RegAntecedentes` as 'ant' FROM `tbregovino` t1 INNER JOIN 
`tbcategoria` t2 ON(t1.Idcategoria=t2.IdCategoria) INNER JOIN `tbraza` t3 ON(t1.IdRaza=t3.IdRaza) ORDER BY t2.
CateNombre;
            $sql = "SELECT `IdRegOvino` as 'id', t2.CateNombre as 'cate', t3.RazaNombres as 'raza',`RegFechadeNacimiento` 
as 'fn', `RegSexo` as 'sexo', `RegPeso` as 'peso', `RegAntecedentes` as 'ant' FROM `tbregovino` t1, 
`tbcategoria` t2, `tbraza` t3 WHERE t1.Idcategoria=t2.IdCategoria AND t1.IdRaza=t3.IdRaza ORDER BY t1.
IdRegOvino;";
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
        //echo json_encode(['code'=>500,'msg' => 'Error interno al procesar su peticion'.$ex->getMessage()]);
    }
} else {
    header("HTTP/1.1 400");
    echo json_encode(['code'=>400,'msg' => 'Error, La peticion no se pudo procesar']);
}

?>