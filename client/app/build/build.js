'use strict';

angular.module('stackduinoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('build', {
        url: '/build',
        templateUrl: 'app/build/build.html',
        controller: 'BuildCtrl'
      });
  });
