//Importar
import { Ajax, ruta } from "./tool.js";

export function guardarAnimal(m) {
    //alert("OK estamos listos para enviar los datos")
    let datos = {
      fn: document.getElementById("fecha").value,
      peso: document.getElementById("peso").value,
      raza: document.getElementById("raza").value,
      sexo: document.getElementById("sexo").value,
      cat: document.getElementById("cat").value,
      antecedentes: document.getElementById("antecedentes").value,
      iduser: localStorage.getItem("iduser"),
      id_animal: localStorage.getItem("id_animal"),
    };
    //console.log(datos)
    Ajax({
      url: "../control/animales.php",
      method: m,
      param: datos,
      fSuccess: (resp) => {
        //console.log(resp)
        if (resp.code == 200) {
          alert("El registos fue guardado correctamente");
          ruta("listadoanimales.html");
        } else alert("Error en el registro. " + resp.msg);
      }
    });
  }
  
export function listadoAnimales() {
    localStorage.removeItem("id_animal");
    let $tinfo = document.getElementById("tinfo"),
      item = "";
    $tinfo.innerHTML = `<tr><td colspan='7' class='text-center'><div class="spinner-border text-black" role="status"><span class="sr-only"></span></div><br>Procesando...</td></tr>`;
    Ajax({
      url: "../control/animales.php",
      method: "GET",
      param: undefined,
      fSuccess: (resp) => {
        //console.log(resp)
        if (resp.code == 200) {
          //console.log(resp.data)
          resp.data.forEach((el) => {
            item += `<tr><th scope='row'>${el.id}</th>
                        <td>${el.cate}</td>
                        <td>${el.raza}</td>
                        <td>${el.sexo}</td>
                        <td>${el.peso} Kg</td>
                        <td>${el.ant}</td>
                        <td> <div class="btn-group" role="group">
                          <button type="button" class="btn btn-primary fa fa-edit u_animal" title='Editar' data-id='${el.id}'></button>
                          <button type="button" class="btn btn-success fa fa-file-medical s_animal" title='Agregar Medicamento' data-id='${el.id}'></button>
                          <button type="button" class="btn btn-secondary fa-sharp-duotone fa-solid fa-syringe m_animal" title= 'Historial Médico' data-id='${el.id}'></button>
                          ${(el.ant=="Muerte" ? `<button type="button" class="btn btn-dark fa-solid fa-skull-crossbones mt_animal" title= 'Muertes'  data-id='${el.id}'></button>` : "")}
                          ${(el.sexo=="Hembra" ? `<button type="button" class="btn btn-warning fa-solid fa-stethoscope re_animal" title= 'Reproduccion' data-id='${el.id}'></button>` : "")}
                          <button type="button" class="btn btn-danger fa fa-trash d_animal" title='Eliminar' data-id='${el.id}'></button>                        
                         </div>
                        </td></tr>`;
          });
          $tinfo.innerHTML = item;
        } else
          $tinfo.innerHTML = `<tr><td colspan='7' class='text-center'>Error en la petición <b>${resp.msg}</b></td></tr>`;
      }
    });
  }
  
export function buscarAnimal(id, send) {
    Ajax({
      url: "../control/animales.php",
      method: "GET",
      param: { id },
      fSuccess: (resp) => {
        //console.log(resp)
        if (resp.code == 200) {
          send(resp.data);
        } else alert("Error en la petición\n" + resp.msg);
      }
    });
  }
  
export function editarAnimal(id) {
    //console.log("Clic en Editar el registro id="+id)
    localStorage.setItem("id_animal", id);
    ruta("actualizaranimales.html?id=" + id);
  }
  
export function eliminarAnimal(id) {
    let resp = confirm("Desea eliminar el registro del Animal (#" + id + ")?");
    if (resp) {
      Ajax({
        url: "../control/animales.php",
        method: "DELETE",
        param: { id },
        fSuccess: (resp) => {
          console.log(resp);
          if (resp.code == 200) {
            //console.log(resp.data)
            listadoAnimales();
          } else alert("Error en la petición\n" + resp.msg);
        }
      });
    }
}