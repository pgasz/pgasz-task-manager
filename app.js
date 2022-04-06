const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();

// endpoints
// GET '/tasks'          --> get all the tasks
// POST '/tasks          --> create a new task
// GET '/tasks/:id'      -->  get single task
// PATCH '/tasks/:id'    -->  update single task
// DELETE '/tasks/:id'   --> delete task

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/tasks', tasks);
app.use('*', (req, res) => {
    res.status(404).send(`Error 404`);
});

const port = process.env.PORT || 3000;
const start = async (url) => {
    try {
        connectDB(url);
        app.listen(port, () => {
            console.log(`Serwer is listening on a port: ${port} ...`);
        });
    } catch (error) {}
};

start(process.env.MONGO_URI);
