app.controller('profile', function($scope, $stateParams, $resource) {
  return $scope.user = profileService.find($stateParams.id);
});

app.controller('profile.edit', function($scope, $stateParams, profileService) {
  $scope.user = profileService.find($stateParams.id);
  return $scope.save = function() {
    return $scope.user.$save();
  };
});
