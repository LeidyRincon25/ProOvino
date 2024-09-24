import { Ajax, ruta } from "./tool.js";

  
export function medicamentos(id) {
    //console.log("Clic en Editar el registro id="+id)
    localStorage.setItem("id_animal", id);
    ruta("medicamentos.html?id=" + id);
  }

  
export function guardarMedicamento(m) {
    let datos = {
      MediNombre: document.getElementById("MediNombre").value,
      MediPresentacion: document.getElementById("MediPresentacion").value,
    };
    //console.log(datos)
    Ajax({
      url: "../control/medicamentos.php",
      method: m,
      param: datos,
      fSuccess: (resp) => {
        //console.log(resp)
        if (resp.code == 200) {
          alert("El registro fue guardado correctamente");
          ruta("vacunacion.html");
        } else {
          alert("Error en el registro. " + resp.msg);
        }
      }
    });
  }

  
export function medicamentosDisponibles() {
    let $div = document.getElementById("dmedicamentos");
    $div.innerHTML = `<div class="spinner-border text-black" role="status"><span class="sr-only"></span></div>`;
    //console.log($divRazas)
    Ajax({
      url: "../control/medicamentos.php",
      method: "GET",
      param: undefined,
      fSuccess: (resp) => {
        //console.log(Resp)
        if (resp.code == 200) {
          let opc = ``;
          //console.log(Resp.data)
          resp.data.map((el) => {
            opc += `<option value="${el.IdMedicamentos}"> ${el.MediNombre} (${el.MediPresentacion})</option>`;
            //console.log(el)
          });
          $div.innerHTML = `<label for="nombre">Medicamento</label><select class="form-select" name="medicamento" id="medicamento" required><option value="">Seleccione uno</option>${opc}</select>`;
        }
      }
    });
  }

