'use strict';

angular.module('stackduinoApp')
  .controller('ArticleCtrl', function ($scope, $location, $stateParams, getArticles) {

  	$scope.id = $stateParams.id;
  	$scope.article;

    getArticles.byId($scope.id)
        .then(function(response) {
			$scope.article = response.data;
			console.log($scope.article);
		});
});
