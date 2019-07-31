/* All user verification routes and user creation routes goes here */

const User = require('../models/user'); // Importing User model
const userService = require('../services/index');
const jwtService = require('../services/auth');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = require('../config/secret'); //Config files


/* Function to register user and generate JWT */
const register = (req, res) => {
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, secret.jwtSecret.saltRounds)
    }
    return User.findOne({
        where:{
            username:user.username,
            email:user.email
        }
    })
    .then(user=>{
        if(user){
            res.json({
                message:'Username and email already in use'
            })
        }else{
            return userService.addUser(user)
        .then((new_user) => {
            jwtService.new_authenticate(new_user)
                .then(token => {
                    res.json({
                        token: token,
                        message: 'User Created'
                    })
                })
                .catch(err => {
                    res.json({
                        error: err.message
                    })
                })
        })
        .catch((error) => {
            res.json({
                error: error.message
            })
        })
        }
    })
}
    

const login = (req, res) => {
    const credentials = {
        username: req.body.username,
        password: req.body.password
    }
    return jwtService.authenticate(credentials)
        .then(token => {
            res.json({
                success: true,
                token: token
            })
        })
        .catch(err => {
            res.json({
                error: err.message
            })
        })
}

module.exports = {
    register,
    login
}