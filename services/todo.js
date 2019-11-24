const Todo = require('../models/todo');
const User = require('../models/user');

const addTodo = todo => Todo.create(todo).then(todo => {
  return todo
})

module.exports={
  addTodo
}