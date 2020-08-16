const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

router.get('/', (req, res, next) => {
    // res.status(200).json({
    //     message: 'GET on /products'
    // });
    // Product.find().limit()
    Product
        .find()
        // select the data you wanna fetch
        .select('name price _id')
        .exec()
        .then(result => {
            console.log(result);

            const response = {
                count: result.length,
                products: result.map(result => {
                    return {
                        name: result.name,
                        price: result.price,
                        _id: result._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + result._id
                        }
                    };
                })
            };
            res.status(200).json(response);

            // if (result.length >= 0) {
            // res.status(200).json(result);
            // }else{
            // res.status(404).json({
            // message:'No entries'
            // })
            // }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.post('/', (req, res, next) => {
    // accessing using body parser

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'POST on /products',
                // manually create object to send as response
                createdProduct: {
                    nmae: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: 'POST',
                        url: 'http:localhost:3000/products/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.get('/:productID', (req, res, next) => {
    const id = req.params.productID;
    Product.findById(id)
        .select('name price _id')
        .exec()
        .then(result => {
            console.log(result);
            // if id is valid and found in DB
            if (result) {
                res.status(200).json({
                    product: result,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + result._id
                    }
                });
            }
            // if id is valid but not in DB
            else {
                res.status(404).json({
                    message: 'No entry for provided ID!'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

router.patch('/:productID', (req, res, next) => {
    const id = req.params.productID;
    // Get list of which parameters to update for product
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    // update required props of product
    Product.update({
            _id: id
        }, {
            $set:
                // {
                // name: req.body.newName,
                // price: req.body.newPrice
                // }
                // updateOps have only required vars
                updateOps
        })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Product Updated!',
                product: {
                    name: result.name,
                    price: result.price,
                    id: result._id
                },
                request: {
                    type: 'PATCH',
                    url: 'http:localhost:3000/products/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.delete('/:productID', (req, res, next) => {
    const id = req.params.productID;
    Product
        .remove({
            _id: id
        })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Product Deleted',
                result: result,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;