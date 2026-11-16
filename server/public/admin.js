let main = document.querySelector('#main-body')
async function shop_details() {
    let get_details= await fetch('/admin',{
        method:"GET"

    })
    let total_orders
    let total_products
    let total_revenue
    let total_users
    let show_detail= await get_details.json(
        {
           total_orders:total_orders,
           total_products:total_products,
           total_revenue:total_revenue,
           total_users:total_users
        }
    )

    console.log(show_detail.total_orders.total_orders  )
    // let k = shop_details.total_orders
    total_products=document.createElement("p")
    total_orders=document.createElement("p")
      total_revenue=document.createElement("p")
     total_users=document.createElement("p")
    total_products.setAttribute("class","total_product")
    total_orders.setAttribute("class","total_orders")
    total_orders.setAttribute("class","total_revenue")
    total_orders.setAttribute("class","total_users")

    total_products.innerText="Total-Products:"+show_detail.total_products.total_products
    total_orders.innerText="Total-Orders:"+show_detail.total_orders.total_orders
    total_revenue.innerText="Total-Revenue:"+show_detail.total_revenue.total_revenue
    total_users.innerText="Total-Users"+show_detail.total_users.total_users
   
   main.appendChild(total_products)
   main.appendChild(total_orders)
   main.appendChild(total_revenue)
   main.appendChild(total_users)
}
shop_details()  