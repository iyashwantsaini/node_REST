const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check');

const Order = require('../models/order');
const Product = require('../models/product');
const product = require('../models/product');

router.get('/', checkAuth,(req, res, next) => {
    Order
        .find()
        .select('product quantity _id')
        // fill referenced product with complete product details instead of just ID
        .populate('product', 'name')
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                count: result.length,
                orders: result.map(result => {
                    return {
                        _id: result._id,
                        product: result.product,
                        quantity: result.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders/' + result._id
                        }
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    // res.status(200).json({
    //     message: 'GET on /orders'
    // });
});

router.post('/', checkAuth, (req, res, next) => {
    Product.findById(req.body.productID)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: 'Product Not Found!'
                });
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productID
            });
            return order.save();
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Order Stored!',
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/orders/' + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

    // res.status(201).json({
    //     message:'POST on /orders',
    //     order:order
    // });
});

router.get('/:orderID', checkAuth,(req, res, next) => {
    Order.findById(req.params.orderID)
        .populate('product')
        .exec()
        .then(order => {
            if (!order) {
                return res.status(400).json({
                    message: 'Order Not Found!'
                });
            }
            res.status(200).json({
                order: order,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders'
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:orderID', checkAuth, (req, res, next) => {
    Order.remove({
            _id: req.params.orderID
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Order Removed!',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/orders/',
                    body: {
                        productID: 'ID',
                        quantity: "NUMBER"
                    }
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;