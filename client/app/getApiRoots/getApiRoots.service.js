'use strict';

angular.module('stackduinoApp')
  .factory("getApiRoots", function() {

	var roots = {
    drupal: "/api/content/",
    flickr: "/api/flickr/",
    gitHub: "https://api.github.com/repos/reallysmall/"
	};

  return {
    drupal: roots.drupal,
    gitHub: roots.gitHub,
    flickr: roots.flickr,
  };

});
