var mongoose = require( 'mongoose' );
//pull in bcrypt
var bcrypt = require( 'bcrypt' );
var SALT_WORK_FACTOR = 10;

var Schema = mongoose.Schema;

//create schema
var UserSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

//***This could be exported into a module, which would be good bc the save function happens all the time, and you could just call the module within the post (or put if modifying)
    // ** if exported into module, you wouldnt need the if statement below (21-23)
//do something to the data before it is saved
UserSchema.pre('save', function(next) {
  //grab the user that we are trying to save/register
  var user = this;
  //continue if user password is not being modified
  if (!user.isModified('password')) { // if we are not modifying the password, get out of this function
    return next();
  }
  //generate the salt
    // first param in .genSalt is the rounds, which is how many times it is salted--
    //default is 10. Can do more but it takes longer
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    //inside this function we have the salt available to us
    //give it the thing you want it to hash
    bcrypt.hash(user.password, salt, function(err, hash) { //returns the hash
      //overwrite the given user password with the hash
      user.password = hash;
      //pre expexts you to return next out of the function
      next();
    }); // end hash
  }); // end genSalt
}); // end pre

//save and export the model
var User = mongoose.model('users', UserSchema);

module.exports = User;
