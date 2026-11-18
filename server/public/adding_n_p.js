//  to let admin delete an exsisting product

let main= document.querySelector('#add_main')
let add = document.createElement('button')
add.innerText='Add new products'
    let namee = document.createElement('input')
        let category = document.createElement('input')
        let price = document.createElement('input')
        let stock_quantity = document.createElement('input')
        let save = document.createElement("button")
        category.placeholder ="Enter category"
        namee.placeholder ="Enter name"
        price.placeholder ="Enter price "
        stock_quantity.placeholder ="Enter Stock Quantity "
main.appendChild(add)
async function addi_product() {
    add.addEventListener('click',()=>{
        // for(let i=0 ; i<4;i++){
            
        // }

    
        main.appendChild(namee)
        main.appendChild(category)
        main.appendChild(price)
        main.appendChild(stock_quantity)
        main.appendChild(save)
        save.innerText="save "
        save.addEventListener('click',async()=>{
        let add = await fetch('/adding',{
method:"POST",
headers:{
     'Content-type':'application/json'
},
body:JSON.stringify({
name:namee.value,
category:category.value,
price:price.value,
stock_quantity:stock_quantity.value
})


})
let add_new_p= await add.json()
if(!add.ok){
    console.log(add_new_p.error)
}


//         })
    })
})
}
addi_product()
