
async function products() {
    let y = await fetch('/adding',{
        method:"POST",
          headers:{
                'Content-Type': 'application/json', // Inform the server you are sending JSON
      
            },
            body:JSON.stringify({
    "name": "Gaming Headset",
  "category": "Accessories",
  "price": 3500,
  "stock_quantity": 15.60
            })
    })
    let u = await y.json()
    console.log(u)

}
products()