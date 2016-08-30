var herdlyApp = angular.module('herdlyApp', []);

herdlyApp.controller('QueryController', ['$scope', '$http', function ($scope, $http) {

  console.log('controller is hooked up!');

  var apiURL = 'http://ws.audioscrobbler.com/2.0/?method=user.getlovedtracks&user=';
  var apiKey = '&api_key= 5c05369bfa338d8a5c3ec52d18663241&format=json';


  // take username on click submission
  // fire GET request
  $scope.genLyric = function () {
    console.log('proving click handler', $scope.newUser);

    var username = $scope.newUser;

    $http.get(apiURL + username + apiKey).then(function (response) {
      console.log(response.data, 'RESPONSE!')});
  };

	
	// last FM querying works: loved tracks
  $http.get('http://ws.audioscrobbler.com/2.0/?method=user.getlovedtracks&user=bryytunes&api_key= 5c05369bfa338d8a5c3ec52d18663241&format=json').then(function (response) {
    console.log('MUSIC TAG IN THIS PARTICULAR SPOT RIGHT HERE IS....', response.data);

    taggy = response.data.lovedtracks.track;
    
    for ( var i = 0; i < taggy.length; i++ ) {
      var trackArtist = taggy[i].artist.name;
      var trackName = taggy[i].name;
      console.log('loved track is', trackArtist + ' : ' + trackName);
    }
  });

	// musicNLyrics API
/*	$http.get('http://api.lyricsnmusic.com/songs?api_key=83be8d44f3786545c46de607f07345&page=2&q=coldpay%20clocks').then(function (response) {
		console.log('RESPONSE DATA IS', response.data);
		taggy = response.data.toptags.tag[0].name;
		console.log('MUSIC TAG IN THIS PARTICULAR SPOT RIGHT HERE IS....', taggy);
	});*/

	

}]);