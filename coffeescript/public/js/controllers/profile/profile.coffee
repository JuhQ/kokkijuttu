app.controller 'profile', ($scope, $stateParams, $resource) ->
  $scope.user = profileService.find($stateParams.id)
