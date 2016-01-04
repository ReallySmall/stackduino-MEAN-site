'use strict';

angular.module('stackduinoApp')
	.directive('masonryImages', function ($timeout) {
	return {
      	templateUrl: 'app/masonryImages/masonryImages.html',
      	restrict: 'A',
		scope: {
			images: '=imageItems',
			newItemCount: '=newItemCount'
		},
		link: function (scope, element) {

			var initialised = false;
		    	
	    	var masonryGrid = { //methods for creating, updating and destroying masonry layouts
	    		init: function(){
	        			element.isotope({
	            			itemSelector: '.gallery-image',
	        				layoutMode: 'masonry',
	        				transformsEnabled : false
	            		});	
	        		initialised = true;
	    		},
	    		appendNew: function(){
	    				var items = element.find('li').slice(-scope.newItemCount);
	    				items.hide();
	        			element.isotope('appended', items, items.fadeIn('slow'));	
	    		},
	    	};

			scope.$watch('images', function() { //run isotope layout functions

					if(scope.images && scope.images.length){
						$timeout(function(){
							if(initialised){
								masonryGrid.appendNew();
							} else {
								masonryGrid.init();
							} 
						}, 10);
					}
		
	    	}, true);
		    	
		}
	};
});

