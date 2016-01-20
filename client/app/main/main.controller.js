'use strict';

angular.module('stackduinoApp')
  .controller('MainCtrl', function ($scope, $rootScope, getStrings, getContent, $location) {
    $scope.siteTitle = '';
    $scope.siteDescription = '';
    $scope.socialLinks = [];
    $scope.footerLinks = [];

    getContent.get('')
      .then(function(response) {

        $scope.siteTitle = 'Stackduino';
        $scope.siteDescription = 'An Arduino compatible focus stacking controller for macro photography';

      }, function(){
        console.log("Request failed");
      });

    $scope.socialLinks = getStrings.socialLinks(); // social media links in header
    $scope.menuItems = getStrings.menuItems(); // main menu bar

    $scope.isCurrentPath = function (path) {
      if(path === '/'){
        return $location.path() === path; 
      }
      return $location.path().indexOf(path) === 0;
    };

  });
