const jwt = require('jsonwebtoken');
const secret = require('../config/secret');

const checkAuth = (req,res,next) =>{
  var token = req.headers['token'];
  if(!token){
    return res.json({
      auth:false,
      message:'No token provided'
    })
  }
  jwt.verify(token,secret.jwtSecret.jwt_Secret,(err,decoded)=>{
    if(err){
      return res.json({
        auth:false,
        message:'Not a valid token'
      })
    }
    console.log(decoded)
    req.user={
      username:decoded.username,
      email:decoded.email
    }
    next();
  })
}

module.exports={
  checkAuth
}