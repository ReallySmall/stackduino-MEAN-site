'use strict';

angular.module('stackduinoApp')
  .controller('BoardCtrl', function ($scope, $location, $http, getBoards, getApiRoots) {

      var boardParam = $location.path();

    getBoards.requestAll()
        .success(function(data, status, headers) {

        for(var i = 0; i < data.items.length; i++){
            var boardTitle = '/boards/' + data.items[i].fields.title.replace(' ', '-').toLowerCase();
            if(boardTitle === boardParam){
                $scope.board = data.items[i].fields;
                break;
            }
        }

        console.log($scope.board);

        if(!$scope.board){
            $location.path('/');
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
                    }).success(function (data) {
                        $scope.commits = data;
                    });

                $http.get(getApiRoots.gitHub + repo_id + "/issues?per_page=3&state=open", 
                    {
                        timeout: 5000
                    }).success(function (data) {
                        $scope.issues = data;
                        console.log($scope.issues);
                    });

            }

        });

    }

});
});