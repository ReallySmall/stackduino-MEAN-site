'use strict';

angular.module('stackduinoApp', [
  'stackduinoApp.auth',
  'stackduinoApp.admin',
  'stackduinoApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'validation.match',
  'chart.js',
  'ncy-angular-breadcrumb',
  'angucomplete-alt'
  ])
  .config(function($urlRouterProvider, $locationProvider, $breadcrumbProvider) {
    $urlRouterProvider
      .otherwise('/');
    $locationProvider.html5Mode(true);
    $breadcrumbProvider.setOptions({
      prefixStateName: 'home',
      template: 'bootstrap2'
    });
  });
