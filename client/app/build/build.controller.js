'use strict';

angular.module('stackduinoApp')
  .controller('BuildCtrl', function ($timeout, $scope, getArticles) {

  	$scope.articles = [];
  	$scope.tags = [];
  	$scope.loading = true;
  	$scope.httpError = false;

  	function uniq(a) {
    	return a.sort().filter(function(item, pos, ary) {
        	return !pos || item != ary[pos - 1];
    	})
	}

    	
    	getArticles.requestAll('reallysmall')
	    .success(function(data, status, headers) {

	    	var tempArr = [];

	    	for(var i = 0; i < data.length; i++){
	    		if(data[i].type === 'text'){
	    			$scope.articles.push(data[i]);
	    			tempArr.push(data[i].tags);
	    		}
	    	}

        console.log($scope.articles);

	    	tempArr = tempArr.reduce(function(a, b){
     			return a.concat(b);
			});

			$scope.tags = uniq(tempArr);
	    	$scope.httpError = false;
			$scope.loading = false;	

	    })
        .error(function(data, status, headers, conf) {
        	$scope.loading = false;
        	$scope.httpError = true;
        });

  });

