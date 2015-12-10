'use strict';

angular.module('stackduinoApp')
  .controller('BuildCtrl', function ($timeout, $scope, getArticles) {

  	$scope.articles = [];
  	$scope.perPage = 15;
  	$scope.page = 1;
  	$scope.totalPages;
  	$scope.maxPages;
  	$scope.loading = false;
  	$scope.httpError = false;

  	//get flickr results by page
    $scope.getpagedResults = function(page){
    	
    	$scope.loading = true;
    	
    	getArticles.requestAll($scope.perPage, page)
	    .success(function(data, status, headers) {

	    	if(data.response.posts.length){//if http request 'succeeds' and there is actually some data

		    	$scope.httpError = false;

		    	//store the total number of pages
				$scope.totalPages = data.response.blog.posts / 20;
				console.log(data.response.posts);
				//limit pages to smaller of total available pages, or 10
				$scope.maxPages = Math.min(10, $scope.totalPages);

				//store the number of new paged items
				$scope.newItemCount = data.response.posts.length;			

				//push images to main scope array
				for(var i = 0; i < $scope.newItemCount; i++){
					$scope.articles.push(data.response.posts);
				}

				$timeout(function(){
					$scope.loading = false;	
				}, 750);

				$scope.page++;

			} else { //otherwise class as error

				$scope.loading = false;
        		$scope.httpError = true;	

			}

	    })
        .error(function(data, status, headers, conf) {
        	$scope.loading = false;
        	$scope.httpError = true;
        });
	};

	//get the next page of results
	$scope.moreResults = function(){
		if($scope.page < $scope.maxPages){
			var page = $scope.page + 1;
			$scope.getpagedResults(page);
		}
	};

	//get the first page of results
	$scope.getpagedResults($scope.page);

  });

