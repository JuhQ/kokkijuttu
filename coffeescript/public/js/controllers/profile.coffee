app.controller 'profile', ($scope, $stateParams, $resource) ->

  console.log("stateParams", $stateParams)
  $scope.user = $resource('/api/user/:id').get(id: $stateParams.id)

  $scope.my_function = () ->
    console.log('yay')
