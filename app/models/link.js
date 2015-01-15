//var db = require('../config').config;
var mongoose = require('mongoose');
var linksSchema = require("../config").linksSchema;
var crypto = require('crypto');

linksSchema.pre("save", function(next) {
  var link = this;

  // module.exports.findOne({url: link.url}, function (err, results) {
  //   if (err) {
  //     next(err);
  //   } else if (results) {
  //     link.invalidate()
  //   }
  // });

  if ( link.code ) {  // only hash code if it doesn't exist
    return next();
  }
  var shasum = crypto.createHash('sha1');
  shasum.update(link.url);
  link.code = shasum.digest('hex').slice(0, 5);
  next();
});


var Link = mongoose.model('Link', linksSchema);

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function(){
//     this.on('creating', function(model, attrs, options){
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

module.exports = Link;
