var herdlyApp = angular.module('herdlyApp', []);



herdlyApp.controller('QueryController', ['$scope', '$http', function ($scope, $http) {

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

  var apiURL = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=';
  var apiKey = '&api_key= 5c05369bfa338d8a5c3ec52d18663241&format=json';

  // using username from input, fire GET on click
  $scope.generateLyric = function () {

    // lastFM API returns most recent 50 songs listened to, 
    // so generate random index from 0 - 49
    var selectRandomTrack = Math.floor(Math.random() * 50);

    var username = $scope.newUser;
    $http.get(apiURL + username + apiKey).then(function (response) {
      
      lovedTrack = response.data.recenttracks.track;
      
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
        slicedSnippet = 'wub wub, bleep bloop. looks like an instrumental! (or just new / obscure track)';
      }
      else { 
        lyricSnippet = response.data[selectRandomTrack].snippet;
        console.log('TOTAL TRACK LYRIC RESPONSE IS', response.data[selectRandomTrack]);
        var slicedSnippet = lyricSnippet.split('\n')[2];
        console.log('full snipp is', lyricSnippet);
        console.log('lyricSnippet is', slicedSnippet);
      }

      $scope.fakeLyricBase.push({
        artist: trackArtist,
        lyric: slicedSnippet,
        title: trackName
      });

      console.log($scope.fakeLyricBase);
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

  $scope.fakeLyricBase = [
      {artist: 'LCD Soundsystem', lyric: 'The time has come, the time has come, the time has come today', title: 'Us v Them'},
      {artist: 'Young Thug', lyric: 'We came straight from the bottom, to the top, my lifestyle', title: 'Lifestyle'},
      {artist: 'The Strokes', lyric: 'Twenty-nine different attributes, Only seven that you like', title: 'You Only Live Once'},
      {artist: 'LCD Soundsystem', lyric: 'The time has come, the time has come, the time has come today', title: 'Us v Them'},
      {artist: 'Young Thug', lyric: 'We came straight from the bottom, to the top, my lifestyle', title: 'Lifestyle'},
      {artist: 'The Strokes', lyric: 'Twenty-nine different attributes, Only seven that you like', title: 'You Only Live Once'},
      {artist: 'LCD Soundsystem', lyric: 'The time has come, the time has come, the time has come today', title: 'Us v Them'},
      {artist: 'Young Thug', lyric: 'We came straight from the bottom, to the top, my lifestyle', title: 'Lifestyle'},
      {artist: 'The Strokes', lyric: 'Twenty-nine different attributes, Only seven that you like', title: 'You Only Live Once'},
      {artist: 'LCD Soundsystem', lyric: 'The time has come, the time has come, the time has come today', title: 'Us v Them'},
      {artist: 'Young Thug', lyric: 'We came straight from the bottom, to the top, my lifestyle', title: 'Lifestyle'},
      {artist: 'The Strokes', lyric: 'Twenty-nine different attributes, Only seven that you like', title: 'You Only Live Once'},
  ];

  console.log($scope.fakeLyricBase);

}]);