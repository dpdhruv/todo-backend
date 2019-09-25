var express = require('express');
var router = express.Router();

var checkAuth = require('../middleware/auth').checkAuth;

var auth = require('../controllers/auth');
var todoController = require('../controllers/todo');

//Auth routes//
router.route('/auth/user_register')
      .post(auth.register)

router.route('/auth/user_login')
      .post(auth.login)      


// Todo Routes //     
router.route('/auth/create_todo')
      .post(todoController.create)

router.route('/auth/get_todo')
      .get(checkAuth,todoController.getAllTodo)      

module.exports = router;
