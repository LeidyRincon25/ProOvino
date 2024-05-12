<?php
//header('Content-Type: application/json');
if($_SERVER["REQUEST_METHOD"]=="POST"){
    try {
        $_post = json_decode(file_get_contents('php://input'),true);
        //var_dump($_post);
        if($_post["user"]!="" && $_post["pass"]!=""){
            //echo $_post["user"];            
            header("HTTP/1.1 200 OK");
            echo json_encode(['msg' => 'Consulta finalizada correctamente']);
            //http_response_code(200);
        }
        exit();
    } catch (Exception $ex) {
        header("HTTP/1.1 500");
        echo json_encode(['msg' => 'Error, '.$ex->getMessage()]);
    }
}else {
    header("HTTP/1.1 400");
    echo json_encode(['msg' => 'Error, La peticion no se pudo procesar']);
}

?>