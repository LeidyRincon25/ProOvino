<?php
require_once("configdb.php");

//header('Content-Type: application/json');
if($_SERVER["REQUEST_METHOD"]=="POST"){
    try {
        $post = json_decode(file_get_contents('php://input'),true);       
        if($post["FechadelServicio"]!="" && $post["MetododeServicio"]!="" && $post["ResultadodelServicio"]!="" && $post["FechadeParto"]!="" && $post["NumerodeNacidos"]!="" && $post["SexodelNacido"]!="" && $post["Observaciones"]!="" && $post["Id_Animal"]!=""){
            //echo $_post["user"]; 
            $bd = new ConfigDb();
            $conn = $bd->conexion();
            $sql = "INSERT INTO `tbreproducción`(`IdReproduccion`, `ReFechadelServicio`, `ReMetododeServicio`, `ReResultadodelServicio`, `ReFechadeParto`, `ReHoradelParto`, `ReNumerodeNacidos`, `ReSexodelNacido`, `RePesodelNacido`, `ReObservaciones`, `IdRegOvino`) VALUES (null, :FechadelServicio, :MetododeServicio, :ResultadodelServicio, :FechadeParto, :NumerodeNacidos, :SexodelNacido, :Observaciones, :Id_Animal)";
            $stmt = $conn ->prepare($sql);
            $stmt->bindParam(":FechadelServicio",$post["FechadelServicio"],PDO::PARAM_STR);
            $stmt->bindParam(":MetododeServicio",$post["MetododeServicio"],PDO::PARAM_STR);
            $stmt->bindParam(":ResultadodelServicio",$post["ResultadodelServicio"],PDO::PARAM_STR);
            $stmt->bindParam(":FechadeParto",$post["FechadeParto"],PDO::PARAM_STR);
            $stmt->bindParam(":NumerodeNacidos",$post["NumerodeNacidos"],PDO::PARAM_INT);
            $stmt->bindParam(":SexodelNacido",$post["SexodelNacido"],PDO::PARAM_INT);
            $stmt->bindParam(":Observaciones",$post["Observaciones"],PDO::PARAM_INT);
            $stmt->bindParam(":Id_Animal",$post["Id_Animal"],PDO::PARAM_INT);

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

} else if($_SERVER["REQUEST_METHOD"]=="GET"){
    try {
        $bd = new ConfigDb();
        $conn = $bd->conexion(); 
        $sql = "SELECT `IdReproduccion`, `ReFechadelServicio`, `ReMetododeServicio`, `ReResultadodelServicio`, `ReFechadeParto`, `ReHoradelParto`, `ReNumerodeNacidos`, `ReSexodelNacido`, `RePesodelNacido`, `ReObservaciones`, `IdRegOvino` FROM `tbreproducción`;";
        $stmt = $conn->prepare($sql);
        if($stmt->execute()){                
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            //var_dump($result);
            header("HTTP/1.1 200 OK");
            echo json_encode(['code'=>200,'data'=>$result,'msg' => "OK"]); 
        } else {
            header("HTTP/1.1 400");
            echo json_encode(['code'=>400,'msg' => 'Error, La peticion no se pudo procesar']);
        }  
        $stmt = null;
        $conn = null;
    } catch (PDOException $ex) {
        header("HTTP/1.1 500");
        echo json_encode(['code'=>500,'msg' => 'Error interno al procesar su petición', "ERROR"=>$ex->getMessage()]);
    }
}

