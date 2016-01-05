'use strict';

angular.module('stackduinoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('article', {
        url: '/build/:id',
        templateUrl: 'app/article/article.html',
        controller: 'ArticleCtrl'
      });
  });
