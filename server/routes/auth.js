import express from 'express'
import pool from '../database.js';
import bcrypt from 'bcrypt';
import session, { Session } from 'express-session';
const router = express.Router()

router.get('/register',(req,res)=>{
    res.sendFile('index.html',{root:'public'})
    
})
router.post('/register',async(req,res)=>{
    // res.send("it works")
   try{
const { name, email,password } = req.body;

    if (!name || !email || !password){
return res.status(400).json({
    error: "Bad request"
});

    }
    if (password.length<8){
        return res.status(400).json({
    error: "password too short"
});
}
let hashedPassword= await bcrypt.hash(password,10)
const result = await pool.query(
    'INSERT INTO users(name, email, password_hash, role) VALUES($1, $2, $3, $4) RETURNING name ,email,role',
    [name,email,hashedPassword,'customer'],
  
)

return res.status(201).json({

    name:result.rows[0].name,
    email:result.rows[0].email,
    role:result.rows[0].role
})

// res.json(result.rows)
   }
   catch(err){
    console.error(err);
    if(err.code=='23505'){

        res.status(409).json({ error: 'Email Exisit' });
    }
    else{
        res.status(500).json({ error: 'databseerer' });

    }
   }


})
router.post('/login',async(req,res)=>{
// At the end of the project, add a catch block to the login route to handle unexpected errors from database queries and password verification.
try {
    const{email,password}=req.body
      if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required"
            });
        }
        const result= await pool.query(
      'SELECT * from users WHERE email=$1 ',
[email]
)


  
if (result.rows.length === 0) {
// Return a response saying the user was not found
return res.status(400).json({
    email:"email was not found",
   
})
}
const isMatch= await bcrypt.compare(password,result.rows[0].password_hash)

  if (isMatch === false) {
            return res.status(401).json({
                error: "Incorrect email or password"
            });
        }
// req.session.userId=result.rows[0].id
req.session.regenerate((err)=>{
    if (err) {
      return  res.status(500).json({
            err:"Internal server error"
        })
    }
req.session.userId=result.rows[0].id
req.session.save((err)=>{
if (err){
     return  res.status(500).json({
            err:"Internal server error"
        })
}

return res.status(200).json({
    id:result.rows[0].id,
    name:result.rows[0].name,
    email:result.rows[0].email,
    role:result.rows[0].role
})
})
});
// return res.status(200).json({
//     id: result.rows[0].id,
//     name: result.rows[0].name,
//     email: result.rows[0].email,
//     role: result.rows[0].role
// });



} catch (error) {
    console.log(error)
    res.status(500).json({error:"database server error"})
}
})
function isAuthenticated(req, res, next) {
    // Your authentication check goes here

   if (!req.session.userId){
    return res.status(401).json({
        err:"unauth response"
    })
   }
  next();
}
// isAuthenticated()
router.get('/profiles',isAuthenticated,(req,res)=>{
    res.send("hello")
})
 export default router