
// ngRoute and templates are used for routing and rendering the correct templates
var App = angular.module('taskManager', ['ngRoute', 'templates']);

/****************************************************************************************
 * ROUTING
 ****************************************************************************************/
App.config(function($routeProvider) {
  $routeProvider
    .when('/new', {
      templateUrl: 'new.html',
      controller: 'new'
    })
    .when('/', {
      templateUrl: 'tasks.html',
      controller: 'tasks'
    }); 
}); 

/****************************************************************************************
 * TASKS CONTROLLER  
 ****************************************************************************************/
App.controller('tasks', ['$scope', '$http', function($scope, $http) {

  $http.get('tasks.json').
    success(function(data, status, headers, config) {
      $scope.tasks = data;
    }).
    error(function(data, status, headers, config) {
      console.log("There was a problem getting the tasks form the server.");
    });


  $scope.updateCompleted = function(index) {
    var task = $scope.tasks[index];

    // construct the request parameters so we can set the CSRF header
    var req = {
      method: 'POST',
      url: 'tasks/completed',
      headers: {
       'X-CSRF-Token': $scope.csrf_token
      },
      data: { id: task.id }
    };

    $http(req).
      success(function(data, status, headers, config) {
        $scope.tasks[index] = data;
      }).
      error(function(data, status, headers, config) {
        console.log("There was a problem changing the completed status of the task.")
      });
  };

  $scope.csrf_token = function() {
    var tokens = document.getElementsByName('csrf-token');
    return tokens[0].content;
  };

}]);

/****************************************************************************************
 * NEW CONTROLLER
 ****************************************************************************************/
App.controller('new', ['$scope', '$location', '$http', function($scope, $location, $http) {

  $scope.description = "";

  $scope.add = function() {
    var description = $scope.description

    //construct request
    var req = {
      method: 'POST',
      url: 'tasks/create',
      headers: {
       'X-CSRF-Token': $scope.csrf_token
      },
      data: { description: $scope.description }
    };

    //post request
    $http(req).
      success(function(data, status, headers, config) {
        $scope.tasks << data;
        $location.path('/').replace();
    }).
      error(function(data, status, headers, config) {
        console.log("There was a problem adding the task.")
    });

  }

  $scope.csrf_token = function() {
    var tokens = document.getElementsByName('csrf-token');
    return tokens[0].content;
  };

}]);

