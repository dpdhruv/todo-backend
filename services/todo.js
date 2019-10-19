const Todo = require('../models/todo');
const User = require('../models/user');

const addTodo = todo => Todo.create(todo).then(todo => {
  return todo
})

const getAllTodo = ()=>Todo.findAll({where:{userId:'348028ac-31d8-444b-8abb-a97f0d20b7bb'}});

module.exports={
  addTodo,
  getAllTodo
}