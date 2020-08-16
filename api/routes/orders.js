const express=require('express');
const router=express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'GET on /orders'
    });
});

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message:'POST on /orders'
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