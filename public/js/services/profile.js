app.factory('profileService', function($resource) {
  return {
    find: function(id) {
      return $resource('/api/user/:id').get({
        id: id
      });
    }
  };
});
