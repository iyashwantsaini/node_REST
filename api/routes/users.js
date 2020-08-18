const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    User.find({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(422).json({
                    message: 'Mail already exists'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {

                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            // 10 salting rounds (adding random strings to our pass)
                            password: hash
                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'user created!'
                                })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                })
                            });
                    }
                });
            }
        });

});

router.post('/login', (req, res, next) => {
    // this returns a list of users with this mail
    // but there will only be 1 unique user only
    User.find({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (user.length < 1) {
                // this way bruteforcing may be possible
                // one user finds a valid username
                // he/she can then try passwords
                // so never give email wrong or pass wrong messages to user
                return res.status(401).json({
                    // message:'Mail does not exist!'
                    message: 'Auth Failed'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth Failed'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                            // CREATE A TOKEN BASED ON THIS DATA
                            email: user[0].email,
                            userID: user[0]._id
                        },
                        process.env.JWT_KEY, {
                            // token only valid for 1 hour
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: 'Auth Successful!',
                        token:token
                    });
                }
                return res.status(401).json({
                    message: 'Auth Failed'
                });
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:userID', (req, res, next) => {
    User.remove({
            _id: req.params.userID
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User Deleted!'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;