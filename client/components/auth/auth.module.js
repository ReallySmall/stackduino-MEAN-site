'use strict';

angular.module('stackduinoApp.auth', [
  'stackduinoApp.constants',
  'stackduinoApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
