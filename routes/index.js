var express = require('express');
var router = express.Router();

var auth = require('../controllers/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('It is working, so cool!!!')
});

router.route('/auth/user_register')
      .post(auth.register)

router.route('/auth/user_login')
      .post(auth.login)      

module.exports = router;
