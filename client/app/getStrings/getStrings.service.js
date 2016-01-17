'use strict';

angular.module('stackduinoApp')

.factory("getStrings", function($http) {

	var strings = {
	    statuses: function(){
	    	return [
	    		{
	    			title: 'Code in development',
	    			description: 'Hardware complete, code implementation ongoing (help welcome with a pull request!)',
	    			htmlClass: 'board-active-dev',
	    			icon: 'fa fa-flash'
	    		},
	    		{
	    			title: 'Complete',
	    			description: 'Hardware and code complete. No new development planned, however issues raised will be looked at',
	    			htmlClass: 'board-supported',
	    			icon: 'fa fa-check-circle'
	    		},
	    		{
	    			title: 'Closed prototype',
	    			description: 'Hardware issues or limitations identified. Unsupported and superceded by a more recent version',
	    			htmlClass: 'board-closed-proto',
	    			icon: 'fa fa-ban'
	    		}
	    	]
	    }
	};

    return {
      statuses: function() { 
      	return strings.statuses(); 
      }
    };

});
