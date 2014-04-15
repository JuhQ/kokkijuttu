app.factory 'profileService', ($resource) ->
  find: (id) ->
    $resource('/api/user/:id').get(id: id)