//future fix total ek dafa dekna chye ha 
let k = document.getElementsByClassName('item');
let cart= fetch('/cart',{
    method:"GET"
})
async function getCart(){
    const response = await cart;
    let total
    let cart_items

   
  
    const data = await response.json({
        total:total,
        cart:cart_items
    
        
    });
 console.log(data)

//  for(let i=0;i<10;i++){
//     let k= document.createElement('p')
//     k.innerText="heelo"
//     document.body.appendChild(k)
//  }
console.log(data.total)

 for(let i =0;i<data.cart_items.length;i++){
let c = document.createElement('div')


document.body.prepend(c)
console.log(c)
let name = document.createElement('p')

name.innerText="Name:"+data.cart_items[i].name
let price = document.createElement('p')
price.innerText="Price:"+data.cart_items[i].price
let quantity = document.createElement('p')
quantity.innerText="Quantity:"+data.cart_items[i].quantity

let category = document.createElement('p')
category.innerText="Category:"+data.cart_items[i].category
 total = document.createElement('p')
total.innerText="Total:"+data.total

// price.setAttribute("class","price")
c.appendChild(name)
c.appendChild(price)

c.appendChild(quantity)
c.appendChild(category)

c.appendChild(total)
}


  
 


}
getCart()