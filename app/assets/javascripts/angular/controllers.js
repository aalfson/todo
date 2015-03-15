
app = angular.module('taskManager', []);

app.controller('tasks', ['$scope', function($scope) {
  $scope.tasks = [
    {'description' : 'Write an AngularJS app with Ruby on Rails', 'completed': false },
    {'description' : 'Build an application that syncs inventory between ecommerce channels', 'completed': false},
    {'description' : 'Profit', 'completed': false}
  ]; 
}]);