app.directive('profilePicture', function() {
  return {
    restrict: 'E',
    templateUrl: 'profile-picture.html',
    scope: {
      user: '=ngModel'
    }
  };
});
