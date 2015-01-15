var mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URI)


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

exports.db = db;

// IN PROGRESS.
// Currently exporting multiple objects (db, usersSchema, etc.) that would
// require refactor of other stuff

exports.usersSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

exports.linksSchema = mongoose.Schema({
  url: { type: String, required: true, unique: true },
  base_url: String,
  code: String,
  title: String,
  visits: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});


db.once('open', function (cb) {
  console.log('connected to mongodb');





  // exports.usersSchema = mongoose.Schema({
  //   username: { type: String, required: true },
  //   password: { type: String, required: true },
  //   createdAt: { type: Date, default: Date.now }
  // });


  // usersSchema.methods.comparePassword = function(attemptedPassword, callback) {
  //   bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
  //     callback(isMatch);
  //   });
  // };

  // usersSchema.methods.hashPassword = function(password){
  //   var cipher = Promise.promisify(bcrypt.hash);
  //   // console.log(cipher(password, null, null).bind(this).then(function(hash) {return hash;}))
  //   return cipher(password, null, null).bind(this)  // return promise
  // };

  // usersSchema.pre("save", function(next) {
  //   var user = this;
  //   if( !user.isModified("password")) {  // only hash the password the first time
  //     return next();
  //   }
  //   this.hashPassword(user.password)
  //   .then(function (hash) {
  //     user.password = hash;
  //     next();
  //   })
  // });

  // var User = mongoose.model('User', usersSchema);

  // var user = new User({username: "ruben", password: "111"});
  // user.save(function(err, user) {
  //   console.log("user -->", user);
  //   user.comparePassword("111", function(match) {
  //     console.log("successful? -->", match);
  //   })
  //   user.comparePassword("000", function(match) {
  //     console.log("successful? -->", match);
  //   })
  // })


  // db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

});

// var Bookshelf = require('bookshelf');
// var path = require('path');

// var db = Bookshelf.initialize({
//   client: 'sqlite3',
//   connection: {
//     host: '127.0.0.1',
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: 'shortlydb',
//     charset: 'utf8',
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   }
// });



// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('base_url', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// module.exports = db;
