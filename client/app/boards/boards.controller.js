'use strict';

angular.module('stackduinoApp')
  .controller('BoardsCtrl', function ($scope, getBoards, Util) {

  $scope.utils = Util;

  $scope.statuses = getBoards.statuses();
  console.log($scope.statuses);

  getBoards.requestAll()
    .then(function(response) {
      $scope.boards = response.data.items;
      console.log($scope.boards);
      $scope.images = response.data.includes.Asset;
    }, function(){
    	console.log("Failed to load baords data");
    });

  });
