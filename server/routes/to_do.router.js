const express = require('express');
const toDoRouter = express.Router();
const pool = require('../modules/pool.js');

toDoRouter.get("/", (req, res) => {
    console.log('toDoRouter is working!');
    const queryText = `SELECT * FROM "to_do";`;
    pool.query(queryText)
        .then(response => {
            console.log('got a response from the db');
            res.send(response.rows);
        }).catch(err => {
            console.log('there was an error getting data from server');
            res.sendStatus(500);
        })
})

module.exports = toDoRouter;