'use strict';

angular.module('stackduinoApp')
  .service('getContent', function ($http) {

    return {
      get: function(route, timeout) { 
  		return $http({
      		method:'GET',
      		url: route,
      		cache: true,
      		timeout: timeout || 2000
      	}); 
      }
      
    };

});
