'use strict';

angular.module('stackduinoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('boards', {
        url: '/boards',
        templateUrl: 'app/boards/boards.html',
        controller: 'BoardsCtrl'
      });
  });
