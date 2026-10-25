import express from 'express'
import pool from '../database.js';
const  router=express.Router()
router.post('/adding_product',async(req,res)=>{
    if (!req.session.userId){
        return res.status(401).json(
           {error:'You must login'} 
        )
    }
    
    const {product_id,quantity,}= req.body
    if(Number(quantity)<=0 ||Number(product_id)<=0 ||!Number.isInteger(Number(product_id))|| !Number.isInteger(Number(quantity))||!quantity ||!product_id){
        return res.status(400).json({
            error:"Bad request"
        })
    }
let result= await pool.query(
    'SELECT * FROM products WHERE id = $1',
    [product_id]
)
if (result.rows.length===0) {
      return res.status(404).json({
            error:"Not found"
        })
}
// else if (quantity>result.rows[0].stock_quantity){
//      return res.status(400).json({
//             error:"That amount is not avialble"
//         })
// }
let cart_result= await pool.query(
'    SELECT * FROM carts WHERE user_id = $1',
[req.session.userId]
)
let cartid
if (cart_result.rows.length === 0){
      let assign_cart= await pool.query(
      '  INSERT INTO carts (user_id) VALUES ($1) RETURNING  id' ,
      [req.session.userId]
      )
     cartid=assign_cart.rows[0].id
}
else{
    cartid=cart_result.rows[0].id
}
// const items={cart_id}
let existing_item = await pool.query(
    `SELECT quantity
     FROM cart_items
     WHERE cart_id = $1 AND product_id = $2`,
    [cartid, product_id]
);

let total_quantity = quantity;

if (existing_item.rows.length > 0) {
    total_quantity += existing_item.rows[0].quantity;
}

if (total_quantity > result.rows[0].stock_quantity) {
    return res.status(400).json({
        error: "Requested quantity exceeds available stock"
    });
}
let products= await pool.query(
         `INSERT INTO cart_items (cart_id, product_id, quantity)
     VALUES ($1, $2, $3)
     ON CONFLICT (cart_id, product_id)
     DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity
     RETURNING *`,
[cartid,product_id,quantity]
)   
router.delete('/delete/:productid',async(req,res)=>{
if (!req.session.userId) {
    return res.status(401).json({
        error: 'You must login'
    });
}
})


return res.status(200).json({
       message: "Product added to cart successfully",
    cart_item: products.rows[0]
    
}) 
})
 export default router