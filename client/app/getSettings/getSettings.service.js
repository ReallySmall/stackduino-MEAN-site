'use strict';

angular.module('stackduinoApp')
  .factory("getSettings", function($http) {

	var settings = {
	    get: function(pageId) {
	      	return $http({
	      		method:'GET',
	      		url: "api/settings",
	      		cache: true 
	      	});
	    }
	};

    return {
      getSiteSettings: function() { return settings.get(); },
    };

});
