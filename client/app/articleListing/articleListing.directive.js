'use strict';

angular.module('stackduinoApp')
	.directive('articleListing', function ($timeout) {
	return {
      	templateUrl: 'app/articleListing/articleListing.html',
      	restrict: 'A',
		scope: {
			articles: '=',
		},
		link: function (scope, element, attrs) {

			scope.$watch('articles', function(old, updated) { //run isotope layout functions

										console.log('updated');


					if(scope.articles && scope.articles.length){
					}
		
	    	}, true);
		    	
		}
	};
});