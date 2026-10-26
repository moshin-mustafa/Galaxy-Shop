

const form = document.getElementById('login-form');

form.addEventListener('submit', async (event) => {
    // Stop the default form submission here
event.preventDefault();
console.log("Login form submitted");
    let log= await fetch('/auth/login',{
method:"POST",
headers:{
    'Content-type':'application/json'
},
body:JSON.stringify({
    email:form.elements.email.value,
    password:form.elements.password.value
})

    })
//     console.log(log.status);
// console.log(await log.text());
    if (log.ok){
        let login= await log.json()
        console.log(login)
// console.log(log.status);
// console.log(await log.text());
         window.location.href = '/index.html'
    }
    else {
  let login= await log.json()
  console.error(login)
  const message = document.getElementById('login-message');
    }
    // console.log(login)


    // We'll add the fetch request next
});
console.log("Login JavaScript is running");