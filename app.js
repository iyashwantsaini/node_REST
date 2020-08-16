const express=require('express');
const app=express();

const productRoutes=require('./api/routes/products');
const orderRoutes=require('./api/routes/orders');

// for testing only
// app.use((req,res,next)=>{
//     res.status(200).json({
//         message:'It works!'
//     });
// });

// imported product routes
app.use('/products',productRoutes);

// imported order routes
app.use('/orders',orderRoutes);

module.exports =app;