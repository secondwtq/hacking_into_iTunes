var iTunesFinderApp = angular.module('itunes_finder', [ ]);

iTunesFinderApp.service('resultService', function ($http) {
	var results = [ ];

	var add_result = function (src) { results.push(src); }

	var get_results = function () { return results; }

	var search = function (title) {

		var ret = { };

		var p = $http.jsonp('https://itunes.apple.com/search?term=' + title + '&entity=song&callback=JSON_CALLBACK').
			success(function (data) {
				ret = data;
				console.log(data);
				results = data.results;
			});

		return p;
	}

	return {
		add_result: add_result,
		get_results: get_results,
		search: search,
	};
});

iTunesFinderApp.controller('FinderController', function ($scope, $rootScope, resultService) {

	$scope.results = resultService.get_results();

	$scope.search = function () {
		resultService.search($scope.keyword_title).then(function () {
			$scope.results = resultService.get_results();
		})
	}

	$scope.keyword_title = 'Yellow';

});

iTunesFinderApp.controller('ResultController', function ($scope, resultService) {

});