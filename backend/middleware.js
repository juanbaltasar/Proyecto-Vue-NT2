exports.rutaProtegida = function(req, res, next) {
    const jwt = require('jsonwebtoken');
    const config = require('./configs/config');
    const reqToken = req.header('Authorization');
    const splitToken = reqToken.split("Bearer ");
    const token = splitToken[1];    

    if (token) {
        jwt.verify(token, config.llave, (err, decoded) => {      
            if (err) {
                return res.json({ mensaje: 'Token inválida' });    
            } else {
                req.decoded = decoded;    
                next();
            }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
  };
  