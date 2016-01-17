'use strict';

angular.module('stackduinoApp')
  .controller('GalleryCtrl', function ($timeout, $scope, getContent, getApiRoots) {

  	$scope.holdingImages = [];
  	$scope.images = [];
  	$scope.perPage = 10;
  	$scope.page = 0;
  	$scope.totalPages;
  	$scope.loading = true;
  	$scope.httpError = false;
    	
	getContent.get(getApiRoots.content + 'gallery')
    .then(function(response) {

    	if(response.data.photos.photo.length){//if http request 'succeeds' and there is actually some data

	    	//store the total number of pages
	    	$scope.httpError = false;
	    	$scope.holdingImages = response.data.photos.photo;
	    	$scope.totalPages = $scope.holdingImages.length / $scope.perPage;

			//get the first page of results
			$scope.getResults();

		} else { //otherwise class as error

			$scope.loading = false;
    		$scope.httpError = true;	

		}

    }, function() {
    	$scope.loading = false;
    	$scope.httpError = true;
    });

	//get the next page of results
	$scope.getResults = function(){

		if($scope.page < $scope.totalPages){

			//push images to main scope array
			for(var i = 0, j = ($scope.page * $scope.perPage); i < $scope.perPage; i++, j++){
				$scope.images.push($scope.holdingImages[j]);
			}	

			$scope.loading = false;	
			$scope.page++;

		}

	};

  });
