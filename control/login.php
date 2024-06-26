<?php
require_once("configdb.php");

//header('Content-Type: application/json');
if($_SERVER["REQUEST_METHOD"]=="POST"){
    try {
        $post = json_decode(file_get_contents('php://input'),true);
        
        if($post["user"]!="" && $post["pass"]!=""){
            //echo $_post["user"]; 
            $bd = new ConfigDb();
            $conn = $bd->conexion();
            $sql = "SELECT `IdUsuario`, `UsuNombre`, `UsuApellido` FROM `tbusuario` WHERE `UsuCorreo`= '".$post["user"]."' AND `UsuContrasena`='".$post["pass"]."'";
            $stmt = $conn ->prepare($sql);
            if($stmt->execute()){
                $result = $stmt->fetchAll();
                if(count($result) > 0)
                {
                    $idtoken = $bd->obtenerToken($result[0]["IdUsuario"], $result[0]["UsuNombre"]." ".$result[0]["UsuApellido"]);
                    //var_dump($result);

                    header("HTTP/1.1 200 OK");
                    echo json_encode(['code'=>200,
                    'idUser'=>$result[0]["IdUsuario"],
                    'Usuario'=>$result[0]["UsuNombre"]." ".$result[0]["UsuApellido"],
                    'idToken'=>$idtoken,
                    'msg' => "OK"]);
                }else{                    
                header("HTTP/1.1 203 OK");
                    echo json_encode(['code'=>203,'msg' => "Las credenciales no son validas"]);
                }
            }else{
                header("HTTP/1.1 203 OK");
                echo json_encode(['code'=>203,'msg' => "Las credenciales no son validas"]);
            }
            /**/
            //echo json_encode(['code'=>200,'msg' => 'Consulta finalizada correctamente']);
            //var_dump($post);
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