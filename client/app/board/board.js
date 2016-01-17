'use strict';

angular.module('stackduinoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('board', {
        url: '/boards/:id',
        templateUrl: 'app/board/board.html',
        controller: 'BoardCtrl'
      });
  });
