const express = require('express');
const toDoRouter = express.Router();
const pool = require('../modules/pool.js');

// GET route
toDoRouter.get("/", (req, res) => {
    console.log('inside GET route');
    const queryText = `SELECT * FROM "to_do";`;
    pool.query(queryText)
        .then(response => {
            console.log('got a response from the db');
            res.send(response.rows);
        }).catch(err => {
            console.log('there was an error getting data from server');
            res.sendStatus(500);
        });
})

// POST route
toDoRouter.post("/addTask", (req, res) => {
    console.log('Inside POST route');
    const queryText = `
        INSERT INTO "to_do" ("task")
        VALUES ($1);`
    value = [req.body.task];
    pool.query(queryText, value)
        .then(result => {
            console.log('Posted new task to database');
            res.sendStatus(201);
        }).catch(err => {
            console.log('There was an error posting the task to the database.', err);
            res.sendStatus(500);
        });
})

// PUT route
toDoRouter.put('/editTask/:id', (req, res) => {
    console.log('Inside PUT router');
    
    const idToEdit = req.params.id;
    const queryText = `
        UPDATE "to_do" 
        SET "isCompleted" = TRUE
        WHERE "id" = $1;`;

    pool.query(queryText, [idToEdit])
        .then(result => {
            console.log('Successfully changed isCompleted status for task', idToEdit);
            res.send(201);
        })
        .catch(err => {
            console.log("There was an error editing the isCompleted status for task", idToEdit, err);
            res.sendStatus(500);
        });
});

// DELETE route
toDoRouter.delete('/deleteTask/:id', (req, res) => {
    console.log('entered delete router');
    //res.sendStatus(201);
    const queryText = `
        DELETE FROM "to_do"
        WHERE ID = $1;`

    pool.query(queryText, [req.params.id])
        .then(result => {
            console.log('Successfully deleted task');
            res.sendStatus(201);
        }).catch(err => {
            console.log('There was an issue deleting task from database', err);
            res.sendStatus(500);
        })
})
module.exports = toDoRouter;