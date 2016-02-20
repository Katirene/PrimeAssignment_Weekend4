$(document).ready(function() {
    $('#post-task').on('click', postTask);
    //getTaskData();

});

function postTask() {
    event.preventDefault();
    var values = {};
    $.each($('#input-task').serializeArray(), function (i, field) {
        values[field.name] = field.value;
    });
    console.log(values);
    $.ajax ({
        type: 'POST',
        url: '/postTask',
        data: values,
        success: function (data) {
            console.log(data);
            if(data) {
                console.log('from server:', data);
                getTaskData();
            } else {
                console.log('error');
            }
        }
    });
}

function getTaskData() {
    $.ajax({
        type: 'GET',
        url: '/getTasks',
        success: function(data) {
            console.log('GET ' + data);
            $('.list-in-progress').empty();

            for (var i = 0; i < data.length; i++) {
                var toBePostedTasks = data[i];
                displayTasks(toBePostedTasks);
                console.log(toBePostedTasks.task_name);

            }
        }
    });
}
function displayTasks(taskList) {
    $('.taskHeader').children().last().append('<li>' + taskList.task_name + '<button id="delete-task" class="deleteTask">Rebel! Delete Task</button><button id="complete-task" class="completeTask">Submit and Complete your Duty</button></li>');
}
