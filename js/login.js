let $divMsg = document.querySelector("#msgLogin")

const enviarLogin = async (url="", method = "", param = undefined)=>{
    //if(param !== undefined && method==="GET") url += "?"+ new URLSearchParams(param)
    //if (method === "GET") method={method,headers: {'Content-Type':'application/json'}}    
    if (method === "POST") method={method,headers: {'Content-Type':'application/json'},body: JSON.stringify(param)}
    
    try{
        msgErrorLogin(`<div class="spinner-border text-black" role="status"><span class="sr-only"></span></div>`)
        let resp = await fetch(url,method);
        //console.log(resp);
        if(!resp.ok) throw {status: resp.status, msg: resp.statusText};
        let respJson =  await resp.json();  
        validarLogin(respJson)
    }catch(e){        
        msgErrorLogin(`<b class='text-danger'>Codigo ${e.status}<br>${e.msg}</br>`,3000)
    }
}
const validarLogin = (info)=>{
    //console.log(info)
    if(info.code===200) {
        //console.log(info);
        localStorage.clear();
        localStorage.setItem("token",info.idToken)
        localStorage.setItem("iduser",info.idUser)
        localStorage.setItem("user",info.Usuario)
        //console.log(localStorage);
        location.href="menu.html?token="+info.idToken
    } else {
        msgErrorLogin(`<b class='text-danger'>${info.msg}</b>`,4000)
    }
        
}
function msgErrorLogin (msg="", tiempo=undefined){
    $divMsg.innerHTML=msg
    if(tiempo!==undefined) setTimeout(()=>{$divMsg.innerHTML=""},tiempo)  
}

let $form = document.getElementById("form_login")
  
$form.addEventListener('submit', (e)=>{
    e.preventDefault()
    let user = document.getElementById("user").value
    let pass = md5(document.getElementById("pass").value)
    let param = {user, pass} //{"user": user, "pass":pass}
    //console.log(param)
    //console.log(JSON.stringify(param))
    
    if(user!=="" && pass!==""){
        let method = "POST"
        //fetch('../control/login.php', {method: 'POST',body: JSON.stringify(param)})
        //fetch('../control/login.php?'+ new URLSearchParams(param), {method: 'GET'})
        enviarLogin("../control/login.php",method,param)
    }
})
