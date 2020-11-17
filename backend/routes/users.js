var express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var router = express.Router();
const userData = require('../data/User');
var template = require('../template/PasswordRecover');
var emailTemplate = template.html;
let llave;


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/auth', async function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  llave = req.app.get('llave');

  await userData.findUserByUsername(username).then(function (user) {
      if(user){
          bcrypt.compare(password, user.password).then(function (passcheck) {
              if(passcheck){
                  var jwtUser = {
                      _id: user.username,
                      username: user.name,
                      esAdministrador: user.esAdministrador
                  };
                  var token = jwt.sign(jwtUser, llave, {
                      expiresIn: 1440 //expires in 24 hours
                  });

                  res.json({
                      success: true,
                      message: 'Here´s your token.',
                      token: token,
                      esAdministrador: user.esAdministrador
                  });

              }else{
                  res.status(401).json({
                      success: false,
                      message: 'Authentification failed. Password or Username wrong'
                  });
              }
          });
      }else{
          res.status(401).json({
              success: false,
              message: 'Authentification failed.'
          });
      }
  }).catch(next);
});

router.put('/newUser', async function(req, res) {
  const user = req.body;

  if(user.username != "" && user.password != "") {
    try{
      bcrypt.hash(user.password, saltRounds, function(err, hash) {
        if(!err){
          user.password = hash;
          userData.pushUser(user).then(function() {
            res.json({
              success: true,
              message: 'User created!'
            });
          }).catch(function(errorMongo) {
            res.status(403).json({
              success: false,
              message: 'Duplicated id!'
            });
          });
          
        } else {
          res.status(403).json({
            success: false,
            message: 'Bcrypt error.'
          })
        }
      });
    }
    catch (error) {
     res.status(500).send(error);
    }
  } else {
    res.status(400).json({
      message: 'username and password cannot be empty or null'
    });
  }
  
});

router.put('/recoverPassword', async function(req,res){
  const emailSender = req.app.get('emailSender');
  const user = req.body;

  emailTemplate = emailTemplate.replace('{{LINK}}', user.urlRecuperacion.toString());
  emailTemplate = emailTemplate.replace('{{LINKRECUPERO}}', user.urlRecuperacion.toString());

  try{
    emailSender.MandarMail(user.email, "Recupero de contraseña", '', emailTemplate);
  }catch (error) {
    res.status(500).send(error);
  }

  res.json({
    success: true,
    message: 'Link enviado al email!'
  });
});


router.put('/changePassword', async function(req, res) {
  const user = req.body;

  if(user.username != "" && user.password != "") {
    try{
      bcrypt.hash(user.password, saltRounds, function(err, hash) {
        if(!err){
          user.password = hash;
          userData.recoverUser(user).then(function() {
            res.json({
              success: true,
              message: 'User recovered!'
            });
          }).catch(function(errorMongo) {
            res.status(403).json({
              success: false,
              message: 'Error!'
            });
          });
          
        } else {
          res.status(403).json({
            success: false,
            message: 'Bcrypt error.'
          })
        }
      });
    }
    catch (error) {
     res.status(500).send(error);
    }
  } else {
    res.status(400).json({
      message: 'username and password cannot be empty or null'
    });
  }
});



module.exports = router;
