'use strict';

angular.module('stackduinoApp')
  .controller('ArticleCtrl', function ($scope, $stateParams, getContent, getApiRoots) {

  	$scope.id = $stateParams.id;
  	$scope.article;

    getContent.get(getApiRoots.content + 'articles/id/' + $scope.id)
        .then(function(response) {
			$scope.article = response.data;
			console.log($scope.article);
		});
});
