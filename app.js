const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// import routes
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// for testing only
// app.use((req,res,next)=>{
//     res.status(200).json({
//         message:'It works!'
//     });
// });

mongoose.connect('mongodb+srv://noderest:' + process.env.MONGO_PASS + '@cluster0.8bajk.mongodb.net/' + process.env.MONGO_DB_NAME + '?retryWrites=true&w=majority'
    // usemongoclient is depricated (no longer required)
    // ,{
    //     useMongoClient: true
    // }
);

mongoose.Promise=global.Promise;

// pass all routes to auth
app.use(morgan('dev'));
// parsing all url encoded data
app.use(bodyParser.urlencoded({
    extended: false
}));
// parsing json bodies
app.use(bodyParser.json());

// CORS headers Addition
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Headers','*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    // to check what methods our API supports
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
        // res.header('Access-Control-Allow-Methods','*');
        return res.status(200).json({});
    }
    next();
});

// imported product routes / middleware
app.use('/products', productRoutes);

// imported order routes / middleware
app.use('/orders', orderRoutes);

// last route used if invalid route is reached
app.use((req, res, next) => {
    const error = new Error('Not found!');
    error.status = 404;
    // forward to error handling route
    next(error);
});

// route for handling all errors 
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        }
    });
});

module.exports = app;