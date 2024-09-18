//Importacion de Modulos
import { salida } from "./tool.js";
import { listadoAnimales, buscarAnimal } from "./animales.js";
import { razas, categorias, via } from "./tool_animales.js";
import { historialReproduccionAnimal } from "./salud.js";
import {
  medicamentosDisponibles,
  historialMedicoAnimal,
} from "./medicamentos.js";
import { historialVentas } from "./ventas.js";
import { historialMuertes } from "./muertes.js";

export function validarToken() {
  if (localStorage.getItem("token")) {
    document.getElementById("info-user").innerHTML =
      localStorage.getItem("user");

    //Funciones del Registro de Animales
    if (
      location.pathname.includes("registroanimales") |
      location.pathname.includes("actualizaranimales")
    ) {
      razas();
      categorias();
      if (location.pathname.includes("actualizaranimales")) {
        setTimeout(() => {
          let $form = document.getElementById("form-act_animales");
          buscarAnimal(localStorage.getItem("id_animal"), (resp) => {
            resp.forEach((el) => {
              $form.id_animal.value = el.id;
              $form.peso.value = el.peso;
              $form.fecha.value = el.fn;
              $form.antecedentes.innerHTML = el.ant;
              $form.sexo.value = el.sexo;
              $form.cat.value = el.idcate;
              $form.raza.value = el.idraza;
            });
          });
        }, 100);
      }
    } else if (location.pathname.includes("listadoanimales")) {
      //Funciones del Listado de Animales
      listadoAnimales();
    } else if (location.pathname.includes("vacunacion")) {
      //Funciones para la Vacunacion de Animales
      via();
      medicamentosDisponibles();
      buscarAnimal(localStorage.getItem("id_animal"), (resp) => {
        setTimeout(() => {
          let $inf = document.getElementById("info_animal"),
            data = "";
          document.getElementById("id_animal").value =
            localStorage.getItem("id_animal");
          //console.log(resp)
          resp.forEach((el) => {
            data = `<a href="#" class="list-group-item list-group-item-action" aria-current="true">
                                <div class="d-flex w-100 justify-content-between">
                                   <h5 class="mb-1">Categoria: ${el.cate}</h5>
                                   <h5 class="mb-1">Raza: ${el.raza}</h5>
                                   <small>ID:${el.id}</small>
                                </div>
                                <p>Peso: ${el.peso} KG /  Sexo: ${el.sexo} /  Fecha de nacimiento: ${el.fn}</p>
                                <small>${el.ant}</small> 
                               <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                 <button class="btn btn-info m_animal" type="button" data-id='${el.id}'>Medicamentos</button>
                               </div>
                              </a>`;
          });
          $inf.innerHTML = data;
        }, 100);
      });
    } else if (location.pathname.includes("reproduccion")) {
      //Funciones Reproduccion de Animales
      buscarAnimal(localStorage.getItem("id_animal"), (resp) => {
        setTimeout(() => {
          let $inf = document.getElementById("info_animal"),
            data = "";
          document.getElementById("id_animal").value =
            localStorage.getItem("id_animal");
          //console.log(resp)
          resp.forEach((el) => {
            data = `<a href="#" class="list-group-item list-group-item-action" aria-current="true">
                                <div class="d-flex w-100 justify-content-between">
                                   <h5 class="mb-1">Categoria: ${el.cate}</h5>
                                   <h5 class="mb-1">Raza: ${el.raza}</h5>
                                   <small>ID:${el.id}</small>
                                </div>
                                <p>Peso: ${el.peso} KG /  Sexo: ${el.sexo} /  Fecha de nacimiento: ${el.fn}</p>
                                <small>${el.ant}</small> 
                              </a>`;
          });
          $inf.innerHTML = data;
        }, 100);
      });
    } else if (location.pathname.includes("historialmedico")) {
      //Funciones para Historial Medico de Animales
      buscarAnimal(localStorage.getItem("id_animal"), (resp) => {
        setTimeout(() => {
          let $inf = document.getElementById("info_animal"),
            data = "";
          document.getElementById("id_animal").value =
            localStorage.getItem("id_animal");
          //console.log(resp)
          resp.forEach((el) => {
            data = `<a href="#" class="list-group-item list-group-item-action" aria-current="true">
                                <div class="d-flex w-100 justify-content-between">
                                   <h5 class="mb-1">Categoria: ${el.cate}</h5>
                                   <h5 class="mb-1">Raza: ${el.raza}</h5>
                                   <small>ID:${el.id}</small>
                                </div>
                                <p>Peso: ${el.peso} KG /  Sexo: ${el.sexo} /  Fecha de nacimiento: ${el.fn}</p>
                                <small>${el.ant}</small>
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button type="button" class="btn btn-outline-success fa fa-file-medical s_animal" title='Agregar medicamento' data-id='${el.id}'></button>
                                </div>
                             </a>`;
          });
          $inf.innerHTML = data;
          historialMedicoAnimal();
        }, 100);
      });
    } else if (location.pathname.includes("historialdereproduccion")) {
      //Funciones para Historial de reproduccion de Animales
      buscarAnimal(localStorage.getItem("id_animal"), (resp) => {
        setTimeout(() => {
          let $inf = document.getElementById("info_animal"),
            data = "";
          document.getElementById("id_animal").value =
            localStorage.getItem("id_animal");
          //console.log(resp)
          resp.forEach((el) => {
            data = `<a href="#" class="list-group-item list-group-item-action" aria-current="true">
                            <div class="d-flex w-100 justify-content-between">
                               <h5 class="mb-1">Categoria: ${el.cate}</h5>
                               <h5 class="mb-1">Raza: ${el.raza}</h5>
                               <small>ID:${el.id}</small>
                            </div>
                            <p>Peso: ${el.peso} KG /  Sexo: ${el.sexo} /  Fecha de nacimiento: ${el.fn}</p>
                            <small>${el.ant}</small>
                         </a>`;
          });
          $inf.innerHTML = data;
          historialReproduccionAnimal();
        }, 100);
      });
    } else if (location.pathname.includes("historialmuertes")) {
      //Funciones para Historial de muertes de Animales
      historialMuertes()      
    } else if (location.pathname.includes("muertes")) {
      //Funciones Muertes de Animales
      buscarAnimal(localStorage.getItem("id_animal"), (resp) => {
        setTimeout(() => {
          let $inf = document.getElementById("info_animal"),
            data = "";
          document.getElementById("id_animal").value =
            localStorage.getItem("id_animal");
          //console.log(resp)
          resp.forEach((el) => {
            data = `<a href="#" class="list-group-item list-group-item-action" aria-current="true">
                            <div class="d-flex w-100 justify-content-between">
                               <h5 class="mb-1">Categoria: ${el.cate}</h5>
                               <h5 class="mb-1">Raza: ${el.raza}</h5>
                               <small>ID:${el.id}</small>
                            </div>
                            <p>Peso: ${el.peso} KG /  Sexo: ${el.sexo} /  Fecha de nacimiento: ${el.fn}</p>
                            <small>${el.ant}</small> 
                          </a>`;
          });
          $inf.innerHTML = data;
        }, 100);
      });
    } else if (location.pathname.includes("historialventas")) {
      //Funciones para Historial de ventas
      historialVentas();
    } else if (location.pathname.includes("ventas")) {
      razas();
      categorias();
    }
  } else {
    salida();
  }
}
