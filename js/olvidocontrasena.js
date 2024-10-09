export function recuperarcuenta(m) {
    //alert("OK estamos listos para enviar los datos")
    let datos = {
      UsuCorreo: document.getElementById("UsuCorreo").value,
    };
    //console.log(datos)
    Ajax({
      url: "../control/olvidocontrasena.php",
      method: m,
      param: datos,
      fSuccess: (resp) => {
        //console.log(resp)
        if (resp.code == 200) {
          alert("No se encontro correo");
          ruta("olvidocontrasena.html");
        } else alert("Error en el registro. " + resp.msg);
      }
    });
  }