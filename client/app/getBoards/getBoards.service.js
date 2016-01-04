'use strict';

angular.module('stackduinoApp')

.factory("getBoards", function($http, getApiRoots) {

	var boardList = {
	    doRequest: function() {
	      	return $http({
	      		method:'GET',
	      		url: getApiRoots.contentful + 'type/boards',
	      		cache: true 
	      	});
	    },
	    statuses: function(){
	    	return [
	    		{
	    			title: 'Code in development',
	    			description: 'Hardware complete, code implementation ongoing (help welcome with a pull request!)',
	    			htmlClass: 'board-active-dev'
	    		},
	    		{
	    			title: 'Supported',
	    			description: 'Hardware and code complete. No new development planned, however issues raised will be looked at',
	    			htmlClass: 'board-supported'
	    		},
	    		{
	    			title: 'Closed prototype',
	    			description: 'Hardware issues or limitations identified. Unsupported and superceded by a more recent version',
	    			htmlClass: 'board-closed-proto'
	    		}
	    	]
	    }
	};

    return {
      requestAll: function() { 
      	return boardList.doRequest(); 
      },
      statuses: function() { 
      	return boardList.statuses(); 
      }
    };

});
