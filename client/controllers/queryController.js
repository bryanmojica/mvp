var herdlyApp = angular.module('herdlyApp', []);

herdlyApp.controller('QueryController', ['$scope', '$http', function ($scope, $http) {

		// when landing on page, get previous lyrics from DB and display them
  $http.get('/api/lyrics')
       .success(function(data) {
         $scope.lyrics = data;
         console.log(data);
       })
       .error(function(data) {
         console.log('error: ' + data);
       });

  var username = $scope.newUser;

  console.log('controller is hooked up!');

  var apiURL = 'http://ws.audioscrobbler.com/2.0/?method=user.getlovedtracks&user=';
  var apiKey = '&api_key= 5c05369bfa338d8a5c3ec52d18663241&format=json';



  // lastFM API returns most recent 40 songs listened to, 
  // so generate random index from 0 - 39
  

  // using username from input, fire GET on click
  $scope.generateLyric = function () {

    var selectRandomTrack = Math.floor(Math.random() * 40);

    var username = $scope.newUser;
    $http.get(apiURL + username + apiKey).then(function (response) {
      console.log(response.data, 'RESPONSE!');
      
      lovedTrack = response.data.lovedtracks.track;

      for ( var i = 0; i < lovedTrack.length; i++ ) {
        var trackArtist = lovedTrack[i].artist.name;
        var trackName = lovedTrack[i].name;
        console.log('loved track is', trackArtist + ' : ' + trackName);
      }

      console.log('RANDOM RECENT HERE IS --- ', selectRandomTrack);

    });

    testLyricAPI(username);
  };

  var userNameHere = $scope.userName;

  var testLyricAPI = function (username) {
   	var selectRandomTrack = Math.floor(Math.random() * 40);
    console.log('THIS THING HERE SHOULD BE OUR USERNAME, PASSED INTO TESTLYRIC API FUNC', username);
    $http({
      method: 'GET',
      url: '/api/givemelyrics',
      params: { text: username }
    }).then(function(response) {
      console.log('RESPONSE HERE IS GOING TO BE', response.data[selectRandomTrack]);
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