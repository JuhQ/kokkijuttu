express = require('express')
http = require('http')
path = require('path')
routes = require('./routes')
api = require('./routes/api')
passport = require('passport')
FacebookStrategy = require('passport-facebook').Strategy
mongoose = require('mongoose')
MongoStore = require('connect-mongo')(express)

settings = require('./configuration.json')
mongoconfig = require('./utils/mongoconfig')(settings)


app = express()
server = http.createServer(app)
mongoStore = new MongoStore db: settings.db

app.configure ->
  app.set 'port', process.env.PORT or settings.port
  app.set 'views', "#{__dirname}/views"
  app.set 'view engine', 'ejs'
  app.use express.urlencoded()
  app.use express.json()
  app.use express.favicon('public/favicon.ico')
  app.use express.methodOverride()
  app.use express.cookieParser(settings.cookie)

  app.use express.session
    secret: settings.cookie
    cookie: {maxAge: 60000 * 60 * 24 * 30 * 12} # one year
    store: mongoStore
  
  app.use passport.initialize()
  app.use passport.session()

  app.use express.static(path.join(__dirname, 'public'))
  app.use app.router

app.get '/', routes.index
app.get '/logout', routes.logout
app.get '/settings/delete/account', routes.removeAccount

app.get '/login/success', routes.loginSuccess
app.get '/login/fail', routes.loginFail

app.get '/api/user/:id', api.user
app.post '/api/user', api.saveUser



app.post '/api/jobs/create', api.createJob
app.get '/api/jobs/latest', api.getLatestJobs
app.post '/api/jobs/search/:query', api.searchJob

app.get '/api/user/search/:query', api.searchUser




# Redirect the user to Facebook for authentication.  When complete,
# Facebook will redirect the user back to the application at
#     /auth/facebook/callback
app.get '/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_birthday'] })


# Facebook will redirect the user to this URL after approval.  Finish the
# authentication process by attempting to obtain an access token.  If
# access was granted, the user will be logged in.  Otherwise,
# authentication has failed.
app.get '/auth/facebook/callback', passport.authenticate('facebook',
  successRedirect: '/login/success'
  failureRedirect: '/login/fail'
)



# FIXME
app.get '/:foo*', routes.index


passport.serializeUser (user, done) ->
  done null, user.id

passport.deserializeUser (id, done) ->
  Users = mongoose.model 'users'
  Users.findOne({
    id
  }).exec (err, user) ->
    if err
      done err
    else
      done null, user.id


passport.use new FacebookStrategy settings.facebook, (accessToken, refreshToken, profile, done) ->
  Users = mongoose.model 'users'
  Users.findOne({
    id: profile.id
  }).exec (err, data) ->
    if err
      done(err)
    else if data
      done null, data

      Users
        .update { id: data.id },
          $set:
            hidden: true
    else

      user = new Users
        id: profile.id
        name: profile.displayName
        username: profile.username
        url: profile.profileUrl
        gender: profile.gender
        education: profile._json.education?[0].school.name
        quotes: profile._json.quotes
        bio: profile._json.bio
        occupation: profile._json.work?[0].position.name
        email: profile._json.email
        birthday: profile._json.birthday

      user.save (err) ->
        if err
          done(err)
        else
          done null, user


###
cluster = require('cluster')
numCPUs = require('os').cpus().length
if cluster.isMaster
  
  # Fork workers.
  i = 0
  while i < numCPUs
    cluster.fork()
    i++

  # Revive dead worker
  cluster.on 'exit', (worker, code, signal) ->
    console.log 'worker ' + worker.process.pid + ' died'
    cluster.fork()

else
###
server.listen app.get('port'), ->
  console.log 'Express server listening on port ' + app.get('port')