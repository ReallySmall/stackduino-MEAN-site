'use strict';

angular.module('stackduinoApp', [
  'stackduinoApp.auth',
  'stackduinoApp.admin',
  'stackduinoApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'validation.match'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
