'use strict';

angular.module('stackduinoApp')
  .controller('GalleryCtrl', function ($timeout, $scope, getFlickrImages) {

  	$scope.holdingImages = [];
  	$scope.images = [];
  	$scope.perPage = 10;
  	$scope.page = 0;
  	$scope.totalPages;
  	$scope.loading = true;
  	$scope.httpError = false;
    	
	getFlickrImages.requestAll()
    .success(function(data, status, headers) {

    	if(data.photos.photo.length){//if http request 'succeeds' and there is actually some data

	    	//store the total number of pages
	    	$scope.httpError = false;
	    	$scope.holdingImages = data.photos.photo;
	    	$scope.totalPages = $scope.holdingImages.length / $scope.perPage;

			//get the first page of results
			$scope.getResults();

		} else { //otherwise class as error

			$scope.loading = false;
    		$scope.httpError = true;	

		}

    })
    .error(function(data, status, headers, conf) {
    	$scope.loading = false;
    	$scope.httpError = true;
    });

	//get the next page of results
	$scope.getResults = function(){

		console.log($scope.page);
		console.log($scope.totalPages);

		if($scope.page < $scope.totalPages){

			console.log($scope.holdingImages);

			//push images to main scope array
			for(var i = 0, j = ($scope.page * $scope.perPage); i < $scope.perPage; i++, j++){
				$scope.images.push($scope.holdingImages[j]);
			}	

			console.log($scope.images);

			$timeout(function(){
				$scope.loading = false;	
			}, 750);

			$scope.page++;

		}

		if($scope.page === $scope.totalPages){

		}

	};

  });
