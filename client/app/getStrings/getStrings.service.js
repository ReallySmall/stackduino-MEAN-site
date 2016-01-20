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
	    },
	    socialLinks: function(){
	    	return [
				{
				title: 'ReallySmall on GitHub',
				href: 'https://github.com/ReallySmall',
				icon: 'github-square'
				},
				{
				title: 'ReallySmall on Flickr',
				href: 'https://www.flickr.com/photos/reallysmall',
				icon: 'flickr'
				},
				{
				title: 'Contact',
				href: 'mailto:reallysmallmacro@gmail.com',
				icon: 'envelope-square'
				}
	    	]
	    },
	   	menuItems: function(){
	    	return [
			  {
		        title: 'Boards',
		        href: '/boards',
		        icon: 'code-fork'
		      },
		      {
		        title: 'Build',
		        href: '/build',
		        icon: 'gears'
		      },
		      {
		        title: 'Gallery',
		        href: '/gallery',
		        icon: 'star'
		      }
	    	]
	    }
	};

    return {
      statuses: function() { 
      	return strings.statuses(); 
      },
      socialLinks: function() {
      	return strings.socialLinks();
      },
      menuItems: function(){
      	return strings.menuItems();
      }
    };

});
