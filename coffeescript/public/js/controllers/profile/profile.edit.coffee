app.controller 'profile.edit', ($scope, $stateParams, profileService) ->

  $scope.user = profileService.find($stateParams.id)

  $scope.save = ->
    $scope.user.$save()