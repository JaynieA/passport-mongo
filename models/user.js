var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

//create schema
var UserSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

//save and export the model
var User = mongoose.model('users', UserSchema);

module.exports = User;
