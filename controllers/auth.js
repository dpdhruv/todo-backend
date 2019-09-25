/* All user verification routes and user creation routes goes here */

const User = require('../models/user'); // Importing User model
const userService = require('../services/index');
const jwtService = require('../services/auth');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = require('../config/secret'); //Config files


/* Function to register user and generate JWT */
const register = (req, res) => {
	const userPayload = {
		username: req.body.username,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, secret.jwtSecret.saltRounds)
	}
	User.findOne({
		where: {
			username: userPayload.username,
			email: userPayload.email
		}
	})
		.then(user => {
			console.log("Searching...");
			if (user) {
				console.log("Already exists");
				res.json({
					message: 'Username and email already in use'
				})
			} else {
				return userService.addUser(userPayload)
					.then((new_user) => {
						console.log("Creating new user");
						jwtService.new_authenticate(new_user)
							.then(token => {
								console.log("token created");
								res.json({
									token: token,
									message: 'User Created'
								})
							})
							.catch(err => {
								console.log("some error occured in token creation");
								res.json({
									error: err.message
								})
							})
					})
					.catch((error) => {
						console.log("Error occured in user creation");
						res.json({
							message:'Some problem occured in creating a user',
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