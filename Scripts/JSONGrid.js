var app = angular.module('JSONGridApp', [])
				 .filter('range', function(){
				 	//Generate the range of pages to be displayed in the pagination
				 	return function(input, total){
				 		total = parseInt(total);
				 		for (var i=0; i<total; i++) {
      						input.push(i);
    					}
						return input;
				 	}
				 })
				 .controller('JSONGridController', function($scope){
				 	$scope.jsonData = jsonData;
				 	$scope.sortColumn = "";
				 	$scope.sortReverse = true;
				 	$scope.pageLimit = 10;
				 	$scope.showModal = false;
				 	$scope.currentPageNo = 0;
				 	$scope.limit = 0;
				 	$scope.totalPages = $scope.jsonData.length / $scope.pageLimit;
				 	
				 	//Sort the grid on the passes column
				 	$scope.sortData = function(column){
				 		$scope.sortColumn == column ? $scope.sortReverse = !$scope.sortReverse : $scope.sortColumn = column
				 	}

				 	//Modifies the up down arrow to display the ascending order
				 	$scope.getSortClass = function(column){
				 		return $scope.sortReverse ? 'arrow-down' : 'arrow-up' 
				 	}

				 	//Get all the items for the clicked page number
				 	$scope.getPages = function(number){
				 		$scope.limit = parseInt(number) * parseInt($scope.pageLimit);
				 	}

				 	//Updates the total pages and current page number on change of page limit 
				 	$scope.$watch('pageLimit', function(){
				 		$scope.totalPages = $scope.jsonData.length / $scope.pageLimit;
				 		$scope.currentPageNo = 0;
				 	})

				 	//Get the next list of pages
				 	$scope.getNextPage = function(){
				 		if ($scope.currentPageNo <=  $scope.totalPages - 20){
				 			$scope.currentPageNo = $scope.currentPageNo + 10;
				 		}
				 	}

				 	//Get the previous list of pages
				 	$scope.getPreviousPage = function(){
				 		console.log("prev " + $scope.currentPageNo );
				 		if ($scope.currentPageNo >  0){
				 			$scope.currentPageNo = $scope.currentPageNo - 10;
				 		}
				 	}

				 	//Gets the edited data and saves in the scope so that get the json can be updated
				 	$scope.editRow = function(data){
				 		$scope.id = data.id
				 		$scope.firstName = data.first_name;
				 		$scope.gender = data.gender;
				 		$scope.lastName = data.last_name;
				 		$scope.email = data.email;
				 		$scope.showModal = true;
				 	}

				 	//Function to update the json data
				 	$scope.save = function(){
				 		angular.forEach(jsonData, function(key, value){
				 			if(jsonData[value].id == $scope.id)
				 			{
				 				jsonData[value].first_name = $scope.firstName
				 				jsonData[value].gender = $scope.gender
				 				jsonData[value].lastName = $scope.lastName
				 				jsonData[value].email = $scope.email 
				 				$scope.showModal = false;
				 			}
				 		})
				 	}
				 })