function ruta(url="",blank = undefined){
   //if(blank===undefined) {window.location.href = url} else {window.open(url)}
   (blank===undefined) ? window.location.href = url : window.open(url)
}

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

function validarToken(){
   console.log(localStorage);
   if(localStorage.getItem("token")){
      //alert("ok token existe")
      $div_info_user = document.getElementById("info-user");
      $div_info_user.innerHTML=`${localStorage.getItem("user")}`;
      $div_info_user.className="small";
   }else{
      ruta("login.html")
   }

   //localStorage.clear()
}

document.addEventListener("DOMContentLoaded", (e)=>{
   validarToken()
})
