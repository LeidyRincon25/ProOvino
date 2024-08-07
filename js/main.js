function ruta(url="",blank = undefined){
   //if(blank===undefined) {window.location.href = url} else {window.open(url)}
   (blank===undefined) ? window.location.href = url : window.open(url)
}

const Ajax = async (info)=>{
   let {url, method, param, fSuccess} = info
   if(param !== undefined && method==="GET") url += "?"+ new URLSearchParams(param)
   if (method === "GET") method={method,headers: {'Content-Type':'application/json'}}    
   if (method === "POST" || method === "PUT" || method === "DELETE") method={method,headers: {'Content-Type':'application/json'},body: JSON.stringify(param)}
   
   try{
       //console.log(url,method)
       let resp = await fetch(url,method);
       if(!resp.ok) throw {status: resp.status, msg: resp.statusText};
       let respJson =  await resp.json();  
       fSuccess(respJson)
   }catch(e){
      fSuccess({code: e.status, msg: e.msg})
   }
}


const salida = ()=>{   
   Ajax({
      url: "../control/token.php",
      method: "PUT", 
      param: {
         token: localStorage.getItem("token"),
         iduser: localStorage.getItem("iduser")
      }, 
      fSuccess: (Resp)=>{
         localStorage.clear();
         ruta("login.html");
      }
   })
}

function razas(){
   let $divRazas = document.getElementById("drazas");
   $divRazas.innerHTML= `<div class="spinner-border text-black" role="status"><span class="sr-only"></span></div>`;
   //console.log($divRazas)
   Ajax({
      url: "../control/razas.php",
      method: "GET", 
      param: undefined, 
      fSuccess:(Resp)=>{
         //console.log(Resp)
         if(Resp.code==200){            
            let opc=``;
            //console.log(Resp.data)
            Resp.data.map((el) => {
               opc+=`<option value="${el.IdRaza}">${el.RazaNombres}</option>`;               
               //console.log(el)
            });
            $divRazas.innerHTML= `<label for="raza">Raza</label><select class="form-select" name="raza" id="raza" required><option value="">Seleccione una</option>${opc}</select>`;
         }
      }
   })
}

function categorias(){
   let $div = document.getElementById("dcat");
   $div.innerHTML= `<div class="spinner-border text-black" role="status"><span class="sr-only"></span></div>`;
   Ajax({
      url: "../control/categorias.php",
      method: "GET", 
      param: undefined, 
      fSuccess:(Resp)=>{
         if(Resp.code==200){            
            let opc=``;
            Resp.data.map((el) => {
               opc+=`<option value="${el.IdCategoria}">${el.CateNombre}</option>`;
            });
            $div.innerHTML= `<label for="cat">Categoria</label><select class="form-select" name="cat" id="cat" required><option value="">Seleccione una</option>${opc}</select>`;
         }
      }
   })
}

function via(){
   let $div = document.getElementById("dvia");
   $div.innerHTML= `<div class="spinner-border text-black" role="status"><span class="sr-only"></span></div>`;
   Ajax({
      url: "../control/via.php",
      method: "GET", 
      param: undefined, 
      fSuccess:(Resp)=>{
         if(Resp.code==200){            
            let opc=``;
            Resp.data.map((el) => {
               opc+=`<option value="${el.IdVia}">${el.ViaNombre}</option>`;
            });
            $div.innerHTML= `<label for="via">Via</label><select class="form-select" name="via" id="via" 
            required><option value="">Seleccione una</option>${opc}</select>`;
         }
      }
   })
}
function medicamento(){
   let $div = document.getElementById("dmedicamentos");
   $div.innerHTML= `<div class="spinner-border text-black" role="status"><span class="sr-only"></span></div>`;
   //console.log($divRazas)
   Ajax({
      url: "../control/medicamentos.php",
      method: "GET", 
      param: undefined, 
      fSuccess:(resp)=>{
         //console.log(Resp)
         if(resp.code==200){            
            let opc=``;
            //console.log(Resp.data)
            resp.data.map((el) => {
               opc+=`<option value="${el.IdMedicamentos}">${el.MediNombre} (${el.MediPresentacion})</option>`;               
               //console.log(el)
            });
            $div.innerHTML= `<label for="medicamento">Medicamentos</label><select class="form-select" name="medicamento" id="medicamento" required><option value="">Seleccione un</option>${opc}</select>`;
         }
      }
   })
}

function guardarAnimal(m){
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
      url: "../control/animales.php", method: m, param: datos, 
      fSuccess: (resp)=>{
         //console.log(resp)
         if(resp.code==200){
            alert("El registos fue guardado correctamente")
            ruta("listadoanimales.html")
         } else alert("Error en el registro. "+resp.msg);
      }
   })
}

function listadoAnimales(){
   localStorage.removeItem("id_animal")
   let $tinfo=document.getElementById("tinfo"), item="";
   $tinfo.innerHTML= `<tr><td colspan='7' class='text-center'><div class="spinner-border text-black" role="status"><span class="sr-only"></span></div><br>Procesando...</td></tr>`;
   Ajax({
      url: "../control/animales.php", method: "GET", param: undefined, 
      fSuccess: (resp)=>{
         //console.log(resp)
         if(resp.code==200){
            //console.log(resp.data)
            resp.data.forEach((el)=>{
               item+=`<tr><th scope='row'>${el.id}</th>
                      <td>${el.cate}</td>
                      <td>${el.raza}</td>
                      <td>${el.sexo}</td>
                      <td>${el.peso} Kg</td>
                      <td>${el.ant}</td>
                      <td> <div class="btn-group" role="group">
                        <button type="button" class="btn btn-outline-primary fa fa-edit u_animal" title='Editar' data-id='${el.id}'></button>
                        <button type="button" class="btn btn-outline-danger fa fa-trash d_animal" title='Eliminar' data-id='${el.id}'></button>
                        <button type="button" class="btn btn-outline-success fa fa-file-medical s_animal" title='Salud' data-id='${el.id}'></button>
                        <button type="button" class="btn btn-outline-dark fa-sharp-duotone fa-solid fa-syringe ms_animal" title= 'MediSalud' data-id='${el.id}'></button>
                       </div>
                      </td></tr>`
            })
            $tinfo.innerHTML=item;
         } else $tinfo.innerHTML=`<tr><td colspan='7' class='text-center'>Error en la petición <b>${resp.msg}</b></td></tr>`;
      }
   })
}
function registrosalud(){
   let $tinfo=document.getElementById("tinfo"), item="";

   Ajax({
      url: "../control/vacunacion.php", method: "GET", param: undefined, 
      fSuccess: (resp)=>{
         console.log(resp)
         if(resp.code==200){
            //console.log(resp.data)
            resp.data.forEach((el)=>{
               item+=`<tr><th scope='row'>${el.id}</th>
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
                      </td></tr>`
            })
            $tinfo.innerHTML=item;
         } else $tinfo.innerHTML=`<tr><td colspan='6' class='text-center'>Error en la petición <b>${resp.msg}</b></td></
          tr>`;
      }
   })
}

function buscarAnimal(id,send){   
   Ajax({
      url: "../control/animales.php", method: "GET", param: {id}, 
      fSuccess: (resp)=>{
         //console.log(resp)
         if(resp.code==200){
            send(resp.data)            
         } else alert("Error en la petición\n"+resp.msg);
      }
   })
}

function editarAnimal(id){
   //console.log("Clic en Editar el registro id="+id)
   localStorage.setItem("id_animal",id);
   ruta("actualizaranimales.html?id="+id)
}

function eliminarAnimal(id){
   let resp = confirm("Desea eliminar el registro del Animal (#"+id+")?")
   if(resp){
      Ajax({
         url: "../control/animales.php", method: "DELETE", param: {id}, 
         fSuccess: (resp)=>{
            console.log(resp)
            if(resp.code==200){
               //console.log(resp.data)
               listadoAnimales()
            } else alert("Error en la petición\n"+resp.msg);
         }
      })
   }
}

function saludAnimal(id){
   //console.log("Clic en Editar el registro id="+id)
   localStorage.setItem("id_animal",id);
   ruta("vacunacion.html?id="+id)
   
}

function mediSalud(id){
   //console.log("Clic en Editar el registro id="+id)
   localStorage.setItem("id_animal",id);
   ruta("medicamentos.html?id="+id)
}

const mostarMenu = async ()=>{
   let $divmenu = document.getElementById("navbarSupportedContent");
   let url = "../control/menu.php"
   let resp = await fetch(url);
   let respText =  await resp.text();
   //console.log(respJson);
   $divmenu.innerHTML=respText;
   validarToken();
}

function guardarVacunacion(m){
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
      url: "../control/vacunacion.php", method: m, param: datos, 
      fSuccess: (resp)=>{
         //console.log(resp)
         if(resp.code==200){
            alert("El registos fue guardado correctamente")
            ruta("listadoanimales.html")
         } else alert("Error en el registro. "+resp.msg);
      }
   })
}

function validarToken(){
   if(localStorage.getItem("token")){
      $div_info_user = document.getElementById("info-user");
      $div_info_user.innerHTML=`${localStorage.getItem("user")}`;

      //Funciones del Registro de Animales
      if(location.pathname.includes("registroanimales") | location.pathname.includes("actualizaranimales")){
         razas()
         categorias()
         if(location.pathname.includes("actualizaranimales")) {
            setTimeout(()=>{
               let $form = document.getElementById("form-act_animales")
               buscarAnimal(localStorage.getItem("id_animal"), (resp)=>{
                  resp.forEach((el)=>{
                     $form.id_animal.value=el.id
                     $form.peso.value=el.peso
                     $form.fecha.value=el.fn
                     $form.antecedentes.innerHTML=el.ant
                     $form.sexo.value=el.sexo
                     $form.cat.value=el.idcate
                     $form.raza.value=el.idraza
                  })
               })
            },100)
         }
      } 
      //Funciones del Listado de Animales
      if(location.pathname.includes("listadoanimales")){
         listadoAnimales()
      }
      //Funciones para la Vacunacion de Animales
      if(location.pathname.includes("vacunacion")){   
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
                               <button class="btn btn-info me-md-2" type="button">Medicamentos</button>
                               <button class="btn btn-info" type="button">Registro de Salud</button>
                             </div>
                            </a>`;
                  })
                  $inf.innerHTML=data;
            },100)
         })
         medicamento()
      }
      //Funciones para Medicamentos de Animales
      if(location.pathname.includes("medicamentos")){   
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
         
      
   }else{
      salida()
   }
}

document.addEventListener("DOMContentLoaded", (e)=>{
   mostarMenu();
})

document.addEventListener("click",(e)=>{
   //console.log(e.target)
   if(e.target.matches("#salir")) salida()
   if(e.target.matches(".img-fluid")) ruta("principal.html?token="+localStorage.getItem("token"))
   if(e.target.matches(".u_animal")) editarAnimal(e.target.dataset.id)
   if(e.target.matches(".d_animal")) eliminarAnimal(e.target.dataset.id)
   if(e.target.matches(".s_animal")) saludAnimal(e.target.dataset.id)
   if(e.target.matches(".ms_animal")) mediSalud(e.target.dataset.id)
})

document.addEventListener("submit", (e)=>{
   e.preventDefault()
   if(e.target.matches("#form-animales")) guardarAnimal("POST");
   if(e.target.matches("#form-act_animales")) guardarAnimal("PUT");
   if(e.target.matches("#form_vacunacion_animal")) guardarVacunacion("POST")
})
