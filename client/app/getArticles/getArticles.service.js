'use strict';

angular.module('stackduinoApp')

  .factory("getArticles", function($http, getApiRoots) {

  	var articles = {
	    index: function() {
      	return $http({
      		method:'GET',
    		  dataType: 'json',
	      	url: getApiRoots.content + 'articles/index',
	      	cache: true,
          timeout: 2000
	      });
	    },
      byId: function(id) {
        return $http({
          method:'GET',
          dataType: 'json',
          url: getApiRoots.content + 'articles/id/' + id,
          cache: true,
          timeout: 2000
        });
      }
  	};

    return {
      index: function() { 
      	return articles.index(); 
      },
      byId: function(id) {
        return articles.byId(id);
      }
    };

});


