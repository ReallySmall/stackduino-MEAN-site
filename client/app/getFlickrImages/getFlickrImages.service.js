'use strict';

angular.module('stackduinoApp')

  .factory("getFlickrImages", function($http, getApiRoots) {

    //api args to use for Flickr requests
    //api key is supplied from back end
  	var apiArgs = {
  		userId: '&user_id=54092274@N06',
  		format: '&format=json&nojsoncallback=1',
  		searchMethod: '&method=flickr.photos.search',
  		albumMethod: '&method=flickr.photosets.getPhotos',
  		tags: '&tag_mode=all&tags=focusstacking,-controller',
  		extras: '&extras=tags,owner_name,url_n,url_o',
  		mode: '&safe_search=1' 
  	};

    //get all Flickr images tagged with n
  	var allTaggedWith = {
	    doRequest: function(perPage, page) {
      	return $http({
      		method:'GET',
    			dataType: 'json',
	      	url: getApiRoots.flickr + apiArgs.format + '&per_page=' + perPage + '&page=' + page + apiArgs.searchMethod + apiArgs.tags + apiArgs.extras + apiArgs.mode,
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
  	      url: getApiRoots.flickr + apiArgs.userId + apiArgs.format + apiArgs.albumMethod + '&photoset_id=' + photoset + apiArgs.extras + apiArgs.mode,
  	      cache: true,
          timeout: 10000 
  	     });

  		}
  	};

    return {
      requestAll: function(perPage, page) { 
      	return allTaggedWith.doRequest(perPage, page); 
      },
      requestFeatureImages: function(photoset) { 
      	return featureImages.doRequest(photoset); 
      }
    };

});

