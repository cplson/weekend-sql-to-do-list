const express = require('express');
const bodyParser = require('body-parser');
const toDoRouter = require('./routes/to_do.router.js');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));
app.use(bodyParser.json());

// ROUTES
app.use('/to_do', toDoRouter)

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});