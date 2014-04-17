
exports.createJob = (req, res) ->
  if !req.user
    return null


  mongoose = require('mongoose')
  Jobs = mongoose.model 'jobs'
  
  job = new Jobs
    title: req.body.title
    description: req.body.description

  job.save ->
    res.jsonp req.body


exports.getLatestJobs = (req, res) ->
  mongoose = require('mongoose')
  Jobs = mongoose.model 'jobs'
  Jobs
    .find()
    .sort('-date')
    .exec (err, data) ->
      res.jsonp data


exports.searchJob = (req, res) ->
  
  mongoose = require('mongoose')
  Jobs = mongoose.model 'jobs'
  Jobs
    .findOne()
    .where('title')
    .equals(new RegExp("^#{req.params.query}$", 'i'))
    .exec (err, data) ->
      res.jsonp data

  res.jsonp req.body


exports.searchUser = (req, res) ->
  mongoose = require('mongoose')
  Users = mongoose.model 'users'
  Users
    .findOne()
    .where('name')
    .equals(new RegExp("^#{req.params.query}$", 'i'))
    .select('id name')
    .exec (err, data) ->
      res.jsonp data


exports.saveUser = (req, res) ->
  if !req.user
    return null

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