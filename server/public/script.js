// import { response } from "express";




// let pl= document.getElementById("product-list")
console.log("script.js is running");
let product= "/products"
async   function ff() {
        
        
        
        let u = await  fetch(product)
        let collection= await u.json()
        console.log(collection)
        let container= document.getElementById("product-list")
    for (let i=0 ;i<collection.length;i++){
        let cart = document.createElement('button')

console.log(collection[i])
let item =collection[i]

console.log(item.id)

let card = document.createElement("div")    
card.setAttribute("class" ,"product-detail")

let name = document.createElement("h3")
name.innerText=item.name
let price = document.createElement("p")
price.innerText="Rs."+item.price
container.appendChild(card)
card.appendChild(name)
card.appendChild(price)
cart.innerText="Add to cart"


let status= document.createElement("P")
if(item.stock_quantity>0){

status.innerText="Instock"
status.classList.add("in-stock");
cart.addEventListener('click',async()=>{
    console.log("test")
   let product_id=item.id
let    quantity
    let add_to_cart= await fetch('/cart/adding_product',{
        method:"POST",
headers:{
    'Content-type':'application/json'
},
body:JSON.stringify({

    product_id:product_id,
       quantity:1
    })


})

let adding_item= await add_to_cart.json()
if(add_to_cart.ok==true){

    cart.innerText="Add more"
    let view= document.createElement('button')
    view.innerText="View cart"
    view.addEventListener('click',()=>{

        window.location.href='/cart.html'
    })
    card.appendChild(view)

}
    console.log(adding_item)
  
})
}
else{
    status.innerText="sold"
        status.classList.add("out-of-stock");
}
card.appendChild(status)
card.append(cart)
}
        //  container[0].appendchild(o)   
    }
ff()
const logoutBtn = document.getElementById('logout-btn');

logoutBtn.addEventListener('click', async () => {
    const response = await fetch('/auth/logout', {
        method: 'POST'
    });

    if (response.ok) {
        window.location.href = '/login.html';
    }
});