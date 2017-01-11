var passport = require('passport');
//define local strategy (local authentication)
var LocalStrategy = require('passport-local').Strategy;
//pull in our model
var User = require('../models/user');

passport.use('local', new LocalStrategy({ //this LocalStragety object takes: //here is where you can configure other stuff for email input, etc
  passReqToCallback: true
}, function(req, username, attemptedPassword, done){ // the username comes from the client
  console.log('hit local stretegy');
  //look up our user
  User.findOne({username: username}, function(err, foundUser) { //again, referencing username given to us by client
    if (!foundUser) { // username doesn't exist
    console.log('no user');
      //done comes from line 9
      done(null, false, {message:'Incorrect credentials'}); //send error to user
    } else {
        //compare the givenPassword to the hashed/salted password in db
        //pass the found user back
        console.log('found user');

        foundUser.comparePassword(attemptedPassword, function(isMatch) { //this function is what gets called in the callback in user.js line 40ish
          if (isMatch) {
            console.log('matched password');
            //we found the user- password is valid and matches
            done(null, foundUser, {message: 'Login successed!'});
          } else {
            //
            console.log('didnt match password');
            done(mull, false, {message: 'Incorrect credentials'});
          }
        });
    } // end else
  }); // end findOne

  //serialization gets called on initial request to validate 
  passport.serializeUser(function(user, done) {
    console.log('serialize user');
    done(null, user.id);
  }); // end serializeUser

  //gets the id out of the cookie that was sent. gets called on every subsequent request after login
  passport.deserializeUser(function(id, done) {
    console.log('deserialize user');
    User.findById(id, function(err, userFound) {
      done(null, userFound);
    }); // end findById
  }); // end deserializeUser


})); // end use passport

//export our passport configuration (above)
module.exports = passport;
