'use strict';

angular.module('stackduinoApp')
  .directive('flexSlider', function ($timeout) {
    return {
      templateUrl: 'app/flexSlider/flexSlider.html',
      restrict: 'A',
      scope: {
        items: '=flexSlider',
        showTitle: '=showTitle',
        slide: '=slide',
        interval: '=interval'
      },
      link: function postLink(scope, element, attrs) {
      	//Initiate flexslider
      	scope.$watch('items', function(old, updated) { //initiate flexslider
    			$timeout(function(){
    				element.find('.js-flexslider').flexslider({
            			animation: scope.slide === true ? 'slide' : 'fade',
            			directionNav: true,
                  customDirectionNav: $('.flexslider .slide-cover'),
                  slideshowSpeed: 15000,
                  animationSpeed: 1000,
                  smoothHeight: true,
                  start: function(){
                  },
                  after: function(){
                  }
        			});
    			}, 50);
        }, true);
      }
    };
  });
