var herdlyApp = angular.module('herdlyApp', []);

herdlyApp.controller('QueryController', ['$scope', '$http', function ($scope, $http) {
	console.log('controller is hooked up!');

	/*var $scope = {
		username: null
	};*/

	var taggy;


	// toying with LASTFM API
	/*$http.get('http://ws.audioscrobbler.com/2.0/?method=user.gettoptags&user=bryytunes&api_key= 5c05369bfa338d8a5c3ec52d18663241&format=json').then(function (response) {
		console.log('RESPONSE DATA IS', response.data);
		taggy = response.data.toptags.tag[0].name;
		console.log('MUSIC TAG IN THIS PARTICULAR SPOT RIGHT HERE IS....', taggy);
	});*/


	//Mus
	$http.get('http://api.lyricsnmusic.com/songs?api_key=dd7afb1b9dc70db68cef04c42d37ef&q=%20clocks').then(function (response) {
		console.log('RESPONSE DATA IS', response.data);
		taggy = response.data.toptags.tag[0].name;
		console.log('MUSIC TAG IN THIS PARTICULAR SPOT RIGHT HERE IS....', taggy);
	});


	var username;

	username = $scope.newUser;

	console.log( 'username is', username );

	var queryLastFM = function () {

	};

	
/*	$http.get('http://api.lyricsnmusic.com/songs?api_key=dd7afb1b9dc70db68cef04c42d37ef&q=%20clocks')
	     .success(function(req, resp) {
	     	  console.log('req is', req);
	     	  console.log('resp is', resp)
	     });*/
	/*console.log('ok is', ok);*/
/*	var $scope.output;*/

	setInterval(console.log('username is now', username), 2000);

}]);