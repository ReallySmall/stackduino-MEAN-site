'use strict';

angular.module('stackduinoApp')

  .factory("getArticles", function($http, getApiRoots) {

    //get all Flickr images tagged with n
  	var allTaggedWith = {
	    doRequest: function() {
      	return $http({
      		method:'GET',
    		dataType: 'json',
	      	url: getApiRoots.tumblr,
	      	cache: true,
          	timeout: 10000
	      });
	    }
  	};

    return {
      requestAll: function(perPage, page) { 
      	return allTaggedWith.doRequest(perPage, page); 
      }
    };

});


