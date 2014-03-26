exports.user = function(req, res) {
  var Users, mongoose;
  mongoose = require('mongoose');
  Users = mongoose.model('users');
  return Users.findOne().where('id').equals(req.params.id).select('id name quotes').exec(function(err, data) {
    return res.jsonp(data);
  });
};
