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
	    },
      byId: function(id) {
        return $http({
          method:'GET',
          dataType: 'json',
          url: getApiRoots.tumblr + 'id/' + id,
          cache: true,
          timeout: 2000
        });
      }
  	};

    return {
      requestAll: function() { 
      	return posts.get(); 
      },
      byId: function(id) {
        return posts.byId(id);
      }
    };

});


