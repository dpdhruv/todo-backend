const Todo = require('../models/todo');
const todoService = require('../services/index');

/* Function to create a todo */

const create = (req,res)=>{
  const todoPayload={
    userId:req.user.userId,
    title:req.body.title,
    description:req.body.description,
    label:req.body.label,
    due_date:Date()
  }
  return todoService.addTodo(todoPayload)
    .then((todo)=>{
      res.json({
        success:true,
        message:'Todo created successfully'
      })
    })
    .catch(err=>{
      res.json({
        error:err,
        message:'Error occured in creating Todo , Try Again!!!'
      })
    })
}

const getAllTodo = (req,res)=>{
  return todoService.getTodo()
    .then(todos=>{
      res.json({
        success:true,
        data:todos
      })
    })
    .catch(err=>{
      res.json({
        error:err.message,
        message:'Something went wrong , try again'
      })
    })
}

module.exports={
  create,
  getAllTodo
}