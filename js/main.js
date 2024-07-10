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
            $divRazas.innerHTML= `<label for="raza">Raza</label><select class="form-select" name="raza" id="raza"><option value="">Seleccione una</option>${opc}</select>`;
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
            $div.innerHTML= `<label for="cat">Categoria</label><select class="form-select" name="cat" id="cat"><option value="">Seleccione una</option>${opc}</select>`;
         }
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