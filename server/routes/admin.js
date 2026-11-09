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
 export default router