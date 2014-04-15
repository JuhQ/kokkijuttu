app.factory('jobsService', function($resource) {
  return {
    create: function(data) {
      var Job, job;
      Job = $resource('/api/jobs/create');
      job = new Job(data);
      return job.$save();
    },
    getLatest: function() {
      return $resource('/api/jobs/latest').query();
    },
    find: function(query) {
      return $resource('/api/jobs/search/:query').query({
        query: query
      });
    }
  };
});
