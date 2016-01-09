'use strict';

angular.module('stackduinoApp')

  .factory('getFlickrImages', function($http, getApiRoots) {

    //get all Flickr images tagged with n
  	var gallery = {
	    doRequest: function() {
        
      	return $http({
      		method:'GET',
    			dataType: 'json',
	      	url: getApiRoots.content + 'gallery',
	      	cache: true,
          timeout: 10000
	      });
	    }
  	};

    //get all Flickr images in a photoset tagged with n
  	var featureImages = {
  		doRequest: function(photoset) {

  	    return $http({
  	      method:'GET',
      		dataType: 'json',
          url: getApiRoots.content + 'features',  	      
          cache: true,
          timeout: 10000 
  	     });

  		}
  	};

    return {
      requestAll: function() { 
      	return gallery.doRequest(); 
      },
      requestFeatureImages: function() { 
      	return featureImages.doRequest(); 
      }
    };

});

