var herdlyApp = angular.module('herdlyApp', []);



herdlyApp.controller('FavoriteController', ['$scope', '$http', function ($scope, $http) {


  $scope.favLyric = function () {
    console.log('Im expressing some interest in this track!');
    var trackArtist = this.track.artist;
    var lyric = this.track.lyric;
    var trackName = this.track.title;

    $scope.favoriteLyrics.unshift({
      artist: trackArtist,
      lyric: lyric,
      title: trackName
    });

    console.log($scope.favoriteLyrics);
  };

}]);