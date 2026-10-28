// future imrovements
// Improve the order history response so each order contains its own items, rather than returning two separate arrays.


import express from 'express'
import pool from '../database.js';
const  router=express.Router()
router.get('/',async(req,res)=>{
if(!req.session.userId){
    return res.status(401).json({
        error:"you are not logged in"
    })
}
let loggedin= await pool.query(
    'select * from orders where user_id=$1',
    [req.session.userId]
    
)
if (loggedin.rows.length<=0){
    return res.status(200).json({
        message:"yu havent palced any order"
    })
}
let order_items= await pool.query(
    'SELECT orders.id , products.name,order_items.price_at_purchase, order_items.quantity FROM orders INNER JOIN order_items ON orders.id = order_items.order_id inner join products on order_items.product_id = products.id WHERE orders.user_id = $1',
[req.session.userId]
)

res.status(200).json({
        loggedin:loggedin.rows,
        order_items:order_items.rows
})
})
 router.post('/:orderId/reorder', async (req, res) => {
    // Your reorder logic goes here
    let re_order= await pool.query(
        'SELECT orders.id, orders.user_id from orders where orders.id=$1 and orders.user_id=$2',
        [req.params.orderId,req.session.userId]
    )
        if (re_order.rows.length===0){
            return res.status(404).json({
                eror:"Not found"
            })
        }
    let Ret_Pur_Pro= await pool.query(
        'SELECT product_id,quantity from order_items where order_id =$1',
        [req.params.orderId]
    )
    if(Ret_Pur_Pro.rows.length===0){
        return res.status(404).json({
            error:"Not found"
        })
    }
    let correcr_cart
    let looged_in= await pool.query(
        'SELECT  id,user_id from carts where user_id=$1 ',
        [req.session.userId]
    )
    // correcr_cart=looged_in.rows[0].id
    if (looged_in.rows.length===0){
     looged_in= await pool.query(
        'INSERT into carts(user_id) values($1) returning id',
        [req.session.userId]
    )
    correcr_cart=looged_in.rows[0].id
    }
    else{
        correcr_cart=looged_in.rows[0].id
     
    }
    for (let i =0 ; i<Ret_Pur_Pro.rows.length;i++){
            let pid=Ret_Pur_Pro.rows[i].product_id
            let qun=Ret_Pur_Pro.rows[i].quantity
        let product_check= await pool.query(
            'SELECT cart_id , product_id from cart_items WHERE cart_id = $1 and product_id = $2',
            [correcr_cart,pid]
        )
        if (product_check.rows.length>0){
            let i_e_q= await pool.query(
                '  UPDATE cart_items SET quantity = quantity + $1 WHERE cart_id = $2 AND product_id = $3',
        [qun, correcr_cart, pid]
            )
        }
        else{
               let add_item = await pool.query(
        `INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3)`,
        [correcr_cart, pid, qun]
    )
        }
        
    }
    return res.status(201).json({
        message:"Previous order added to cart successfully"
    })
});
 export default router