var herdlyApp = angular.module('herdlyApp', []);

herdlyApp.factory('Lyrics', ['$http', function ($http) {
  
  var fullLyricPull = function () {
    return $http({
      method: 'GET',
      url: '/api/lyrics'
    }).then(function (response) {
      console.log('FULL LYRIC PULL IS BEING PERFORMED');
      return response.data;
    });
  };

  var addLyric = function (lyric) {
    return $http({
      method: 'POST',
      url: 'api/lyrics',
      data: lyric
    });
  };

}]);