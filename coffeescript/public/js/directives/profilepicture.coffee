app.directive 'profilePicture', ->
  restrict: 'E'
  templateUrl: 'profile-picture.html',
  scope:
    user: '=ngModel'