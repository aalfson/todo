
var App = angular.module('taskManager', []);

App.controller('tasks', ['$scope', '$location', '$http', function($scope, $location, $http) {

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
       'X-CSRF-Token': App.csrf_token()
      },
      data: { id: task.id }
    };

    $http(req).
      success(function(data, status, headers, config) {
        console.log("Completed status updated.")
      }).
      error(function(data, status, headers, config) {
        console.log("There was a problem changing the completed status of the task.")
      });
  };

}]);

App.csrf_token = function() {
  var tokens = document.getElementsByName('csrf-token');
  return tokens[0].content;
};