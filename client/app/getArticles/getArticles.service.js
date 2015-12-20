'use strict';

angular.module('stackduinoApp')

  .factory("getArticles", function($http, getApiRoots) {

    //get all Flickr images tagged with n
  	var posts = {
	    get: function(blog) {
      	return $http({
      		method:'GET',
    		  dataType: 'json',
	      	url: getApiRoots.tumblr + blog,
	      	cache: true,
          timeout: 10000
	      });
	    }
  	};

    return {
      requestAll: function(blog) { 
      	return posts.get(blog); 
      }
    };

});


