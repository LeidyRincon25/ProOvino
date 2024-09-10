function ruta(url = "", blank = undefined) {
  //if(blank===undefined) {window.location.href = url} else {window.open(url)}
  blank === undefined ? (window.location.href = url) : window.open(url);
}

const Ajax = async (info) => {
  let { url, method, param, fSuccess } = info;
  if (param !== undefined && method === "GET")
    url += "?" + new URLSearchParams(param);
  if (method === "GET")
    method = { method, headers: { "Content-Type": "application/json" } };
  if (method === "POST" || method === "PUT" || method === "DELETE")
    method = {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(param),
    };

  try {
    //console.log(url,method)
    let resp = await fetch(url,method);
    if (!resp.ok) throw { status: resp.status, msg: resp.statusText };
    let respJson = await resp.json();
    fSuccess(respJson);
  } catch (e) {
    fSuccess({ code: e.status, msg: e.msg });
  }
};

const salida = () => {
  Ajax({
    url: "../control/token.php",
    method: "PUT",
    param: {
      token: localStorage.getItem("token"),
      iduser: localStorage.getItem("iduser"),
    },
    fSuccess: (Resp) => {
      localStorage.clear();
      ruta("login.html");
    },
  });
};

function razas() {
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

function categorias() {
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

function via() {
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

function medicamentosDisponibles() {
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
function muertes() {
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
function guardarAnimal(m) {
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

function listadoAnimales() {
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
                        <button type="button" class="btn btn-secondary fa-sharp-duotone fa-solid fa-syringe m_animal" title= 'Medicamentos' data-id='${el.id}'></button>
                        <button type="button" class="btn btn-dark fa-solid fa-skull-crossbones mt_animal" title= 'Muertes' data-id='${el.id}'></button>
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
function registrosalud() {
  let $tinfo = document.getElementById("tinfo"),
    item = "";

  Ajax({
    url: "../control/vacunacion.php",
    method: "GET",
    param: undefined,
    fSuccess: (resp) => {
      console.log(resp);
      if (resp.code == 200) {
        //console.log(resp.data)
        resp.data.forEach((el) => {
          item += `<tr><th scope='row'>${el.id}</th>
                      <td>${el.medicamento}</td>
                      <td>${el.fecha}</td>
                      <td>${el.enfermedad}</td>
                      <td>${el.via}</td>
                      <td>${el.dosis}</td>
                      <td> <div class="btn-group" role="group">
                        <button type="button" class="btn btn-outline-primary" title='Editar'><i class="fa fa-edit"></i></
                           button>
                        <button type="button" class="btn btn-outline-danger" title='Eliminar'><i class="fa fa-trash"></
                       i></button>
                        </div>
                      </td></tr>`;
        });
        $tinfo.innerHTML = item;
      } else
        $tinfo.innerHTML = `<tr><td colspan='6' class='text-center'>Error en la petición <b>${resp.msg}</b></td></
          tr>`;
    }
  });
}

function buscarAnimal(id, send) {
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

function editarAnimal(id) {
  //console.log("Clic en Editar el registro id="+id)
  localStorage.setItem("id_animal", id);
  ruta("actualizaranimales.html?id=" + id);
}

function eliminarAnimal(id) {
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
function saludAnimal(id) {
  //console.log("Clic en Editar el registro id="+id)
  localStorage.setItem("id_animal", id);
  ruta("vacunacion.html?id=" + id);
}

function historialMedico(id) {
  //console.log("Clic en Editar el registro id="+id)
  localStorage.setItem("id_animal", id);
  ruta("historialmedico.html?id=" + id);
}

function muertes(id) {
  //console.log("Clic en Editar el registro id="+id)
  localStorage.setItem("id_animal", id);
  ruta("muertes.html?id=" + id);
}

function medicamentos(id) {
  //console.log("Clic en Editar el registro id="+id)
  localStorage.setItem("id_animal", id);
  ruta("medicamentos.html?id=" + id);
}
function muertes(id) {
  //console.log("Clic en Editar el registro id="+id)
  localStorage.setItem("id_animal", id);
  ruta("muertes.html?id=" + id);
}
function ventas(id) {
  //console.log("Clic en Editar el registro id="+id)
  localStorage.setItem("id_animal", id);
  ruta("ventas.html?id=" + id);
}

const mostarMenu = async () => {
  let $divmenu = document.getElementById("navbarSupportedContent");
  let url = "../control/menu.php";
  let resp = await fetch(url);
  let respText = await resp.text();
  //console.log(respJson);
  $divmenu.innerHTML = respText;
  validarToken();
};

function guardarVacunacion(m) {
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

function guardarMedicamento(m) {
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
function guardarReproduccion(m) {
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
function guardarMuertes(m) {
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
        ruta("muertes.html");
      } else {
        alert("Error en el registro. " + resp.msg);
      }
    }
  });
}

function guardarVenta(m) {
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


function historialMedicoAnimal() {
  let $tinfo = document.getElementById("tinfo"),
    item = "",
    id = localStorage.getItem("id_animal");
  $tinfo.innerHTML = `<tr><td colspan='7' class='text-center'><div class="spinner-border text-black" role="status"><span class="sr-only"></span></div><br>Procesando...</td></tr>`;
  Ajax({
    url: "../control/historialMedico.php",
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
                        <button type="button" class="btn btn-outline-danger fa fa-trash d_animal" title='Eliminar' data-id='${el.IdRegSalud}'></button>
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

function historialReproduccionAnimal() {
  let $tinfo = document.getElementById("tinfo"),
    item = "",
    id = localStorage.getItem("id_animal");
  $tinfo.innerHTML = `<tr><td colspan='7' class='text-center'><div class="spinner-border text-black" role="status"><span class="sr-only"></span></div><br>Procesando...</td></tr>`;
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
                      <td>${el.ReMetododelServicio}</td>
                      <td>${el.ReResultadodelServicio}</td>
                      <td>${el.ReFechadeParto}</td>
                      <td>${el.ReHoradelParto}</td>
                      <td>${el.ReNumerodeVivos}</td>
                      <td>${el.ReNumerodeMuertos}</td>
                      <td>${el.ReNumerodeMachos}</td>
                      <td>${el.ReNumerodeHembras}</td>
                      <!-- --><td> <div class="btn-group" role="group">
                        <button type="button" class="btn btn-outline-danger fa fa-trash d_animal" title='Eliminar' data-id='${el.IdReproduccion}'></button>
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

function historialVentas() {
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
                        <button type="button" class="btn btn-outline-danger fa fa-trash d_animal" title='Eliminar' data-id='${el.IdVenta}'></button>
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
function historialMuertes() {
  let $tinfo = document.getElementById("tinfo"), id="", item = "";
  $tinfo.innerHTML = `<tr><td colspan='6' class='text-center'><div class="spinner-border text-black" role="status"><span class="sr-only"></span></div><br>Procesando...</td></tr>`;
  Ajax({
    url: "../control/Muertes.php",
    method: "GET",
    param: { id },
    fSuccess: (resp) => {
      if (resp.code == 200) {
        //console.log(resp.data)
        resp.data.forEach((el) => {
          item += `<tr><th scope='row'>${el.MortaFecha}</th>
                      <td>${el.MortaCausaF}</td>
                      <!-- --><td> <div class="btn-group" role="group">
                        <button type="button" class="btn btn-outline-danger fa fa-trash d_animal" title='Eliminar' data-id='${el.IdMortalidad}'></button>
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

function reproduccionAnimal(id) {
  //console.log("Clic en Editar el registro id="+id)
  localStorage.setItem("id_animal", id);
  ruta("reproduccion.html?id=" + id);
}

function validarToken() {
  if (localStorage.getItem("token")) {
    $div_info_user = document.getElementById("info-user");
    $div_info_user.innerHTML = `${localStorage.getItem("user")}`;

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
    }
    //Funciones del Listado de Animales
    if (location.pathname.includes("listadoanimales")) {
      listadoAnimales();
    }
    //Funciones para la Vacunacion de Animales
    if (location.pathname.includes("vacunacion")) {
      via();
      medicamentosDisponibles();
      buscarAnimal(localStorage.getItem("id_animal"), (resp)=>{
               setTimeout(()=>{
                  let $inf = document.getElementById("info_animal"), data=""
                  document.getElementById("id_animal").value=localStorage.getItem("id_animal")
                  //console.log(resp)
                  resp.forEach((el)=>{
                     data=`<a href="#" class="list-group-item list-group-item-action" aria-current="true">
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
                  })
                  $inf.innerHTML=data;
            },100)
         })
    }
     //Funciones Muertes de Animales
 if (location.pathname.includes("muertes")) {
  buscarAnimal(localStorage.getItem("id_animal"), (resp)=>{
           setTimeout(()=>{
              let $inf = document.getElementById("info_animal"), data=""
              document.getElementById("id_animal").value=localStorage.getItem("id_animal")
              //console.log(resp)
              resp.forEach((el)=>{
                 data=`<a href="#" class="list-group-item list-group-item-action" aria-current="true">
                          <div class="d-flex w-100 justify-content-between">
                             <h5 class="mb-1">Categoria: ${el.cate}</h5>
                             <h5 class="mb-1">Raza: ${el.raza}</h5>
                             <small>ID:${el.id}</small>
                          </div>
                          <p>Peso: ${el.peso} KG /  Sexo: ${el.sexo} /  Fecha de nacimiento: ${el.fn}</p>
                          <small>${el.ant}</small> 
                        </a>`;
              })
              $inf.innerHTML=data;
        },100)
     })
}
     //Funciones Reproduccion de Animales
     if (location.pathname.includes("reproduccion")) {
      buscarAnimal(localStorage.getItem("id_animal"), (resp)=>{
               setTimeout(()=>{
                  let $inf = document.getElementById("info_animal"), data=""
                  document.getElementById("id_animal").value=localStorage.getItem("id_animal")
                  //console.log(resp)
                  resp.forEach((el)=>{
                     data=`<a href="#" class="list-group-item list-group-item-action" aria-current="true">
                              <div class="d-flex w-100 justify-content-between">
                                 <h5 class="mb-1">Categoria: ${el.cate}</h5>
                                 <h5 class="mb-1">Raza: ${el.raza}</h5>
                                 <small>ID:${el.id}</small>
                              </div>
                              <p>Peso: ${el.peso} KG /  Sexo: ${el.sexo} /  Fecha de nacimiento: ${el.fn}</p>
                              <small>${el.ant}</small> 
                            </a>`;
                  })
                  $inf.innerHTML=data;
            },100)
         })
    }
    //Funciones para Historial Medico de Animales
    if (location.pathname.includes("historialmedico")) {
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
    }
     //Funciones para Historial de reproduccion de Animales
 if (location.pathname.includes("historialdereproduccion")) {
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
}
     //Funciones para Historial de muertes de Animales
 if (location.pathname.includes("historialmuertes")) {
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
}
    //Funciones para Historial de ventas
    if (location.pathname.includes("historialventas")) {
      historialVentas()
    }

    //Funciones para la Venta de Animales
    if (location.pathname.includes("ventas")) {      
      razas();
      categorias();
    }
  } else {
    salida();
  }
}

document.addEventListener("DOMContentLoaded", (e) => {
  mostarMenu();
});

document.addEventListener("click", (e) => {
  //console.log(e.target)
  if (e.target.matches("#salir")) salida();
  if (e.target.matches(".img-fluid"))
    ruta("principal.html?token=" + localStorage.getItem("token"));
  if (e.target.matches(".u_animal")) editarAnimal(e.target.dataset.id);
  if (e.target.matches(".d_animal")) eliminarAnimal(e.target.dataset.id);
  if (e.target.matches(".s_animal")) saludAnimal(e.target.dataset.id);
  if (e.target.matches(".m_animal")) medicamentos(e.target.dataset.id);
  if (e.target.matches(".mt_animal")) muertes(e.target.dataset.id);
  if (e.target.matches(".re_animal")) reproduccionAnimal(e.target.dataset.id);
});

document.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.matches("#form-animales")) guardarAnimal("POST");
  if (e.target.matches("#form-act_animales")) guardarAnimal("PUT");
  if (e.target.matches("#form_vacunacion_animal")) guardarVacunacion("POST");
  if (e.target.matches("#form_medicamento")) guardarMedicamento("POST");
  if (e.target.matches("#form_ventas")) guardarVenta("POST");
  if (e.target.matches("#form_muertes")) guardarMuertes("POST"); 
  if (e.target.matches("#form_reproduccion")) guardarReproduccion("POST"); 

});
