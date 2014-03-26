app.controller('profile', function($scope, $stateParams, $resource) {
  console.log("stateParams", $stateParams);
  $scope.user = $resource('/api/user/:id').get({
    id: $stateParams.id
  });
  return $scope.my_function = function() {
    return console.log('yay');
  };
});
