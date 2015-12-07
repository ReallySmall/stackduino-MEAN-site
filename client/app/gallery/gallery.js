'use strict';

angular.module('stackduinoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('gallery', {
        url: '/gallery',
        templateUrl: 'app/gallery/gallery.html',
        controller: 'GalleryCtrl'
      });
  });
