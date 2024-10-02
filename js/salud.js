import { Ajax, ruta } from "./tool.js";

export function vacunacionAnimal(id) {
   //console.log("Clic en Editar el registro id="+id)
   localStorage.setItem("id_animal", id);
   ruta("vacunacion.html?id=" + id);
 }

export function guardarVacunacion(m) {
    //alert("OK estamos listos para enviar los datos")
    let datos = {
      medi: document.getElementById("medicamento").value,
      fecha: document.getElementById("fecha").value,
      enfe: document.getElementById("enfermedad").value,
      via: document.getElementById("via").value,
      dosis: document.getElementById("dosis").value,
      iduser: localStorage.getItem("iduser"),
      id_animal: localStorage.getItem("id_animal"),
    };
    //console.log(datos)
    Ajax({
      url: "../control/vacunacion.php",
      method: m,
      param: datos,
      fSuccess: (resp) => {
        //console.log(resp)
        if (resp.code == 200) {
          alert("El registos fue guardado correctamente");
          ruta("historialmedico.html");
        } else alert("Error en el registro. " + resp.msg);
      }
    });
  }
  
  export function historialMedicoAnimal(id) {
    //console.log("Clic en Editar el registro id="+id)
    localStorage.setItem("id_animal", id);
    ruta("historialmedico.html?id=" + id);
  }
  export function historialMedico() {
    let $tinfo = document.getElementById("tinfo"),
      item = "",
      id = localStorage.getItem("id_animal");
    $tinfo.innerHTML = `<tr><td colspan='7' class='text-center'><div class="spinner-border text-black" role="status"><span class="sr-only"></span></div><br>Procesando...</td></tr>`;
    Ajax({
      url: "../control/historialmedico.php",
      method: "GET",
      param: { id },
      fSuccess: (resp) => {
        if (resp.code == 200) {
          //console.log(resp.data)
          resp.data.forEach((el) => {
            item += `<tr><th scope='row'>${el.IdRegSalud}</th>
                        <td>${el.RegFecha}</td>
                        <td>${el.MediNombre}</td>
                        <td>${el.RegEnfermedades}</td>
                        <td>${el.Via}</td>
                        <td>${el.RegTratamiento}</td>
                        <!-- --><td> <div class="btn-group" role="group">
                          <button type="button" class="btn btn-outline-danger fa fa-trash d_salud" title='Eliminar' data-id='${el.IdRegSalud}'></button>
                         </div>
                        </td></tr>`;
          });
          if (item == "")
            item = `<tr><td colspan='7' class='text-center'>No hay registos asociados</td></tr>`;
          $tinfo.innerHTML = item;
        } else
          $tinfo.innerHTML = `<tr><td colspan='7' class='text-center'>Error en la petición <b>${resp.msg}</b></td></tr>`;
      }
    });
  }

  export function eliminarVacunacion(id) {
    let resp = confirm("Desea eliminar Vacunacion(#" + id + ")?");
    if (resp) {
      Ajax({
        url: "../control/vacunacion.php",
        method: "DELETE",
        param: { id },
        fSuccess: (resp) => {
          console.log(resp);
          if (resp.code == 200) {
            //console.log(resp.data)
            historialMedico();
          } else alert("Error en la petición\n" + resp.msg);
        }
      });
    }
  }
  
export function guardarReproduccion(m) {
    //alert("OK estamos listos para enviar los datos")
    let datos = {
      fechadelservicio: document.getElementById("fechadelservicio").value,
      metododeservicio: document.getElementById("metododeservicio").value,
      resultadodelservicio: document.getElementById("resultadodelservicio").value,
      fechadeparto: document.getElementById("fechadeparto").value,
      horadelparto: document.getElementById("horadelparto").value,
      numerodevivos: document.getElementById("numerodevivos").value,
      numerodemuertos: document.getElementById("numerodemuertos").value,
      numerodemachos: document.getElementById("numerodemachos").value,
      numerodehembras: document.getElementById("numerodehembras").value,
      id_animal: localStorage.getItem("id_animal"),
    };
    //console.log(datos)
    Ajax({
      url: "../control/reproduccion.php",
      method: m,
      param: datos,
      fSuccess: (resp) => {
        //console.log(resp)
        if (resp.code == 200) {
          alert("El registos fue guardado correctamente");
          ruta("reproduccion.html");
        } else alert("Error en el registro. " + resp.msg);
      }
    });
  }

  
export function historialReproduccionAnimal() {
    let $tinfo = document.getElementById("tinfo"),item = "",id = localStorage.getItem("id_animal");
    $tinfo.innerHTML = `<tr><td colspan='9' class='text-center'><div class="spinner-border text-black" role="status"><span class="sr-only"></span></div><br>Procesando...</td></tr>`;
    Ajax({
      url: "../control/historialreproduccion.php",
      method: "GET",
      param: { id },
      fSuccess: (resp) => {
        if (resp.code == 200) {
          //console.log(resp.data)
          resp.data.forEach((el) => {
            item += `<tr><th scope='row'>${el.IdReproduccion}</th>
                        <td>${el.ReFechadelServicio}</td>
                        <td>${el.ReMetododeServicio}</td>
                        <td>${el.ReResultadodelServicio}</td>
                        <td>${el.ReFechadeParto} ${el.ReHoradelParto}</td>
                        <td>${el.ReNumerodeVivos}</td>
                        <td>${el.ReNumerodeMuertos}</td>
                        <td>M=${el.ReNumerodeMachos} | H=${el.ReNumerodeHembras}</td>
                        <!-- --><td> <div class="btn-group" role="group">
                          <button type="button" class="btn btn-outline-danger fa fa-trash d_reproduccion" title='Eliminar' data-id='${el.IdReproduccion}'></button>
                         </div>
                        </td></tr>`;
          });
          if (item == "")
            item = `<tr><td colspan='9' class='text-center'>No hay registos asociados</td></tr>`;
          $tinfo.innerHTML = item;
        } else
          $tinfo.innerHTML = `<tr><td colspan='9' class='text-center'>Error en la petición <b>${resp.msg}</b></td></tr>`;
      }
    });
  }

export function reproduccionAnimal(id) {
    //console.log("Clic en Editar el registro id="+id)
    localStorage.setItem("id_animal", id);
    ruta("reproduccion.html?id=" + id);
  }

  export function eliminarReproduccion(id) {
    let resp = confirm("Desea eliminar la reproduccion (#" + id + ")?");
    if (resp) {
      Ajax({
        url: "../control/reproduccion.php",
        method: "DELETE",
        param: { id },
        fSuccess: (resp) => {
          console.log(resp);
          if (resp.code == 200) {
            //console.log(resp.data)
            historialReproduccionAnimal();
          } else alert("Error en la petición\n" + resp.msg);
        }
      });
    }
}

