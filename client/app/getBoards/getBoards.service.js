'use strict';

angular.module('stackduinoApp')

.factory("getBoards", function($http, getApiRoots) {

	var boards = {
	    index: function() {
	      	return $http({
	      		method:'GET',
	      		url: getApiRoots.content + 'boards/index',
	      		cache: true 
	      	});
	    },
	    byId: function(id) {
	        return $http({
          		method:'GET',
          		dataType: 'json',
          		url: getApiRoots.content + 'boards/id/' + id,
          		cache: true,
          		timeout: 2000
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
      index: function() { 
      	return boards.index(); 
      },
      byId: function(id) {
        return boards.byId(id);
      },
      statuses: function() { 
      	return boards.statuses(); 
      }
    };

});