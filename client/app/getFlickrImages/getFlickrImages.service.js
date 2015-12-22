'use strict';

angular.module('stackduinoApp')

  .factory("getFlickrImages", function($http, getApiRoots) {

    //get all Flickr images tagged with n
  	var gallery = {
	    doRequest: function(perPage, page) {
        
      	return $http({
      		method:'GET',
    			dataType: 'json',
	      	url: getApiRoots.flickr + 'gallery',
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
          url: getApiRoots.flickr + 'features',  	      
          cache: true,
          timeout: 10000 
  	     });

  		}
  	};

    return {
      requestAll: function(perPage, page) { 
      	return gallery.doRequest(perPage, page); 
      },
      requestFeatureImages: function(photoset) { 
      	return featureImages.doRequest(photoset); 
      }
    };

});

