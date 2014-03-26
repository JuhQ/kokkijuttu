
exports.user = (req, res) ->
  mongoose = require('mongoose')
  Users = mongoose.model 'users'
  Users
    .findOne()
    .where('id')
    .equals(req.params.id)
    .select('id name quotes')
    .exec (err, data) ->
      res.jsonp data