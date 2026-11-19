// import { response } from "express";

// import { authadmin } from "../middleware/authorizeAdmin.js";
//   import admin from './routes/admin.js'



// let pl= document.getElementById("product-list")


// to add css so if i click outside the box the box should go to its s]normal shpae 
console.log("script.js is running");
let product= "/products"
async   function ff() {
        
        let profile= await fetch('/auth/profiles',{
            method:"GET"
        })
        let role
        let get_profiles= await profile.json({
        
       role:role

        })
        if(get_profiles.role!=='admin'){
console.log("test")
 let u = await  fetch(product)
        let collection= await u.json()
        console.log(collection)
        let container= document.getElementById("product-list")
    for (let i=0 ;i<collection.length;i++){
        let cart = document.createElement('button')
        // if (authadmin==true){
        //     let update = document.createElement("button")
        //     update.innerText="update"
        //     card.appendChild(update)
        // }

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

            
        window.location.href='/cart/ok'
    })
    card.appendChild(view)

}
else if (!add_to_cart.ok){
let view= document.createElement('button')
    view.innerText="limit exceeded view cart"
    view.addEventListener('click',()=>{

            
        window.location.href='/cart/ok'
    })
    card.appendChild(view)

    // window.location.href='/login.html'
}
else if (add_to_cart.ok==false){
alert("please loggin  in first to add products to the cart")
    window.location.href='/login.html'
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
        }
        else{ // else of the admin
let u = await  fetch(product)
        let collection= await u.json()
        console.log(collection)
        let container= document.getElementById("product-list")
          let name_a = document.createElement('p')
         name_a.setAttribute("class","name")
        name_a.innerText="update name"
           let price_a = document.createElement('p')
    let stock_quantity = document.createElement('p')
    let category= document.createElement('p')
    price_a.innerText="update price"
    stock_quantity.innerText="update stock_quantity"
    category.innerText="update category"
    let input= document.createElement("input")
    let save= document.createElement("button")
save.innerText="save"
    for (let i=0 ;i<collection.length;i++){
        // let cart = document.createElement('button')// to create a cart and will remve this for admin
let edit =document.createElement('button') 

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

edit.innerText="edit"
edit.addEventListener('click',async()=>{
  
      
    console.log("test of the admin")

  card.append   (name_a)
   card.append   (price_a)
  card.append   (stock_quantity)
  card.append   (category)
  name_a.addEventListener("click",()=>{// ise tra price aur stck k lea b kar na ha 
    
    card.appendChild(input)

    card.appendChild(save)
    save.addEventListener('click',async()=>{
let update= await fetch(`/admin/update/${item.id}`,{
    method:"PATCH",
    headers:{
 'Content-type':'application/json'
    },
    body:JSON.stringify({
name:input.value
    })
})
let value_update= await update.json()
console.log(value_update)
if (!update.ok){
    console.log(value_update.error)
    return
}
name.innerText=value_update.p_name.name
    })
  
})
price_a.addEventListener("click",()=>{
    card.appendChild(input)
card.appendChild(save)
save.addEventListener('click',async()=>{
    let update = await fetch(`/admin/update/${item.id}`,{
        method:"PATCH",
        headers:{
             'Content-type':'application/json'
        },
        body:JSON.stringify({
            price:input.value
        })

    })
    let new_update= await update.json()
    console.log(new_update)
    if(!update.ok){
        console.log(new_update.error)
    }
    price.innerText=new_update.p_name.price
})
})

stock_quantity.addEventListener('click',()=>{
    card.appendChild(input)
    card.appendChild(save)
    save.addEventListener('click',async()=>{
        let update = await fetch(`/admin/update/${item.id}`,{
            method:"PATCH",
            headers:{
                 'Content-type':'application/json'
            },
            body:JSON.stringify({
stock_quantity:input.value
            })
        })
        let new_update= await update.json()
        if(!update.ok){
            console.log(new_update.error)
        }
        else{

            stock_quantity.innerText="updated sucessfully"
            setTimeout(() => {
                stock_quantity.innerText="updated stock_quantity"
            }, 4000);
            clearInterval()
        }
        console.log("updated succesfully")
    })
})
category.addEventListener('click',()=>{
card.appendChild(input)
card.appendChild(save)
save.addEventListener('click',async()=>{
let update = await fetch(`/admin/update/${item.id}`,{
    method:"PATCH",
    headers:{
         'Content-type':'application/json'
    },
    body:JSON.stringify({
        category:input.value
    })
    
})
let new_update= await update.json()
if (!update.ok) {
    console.log(new_update.error)
    
}
else{
    category.innerText="The Category is Updated Succesfully"
    setTimeout(() => {
        category.innerText="update category"
    }, 4000);
}
})
})

})
 




let status= document.createElement("P")
if(item.stock_quantity>0){

status.innerText="Instock"
status.classList.add("in-stock");

}
else{
    status.innerText="sold"
        status.classList.add("out-of-stock");
}

// card.append(cart)
card.appendChild(status)
card.append(edit)

}
            console.log(get_profiles.role)
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