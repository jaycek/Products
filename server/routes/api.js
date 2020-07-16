const express =require('express');
const mongoose=require('mongoose');
const router = express.Router();
const ProductData = require('../models/productdata');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { verify } = require('crypto');

//DB connection
mongoose.connect('mongodb://localhost:27017/Productdb' ,function(err){

    if(err){
        console.error(err);
    }
    else{
        console.log("Connected to MongoDB");
    }
});


router.post('/register',(req,res)=>{

    let userData=req.body;
    let user=new User(userData);
    
    User.findOne({email:userData.email},(err,user)=>{
        if(err){
            console.log(err);
        }
        else{
            if(user){
                res.status(422).send("Email Id already exists");
            }
        }
    });
    user.save((err,registeredUser)=>{
        if(err){
            console.error(err);
        }
        else{
            let payload = {subject:user._id};
            let token = jwt.sign(payload,'secretkey123');
            res.status(200).send({token});
            // res.status(200).send(registeredUser);
        }
    })

})

router.post('/login',(req,res)=>{

    let userData= req.body;
    User.findOne({email:userData.email},(err,user)=>{
    if(err){
        console.log(err);
    }
    else{
        if(!user){
            res.status(422).send("Invalid email Id");
        }
        else if(user.password != userData.password){
            res.status(401).send("Invalid password");
        }
        else{
            let payload = {subject:user._id};
            let token = jwt.sign(payload,'secretkey123');
            res.status(200).send({token});
            // res.status(200).send(user);
        }
    }

})

})

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.send(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ') [1];
    if(token==='null'){
        return res.send(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token,'secretkey123');
    if(!payload){
        return res.send(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    next();

}

router.get("/",(req,res)=>{
    res.send("From API");

})
router.get("/products",verifyToken,(req,res)=>{

    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    ProductData.find()
    .then(function(products){
        res.send(products);
    });
});

router.post("/singleproduct",verifyToken,(req,res)=>{

    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    console.log(req.body);
    _id=req.body._id;
    ProductData.findById(_id)
    .then(function(product){
        res.send(product);
    });
});

router.post("/insert",verifyToken,(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    console.log(req.body);
    var product= {
        productId:req.body.product.productId,
        productName:req.body.product.productName,
        productCode:req.body.product.productCode,
        releaseDate:req.body.product.releaseDate,
        description:req.body.product.description,
        price:req.body.product.price,
        starRating:req.body.product.starRating,
        imageUrl:req.body.product.imageUrl
    }

    var product = new ProductData(product);
    product.save();

})


router.post("/edit",verifyToken,(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    console.log(req.body);
    var product= {
        productId:req.body.product.productId,
        productName:req.body.product.productName,
        productCode:req.body.product.productCode,
        releaseDate:req.body.product.releaseDate,
        description:req.body.product.description,
        price:req.body.product.price,
        starRating:req.body.product.starRating,
        imageUrl:req.body.product.imageUrl
    }
    console.log(product);
    id=req.body.product._id;
    console.log(id);
    ProductData.findByIdAndUpdate({_id:id},product)
          .then(function(){
        console.log("Update success");
       
   })


})

router.post("/delete",verifyToken,(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    console.log(req.body);
    id=req.body._id;
    ProductData.findOneAndDelete({_id:id}).then(function(){
        console.log("Delete success"); 
        ProductData.find()
        .then(function(products){
            res.send(products);
        });
      })
    })


module.exports = router;
