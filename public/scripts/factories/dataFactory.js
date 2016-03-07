myApp.factory('DataFactory', ['$http', function($http) {
    // PRIVATE

    var allTasks = undefined;

    var currentTask = undefined;

    var getData = function() {
        console.log('getting data from server');
        var promise = $http.get('/getTasks').then(function(response) {
            allTasks = response.data;
            console.log('Async data response:', allTasks);
        });

        return promise;
    };

    var deleteData = function(id) {
        var promise = $http.delete('/removeTask/' + id).then(function(response) {
            getData();
            });
        return promise;
    };

    var postData = function(task) {
        var promise = $http.post('/postTask', task);
        promise.then(function(response) {
            console.log("Response.data:", response.data);
            allTasks = response.data;
            console.log('Returned Tasks from DB:', allTasks);
        });
        return promise;
    };

    //PUBLIC
    var publicApi = {
        factoryTaskList: function() {
            return allTasks;
        },
        factoryRetrieveData: function() {
            return getData();
        },
        factoryCurrentTask: function() {
            return currentTask;
        },
        factoryPostData: function(task) {
            return postData(task);
        },
        factoryDeleteData: function(id) {
            return deleteData(id);
        }


    };

    return publicApi;

}]);