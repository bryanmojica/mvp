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
         .then(function (data) {
            console.log('DATA IS THIS RIGHT NOW', data);
           // send this on to the DB in a form it can handle
         })
         .error(function (data) {
           console.log('Error: ' + data);
         });
  };

  var testLyricAPI = function () {
    $http({
      method: 'GET',
      url: '/api/givemelyrics',
      data: 'here\'s a test pass'
    });

    //below was half-working.. not getting to loop
    /*$http.get('/api/givemelyrics').then(function (data) {
    	console.log('GOT THE OBJ BACK AS ', data.data);

    	return function () {
    			for (var i = 0; i < data.data; i ++) {
    	  var lyricSnippet = data.data[i].snippet;
    	  console.log('we are looping');
    	  console.log('INDIV SNIPPET IS', lyricSnippet);
    	}
    	}
    	
    });*/
  };

  testLyricAPI();

  $scope.favLyric = function () {
    console.log('Im expressing some damn interest in this track!');
    // this grabs an object that contains the track data (via .track)
    // pertinent track properties are HERE:
    console.log('ARTIST IS', this.track.artist);
    console.log('LYRICS IS', this.track.lyric);
    console.log('TITLE IS ', this.track.title);
    // push into object / db on click
    // and add class, to style
      // then display selected tracks in another pane
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