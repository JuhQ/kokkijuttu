exports.createJob = function(req, res) {
  var Jobs, job, mongoose;
  if (!req.user) {
    return null;
  }
  mongoose = require('mongoose');
  Jobs = mongoose.model('jobs');
  job = new Jobs({
    title: req.body.title,
    description: req.body.description
  });
  return job.save(function() {
    return res.jsonp(req.body);
  });
};

exports.getLatestJobs = function(req, res) {
  var Jobs, mongoose;
  mongoose = require('mongoose');
  Jobs = mongoose.model('jobs');
  return Jobs.find().sort('-date').exec(function(err, data) {
    return res.jsonp(data);
  });
};

exports.searchJob = function(req, res) {
  var Jobs, mongoose;
  mongoose = require('mongoose');
  Jobs = mongoose.model('jobs');
  Jobs.findOne().where('title').equals(new RegExp("^" + req.params.query + "$", 'i')).exec(function(err, data) {
    return res.jsonp(data);
  });
  return res.jsonp(req.body);
};

exports.searchUser = function(req, res) {
  var Users, mongoose;
  mongoose = require('mongoose');
  Users = mongoose.model('users');
  return Users.findOne().where('name').equals(new RegExp("^" + req.params.query + "$", 'i')).select('id name').exec(function(err, data) {
    return res.jsonp(data);
  });
};

exports.saveUser = function(req, res) {
  var Users, mongoose;
  if (!req.user) {
    return null;
  }
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
    data = data.toObject();
    data.isLoggedinUser = req.user === data.id;
    return res.jsonp(data);
  });
};
