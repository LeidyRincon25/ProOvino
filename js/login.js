const $btniniciar = document.getElementById("btniniciar"),
     $pass= document.getElementById("pass"),
     $user= document.getElementById("user"),
     
     document.addEventlistener{"onclick", (e)=>{ 
        if(e.target === $btniniciar){
            if($pass.value !== "" && $user.value !==""){
                e.preventDefault();
                window.location.href="menu.html";
            }
        }
     }}

