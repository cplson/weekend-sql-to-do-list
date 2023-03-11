$(document).ready(onReady);

function onReady(){
    console.log('client and jquery loaded');

    // Display current tasks
    getTasks();
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

function renderTasks(taskList){
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