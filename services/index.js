const Users = require('../models/user');

const addTodo = require('./todo').addTodo;

const getTodo = require('./todo').getAllTodo;

const addUser = user =>Users.create(user).then(user=>{
    return user
});



module.exports ={
    addUser,
    addTodo,
    getTodo
}