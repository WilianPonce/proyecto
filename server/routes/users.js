var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const MongoService = require("../services/crudMongo");
const response = require("../utils/response");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/login", async (req, res) => {
  //let passwordhash = bcrypt.hashSync(req.body.password, 12);
  let data = {email:req.body.email, password:req.body.password}; 
  let result = await MongoService.login(data);
  if(!result){
    res.status(403);
    res.json({
      message: "invalid login information",
    });
    return;
  }
  
  let user = {
    id: result._id,
    name: result.name,
    email: result.email,
    rol: result.rol
  }
  const token = jwt.sign(user, 'institutotecnologicoquito', {
    expiresIn: 3600
  });
  res.json( {token, user,} );
});

router.post("/register", async (req, res) => {
  //let hashedr = bcrypt.hashSync(req.body.password, 12);
  let data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    rol: req.body.rol
  };
  let result = await MongoService.register(data);
  response(res, 200, result, "Usuario Creado");
});

router.post('/auth',function(req, res, next) {
  var token = req.body.token;
  let user = null;
  try {
    user = jwt.verify(token, 'institutotecnologicoquito');
    if(!user){
      return res.status(401).send('unauthorized');
    }
  } catch (e) {
    return res.status(401).send('unauthorized');
  }
  return res.json( {user} );
});

module.exports = router;
