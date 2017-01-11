var express = require('express');
var passport = require('passport');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
  var indexPath = path.join(__dirname, '../public/views/index.html');
  res.sendFile(indexPath);
});

//add call to passport to authenticate here in post router
//can pass this in below after 'local': {successRedirect: '/', failureRedirect: '/login'}
// the above object breaks angular routing
router.post('/', passport.authenticate('local') ,function(req,res) {
  res.sendStatus(200);
  //not reflected here: if authentication is not accepted, it will return a 401
}); // end post

module.exports = router;
