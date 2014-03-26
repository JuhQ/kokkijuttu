var app;

app = angular.module('app', ['ngResource', 'ui.router', 'ui.router.compat']);

app.config(function($stateProvider) {
  return $stateProvider.state('index', {
    url: '',
    templateUrl: 'index.html',
    controller: 'index'
  }).state('profile', {
    url: '/profile/:id',
    templateUrl: 'profile.html',
    controller: 'profile'
  }).state('facebook_url_issue', {
    url: '/_=_',
    controller: function() {
      return window.location.hash = '';
    }
  }).state('search', {
    abstract: true,
    url: '/search',
    templateUrl: 'search/index.html',
    controller: 'search'
  }).state('search.people', {
    url: '/people',
    templateUrl: 'search/people.html',
    controller: 'search.people'
  }).state('search.job', {
    url: '/job',
    templateUrl: 'search/job.html',
    controller: 'search.job'
  });
});

app.run();
