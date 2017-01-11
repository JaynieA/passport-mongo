var passport = require('passport');
//define local strategy (local authentication)
var LocalStrategy = require('passport-local').Strategy;

passport.use('local', new LocalStrategy({ //this LocalStragety object takes: //here is where you can configure other stuff for email input, etc
  passReqToCallback: true
}, function(req, username, password, done){ // the username comes from the client
  console.log('hit local stretegy');
  
  //look up our user
  //compare the givenPassword to the hashed/salted password in db

})); // end use passport

//export our passport configuration (above)
module.exports = passport;
