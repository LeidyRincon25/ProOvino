function ruta(url="",blank = undefined){
   //if(blank===undefined) {window.location.href = url} else {window.open(url)}
   (blank===undefined) ? window.location.href = url : window.open(url)
}

function loguear()
{
 let user=document.getElementById("user").value;
 let pass=document.getElementById("pass").value;

if(user=="leidy@gmail.com" && pass=="12345")

{ 
   window.location= "menu.html";
}
else
 { 
    alert("datos incorrectos");
 
} }
