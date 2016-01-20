'use strict';

angular.module('stackduinoApp')
  .controller('BoardsCtrl', function ($scope, getContent, getApiRoots, getStrings, Util) {

  $scope.utils = Util;
  $scope.statuses = getStrings.statuses();

  getContent.get(getApiRoots.content + 'boards/index')
    .then(function(response) {
      $scope.boards = response.data.boards;
      $scope.images = response.data.assets;
    }, function(){
    	console.log("Failed to load boards data");
    });

  $scope.getImageUrl = function(id){
    var url = ''
    for(var i = 0; i < $scope.images.length; i++){
      if(id === $scope.images[i].sys.id){
        url = $scope.images[i].fields.file.url;
        break;
      }
    }
    return url;
  }

});
