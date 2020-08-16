const express = require('express');
const router=express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'GET on /products'
    });
});

router.post('/',(req,res,next)=>{
    // accessing using body parser
    const product={
        name:req.body.name,
        price:req.body.price
    }
    res.status(201).json({
        message:'POST on /products',
        createdProduct:product
    });
});

router.get('/:productID',(req,res,next)=>{
    const id=req.params.productID;
    if(id=='special'){
        res.status(200).json({
            message:'Special ID!',
            id:id
        });
    }else{
        res.status(200).json({
            message:'Not Special ID!',
            id:id
        });
    }
});

router.patch('/:productID',(req,res,next)=>{
        res.status(200).json({
            message:'Product Updated!'
        });
});

router.delete('/:productID',(req,res,next)=>{
    res.status(200).json({
        message:'Product Deleted!'
    });
});

module.exports=router;