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
res.status(200).json({
        loggedin:loggedin.rows
})
})
 export default router