angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('index.html',
    "<div class=\"home-huge-banner\"><div class=\"container\"><div class=\"row\"><div class=\"col-md-12 centered headline\">Kikkeliskokkelis.fi on ilmainen catering -alan työnvälityspalvelu.</div></div></div><div class=\"container push-down\"><div class=\"row\"><div class=\"col-md-6 centered\"><a href=\"#/search/people\" class=\"btn btn-success btn-lg\">Tarvitsen catering palveluita</a></div><div class=\"col-md-6 centered\"><a href=\"#/search/job\" class=\"btn btn-info btn-lg\">Tarvitsen duunia</a></div></div></div></div><div class=\"container\"><div class=\"row\"><div class=\"col-md-12 centered\">Suositut kategoriat</div></div><div class=\"row\"><div class=\"col-md-3 centered\"><a class=\"category-item ice-cream1\" href=\"#\"><span class=\"text\">Lämmin keittiö</span></a></div><div class=\"col-md-3 centered\"><a class=\"category-item alcohol1\" href=\"#\"><span class=\"text\">Baarityöntekijät</span></a></div><div class=\"col-md-3 centered\"><a class=\"category-item ice-cream3\" href=\"#\"><span class=\"text\">Blokkarit</span></a></div><div class=\"col-md-3 centered\"><a class=\"category-item food-porn\" href=\"#\"><span class=\"text\">Kylmä keittiö</span></a></div></div></div>"
  );


  $templateCache.put('profile-picture.html',
    "<img ng-src=\"https://graph.facebook.com/{{user.id}}/picture?type=large\" alt=\"{{user.name}}\">"
  );


  $templateCache.put('profile.html',
    "<div class=\"container\"><div class=\"row\"><div class=\"col-md-12\"><a href=\"#/profile/{{user.id}}/edit\" class=\"pull-right btn btn-primary\"><i class=\"fa fa-pencil\"></i> Muokkaa</a></div></div></div><div class=\"container\"><div class=\"row\"><div class=\"col-md-3\"><profile-picture ng-model=\"user\"></profile-picture></div><div class=\"col-md-9\"><h1>{{user.name}}</h1><blockquote><p>{{user.quotes}}</p></blockquote><a ng-click=\"my_function()\">click</a> sisältöä</div></div></div>"
  );


  $templateCache.put('search/index.html',
    "<ui-view></ui-view>"
  );


  $templateCache.put('search/job.html',
    "<form class=\"form-inline\" role=\"form\"><div class=\"form-group\"><input type=\"search\" class=\"form-control\" placeholder=\"Hae töitä\"></div><button type=\"submit\" class=\"btn btn-success\"><i class=\"fa fa-search\"></i> Hae</button></form>tulokset tähän kivasti jotenkin"
  );


  $templateCache.put('search/people.html',
    "<form class=\"form-inline\" role=\"form\"><div class=\"form-group\"><input type=\"search\" class=\"form-control\" placeholder=\"Hae palveluita\"></div><button type=\"submit\" class=\"btn btn-success\"><i class=\"fa fa-search\"></i> Hae palveluita</button></form>tulokset tähän kivasti jotenkin"
  );

}]);
