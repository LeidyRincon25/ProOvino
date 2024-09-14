import { Ajax } from "./tool.js";

export function razas() {
    let $divRazas = document.getElementById("drazas");
    $divRazas.innerHTML = `<div class="spinner-border text-black" role="status"><span class="sr-only"></span></div>`;
    //console.log($divRazas)
    Ajax({
      url: "../control/razas.php",
      method: "GET",
      param: undefined,
      fSuccess: (Resp) => {
        //console.log(Resp)
        if (Resp.code == 200) {
          let opc = ``;
          //console.log(Resp.data)
          Resp.data.map((el) => {
            opc += `<option value="${el.IdRaza}">${el.RazaNombres}</option>`;
            //console.log(el)
          });
          $divRazas.innerHTML = `<label for="raza">Raza</label><select class="form-select" name="raza" id="raza" required><option value="">Seleccione una</option>${opc}</select>`;
        }
      }
    });
  }
  
export function categorias() {
    let $div = document.getElementById("dcat");
    $div.innerHTML = `<div class="spinner-border text-black" role="status"><span class="sr-only"></span></div>`;
    Ajax({
      url: "../control/categorias.php",
      method: "GET",
      param: undefined,
      fSuccess: (Resp) => {
        if (Resp.code == 200) {
          let opc = ``;
          Resp.data.map((el) => {
            opc += `<option value="${el.IdCategoria}">${el.CateNombre}</option>`;
          });
          $div.innerHTML = `<label for="cat">Categoria</label><select class="form-select" name="cat" id="cat" required><option value="">Seleccione una</option>${opc}</select>`;
        }
      }
    });
  }
  
export function via() {
    let $div = document.getElementById("dvia");
    $div.innerHTML = `<div class="spinner-border text-black" role="status"><span class="sr-only"></span></div>`;
    Ajax({
      url: "../control/via.php",
      method: "GET",
      param: undefined,
      fSuccess: (Resp) => {
        if (Resp.code == 200) {
          let opc = ``;
          Resp.data.map((el) => {
            opc += `<option value="${el.IdVia}">${el.ViaNombre}</option>`;
          });
          $div.innerHTML = `<label for="via">Via de Administraci&oacute;n</label><select class="form-select" name="via" id="via" 
              required><option value="">Seleccione una</option>${opc}</select>`;
        }
      }
    });
  }