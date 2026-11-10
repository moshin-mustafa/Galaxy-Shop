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
    if(!product_id || product_id== false){
       return res.status(400).json({
            
            
            error:"invalid product"
        })
    }
     let {name,category,price,stock_quantity } = req.body
   

    let p_name = await pool.query(
        'UPDATE products SET name=$1    WHERE id =$2 Returning *',
        [name,product_id]

    )
    let p_category = await pool.query(
        'UPDATE products SET category=$1 WHERE id=$2 Returning *',
        [category,product_id]

    )
    let p_price = await pool.query(
        'UPDATE products SET price=$1 WHERE id =$2 Returning *',
        [price,product_id]

    )
    let p_stock_quantity = await pool.query(
        'UPDATE products SET stock_quantity=$1 WHERE id =$2 Returning *',
        [stock_quantity,product_id]

    )
    res.status(201).json({
        p_name:p_name.rows[0],
        p_category:p_category.rows[0],
        p_price:p_price.rows[0],
        p_stock_quantity:p_stock_quantity.rows[0]
    })   
    } catch (error) {
        res.status(500).json({
            message:"internal server error"
        })
        
    }


})
 export default router