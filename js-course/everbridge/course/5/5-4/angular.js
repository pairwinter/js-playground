(function(jc){
    jc.Angular = {};
    jc.Angular.TodoController = function($scope){
        $scope.todos = [
            {text:'typeinto text 1',done:false},
            {text:'typeinto text 2',done:true}
        ];
        $scope.addTodo = function(){
            $scope.todos.push({text:$scope.todoText,done:false});
            $scope.todoText = '';
        };
        $scope.remaining = function(){
            var count = 0;
            angular.forEach($scope.todos,function(todo){
                count += todo.done?0:1;
            });
            return count;
        };
        $scope.archive = function(){
            var oldTodos = $scope.todos;
            $scope.todos=[];
            angular.forEach(oldTodos,function(todo){
                if(!todo.done){
                    $scope.todos.push(todo);
                }
            });
        }
    }
})(js_course);