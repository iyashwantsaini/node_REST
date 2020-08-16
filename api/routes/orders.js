const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');

const Order = require('../models/order');

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'GET on /orders'
    });
});

router.post('/',(req,res,next)=>{
    const order={
        productID:req.body.productID,
        quantity:req.body.quantity
    }
    res.status(201).json({
        message:'POST on /orders',
        order:order
    });
});

router.get('/:orderID',(req,res,next)=>{
    const id=req.params.orderID;
    res.status(200).json({
        message:'GET on /:orderID',
        id:id
    });
});

router.delete('/:orderID',(req,res,next)=>{
    const id=req.params.orderID;
    res.status(200).json({
        message:'DELETE on /:orderID',
        id:id
    });
});

module.exports=router;