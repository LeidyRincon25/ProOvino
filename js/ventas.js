import { Ajax, ruta } from "./tool.js";



export function ventas(id) {
    //console.log("Clic en Editar el registro id="+id)
    localStorage.setItem("id_animal", id);
    ruta("ventas.html?id=" + id);
  }
  
  
export function guardarVentas(m) {
    let datos = {
      fecha: document.getElementById("fecha").value,
      cantidad: document.getElementById("cantidad").value,
      precio: document.getElementById("precio").value,
      identificacion: document.getElementById("ident").value,
      celular: document.getElementById("celular").value,
      comprador: document.getElementById("comprador").value,
      idcategoria: document.getElementById("cat").value,
      idraza: document.getElementById("raza").value,
    };
    //console.log(datos)
    Ajax({
      url: "../control/ventas.php",
      method: m,
      param: datos,
      fSuccess: (resp) => {
        //console.log(resp)
        if (resp.code == 200) {
          alert("El registro fue guardado correctamente");
          ruta("historialventas.html");
        } else {
          alert("Error en el registro. " + resp.msg);
        }
      }
    });
  }
  
  
  
export function historialVentas() {
    let $tinfo = document.getElementById("tinfo"), id="", item = "";
    $tinfo.innerHTML = `<tr><td colspan='6' class='text-center'><div class="spinner-border text-black" role="status"><span class="sr-only"></span></div><br>Procesando...</td></tr>`;
    Ajax({
      url: "../control/ventas.php",
      method: "GET",
      param: { id },
      fSuccess: (resp) => {
        if (resp.code == 200) {
          //console.log(resp.data)
          resp.data.forEach((el) => {
            item += `<tr><th scope='row'>${el.VenFecha}</th>
                        <td>${el.VenPrecioF}</td>
                        <td>${el.VenCantidad}</td>
                        <td><b>${el.VenComprador}</b><br><small class='text-blue'>ID: ${el.VenIdentificacion} / CEL: ${el.VenCelular}</small></td>
                        <td>${el.CateNombre} / ${el.RazaNombres}</td>
                        <!-- --><td> <div class="btn-group" role="group">
                          <button type="button" class="btn btn-outline-danger fa fa-trash d_ventas" title='Eliminar' data-id='${el.IdVenta}'></button>
                         </div>
                        </td></tr>`;
          });
          if (item == "")
            item = `<tr><td colspan='6' class='text-center'>No hay registos asociados</td></tr>`;
          $tinfo.innerHTML = item;
        } else
          $tinfo.innerHTML = `<tr><td colspan='6' class='text-center'>Error en la petición <b>${resp.msg}</b></td></tr>`;
      }
    });
  }
  
  export function eliminarVentas(id) {
    let resp = confirm("Desea eliminar la venta (#" + id + ")?");
    if (resp) {
      Ajax({
        url: "../control/ventas.php",
        method: "DELETE",
        param: { id },
        fSuccess: (resp) => {
          console.log(resp);
          if (resp.code == 200) {
            //console.log(resp.data)
            historialVentas();
          } else alert("Error en la petición\n" + resp.msg);
        }
      });
    }
}