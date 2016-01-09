'use strict';

angular.module('stackduinoApp')
  .factory("getApiRoots", function() {

	var roots = {
    content: "/api/content/",
    gitHub: "https://api.github.com/repos/reallysmall/",
	};

  return {
    content: roots.content,
    gitHub: roots.gitHub
  };

});
