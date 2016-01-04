'use strict';

angular.module('stackduinoApp')

.factory("getPages", function($http, getApiRoots) {

	var pages = {
	    home: function() {
	      	return $http({
	      		method:'GET',
	      		url: getApiRoots.contentful + "type/homepage",
	      		cache: true 
	      	});
	    }
	};

    return {
      requestHome: function() { return pages.home(); }
    };

});