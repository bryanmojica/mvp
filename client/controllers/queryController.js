var herdlyApp = angular.module('herdlyApp', []);



herdlyApp.controller('QueryController', ['$scope', '$http', function ($scope, $http) {
  
  var username = $scope.newUser;
  var apiKey = '&api_key= 5c05369bfa338d8a5c3ec52d18663241&format=json';
  
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



  fullLyricPull();
  

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


  // using username from input, fire GET on click
  $scope.generateLyric = function () {

  	var userame = $scope.newUser;

    $scope.lovedTracks = [];
  	 
		  var pullUserLoved = function () {
		    var apiURL = 'http://ws.audioscrobbler.com/2.0/?method=user.getlovedtracks&user=';
		    var username = $scope.newUser;

		    $http.get(apiURL + username + apiKey).then(function (response) {
		      response.data.lovedtracks.track.forEach(function (track) {
		      	  $scope.lovedTracks.push(track);
		      });
		    });    
		  };

		  pullUserLoved();
		  console.log($scope.lovedTracks, 'is thisS');

    
    var apiURL = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=';

    // lastFM API returns most recent 50 songs listened to, 
    // so generate random index from 0 - 49
    var selectRandomTrack = Math.floor(Math.random() * 50);

    var username = $scope.newUser;
    console.log('NEW USER HERE IS', $scope.newUser);

    $http.get(apiURL + username + apiKey).then(function (response) {
      
      lovedTrack = response.data.recenttracks.track;

      console.log('username here is', username);
      
      var trackArtist = lovedTrack[selectRandomTrack].artist['#text'];
      var trackName = lovedTrack[selectRandomTrack].name;
      console.log('RANDOM RECENT TRACK IS', trackArtist + ' : ' + trackName);

      passToLyricAPI(trackArtist, trackName);
    });

  };
  

  var userNameHere = $scope.userName;

  var passToLyricAPI = function (trackArtist, trackName) {
    var selectRandomTrack = Math.floor(Math.random() * 50);


    $http({
      method: 'GET',
      url: '/api/givemelyrics',
      params: { trackArtist: trackArtist, trackName: trackName }
    }).then(function(response) {
      var lyricSnippet = '';
      // console.log('RESPONSE WITHIN LYRIC CALL IS', response);
      if ( !response.data[selectRandomTrack] ) {
        var slicedSnippet = '*wub wub, bleep bloop* looks like an instrumental! (or just track we don\'t yet cover)';
      } else { 
        lyricSnippet = response.data[selectRandomTrack].snippet;
        console.log('TOTAL TRACK LYRIC RESPONSE IS', response.data[selectRandomTrack]);
        slicedSnippet = lyricSnippet.split('\n')[0, 2];
        
        console.log('full snipp is', lyricSnippet);
        console.log('lyricSnippet is', slicedSnippet);
      }
		    
		    // send to server for 
		    $http({
		      method: 'POST',
		      url: '/api/createNewLyric',
		      params: { artist: trackArtist, lyric: trackName }
		    });
      
      $scope.fakeLyricBase = [];

      if ( $scope.newUser === 'bryytunes') {
	       $scope.fakeLyricBase.push(
	      {artist: 'Drake', lyric: 'Why you gotta fight with me at Cheesecake?', title: 'Child\'s Play'},
	      {artist: 'MGMT', lyric: 'I\'m feeling rough, I\'m feeling raw, I\'m in the prime of my life', title: 'Time to Pretend'},
	      {artist: 'Rebecca Black', lyric: '7 AM, waking up in the morning. Gotta be fresh, gotta go downstairs', title: 'Friday'},
	      {artist: 'LCD Soundsystem', lyric: 'The time has come, the time has come, the time has come today', title: 'Us v Them'},
	      {artist: 'The Strokes', lyric: 'Twenty-nine different attributes, Only seven that you like', title: 'You Only Live Once'});
      } else if ( $scope.newUser === 'nickhuskins' ) {
         $scope.fakeLyricBase.push(
	      {artist: 'LCD Soundsystem', lyric: 'It\'s the end of an era, it\'s true', title: 'All My Friends'},
	      {artist: 'The Strokes', lyric: 'Twenty-nine different attributes, Only seven that you like', title: 'You Only Live Once'},
	       {artist: 'MGMT', lyric: 'I\'m feeling rough, I\'m feeling raw, I\'m in the prime of my life', title: 'Time to Pretend'});
      }1
      console.log('SCOPE NEW BASE IS THIS', $scope.newLyricsBase);
      $scope.newLyricBase.push(

      {
        artist: trackArtist,
        lyric: slicedSnippet,
        title: trackName
      });

      console.log('SCOPE NEW BASE IS THIS', $scope.newLyricsBase);

      console.log('SCOPE FAKE BASE IS THIS', $scope.fakeLyricBase);
      console.log('GENERATE LYRIC SNIPPET IS -------------- !!!!!!!!!!!!!!', lyricSnippet);
    });


  };


  $scope.favLyric = function () {

    console.log('Im expressing some damn interest in this track!');
    // this grabs an object that contains the track data (via .track)
    // pertinent track properties are HERE:
    var trackArtist = this.track.artist;
    var lyric = this.track.lyric;
    var trackName = this.track.title;

    $scope.favoriteLyrics.unshift({
      artist: trackArtist,
      lyric: lyric,
      title: trackName
    });

    console.log($scope.favoriteLyrics);

    // push into object / db on click
    // and add class, to style
      // then display selected tracks in another pane
  };

 
  $scope.favoriteLyrics = [];

  $scope.newLyricBase = [
      
  ];
  
  $scope.fakeLyricBase = [
      
  ];


  console.log($scope.fakeLyricBase);

}]);