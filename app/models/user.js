var dbConfig = require('../config');
var usersSchema = dbConfig.usersSchema;
var bcrypt = require('bcrypt-nodejs');

// console.log('dbconfig', dbConfig);
// console.log('usersSchema', usersSchema);

usersSchema.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    callback(isMatch);
  });
};

usersSchema.methods.hashPassword = function(password){
  var cipher = Promise.promisify(bcrypt.hash);
  // console.log(cipher(password, null, null).bind(this).then(function(hash) {return hash;}))
  return cipher(password, null, null).bind(this)  // return promise
};

usersSchema.pre("save", function(next) {
  var user = this;
  if( !user.isModified("password")) {  // only hash the password the first time
    return next();
  }
  this.hashPassword(user.password)
  .then(function (hash) {
    user.password = hash;
    next();
  })
});

User = mongoose.model('User', usersSchema);


var user = new User({username: "ruben", password: "111"});
user.save(function(err, user) {
  console.log("user -->", user);
  user.comparePassword("111", function(match) {
    console.log("successful? -->", match);
  })
  user.comparePassword("000", function(match) {
    console.log("successful? -->", match);
  })
})

module.exports = User;

// var db = require('../config');
// var bcrypt = require('bcrypt-nodejs');
// var Promise = require('bluebird');

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function(){
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function(){
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

// module.exports = User;
