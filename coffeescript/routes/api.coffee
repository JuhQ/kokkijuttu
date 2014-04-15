
exports.saveUser = (req, res) ->
  mongoose = require('mongoose')
  Users = mongoose.model 'users'
  Users
    .update { id: req.user },
      $set:
        name: req.body.name
        quotes: req.body.quotes
      , ->

        res.jsonp req.body


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