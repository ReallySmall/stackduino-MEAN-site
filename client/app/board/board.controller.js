'use strict';

angular.module('stackduinoApp')
  .controller('BoardCtrl', function ($scope, $location, $stateParams, $http, getContent, getBoards, getApiRoots) {

    $scope.id = $stateParams.id;
    $scope.board = null;
    $scope.statuses = getBoards.statuses();

    getContent.get(getApiRoots.content + 'boards/id/' + $scope.id)
        .then(function(response) {
            $scope.board = response.data.content.fields;
            console.log($scope.board);
            $scope.images = response.data.assets;
        });

        if(!$scope.board){
            //$location.path('/');
        } else {

    	//On document ready (move this into a directive)
        angular.element(document).ready(function(){

            //Get recent repository commits
            if($scope.board.github_url){  
                
                var url_segments = $scope.board.github_url.split('/');
                var repo_id = $.trim(url_segments[url_segments.length-1]);

                $http.get(getApiRoots.gitHub + repo_id + "/commits?per_page=3", 
                    {
                        timeout: 5000
                    }).then(function (response) {
                        $scope.commits = response.data;
                    });

                $http.get(getApiRoots.gitHub + repo_id + "/issues?per_page=3&state=open", 
                    {
                        timeout: 5000
                    }).then(function (response) {
                        $scope.issues = response.data;
                    });

            }

        });

    }

});