app.controller 'profile', ($scope, $stateParams, profileService) ->
  $scope.user = profileService.find($stateParams.id)
