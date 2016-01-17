'use strict';

angular.module('stackduinoApp')
  .controller('BuildCtrl', function ($scope, getContent, getApiRoots) {

  	$scope.articles = [];
  	$scope.tags = [];
  	$scope.loading = true;
  	$scope.httpError = false;

  	getContent.get(getApiRoots.content + 'articles/index')
    .then(function(response) {
    	$scope.articles = response.data.articles;
      $scope.tags = response.data.tags;
      $scope.httpError = false;
      $scope.loading = false;
    }, function() {
    	$scope.loading = false;
    	$scope.httpError = true;
    });

  });

