module.exports = (settings) ->
  mongoose = require('mongoose')

  userSchema = mongoose.Schema {
    id: 'Number'
    name: 'String'
    username: { type: String, lowercase: true, trim: true }
    url: 'String'
    gender: 'String'
    location: 'String'
    occupation: 'String'
    education: 'String'
    email: 'String'
    quotes: 'String'
    bio: 'String'
    birthday: 'Date'
    created: { type: Date, default: Date.now }
    hidden: { type: Boolean, default: false }
    random: {type: [Number], index: '2d', default: -> return [Math.random(), Math.random()]}
  }

  userSchema = mongoose.Schema {
    id: 'Number'
    title: 'String'
    description: 'String'
    created: { type: Date, default: Date.now }
    hidden: { type: Boolean, default: false }
  }


  mongoose.model 'users', userSchema
  mongoose.model 'jobs', jobSchema

  mongoose.connect 'localhost', settings.db