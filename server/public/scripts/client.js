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

    // Listener to edit the status of an existing task
    $("#tableBody").on('click','.completedBtn', editTask);

    // Listener to delete a task
    $('#tableBody').on('click', '.deleteBtn', deleteTask);
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

function editTask(){
    console.log('Inside editTask');
    const idToEdit = $(this).parent().parent().data().id;
    
    // PUT ajax request 
    //sending the id of the task thats complete
    $.ajax({
        method: 'PUT',
        url: `/to_do/editTask/${idToEdit}`
    }).then(response => {
        console.log('PUT router responded that isCompleted edit was successful');
        getTasks();
    })
}

function deleteTask(){
    console.log('Inside editTask');
    const idToDelete = $(this).parent().parent().data().id;

    // ajax DELETE request
    $.ajax({
        method: 'DELETE',
        url: `/to_do/deleteTask/${idToDelete}`
    }).then(response => {
        console.log('Successfully got 200 response from the router');
        getTasks();
    }).catch(err => {
        console.log('There was an issue deleting task from the server', err);
    })
}

function renderTasks(taskList){
    // empty table contents for update
    $('#tableBody').empty();
    // empty new task textarea
    $('#taskInput').val('');
    // For every task:
    for(let task of taskList){
        // If this task is incomplete, render task with no style
        if(task.isCompleted === false){
            incompletedAppend(task);
        }
        // Else: change background of the task to green
            // and change the style to line through text
            // and remove the Completed button
        else{
            completedAppend(task);
        }  
    }
}

function completedAppend(thisTask){
    $('#tableBody').append(`
        <tr data-id=${thisTask.id}>
            <td class="displayTask"
                style="background-color: green; text-decoration: line-through;">${thisTask.task}</td>
            <td><button class="completedBtn" hidden>Completed</button></td>
            <td><button class="deleteBtn">Delete</button></td>
        </tr>
    `);
}

function incompletedAppend(thisTask){
    $('#tableBody').append(`
            <tr data-id=${thisTask.id}>
                <td class="displayTask">${thisTask.task}</td>
                <td><button class="completedBtn">Completed</button></td>
                <td><button class="deleteBtn">Delete</button></td>
            </tr>
        `);
}