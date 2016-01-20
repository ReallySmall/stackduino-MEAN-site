'use strict';

angular.module('stackduinoApp')
  .controller('BoardCtrl', function ($scope, $location, $stateParams, $http, getContent, getBoards, getApiRoots) {

    $scope.id = $stateParams.id;
    $scope.board = null;
    $scope.images = null;
    $scope.imageInstanceData = null;
    $scope.statuses = getBoards.statuses();

    getContent.get(getApiRoots.content + 'boards/id/' + $scope.id)
        .then(function(response) {
            $scope.board = response.data.content.fields;

            if(!$scope.board){
                
                $location.path('/'); // bounce back to homepage if no matching board
            
            } else {
                
                $scope.images = response.data.assets;
                $scope.board.parsedImages = [];

                for(var i = 0; i < $scope.board.images.length; i++){ // get related images
                    $scope.board.parsedImages.push($scope.getImageData($scope.board.images[i].sys.id));
                }

                $(document).ready(function(){
                    setTimeout(function(){
                    $('.js-flexslider').flexslider();
                }, 500);
                });

            }

        }, function(){
            console.log("Failed to load board");
        });

    $scope.getImageData = function(id){
        var imgObj = {};
        for(var i = 0; i < $scope.images.length; i++){
          if(id === $scope.images[i].sys.id){
            imgObj.url = $scope.images[i].fields.file.url;
            imgObj.height = $scope.images[i].fields.file.details.image.height;
            imgObj.width = $scope.images[i].fields.file.details.image.width;
            imgObj.alt = $scope.images[i].fields.title;
            break;
          }
        }
        return imgObj;
    }

});