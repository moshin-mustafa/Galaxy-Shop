//future fix total ek dafa dekna chye ha 
let k = document.getElementsByClassName('item');
async function getCart(){
    let cart= fetch('/cart',{
        method:"GET"
    })
    const response = await cart;
    let total
    let cart_items

   let y=document.querySelector("#cart-container")
   y.replaceChildren()
  
    const data = await response.json({
        total:total,
        cart:cart_items
    
        
    });
 console.log(data)

console.log(data.total)

 for(let i =0;i<data.cart_items.length;i++){
let c = document.createElement('div')
y.appendChild(c)
c.setAttribute("class","main-fun")

let button= document.createElement('button')
button.innerText="+"
button.setAttribute("class","quantity-plus")

let del= document.createElement('button')
del.innerText="-"
del.setAttribute("class","quantity-plus")


console.log(c)
let name = document.createElement('p')
name.setAttribute("class","main-display name")

name.innerText="Name:"+data.cart_items[i].name
let price = document.createElement('p')

price.setAttribute("class","main-display price")
price.innerText="Price:"+data.cart_items[i].price

let quantity = document.createElement('p')
quantity.setAttribute("class","main-display quantity")

quantity.innerText="Quantity:"+data.cart_items[i].quantity
button.addEventListener("click",async()=>{
let add= await fetch('/cart/adding_product',{
    method:"POST",
    headers:{
   'Content-type':'application/json'
    },
    body:JSON.stringify({
        product_id:data.cart_items[i].product_id,
        quantity:1
    })


    

})

let addi_product=await add.json()
if (!add.ok) {
    console.log(addi_product.error,"not noog");
    return;
}
  getCart()
 



})
 del.addEventListener('click',async()=>{
    let dell= await fetch(`/cart/delete/${data.cart_items[i].product_id}`,{
        method:"DELETE",
        headers:{
         'Content-type':'application/json'
        },
        body:JSON.stringify({
            product_id:data.cart_items[i].product_id,
        quantity:1
        })
    })
    
    let del_p= await dell.json()
    if(!dell.ok){
        console.log(del_p.error)
        return
    }
    getCart()
})
let placeorder= document.createElement('button')
placeorder.setAttribute("class","place_order")
placeorder.innerText="place the order"
placeorder.addEventListener('click',async()=>{
    let po= await fetch('/cart/place_orders',{
method:'POST'

})
let odr_p=await po.json()
console.log(odr_p)
if(!po.ok){
    console.log(odr_p.error)
    return
}

       window.location.href = odr_p.checkout_url;

getCart()
})
let category = document.createElement('p')
category.setAttribute("class","main-display category")
category.innerText="Category:"+data.cart_items[i].category
total = document.createElement('p')
total.setAttribute("class","main-display total")
total.innerText="Total:"+data.total

c.appendChild(name) 
c.appendChild(price)

c.appendChild(quantity)
c.appendChild(button)
c.appendChild(del)
c.appendChild(category)

c.appendChild(total)
c.appendChild(placeorder)
}


  
 


}
getCart()