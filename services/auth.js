const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/user');
const jwtsecret = require('../config/secret');

  const authenticate = params => {
      return Users.findOne({
          where: {
              username: params.username
          },
          raw: true
      }).then(user => {
          if (!user)
              throw new Error('Authentication failed. User not found.');
          if (!bcrypt.compareSync(params.password || '', user.password))
              throw new Error('Authentication failed. Wrong password.');
          const payload = {
              username: user.username,
              email: user.email,
              time: new Date()
          };
          var token = jwt.sign(payload, jwtsecret.jwtSecret.jwt_Secret, {
              expiresIn: jwtsecret.jwtSecret.tokenExpireTime
          });
          return token;
      });
  }

    const new_authenticate = params => {
        return Users.findOne({
            where: {
                username: params.username
            },
            raw: true
        }).then(user => {
            if (!user)
                throw new Error('Authentication failed. User not found.');
            const payload = {
                username: user.username,
                email: user.email,
                time: new Date()
            };
            var token = jwt.sign(payload, jwtsecret.jwtSecret.jwt_Secret, {
                expiresIn: jwtsecret.jwtSecret.tokenExpireTime
            });
            return token;
        });
    }


module.exports={
    authenticate,
    new_authenticate
}