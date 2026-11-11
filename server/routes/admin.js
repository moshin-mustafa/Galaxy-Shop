import express from 'express'

import { authadmin } from '../middleware/authorizeAdmin.js';
import pool from '../database.js';
const  router=express.Router()
router.use(authadmin);
router.get('/',async(req,res)=>{
    // res.send("welcome to admin pannel")
try {
    let customer='customer'
    let paid='paid'
    let total_products = await pool.query(
     'select count(*) as total_products from products'   

    )
    let total_users = await pool.query(
     'select count(*) as total_users from users where role = $1',
     [customer]

    )
    let total_orders = await pool.query(
     'select count(*) as total_orders from orders'  

    )
    
    let total_revenue = await pool.query(
     'select sum(total_price) as total_revenue from orders where payment_status=$1',
     [paid]

    )
    res.status(200).json({
        total_products:total_products.rows[0],
        total_users:total_users.rows[0],
        total_orders:total_orders.rows[0],
        total_revenue:total_revenue.rows[0]
    })
    
} catch (error) {
    res.status(500).json({
        error:"internal server error "
    })
}

})
router.patch('/update/:product_id',async(req,res)=>{
    try {
        let product_id=req.params.product_id
     console.log(product_id)
    if(!product_id || Number(product_id)<=0||!Number.isInteger(Number(product_id))){
       return res.status(400).json({
            
            
            error:"invalid product"
        })
    }
     let {name,category,price,stock_quantity } = req.body
   if (req.body.name !== undefined||req.body.category!==undefined ||req.body.price!==undefined ||req.body.stock_quantity) {
    // Name was supplied
    let p_name = await pool.query(
        'UPDATE products SET name=COALESCE($1, name),category=COALESCE($2, category) ,price=COALESCE($3, price), stock_quantity=COALESCE($4, stock_quantity)  WHERE id =$5 Returning *',
        [name,category,price,stock_quantity,product_id]
    
    )   
    res.status(200).json({
        p_name:p_name.rows[0],
        
    })   
}
else{
    return res.status(401).json({
        error:"filed can not be empty"
    })
}

    } catch (error) {
        res.status(500).json({
            message:"internal server error"
        })
        
    }


})
 export default router