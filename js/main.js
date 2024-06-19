function ruta(url="",blank = undefined){
   //if(blank===undefined) {window.location.href = url} else {window.open(url)}
   (blank===undefined) ? window.location.href = url : window.open(url)
}


const peticionFetch = async (info)=>{
   let {url, method, param, fSuccess, fError} = info
   if(param !== undefined && method==="GET") url += "?"+ new URLSearchParams(param)
   if (method === "GET") method={method,headers: {'Content-Type':'application/json'}}    
   if (method === "POST" || method === "PUT" || method === "DELETE") method={method,headers: {'Content-Type':'application/json'},body: JSON.stringify(param)}
   
   try{
      fError(`<div class="spinner-border text-black" role="status"><span class="sr-only"></span></div>`)
       let resp = await fetch(url,method);
       //console.log(resp);
       if(!resp.ok) throw {status: resp.status, msg: resp.statusText};
       let respJson =  await resp.json();  
       fSuccess(respJson)
   }catch(e){        
       msgErrorLogin(`<b class='text-danger'>Codigo ${e.status}<br>${e.msg}</br>`,3000)
   }
}

function validarToken(){
   console.log(localStorage);
   if(localStorage.getItem("token")){
      $div_info_user = document.getElementById("info-user");
      $div_info_user.innerHTML=`${localStorage.getItem("user")}`;
   }else{
      salir("login.html")
   }
}

const salir = (url)=>{

   localStorage.clear()
   ruta(url)
}

document.addEventListener("DOMContentLoaded", (e)=>{
   validarToken()
})


//Funcion sin probrar
function loguear()
{
 let user=document.getElementById("user").value;
 let pass=document.getElementById("pass").value;

if(user=="rinconleidy020@gmail.com" && pass=="123456")

{ 
   window.location= "menu.html";
}
else
 { 
    alert("datos incorrectos");
 
} }
