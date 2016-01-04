'use strict';

angular.module('stackduinoApp')
  .controller('HomeCtrl', function ($scope, getPages) {
  	getPages.requestHome()
    .then(function(response) {
      $scope.about = response.data.items[0].fields;
      $scope.homeImages = response.data.includes.Asset;
      console.log($scope.homeImages);
    },
    function error(response) {
    	console.log(response);
    });
  });
