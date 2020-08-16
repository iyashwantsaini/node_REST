const express=require('express');
const app=express();
const morgan = require('morgan');

// import routes
const productRoutes=require('./api/routes/products');
const orderRoutes=require('./api/routes/orders');

// for testing only
// app.use((req,res,next)=>{
//     res.status(200).json({
//         message:'It works!'
//     });
// });

// pass all routes to auth
app.use(morgan('dev'));

// imported product routes / middleware
app.use('/products',productRoutes);

// imported order routes / middleware
app.use('/orders',orderRoutes);

// last route used if invalid route is reached
app.use((req,res,next)=>{
    const error=new Error('Not found!');
    error.status=404;
    // forward to error handling route
    next(error);
});

// route for handling all errors 
app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message,
        }
    });
});

module.exports =app;