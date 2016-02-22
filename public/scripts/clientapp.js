$(document).ready(function() {
    $('#post-task').on('click', postTask);
    $('.displayedInProgress').on('click', '.deleteTask', removeTask);
    $('.displayedInProgress').on('click', '.deleteTask', deleteTaskFromDOM);
    $('.innerContainer').on('click', '.completeTask', updateCompletedStatus);
    $('.innerContainer').on('click', '.completeTask', displayCompletedTask);


    getTaskData();

});

function postTask() {
    event.preventDefault();
    var values = {};
    $.each($('#input-task').serializeArray(), function (i, field) {
        values[field.name] = field.value;
    });
    if (values.postTask == '') {
        return;
    }
    $('#input-task').val('');
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
//retrieves all entries from database. Returns the entries and runs the function to display tasks
function getTaskData() {
    $.ajax({
        type: 'GET',
        url: '/getTasks',
        success: function(data) {
            console.log('GET ' + data);
            $('.displayedInProgress').empty();
            $('.displayedCompleted').empty();
            for (var i = 0; i < data.length; i++) {
                var toBePostedTasks = data[i];
                displayTasks(toBePostedTasks);
                console.log(toBePostedTasks.task_name);
                console.log(toBePostedTasks.is_completed);

            }
        }
    });
}
//Remove task button matches grabs the id from the button that was clicked
function removeTask() {
    event.preventDefault();
    var data = {};
    data['id'] = $(this).data('id');
    console.log(data);
    $.ajax ({
        type: 'DELETE',
        url: '/removeTask',
        data: data,
        success: function (response) {
            console.log(response);
            if(response === 'error') {
                console.log('error from server');
            } else if (response === 'success') {
                console.log('success from server');
            }
        }
    });
}
//changes status of task in db from false to true - returns ID of updated record
function updateCompletedStatus () {
    event.preventDefault();
    var data = {};
    data['id'] = $(this).data('id');
    $.ajax ({
        type: 'PUT',
        url: '/updateStatus',
        data: data,
        success: function (data) {
            console.log(data);
            if(data) {
                console.log('from server:', data);
            } else {
                console.log('error');
            }
        }
    });
}


function displayTasks(taskList) {
    if (taskList.is_completed == false) {
        $('.tasks').children().last().append('<li><p>' + taskList.task_name + '</p><a href="#" data-id="' + taskList.id + '" class="deleteTask"><i class="fa fa-trash"></i></a><a href="#" data-id="' + taskList.id + '" id="complete-task" class="completeTask"><i class="fa fa-check-square-o"></i></a></li>');
    } else {
        $('.completedTasks').children().last().append('<li><p>' + taskList.task_name + '</p></li>');
    }
}

function deleteTaskFromDOM() {
    $(this).parent().remove();
}


function displayCompletedTask() {
    var $clone = $(this).closest('li').find('p').clone();
    $clone.appendTo('.displayedCompleted').children().last();
    $(this).parent().remove();
}
