const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');
const checkAuth = require('../middleware/check');

const multer = require('multer');

// storage define for image data
var storage = multer.diskStorage({
    // cb=callBack
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    // how file should be named
    filename: function (req, file, cb) {
        // in windows ":" are not allowed
        cb(null, new Date().toISOString().replace(/[-T:\.Z]/g, "") + file.originalname)
    }
});

// rejecting unwanted extension files
const fileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        // accept & store the file
        cb(null, true);
    } else {
        // reject the file
        cb(null, false);
    }
}

// turn it into static in app.js
// const upload=multer({dest:'uploads/'});
var upload = multer({
    storage: storage,
    limits: {
        // upto 5 mb allowed
        fileSize: 1025 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.get('/', (req, res, next) => {
    // res.status(200).json({
    //     message: 'GET on /products'
    // });
    // Product.find().limit()
    Product
        .find()
        // select the data you wanna fetch
        .select('name price _id productImage')
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
                        productImage: result.productImage,
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

// due to multer now we'll need to pass formdata TYPE
// upload.single() middleware parses 1 incoming file like: img
router.post('/', checkAuth, upload.single('productImage'), (req, res, next) => {

    // data of file (img) that is sent
    console.log(req.file);

    // accessing using body parser
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
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
                    productImage: result.productImage,
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
        .select('name price _id productImage')
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

router.patch('/:productID', checkAuth, (req, res, next) => {
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
                    id: result._id,
                    productImage: result.productImage
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

router.delete('/:productID', checkAuth, (req, res, next) => {
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