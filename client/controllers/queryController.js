var herdlyApp = angular.module('herdlyApp', []);

herdlyApp.controller('QueryController', ['$scope', '$http', function ($scope, $http) {

		// when landing on page, get previous lyrics and dispaly them
  $http.get('/api/lyrics')
       .success(function(data) {
         $scope.lyrics = data;
         console.log(data);
       })
       .error(function(data) {
         console.log('error: ' + data);
       });

  console.log('controller is hooked up!');

  var apiURL = 'http://ws.audioscrobbler.com/2.0/?method=user.getlovedtracks&user=';
  var apiKey = '&api_key= 5c05369bfa338d8a5c3ec52d18663241&format=json';

  // take username on click submission
  // fire GET request
  $scope.genLyric = function () {
    console.log('proving click handler', $scope.newUser);

    var username = $scope.newUser;

    $http.get(apiURL + username + apiKey).then(function (response) {
      console.log(response.data, 'RESPONSE!');
      
      taggy = response.data.lovedtracks.track;

      for ( var i = 0; i < taggy.length; i++ ) {
        var trackArtist = taggy[i].artist.name;
        var trackName = taggy[i].name;
        console.log('loved track is', trackArtist + ' : ' + trackName);
      }
    });
  };


}]);