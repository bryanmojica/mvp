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
      
      lovedTrack = response.data.lovedtracks.track;

      for ( var i = 0; i < lovedTrack.length; i++ ) {
        var trackArtist = lovedTrack[i].artist.name;
        var trackName = lovedTrack[i].name;
        console.log('loved track is', trackArtist + ' : ' + trackName);
      }
    });

    // once random lyric has been grabbed, send it to the node API

    $http.post('/api/lyrics', $scope.returnedFromAbove)
         .success(function (data) {
           // send this on to the DB in a form it can handle
         })
         .error(function (data) {
           console.log('Error: ' + data);
         });

  };

  var testLyricAPI = function () {
    $http.get('/api/givemelyrics').then(function (data) {
      console.log('THE RESULT OF LYRIC API CALL IS ', data);
    });
  };

  testLyricAPI();

  $scope.favLyric = function () {
    console.log('Im expressing some damn interest in this track!');
  };

  $scope.fakeLyricBase = [
      {artist: 'LCD Soundsystem', lyric: 'The time has come, the time has come, the time has come today', title: 'Us v Them'},
      {artist: 'Young Thug', lyric: 'We came straight from the bottom, to the top, my lifestyle', title: 'Lifestyle'},
      {artist: 'The Strokes', lyric: 'Twenty-nine different attributes, Only seven that you like', title: 'You Only Live Once'},
      {artist: 'LCD Soundsystem', lyric: 'The time has come, the time has come, the time has come today', title: 'Us v Them'},
      {artist: 'LCD Soundsystem', lyric: 'The time has come, the time has come, the time has come today', title: 'Us v Them'},
      {artist: 'Young Thug', lyric: 'We came straight from the bottom, to the top, my lifestyle', title: 'Lifestyle'},
      {artist: 'The Strokes', lyric: 'Twenty-nine different attributes, Only seven that you like', title: 'You Only Live Once'},
      {artist: 'LCD Soundsystem', lyric: 'The time has come, the time has come, the time has come today', title: 'Us v Them'}
  ];

  console.log($scope.fakeLyricBase);

}]);