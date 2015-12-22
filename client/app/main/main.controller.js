'use strict';

angular.module('stackduinoApp')
  .controller('MainCtrl', function ($scope, $rootScope, getSettings, getWrapperContent, getFlickrImages, $location) {
    $scope.siteTitle = '';
    $scope.siteDescription = '';
    $scope.featureImages = [];
    $scope.featureImageCount = 5;
    $scope.socialLinks = [];
    $scope.footerLinks = [];

    getSettings.getSiteSettings()
      .success(function(data, status, headers) {

        $scope.siteTitle = 'Stackduino';
        $scope.siteDescription = 'An Arduino compatible focus stacking controller for macro photography';

        
        //getWrapperContent.requestFooter()
          //.success(function(data, status, headers) {
            //$scope.footerLinks = data;
            //console.log($scope.footerLinks);
          //})
          //.error(function(data, status, headers) {
            //console.log(22);
          //});

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
    ]

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
