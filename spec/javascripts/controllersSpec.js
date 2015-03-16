describe('taskManager controllers', function() {

  describe('tasks', function() {

    var scope, ctrl, $httpBackend;

    beforeEach(module('taskManager'));
    
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;

      $httpBackend.expectGET('tasks.json').
          respond([
              { id: 1, description: "Write an AngularJS app with Ruby on Rails", completed: false }, 
              { id: 2, description: "Build an application that syncs inventory between ecommerce channels", completed: false }, 
              { id: 3, description: "Profit.", completed: false}
            ]);

      scope = $rootScope.$new();
      ctrl = $controller('tasks', {$scope: scope});
    }));

    it('should create a tasks model with 3 tasks', function() {
      expect(scope.tasks).toBeUndefined();

      // triggers the mocked response to be returned
      $httpBackend.flush();

      expect(scope.tasks).toEqual([
          { id: 1, description: "Write an AngularJS app with Ruby on Rails", completed: false }, 
          { id: 2, description: "Build an application that syncs inventory between ecommerce channels", completed: false }, 
          { id: 3, description: "Profit.", completed: false}
        ]);
    });

    it('should update the completed status of a task', function() {

      //setup tasks
      $httpBackend.flush();

      //stub App.csrf_method
      spyOn(scope, 'csrf_token').and.returnValue("1234567890");

      // return dummy data
      $httpBackend.expectPOST('tasks/completed').
          respond({ id: 1, description: "Write an AngularJS app with Ruby on Rails", completed: true });

      // call updateComplete method
      expect(scope.updateCompleted).toBeDefined();
      
      // execute updateCompleted();    
      scope.updateCompleted('0');    
      $httpBackend.flush();

      expect(scope.tasks[0]).toEqual({ 
        id: 1, 
        description: "Write an AngularJS app with Ruby on Rails", 
        completed: true });
    });

  });
});