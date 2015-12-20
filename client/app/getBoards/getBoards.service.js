'use strict';

angular.module('stackduinoApp')

.factory("getBoards", function($http, getApiRoots) {

	var boardList = {
	    doRequest: function() {
	      	return $http({
	      		method:'GET',
	      		url: getApiRoots.contentful + "type/boards",
	      		cache: true 
	      	});
	    }
	};

    return {
      requestAll: function() { return boardList.doRequest(); }
    };

});
