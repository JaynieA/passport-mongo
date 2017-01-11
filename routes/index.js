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

router.get('/test', function(req,res) { //to test this, in the browser just go to .../test bc there is no client side yet
  console.log('hit test route');
  console.log('req.user-->', req.user);//if deserialize works, req.user should be the user object
  console.log('req.session-->',req.session); //larger object than one above that we can also get
  console.log('is authed?',req.isAuthenticated());
  res.sendStatus(200);
});

module.exports = router;
