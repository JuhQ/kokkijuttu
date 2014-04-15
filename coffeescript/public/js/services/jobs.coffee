app.factory 'jobsService', ($resource) ->

  create: (data) ->
    Job = $resource('/api/jobs/create')
    job = new Job(data)
    job.$save()

  getLatest: ->
    $resource('/api/jobs/latest').query()

  find: (query) ->
    $resource('/api/jobs/search/:query').query({query})