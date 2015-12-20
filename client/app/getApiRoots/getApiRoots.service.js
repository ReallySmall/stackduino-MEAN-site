'use strict';

angular.module('stackduinoApp')
  .factory("getApiRoots", function() {

	var roots = {
    contentful: "/api/contentful/",
    flickr: "/api/flickr/",
    gitHub: "https://api.github.com/repos/reallysmall/",
    tumblr: "/api/tumblr/"
	};

  return {
    contentful: roots.contentful,
    gitHub: roots.gitHub,
    flickr: roots.flickr,
    tumblr: roots.tumblr
  };

});
