'use strict';

angular.module('stackduinoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      });
  });