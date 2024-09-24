//Importacion de Modulos
import { validarToken }  from "./token.js"
import { ruta, salida } from "./tool.js";
import { editarAnimal,eliminarAnimal,guardarAnimal } from "./animales.js";
import { vacunacionAnimal, guardarReproduccion,guardarVacunacion,reproduccionAnimal, eliminarReproduccion, eliminarVacunacion, historialMedicoAnimal,} from "./salud.js";
import { guardarMedicamento} from "./medicamentos.js";
import { muertes,guardarMuertes, eliminarMuertes, } from "./muertes.js";
import { guardarVentas, eliminarVentas} from "./ventas.js";

//Inicializacion del DOM
document.addEventListener("DOMContentLoaded", (e) => {
  Menu();
});

//Validacion de Evento CLICK en DOM
document.addEventListener("click", (e) => {
  //console.log(e.target)
  //console.log(e.target.remove())
  if (e.target.matches("#salir")) salida();
  if (e.target.matches(".img-fluid")) ruta("principal.html?token=" + localStorage.getItem("token"));
  if (e.target.matches(".u_animal")) editarAnimal(e.target.dataset.id);
  if (e.target.matches(".d_animal")) eliminarAnimal(e.target.dataset.id);
  if (e.target.matches(".s_animal")) vacunacionAnimal(e.target.dataset.id);
  if (e.target.matches(".m_animal")) historialMedicoAnimal(e.target.dataset.id);
  if (e.target.matches(".mt_animal")) muertes(e.target.dataset.id);
  if (e.target.matches(".re_animal")) reproduccionAnimal(e.target.dataset.id);
  if (e.target.matches(".d_ventas")) eliminarVentas(e.target.dataset.id);
  if (e.target.matches(".d_salud")) eliminarVacunacion(e.target.dataset.id);
  if (e.target.matches(".d_muertes")) eliminarMuertes(e.target.dataset.id);
  if (e.target.matches(".d_reproduccion")) eliminarReproduccion(e.target.dataset.id);
});

//Validacion de Evento SUBMIT en DOM
document.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.matches("#form-animales")) guardarAnimal("POST");
  if (e.target.matches("#form-act_animales")) guardarAnimal("PUT");
  if (e.target.matches("#form_vacunacion_animal")) guardarVacunacion("POST");
  if (e.target.matches("#form_medicamento")) guardarMedicamento("POST");
  if (e.target.matches("#form_muertes")) guardarMuertes("POST"); 
  if (e.target.matches("#form_reproduccion")) guardarReproduccion("POST"); 
  if (e.target.matches("#form_ventas")) guardarVentas("POST");

});

async function Menu(){
  let $divmenu = document.getElementById("navbarSupportedContent");
  let url = "../control/menu.php";
  let resp = await fetch(url);
  let respText = await resp.text();
  //console.log(respJson);
  $divmenu.innerHTML = respText;
  await validarToken();
};