<?php
require_once("configdb.php");

//header('Content-Type: application/json');
if($_SERVER["REQUEST_METHOD"]=="GET"){
    try {
        //if($_GET["id"]!=""){}
            $info = array();
            $bd = new ConfigDb();
            $conn = $bd->conexion();
            //$sql = "SELECT `IdRegOvino` as 'id', t2.CateNombre as 'cate', t3.RazaNombres as 'raza',`RegFechadeNacimiento` as 'fn', `RegSexo` as 'sexo', `RegPeso` as 'peso', `RegAntecedentes` as 'ant' FROM `tbregovino` t1, `tbcategoria` t2, `tbraza` t3 WHERE t1.Idcategoria=t2.IdCategoria AND t1.IdRaza=t3.IdRaza ORDER BY t1.IdRegOvino";
            if(isset($_GET["id"])) $sql = "SELECT s.`IdRegSalud`, s.`RegFecha`, s.`RegVia`, s.`RegEnfermedades`, s.`RegTratamiento`, s.`IdMedicamentos`, s.`IdRegOvino`, m.MediNombre, m.MediPresentacion, v.nombre as 'Via' FROM `tbregsalud` s, `tbmedicamentos` m, `tbvia` v WHERE `s`.`IdMedicamentos`= `m`.`IdMedicamentos` AND `s`.`RegVia`=`v`.`id` AND `IdRegOvino`=TRIM('".$_GET["id"]."') ORDER BY `s`.`RegFecha` DESC";
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