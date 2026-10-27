// handle not null in cart at the end
// Check stock availability.
import express from 'express'
import pool from '../database.js';
const  router=express.Router()
router.get('/',async(req,res)=>{
    try {
        
        if (!req.session.userId){
             return res.status(401).json(
               {error:'You must login'} 
            )
        }
    let carts= await pool.query( ' SELECT   sum(products.price*cart_items.quantity) as total FROM cart_items  JOIN products  ON cart_items.product_id=products.id JOIN carts ON cart_items.cart_id = carts.id WHERE carts.user_id=$1 ',
        [req.session.userId])
        return res.status(200).json({

            cart:carts.rows,
            total:carts.rows[0].total
        })
    } catch (error) {
        return res.status(500).json({
            error:"internal databse error"
        })
    }
})
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


return res.status(200).json({
       message: "Product added to cart successfully",
    cart_item: products.rows[0]
    
}) 
})
router.delete('/delete/:productid',async(req,res)=>{
    try {
        let {productid}=req.params
if (!req.session.userId) {
    return res.status(401).json({
        error: 'You must login'
    });
}
let del= await pool.query(
    'DELETE FROM cart_items WHERE product_id = $1 AND cart_id IN (  SELECT id   FROM carts    WHERE user_id = $2) RETURNING *',
    [productid,req.session.userId]
)
if(del.rows.length>0){
return res.status(200).json({
del:"done"
})
}
else{
 return   res.status(404).json({
error:"no matching item exists"
})
}
}
    // Your database query and result handling
 catch (err) {
     console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});
    // Handle the unexpected error

router.post('/place_orders',async(req,res)=>{
    try {
        if(!req.session.userId){
        return res.status(401).json({
            error:"you are not looged in"
        })
    }
    let odr= await pool.query(
        'select *from carts where user_id=$1',
        [req.session.userId]
    )
    if (odr.rows.length<=0){
        return res.status(404).json({
            err:"cart not found"
        })
    }
    if(cart_item.rows.length<=0){
         return res.status(404).json({
            err:"cart has no item"
        })
    }
    let cart_item= await pool.query(
        'SELECT * from cart_items WHERE cart_id=$1',
        [odr.rows[0].id]
    )
    let productIds = cart_item.rows.map(item => item.product_id)
    let product_price=await pool.query(
        'SELECT* from products where id =Any($1)',
        [productIds]
    )
    let total = await pool.query(
            'SELECT   sum(products.price*cart_items.quantity) as total FROM cart_items  JOIN products  ON cart_items.product_id=products.id JOIN carts ON cart_items.cart_id = carts.id WHERE carts.user_id=$1 ',
                [req.session.userId]
    )
    let oders_on= await pool.query(
        'INSERT INTO orders (user_id, total_price) VALUES ($1, $2) RETURNING id   ',
        [req.session.userId,total.rows[0].total]
    )
    for (let i = 0 ;i<cart_item.rows.length;i++){
        let item=cart_item.rows[i]


    }
    return res.status(200).json({
        odr:odr.rows[0].id,
        cart_items:cart_item.rows,
        product_price:product_price.rows,
        total:total.rows[0].total,
        oders_on:oders_on.rows[0].id

    })
    

    } catch (error) {
         return   res.status(404).json({
error:"no matching item exists"
})
    }
})

 export default router