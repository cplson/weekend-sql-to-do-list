$(document).ready(onReady);

function onReady(){
    console.log('client and jquery loaded');

    // set eventHandlers
    setupHandlers();

    // Display current tasks
    getTasks();
}
function setupHandlers(){
    // Listener to add a new task
    $('#submitBtn').on('click', postTask);
}

function getTasks(){
    // Make ajax request to GET tasks from "to_do" db
    $.ajax({
        method: 'GET',
        url: '/to_do' 
    }).then(response => {
        console.log('Got tasks from the server');
        renderTasks(response);
    }).catch(err => {
        alert('there was an issue getting the tasks from the server', err);
    });
}

function postTask(){
    console.log('inside postTasks');
    const newTask = $('#taskInput').val();
    // Ajax request to post new task
    $.ajax({
        method: 'POST',
        url: '/to_do/addTask',
        data: {
            isCompleted: false,
            task: newTask
        }
    }).then(response => {
        console.log('Successfully posted task to database');
        getTasks();
    }).catch(err => {
        console.log('There was an error posting the new task to the database', err);
    })
}

function renderTasks(taskList){
    // empty table contents for update
    $('#tableBody').empty();
    // empty new task textarea
    $('#taskInput').val('');
    // For every task:
    for(let task of taskList){
        // Target the thead element by id to render tr element
        $('#tableBody').append(`
            <tr>
                <td id="displayIsCompleted"></td>
                <td id="displayTask">${task.task}</td>
                <td><button class="completed">Completed</button></td>
                <td><button class="delete">Delete</button></td>
            </tr>
        `);
    }
}