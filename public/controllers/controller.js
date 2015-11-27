function AppCtrl($scope ,$http) {
	console.log("Hello World from controller");

	
	var refresh= function() {
	$http.get('/todolist').success(function(response) {
			console.log("I got the data");
			$scope.todolist = response;
			$scope.todo="";
				});
		}

		refresh();

		$scope.addWork = function() {
		console.log($scope.todo);
		$http.post('/todolist', $scope.todo).success(function(response) {
			console.log(response);
			refresh();
		});
	};

	$scope.remove= function(id) {
		console.log(id);
		$http.delete('/todolist/' + id).success(function(response){
			refresh();
			});
		};
	};
