'use strict';

angular.module('stackduinoApp')
  .controller('BoardCtrl', function ($scope, $location, $http, getBoards, getApiRoots) {

      var boardParam = $location.path();

        $scope.statuses = getBoards.statuses();
  console.log($scope.statuses);

    getBoards.requestAll()
        .then(function(response) {

        for(var i = 0; i < response.data.items.length; i++){
            var boardTitle = '/boards/' + response.data.items[i].fields.title.replace(' ', '-').toLowerCase();
            if(boardTitle === boardParam){
                $scope.board = response.data.items[i].fields;
                $scope.boardImages = response.data.includes.Asset;
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
});