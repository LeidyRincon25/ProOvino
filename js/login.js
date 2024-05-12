const enviarLogin = async (url, method = "", param = undefined)=>{
    if(param !== undefined && method==="GET") url += "?"+ new URLSearchParams(param)
    if (method === "GET") method={method,headers: {'Content-Type':'application/json'}}    
    if (method === "POST") method={method,headers: {'Content-Type':'application/json'},body: JSON.stringify(param)}
    if (method === "PUT") method={method,headers: {'Content-Type':'application/json'},body: JSON.stringify(param)}
    if (method === "DELETE") method={method,headers: {'Content-Type':'application/json'},body: JSON.stringify(param)}
    
    fetch(url,method)
        .then(response =>response.json())
        .then(data=> validarLogin(data))
        .catch(e => console.log(e))  
}
const validarLogin = (data)=>{
    console.log(data)
}

let form = document.getElementById("form_login")
  
form.addEventListener('submit', (e)=>{
    e.preventDefault()
    let user = document.getElementById("user").value
    let pass = document.getElementById("pass").value
    let param = {user, pass}
    //console.log(json)
    //console.log(JSON.parse(json))
    
    if(user!=="" && pass!==""){        
        //alert("Estamos aqui... ok")
        let method = "POST"
        //fetch('../control/login.php', {method: 'POST',body: JSON.stringify(param)})
        //fetch('../control/login.php?'+ new URLSearchParams(param), {method: 'GET'})
        enviarLogin("../control/login.php",method,param)
    }
})



