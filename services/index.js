const Users = require('../models/user');
const Todo = require('../models/todo');

const addUser = user =>Users.create(user).then(user=>{
    return user
});

const addTodo = todo =>Todo.create(todo).then(todo=>{
    return todo
})


module.exports ={
    addUser,
    addTodo
}