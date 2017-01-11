var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../models/user');

router.get('/', function(req, res) {
  var regPath = path.join(__dirname, '../public/views/register.html');
  res.sendFile(regPath);
}); // end get

router.post('/', function(req, res) {
  console.log('in post register');
  console.log('req.body-->', req.body);

  var sentUser = req.body;

  User.create(sentUser, function(err, response) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.status(201).send({message: 'new user created!'});
    }
  });
}); // end post

module.exports = router;
