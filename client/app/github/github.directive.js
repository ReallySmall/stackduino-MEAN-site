'use strict';

angular.module('stackduinoApp')
  .directive('github', function ($http, getApiRoots, getContent) {
    return {
      templateUrl: 'app/github/github.html',
      restrict: 'A',
      scope: {
		repoLink: '=github',
		repoTitle: '=repoTitle'
	  },
      link: function (scope, element, attrs) {

        scope.$watch('repoLink', function(old, updated) {

			//Get recent repository commits
            if(scope.repoLink){  
                
                var url_segments = scope.repoLink.split('/');
                var repo_id = $.trim(url_segments[url_segments.length-1]);

                getContent.get(getApiRoots.gitHub + repo_id + "/commits?per_page=3", 5000)
                    .then(function (response) {
                        scope.commits = response.data;
                    }, function(){
                        console.log('Request failed');
                    });

                getContent.get(getApiRoots.gitHub + repo_id + "/issues?state=all", 5000)
                    .then(function (response) {
                        scope.closedIssues = [];
                        scope.openIssues = [];
                        for(var i = 0; i < response.data.length; i++){
                        	if(response.data[i].state === 'open'){
                        		scope.openIssues.push(response.data[i]);
                        	} else {
                        		scope.closedIssues.push(response.data[i]);
                        	}
                        }
                        scope.issueStats = [scope.openIssues.length, scope.closedIssues.length];
                        scope.issueLabels = ['Open issues', 'Closed issues'];
                    }, function(){
                       console.log('Request failed'); 
                    });

            }
	
    	}, true);    

      }
    };
  });

