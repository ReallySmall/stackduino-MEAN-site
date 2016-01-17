'use strict';

angular.module('stackduinoApp', [
  'stackduinoApp.auth',
  'stackduinoApp.admin',
  'stackduinoApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ngRoute',
  'ngAnimate',
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
  })
  .run(function($rootScope, $anchorScroll){
    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
      $anchorScroll();
    });
  })
  .filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);
