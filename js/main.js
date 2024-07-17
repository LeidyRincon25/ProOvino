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

function validarToken(){
   if(localStorage.getItem("token")){
      $div_info_user = document.getElementById("info-user");
      $div_info_user.innerHTML=`${localStorage.getItem("user")}`;

      //Funciones del Registro de Animales
      if(location.pathname.includes("registroanimales")){
         razas()
         categorias()
      } 
      //Funciones del Listado de Animales
      if(location.pathname.includes("listadoanimales")){
         listadoAnimales()
      }     
   }else{
      salida()
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

function guardarAnimal(){
   //alert("OK estamos listos para enviar los datos")
   let datos = {
      ident: document.getElementById("identificacion").value,
      fn: document.getElementById("fecha").value,
      peso: document.getElementById("peso").value,
      raza: document.getElementById("raza").value,
      sexo: document.getElementById("sexo").value,
      cat: document.getElementById("cat").value,
      antecedentes: document.getElementById("antecedentes").value,
      iduser: localStorage.getItem("iduser"),
   };
   //console.log(datos)
   Ajax({
      url: "../control/animales.php", method: "POST", param: datos, 
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
   $tinfo=document.getElementById("tinfo")
   Ajax({
      url: "../control/animales.php", method: "GET", param: undefined, 
      fSuccess: (resp)=>{
         console.log(resp)
         if(resp.code==200){
            console.log(resp.data)

         } else $tinfo.innerHTML=`<tr><td colspan='6' class='text-center'>Error en la petición <b>${resp.msg}</b></td></tr>`;
      }
   })
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

document.addEventListener("DOMContentLoaded", (e)=>{
   mostarMenu();
})

document.addEventListener("click",(e)=>{
   //console.log(e.target)
   if(e.target.matches("#salir")) salida()
   if(e.target.matches(".img-fluid")) ruta("principal.html?token="+localStorage.getItem("token"))
})

document.addEventListener("submit", (e)=>{
   e.preventDefault()
   if(e.target.matches("#form-animales")) guardarAnimal();
})
