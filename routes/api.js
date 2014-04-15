exports.saveUser = function(req, res) {
  var Users, mongoose;
  mongoose = require('mongoose');
  Users = mongoose.model('users');
  return Users.update({
    id: req.user
  }, {
    $set: {
      name: req.body.name,
      quotes: req.body.quotes
    }
  }, function() {
    return res.jsonp(req.body);
  });
};

exports.user = function(req, res) {
  var Users, mongoose;
  mongoose = require('mongoose');
  Users = mongoose.model('users');
  return Users.findOne().where('id').equals(req.params.id).select('id name quotes').exec(function(err, data) {
    return res.jsonp(data);
  });
};
