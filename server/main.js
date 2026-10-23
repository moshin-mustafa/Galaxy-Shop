        import express, { json } from 'express';
        import auth from "./routes/auth.js"
        import pool from './database.js';
        let port =3000
        const app = express()
        app.use(express.static('public'));
        app.use(express.json())
import session from 'express-session';
app.use(session({
    secret: 'YOUR_TEMPORARY_DEVELOPMENT_SECRET',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 30
    }
}));

        app.use('/auth',auth)
        
app.get('/',async(req,res)=>{
res.send("testing 123")
});
app.get('/products',async(req,res)=>{
try{
    const result= await pool.query(
        'select * from products'
    )
 res.json(result.rows);
}catch(err){
 console.error(err);
        res.status(500).json({ error: 'Database error' });
}
});
app.get('/adding',(req,res)=>{
    res.sendFile('index.html',{root:'public'})
})
app.post('/adding',async(req,res)=>{
    let y = req.body
    if (!y.name|| y.name.trim()===''||!y.category||y.category.trim()===''){// this is the another way
    return res.status(400).json({
        Error:"invalid input/qurrey"
    })
}
if (Number(y.price)<=0 ||Number.isFinite(Number(y.price))==false){
     return res.status(400).json({
        Error:"invalid name"
    })
}
if (Number(y.stock_quantity)<0 ||Number.isInteger(Number(y.stock_quantity))==false){
     return res.status(400).json({
        Error:"invalid input or the stock is empty"
    })
}
    const result= await pool.query(
        'insert into products(name ,category,price,stock_quantity) values($1,$2,$3,$4) RETURNING *',
        [y.name,y.category,y.price,y.stock_quantity]
    )

       res.send(result.rows[0]);
})
app.listen(port,()=>{
    console.log("port is working ")
})