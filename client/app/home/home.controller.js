'use strict';

angular.module('stackduinoApp')
  .controller('HomeCtrl', function ($scope, getContent, getApiRoots) {

    $scope.featureImages = [];
    $scope.featureImageCount = 5;
    $scope.featuresIncTags = 'feature';

  	getContent.get(getApiRoots.content + "homepage")
      .then(function(response) {
        $scope.about = response.data.items[0].fields;
        $scope.homeImages = response.data.includes.Asset;
      },
      function error(response) {
      	console.log(response);
      });

    getContent.get(getApiRoots.content + 'features')
      .then(function(response) {

        var rawResults = response.data.photoset.photo;

        for(var i = 0, j = 0; i < rawResults.length; i++){
          if(rawResults[i].tags.indexOf($scope.featuresIncTags) >= 0 && rawResults[i].width_o >= 1024 && rawResults[i].height_o / rawResults[i].width_o >= 0.66){ //if tagged as a feature
            //add it to the features array
            $scope.featureImages.push(rawResults[i]);
            if(++j >= $scope.featureImageCount){
              break;
            }
          }
        }

        for(var j = 0; j < $scope.featureImages.length; j++){
          var $this = $scope.featureImages[j];              
          $this.href = 'https://farm' + $this.farm + '.staticflickr.com/' + $this.server + '/' + $this.id + '_' + $this.secret + '_b.jpg';
        }

      }, function error(response){
        console.log(response);
      });

  });
