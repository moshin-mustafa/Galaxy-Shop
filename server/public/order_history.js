//add go back to back to basic detail 
// edit inner text to provie more detail
// the card size should shrink when click on deteail
// fix date thing only show date not time 
// re_order.innerText="added to cart" isko thora sa aur sai karna ha

async function order_hist() {

    let order_history=await fetch('/order_history',{
        method:'GET'
    })
let main_div= document.querySelector('#main-div')
main_div.replaceChildren()
let order_items,loggedin
    let oh= await order_history.json(
       {
            loggedin:loggedin,
           order_items:order_items 
       }
    
    )
    console.log(oh.loggedin[6].id)

for(let i=0;i<oh.loggedin.length;i++){
let cont=document.createElement('div')
let id=document.createElement('p')

let payment_status=document.createElement('p')
let Date=document.createElement('p')
let total_price=document.createElement('p')
let detail=document.createElement('button')
id.innerText=oh.loggedin[i].id
payment_status.innerText=oh.loggedin[i].payment_status
total_price.innerText=oh.loggedin[i].total_price
detail.innerText=oh.loggedin[i].detail
Date.innerText=oh.loggedin[i].created_at
detail.innerText="Details"
id.setAttribute("class","id")


payment_status.setAttribute("class","payment_status")

Date.setAttribute("class","Date")

    total_price.setAttribute("class","total_price")

detail.setAttribute("class","view-detail")

let oid = document.createElement('p')

let name = document.createElement('p')

let peice_at_purchase = document.createElement('p')

let quantity = document.createElement('p')

let re_order=document.createElement('button')

re_order.setAttribute("class","re-order")

detail.addEventListener('click',()=>{
    
    // console.log("i was cliced")
    for (let k=0; k<oh.order_items.length;k++){
        if (oh.order_items[k].id === oh.loggedin[i].id) {
    // Create and append product elements here
    oid.setAttribute('class','id')
    name.setAttribute('class','id')
    peice_at_purchase.setAttribute('class','price_at_purchase')
    quantity.setAttribute('class','quantity')
    
    re_order.innerText="RE-Order"

    oid.innerText=oh.order_items[k].id
    name.innerText=oh.order_items[k].name
    peice_at_purchase.innerText=oh.order_items[k].price_at_purchase
    quantity.innerText=oh.order_items[k].quantity
    re_order.addEventListener('click',async()=>{
let odra= await fetch(`/order_history/${oh.order_items[k].id}/reorder`,{
    method:"POST"
})
let again_order= await odra.json()
if(!odra.ok){
    console.log(again_order.error)
return
}
re_order.innerText="added to cart"
    })
}

cont.appendChild(oid)
cont.appendChild(name)
cont.appendChild(peice_at_purchase)
cont.appendChild(quantity)
cont.appendChild(re_order)
    }


})
cont.appendChild(id)
cont.appendChild(Date)
cont.appendChild(payment_status)
cont.appendChild(total_price)
cont.appendChild(detail)


cont.setAttribute("class","hc")
main_div.appendChild(cont)
}
    
    console.log(oh)
}
order_hist()