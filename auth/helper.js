const bcrypt = require('bcryptjs');
const db = require('../data/knex');
const jwt = require('jsonwebtoken');

module.exports = {
    error: (error, req, res, next) => {
        res.status(error.status || 500).json(error.message || "request couldn't be found")
    },
    tokenGenerator: user => {
        const {
            id,
            username
        } = user;
        const token = jwt.sign({
            id,
            username
        }, process.env.JWTKEY);
        return token;
    },
    register: (req, res, next) => {
        const newUser = req.body;
        if (newUser.fullname && newUser.email && newUser.password) {
            newUser.password = bcrypt.hashSync(newUser.password, 14);
            db('users').insert(newUser)
                .then(result => {
                    res.status(200).json(result);
                }).catch(error => next({message: error.message, status: 401}))
        } else {
            next({message: 'username and password is required'})
        }
    },
    signIn: (req, res, next) => {
        const newUser = req.body;
        if (newUser.email && newUser.password) {
            db('users').where({
                email: newUser.email
            }).first().then(result => {
                // check if the user has signed up
                if (result) {
                    // authenticate user
                    if (bcrypt.compareSync(newUser.password, result.password)) {
                        const token = module.exports.tokenGenerator(result);
                        const {id, fullname} = result;
                        res.status(200).json({token, id, fullname})
                    } else {
                        next({message: 'incorrect password'})
                    }
                } else {
                    next({message: 'username has not signed up'})
                }
            })
        } else {
            next({message: 'username and password is required'})
        }
    },
    verifyUser: (req, res, next) => {
        if (req.params.user_id) {
            db('users').where({id: req.params.user_id}).first()
                .then(result => {
                    if (result) {
                        next()
                    } else {
                        next({message: "wrong user id", status: 401})
                    }
                })
        } else {
            next({message: "user id is required", status: 401})
        }
    },
};