import { Ajax, ruta } from "./tool.js";



export function guardarMuertes(m) {
    let datos = {
      fecha: document.getElementById("fecha").value,
      causa: document.getElementById("causa").value,
      id_animal: localStorage.getItem("id_animal"),
    };
    //console.log(datos)
    Ajax({
      url: "../control/muertes.php",
      method: m,
      param: datos,
      fSuccess: (resp) => {
        //console.log(resp)
        if (resp.code == 200) {
          alert("El registro fue guardado correctamente");
          ruta("historialmuertes.html");
        } else {
          alert("Error en el registro. " + resp.msg);
        }
      }
    });
  }


  
export function historialMuertes() {
    let $tinfo = document.getElementById("tinfo"), id="", item = "";
    $tinfo.innerHTML = `<tr><td colspan='6' class='text-center'><div class="spinner-border text-black" role="status"><span class="sr-only"></span></div><br>Procesando...</td></tr>`;
    Ajax({
      url: "../control/muertes.php",
      method: "GET",
      param: { id },
      fSuccess: (resp) => {
        if (resp.code == 200) {
          //console.log(resp.data)
          resp.data.forEach((el) => {
            item += `<tr><th scope='row'>${el.IdMortalidad}</th>
                        <td>${el.MortaFecha}</td>
                        <td>${el.MortaCausa}</td>
                        <td>${el.RegFechadeNacimiento}</td>
                        <td>${el.RegSexo}</td>
                        <td> ${el.RegPeso}kg</td>
                        <td>${el.CateNombre} / ${el.RazaNombres}</td>
                        <td>${el.RegAntecedentes}</td>
                        <!-- --><td> <div class="btn-group" role="group">
                          <button type="button" class="btn btn-outline-danger fa fa-trash d_muertes" title='Eliminar' data-id='${el.IdMortalidad}'></button>
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

export function muertes_() {
    let $div = document.getElementById("muertes");
    $div.innerHTML = `<div class="spinner-border text-black" role="status"><span class="sr-only"></span></div>`;
    //console.log($divRazas)
    Ajax({
      url: "../control/muertes.php",
      method: "GET",
      param: undefined,
      fSuccess: (resp) => {
        //console.log(Resp)
        if (resp.code == 200) {
          let opc = ``;
          //console.log(Resp.data)
          resp.data.map((el) => {
            opc += `<option value="${el.IdMorta}"> ${el.MortaFecha} (${el.MortaCausa})</option>`; 
            //console.log(el)
          });
        }
      }
    });
  }
  
export function muertes(id) {
    //console.log("Clic en Editar el registro id="+id)
    localStorage.setItem("id_animal", id);
    ruta("muertes.html?id=" + id);
  }

  export function eliminarMuertes(id) {
    let resp = confirm("Desea eliminar la muerte (#" + id + ")?");
    if (resp) {
      Ajax({
        url: "../control/muertes.php",
        method: "DELETE",
        param: { id },
        fSuccess: (resp) => {
          console.log(resp);
          if (resp.code == 200) {
            //console.log(resp.data)
            historialMuertes();
          } else alert("Error en la petición\n" + resp.msg);
        }
      });
    }
}
  