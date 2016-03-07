myApp.controller('InProgressController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {

    console.log('inside InProgressController');

    $scope.dataFactory = DataFactory;
    $scope.tasksFromDB = [];
    $scope.enteredTask = '';
    $scope.singular = '';
    $scope.active = false;


    $scope.addTask = function() {
        console.log($scope.enteredTask);
        var enteredTask = {task: $scope.enteredTask};
        post(enteredTask);
    };


    function post(task) {
        $scope.dataFactory.factoryPostData(task).then(function() {
            $scope.tasksFromDB = $scope.dataFactory.factoryTaskList();
            console.log("inside post function in controller taskFromDB:", $scope.tasksFromDB);
            $scope.enteredTask = '';
            $scope.active = true;
        });
    }

    $scope.deleteTask = function (id) {
        $scope.dataFactory.factoryDeleteData(id).then(function() {
            $scope.tasksFromDB = $scope.dataFactory.factoryRetrieveData();
        });

    }





}]);