'use strict';


angular.module('stackduinoApp')
  .controller('BoardsCtrl', function ($scope, $http, $location, getBoards) {

  getBoards.requestAll()
    .success(function(data, status, headers) {
      $scope.boards = data.items;
      console.log($scope.boards);
    });

    $scope.createPath = function(item){
      item = item.replace(/ /g, '-').toLowerCase();
      var url = $location.absUrl() + '/' + item;
      return url;
    };

    $scope.toClass = function(item){
      item = item.replace(/ /g, '-').toLowerCase();
      return item;
    }; 

  });
