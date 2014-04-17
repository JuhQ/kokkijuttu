var app;

app = angular.module('app', ['ngResource', 'ui.router', 'ui.router.compat']);

app.config(function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  return $stateProvider.state('index', {
    url: '/',
    templateUrl: 'index.html',
    controller: 'index'
  }).state('profile', {
    abstract: true,
    url: '/profile/:id',
    templateUrl: 'profile/profile.html'
  }).state('profile.index', {
    url: '',
    templateUrl: 'profile/profile-index.html',
    controller: 'profile'
  }).state('profile.edit', {
    url: '/edit',
    templateUrl: 'profile/profile-edit.html',
    controller: 'profile.edit'
  }).state('facebook_url_issue', {
    url: '/_=_',
    controller: function() {
      return window.location.hash = '';
    }
  }).state('search', {
    abstract: true,
    url: '/search',
    templateUrl: 'search/index.html'
  }).state('search.index', {
    url: '',
    templateUrl: 'search/search-both.html',
    controller: 'search'
  }).state('search.people', {
    url: '/people',
    templateUrl: 'search/people.html',
    controller: 'search.people'
  }).state('search.jobs', {
    url: '/jobs',
    templateUrl: 'search/jobs.html',
    controller: 'search.jobs'
  }).state('jobs', {
    url: '/jobs',
    templateUrl: 'jobs/list.html',
    controller: 'jobs.list'
  }).state('jobs.job', {
    url: '/:id',
    templateUrl: 'jobs/job.html',
    controller: 'jobs.job'
  }).state('jobs.edit', {
    url: '/:id/edit',
    templateUrl: 'jobs/edit.html',
    controller: 'jobs.edit'
  }).state('jobs.create', {
    url: '/create',
    templateUrl: 'jobs/create.html',
    controller: 'jobs.create'
  });
});

app.run();
;app.controller('index', function($scope) {
  return console.log("homepage");
});
;app.controller('jobs.create', function($scope) {
  return console.log("jobs");
});
;app.controller('jobs.edit', function($scope) {
  return console.log("jobs");
});
;app.controller('jobs.job', function($scope) {
  return console.log("jobs");
});
;app.controller('jobs.list', function($scope) {
  return console.log("jobs");
});
;app.controller('profile', function($scope, $stateParams, profileService) {
  return $scope.user = profileService.find($stateParams.id);
});

app.controller('profile.edit', function($scope, $stateParams, profileService) {
  $scope.user = profileService.find($stateParams.id);
  return $scope.save = function() {
    return $scope.user.$save();
  };
});
;app.controller('search.job', function($scope) {
  return console.log("sfufhifuyhiuyhiuh job");
});
;app.controller('search.jobs', function($scope) {
  return console.log("sfufhifuyhiuyhiuh jobs");
});
;app.controller('search.people', function($scope) {
  return console.log("sfufhifuyhiuyhiuh people");
});
;app.controller('search', function($scope, $stateParams) {
  return console.log("sfufhifuyhiuyhiuh search", $stateParams);
});
;app.directive('profilePicture', function() {
  return {
    restrict: 'E',
    templateUrl: 'profile-picture.html',
    scope: {
      user: '=ngModel'
    }
  };
});
;app.factory('jobsService', function($resource) {
  return {
    create: function(data) {
      var Job, job;
      Job = $resource('/api/jobs/create');
      job = new Job(data);
      return job.$save();
    },
    getLatest: function() {
      return $resource('/api/jobs/latest').query();
    },
    find: function(query) {
      return $resource('/api/jobs/search/:query').query({
        query: query
      });
    }
  };
});
;app.factory('profileService', function($resource) {
  return {
    find: function(id) {
      return $resource('/api/user/:id').get({
        id: id
      });
    }
  };
});
;angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('index.html',
    "<div class=\"home-huge-banner\"><div class=\"container\"><div class=\"row\"><div class=\"col-md-12 centered\">Kikkeliskokkelis.fi on ilmainen catering -alan työnvälityspalvelu.</div></div></div><div class=\"container push-down\"><div class=\"row\"><div class=\"col-md-6 centered\"><a href=\"/search/people\" class=\"btn btn-success btn-lg\">Tarvitsen catering palveluita</a></div><div class=\"col-md-6 centered\"><a href=\"/search/jobs\" class=\"btn btn-info btn-lg\">Tarvitsen duunia</a></div></div></div></div><div class=\"container\"><div class=\"row\"><div class=\"col-md-12 centered\">Suositut kategoriat</div></div><div class=\"row\"><div class=\"col-md-3 centered\"><a class=\"category-item ice-cream1\" href=\"#\"><span class=\"text\">Lämmin keittiö</span></a></div><div class=\"col-md-3 centered\"><a class=\"category-item alcohol1\" href=\"#\"><span class=\"text\">Baarityöntekijät</span></a></div><div class=\"col-md-3 centered\"><a class=\"category-item ice-cream3\" href=\"#\"><span class=\"text\">Blokkarit</span></a></div><div class=\"col-md-3 centered\"><a class=\"category-item food-porn\" href=\"#\"><span class=\"text\">Kylmä keittiö</span></a></div></div></div>"
  );


  $templateCache.put('profile-picture.html',
    "<img ng-src=\"https://graph.facebook.com/{{user.id}}/picture?type=large\" alt=\"{{user.name}}\">"
  );


  $templateCache.put('profile/profile-edit.html',
    "<div class=\"container\"><div class=\"row\"><div class=\"col-md-12\"><h1>Edit</h1></div></div><div class=\"row\"><div class=\"col-md-3\"><profile-picture ng-model=\"user\"></profile-picture></div><div class=\"col-md-9\"><input ng-model=\"user.name\"><blockquote><p><textarea ng-model=\"user.quotes\"></textarea></p></blockquote><a ng-click=\"save()\">Save</a></div></div></div>"
  );


  $templateCache.put('profile/profile-index.html',
    "<div class=\"container\"><div class=\"row\" ng-if=\"user.isLoggedinUser\"><div class=\"col-md-12\"><a href=\"/profile/{{user.id}}/edit\" class=\"pull-right btn btn-primary\"><i class=\"fa fa-pencil\"></i> Muokkaa</a></div></div></div><div class=\"container\"><div class=\"row\"><div class=\"col-md-3\"><profile-picture ng-model=\"user\"></profile-picture></div><div class=\"col-md-9\"><h1>{{user.name}}</h1><blockquote><p>{{user.quotes}}</p></blockquote></div></div></div>"
  );


  $templateCache.put('profile/profile.html',
    "<ui-view></ui-view>"
  );


  $templateCache.put('search/index.html',
    "<ui-view></ui-view>"
  );


  $templateCache.put('search/jobs.html',
    "<form class=\"form-inline\" role=\"form\"><div class=\"form-group\"><input type=\"search\" class=\"form-control\" placeholder=\"Hae töitä\"></div><button type=\"submit\" class=\"btn btn-success\"><i class=\"fa fa-search\"></i> Hae</button></form>tulokset tähän kivasti jotenkin"
  );


  $templateCache.put('search/people.html',
    "<form class=\"form-inline\" role=\"form\"><div class=\"form-group\"><input type=\"search\" class=\"form-control\" placeholder=\"Hae palveluita\"></div><button type=\"submit\" class=\"btn btn-success\"><i class=\"fa fa-search\"></i> Hae palveluita</button></form>tulokset tähän kivasti jotenkin"
  );


  $templateCache.put('search/search-both.html',
    "<ul><li><a href=\"/search/jobs\">Duunit</a></li><li><a href=\"/search/people\">Ihmiset</a></li></ul>"
  );

}]);
