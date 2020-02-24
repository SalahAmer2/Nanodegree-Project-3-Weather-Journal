//jshint esversion:9
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

app.get('/all', (req, res)=>{
  res.send(projectData);
  console.log(projectData);
});

app.post('/addData', (req, res)=>{
  projectData = {...projectData, ...req.body};
});

// Setup Server
const port = '3000';

const server = app.listen(port, ()=>{
  console.log(`Server is running on port: ${port}`);
});
