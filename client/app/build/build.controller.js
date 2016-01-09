'use strict';

angular.module('stackduinoApp')
  .controller('BuildCtrl', function ($scope, getArticles) {

  	$scope.articles = [];
  	$scope.tags = [];
  	$scope.loading = true;
  	$scope.httpError = false;
    	
  	getArticles.index()
    .then(function(response) {
    	$scope.articles = response.data.articles;
      console.log($scope.articles);
      $scope.tags = response.data.tags;
      $scope.httpError = false;
      $scope.loading = false;
    }, function() {
    	$scope.loading = false;
    	$scope.httpError = true;
    });

  });

