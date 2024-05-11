
let form = document.getElementById("form_login")
  
form.addEventListener('submit', (e)=>{
    e.preventDefault()

    let user = document.getElementById("user").value
    let pass = document.getElementById("pass").value
    let var_json = JSON.stringify({user: user,clave: pass})
    //console.log(json)
    //console.log(JSON.parse(json))
    
    if(user!=="" && pass!==""){        
        //alert("Estamos aqui... ok")
        let info = {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: var_json
        }
        fetch("../control/login.php",info)   
    }
    /*if(e.target === $btniniciar){
        if($pass.value !== "" && $user.value !==""){
            e.preventDefault();
            window.location.href="menu.html";
        }
    }*/
    return false
})



