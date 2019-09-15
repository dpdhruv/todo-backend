const Todo = require('../models/todo');

const addTodo = todo => Todo.create(todo).then(todo => {
  return todo
})

const getAllTodo = ()=>Todo.findAll();

module.exports={
  addTodo,
  getAllTodo
}