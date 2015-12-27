'use strict';

angular.module('stackduinoApp')
  .controller('BoardsCtrl', function ($scope, $http, $location, getBoards, Util) {

  $scope.utils = Util;
  console.log($scope.utils);

  getBoards.requestAll()
    .success(function(data, status, headers) {
      $scope.boards = data.items;
        console.log(5);
    });

  });
