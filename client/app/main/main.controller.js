'use strict';

angular.module('stackduinoApp')
  .controller('MainCtrl', function ($scope, $rootScope, getSettings, getWrapperContent, getFlickrImages, $location) {
    $scope.siteTitle = '';
    $scope.siteDescription = '';
    $scope.featureImages = [];
    $scope.featureImageCount = 5;
        $scope.featuresIncTags = 'feature';
    $scope.socialLinks = [];
    $scope.footerLinks = [];

    getSettings.getSiteSettings()
      .success(function(data, status, headers) {

        $scope.siteTitle = 'Stackduino';
        $scope.siteDescription = 'An Arduino compatible focus stacking controller for macro photography';

        getFlickrImages.requestFeatureImages()
        .success(function(data, status, headers) {

          console.log(data);

          var rawResults = data.photoset.photo;

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
        });

    $scope.isCurrentPath = function (path) {
      if(path === '/'){
        return $location.path() === path; 
      }
      return $location.path().indexOf(path) === 0;
    };

      });

    $scope.socialLinks = [ //hardcoded for now, maybe get this from api in future
      {
        title: 'ReallySmall on GitHub',
        href: 'https://github.com/ReallySmall',
        icon: 'github-square'
      },
      {
        title: 'ReallySmall on Flickr',
        href: 'https://www.flickr.com/photos/reallysmall',
        icon: 'flickr'
      },
      {
        title: 'Contact',
        href: 'mailto:reallysmallmacro@gmail.com',
        icon: 'envelope-square'
      }
    ];

    $scope.menuItems = [ //hardcoded for now, maybe get this from api in future
      {
        title: 'Boards',
        href: '/boards',
        icon: 'code-fork'
      },
      {
        title: 'Build',
        href: '/build',
        icon: 'gears'
      },
      {
        title: 'Gallery',
        href: '/gallery',
        icon: 'star'
      },
    ];

    $scope.isCurrentPath = function (path) {
      if(path === '/'){
        return $location.path() === path; 
      }
      return $location.path().indexOf(path) === 0;
    };

  });
