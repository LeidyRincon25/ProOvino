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
   if(e.target.matches("#salir")) salida()
})