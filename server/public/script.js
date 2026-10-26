// let pl= document.getElementById("product-list")
console.log("script.js is running");
let product= "/products"
async function ff() {
        
        
        
        let u = await fetch(product)
        let collection= await u.json()
        console.log(collection)
        let container= document.getElementById("product-list")
    for (let i=0 ;i<collection.length;i++){
console.log(collection[i])
let item =collection[i]

console.log(item.name)
let card = document.createElement("div")    
card.setAttribute("class" ,"product-detail")

let name = document.createElement("h3")
name.innerText=item.name
let price = document.createElement("p")
price.innerText="Rs."+item.price
container.appendChild(card)
card.appendChild(name)
card.appendChild(price)


let status= document.createElement("P")
if(item.stock_quantity>0){
status.innerText="Instock"
status.classList.add("in-stock");
}
else{
    status.innerText="sold"
        status.classList.add("out-of-stock");
}
card.appendChild(status)
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