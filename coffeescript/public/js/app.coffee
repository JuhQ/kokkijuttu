app = angular.module('app', [
  'ngResource'
  'ui.router'
  'ui.router.compat'
])

app.config ($stateProvider, $locationProvider) ->

  $locationProvider.html5Mode(true)

  $stateProvider

    .state 'index',
      url: '/'
      templateUrl: 'index.html'
      controller: 'index'

    .state 'profile',
      abstract: true
      url: '/profile/:id'
      templateUrl: 'profile/profile.html'
      
    .state 'profile.index',
      url: ''
      templateUrl: 'profile/profile-index.html'
      controller: 'profile'
    .state 'profile.edit',
      url: '/edit'
      templateUrl: 'profile/profile-edit.html'
      controller: 'profile.edit'


    .state 'facebook_url_issue',
      url: '/_=_'
      controller: ->
        window.location.hash = ''

    .state 'search',
      abstract: true
      url: '/search'
      templateUrl: 'search/index.html'
      
    
    .state 'search.index',
      url: ''
      templateUrl: 'search/search-both.html'
      controller: 'search'
    .state 'search.people',
      url: '/people'
      templateUrl: 'search/people.html'
      controller: 'search.people'
    .state 'search.jobs',
      url: '/jobs'
      templateUrl: 'search/jobs.html'
      controller: 'search.jobs'
    



app.run()