'use strict';

angular.module('stackduinoApp')
  .controller('HomeCtrl', function ($scope, $rootScope, getSettings, getWrapperContent, getFlickrImages, $location) {
    $scope.siteTitle = '';
    $scope.siteDescription = '';
    $scope.featureImages = [];
    $scope.featureImageCount = 5;
    $scope.socialLinks = [];
    $scope.footerLinks = [];
    $scope.featuresIncTags = '';
    $scope.featuresExcTags = '';
    $scope.featuresPhotoset = '';

    getSettings.getSiteSettings()
      .success(function(data, status, headers) {

        $scope.siteTitle = 'Stackduino';
        $scope.siteDescription = 'An Arduino compatible focus stacking controller for macro photography';

        $scope.featuresIncTags = 'feature';
        $scope.featuresExcTags = '';
        $scope.featuresPhotoset = '72157626574230146';

        getFlickrImages.requestFeatureImages($scope.featuresPhotoset)
        .success(function(data, status, headers) {
          var rawResults = data.photoset.photo;

          for(var i = 0, j = 0; i < rawResults.length; i++){
            if(rawResults[i].tags.indexOf($scope.featuresIncTags) >= 0 && rawResults[i].width_o >= 1024 && rawResults[i].height_o / rawResults[i].width_o >= 0.66){ //if tagged as a feature
              //add it to the features array
                        	console.log(rawResults[i].height_o + ' + ' + rawResults[i].width_o);

              $scope.featureImages.push(rawResults[i]);
              if(++j >= $scope.featureImageCount){
                break;
              }
            }
          }
          for(var i = 0; i < $scope.featureImages.length; i++){
            var $this = $scope.featureImages[i];              
            $this.href = 'https://farm' + $this.farm + '.staticflickr.com/' + $this.server + '/' + $this.id + '_' + $this.secret + '_b.jpg';
          }
        });

      });

    $scope.isCurrentPath = function (path) {
      if(path === '/'){
        return $location.path() === path; 
      }
      return $location.path().indexOf(path) === 0;
    };

  });
