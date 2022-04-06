# pgasz-task-manager
This is my classic task manager app with REST API in node.js \
In this project I use the non-relative database - MongoDB hosted on Atlas. I created and managed a database using the framework - Mongoose. \
Fronted is created in HTML, CSS and JavaScript. \
Check how it works and install it locally [look installation](https://github.com/pgasz/pgasz-task-manager/blob/main/README.md#installation)

## Languages and technologies
- Node.js / Express.js
- the NoSQL database - MongoDB (hosted on Atlas)
- database framework Mongoose
- frontend HTML, CSS, JavaScript

## Overview

<h6 align="center">
User interface
</h6>
<p align="center">
  <img src="http://pgasz.pl/readme/task-manager/layout.png" alt="INTERFACE"/>
</p>

<h6 align="center">
Add a task
</h6>
<p align="center">
  <img src="http://pgasz.pl/readme/task-manager/add-task.gif" alt="ADD A TASK"/>
</p>

<h6 align="center">
Get data from database - hard reload
</h6>
<p align="center">
  <img src="http://pgasz.pl/readme/task-manager/hard-reload.gif" alt="HARD RELOAD"/>
</p>

<h6 align="center">
Edit a task
</h6>
<p align="center">
  <img src="http://pgasz.pl/readme/task-manager/edit-task.gif" alt="EDIT A TASK"/>
  <img src="http://pgasz.pl/readme/task-manager/edit-task2.gif" alt="EDIT A TASK"/>
</p>

<h6 align="center">
Delete a task
</h6>
<p align="center">
  <img src="http://pgasz.pl/readme/task-manager/delete-task.gif" alt="DELETE A TASK"/>
</p>


## Features
- storing tasks in the database
- convenient JSON form of sent data
- REST API (add, edit, delete and get each task)
- user-friendly interface
- custom user alert system



## API endpoints
 I create a REST API for storing tasks.

GET '/tasks'          --> get all the tasks \
POST '/tasks          --> create a new task \
GET '/tasks/:id'      -->  get single task \
PATCH '/tasks/:id'    -->  update single task \
DELETE '/tasks/:id'   --> delete single task


## Installation
You should have installed node.js ( [check documentation](https://nodejs.org/en/ "check documentation") ) and npm ( [check documentation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm "check documentation") ) on your computer. These two are required to run this project locally. \
You should have created database and place MONGO_URI in .env file.
1. Download file (clone repository or download and extend zip)
2. Open your terminal in the project directory and type 2 commands: \
   `npm install` 
   \
    `npm start` \
Now you are ready to use the project locally. Have fun! :-D

### Authors
- [pgasz](https://github.com/pgasz "pgasz")
