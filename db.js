var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
  name: String,
  email: String,
  password: String
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', userSchema);

var goalsSchema = new Schema({
  //TODO: putting the goals into userID
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  email: String,
  goals: [{ 
    content: String,
    startDate: Date,
    endDate: Date,
    freq: String,
    why: [String]
  }]
})



var Goals = mongoose.model('Goals', goalsSchema);

module.exports = {
  User: User,
  Goals: Goals
};