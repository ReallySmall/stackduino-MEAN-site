'use strict';

angular.module('stackduinoApp')

  .factory("getArticles", function($http, getApiRoots) {

    //get all articles
  	var posts = {
	    get: function() {
      	return $http({
      		method:'GET',
    		  dataType: 'json',
	      	url: getApiRoots.tumblr + 'index',
	      	cache: true,
          timeout: 2000
	      });
	    }
  	};

    return {
      requestAll: function(blog) { 
      	return posts.get(blog); 
      }
    };

});


