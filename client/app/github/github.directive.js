'use strict';

angular.module('stackduinoApp')
  .directive('github', function ($http, getApiRoots) {
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

                $http.get(getApiRoots.gitHub + repo_id + "/commits?per_page=3", 
                    {
                        timeout: 5000
                    }).success(function (data) {
                        scope.commits = data;
                    });

                $http.get(getApiRoots.gitHub + repo_id + "/issues?state=all", 
                    {
                        timeout: 5000
                    }).success(function (data) {
                        scope.closedIssues = [];
                        scope.openIssues = [];
                        for(var i = 0; i < data.length; i++){
                        	if(data[i].state === 'open'){
                        		scope.openIssues.push(data[i]);
                        	} else {
                        		scope.closedIssues.push(data[i]);
                        	}
                        }
                        scope.issueStats = [scope.openIssues.length, scope.closedIssues.length];
                        scope.issueLabels = ['Open issues', 'Closed issues'];
                    });

            }
	
    	}, true);    

      }
    };
  });

