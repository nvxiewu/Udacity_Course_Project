// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app=express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

const server = app.listen(port,()=>{console.log(`running on localhost: ${port}`)});

// Initialize all route with a callback function
app.get('/all', sendData);

// Callback function to complete GET '/all'
function sendData (req, res) {
 	res.send(projectData)
}

app.post('/add', (req,res)=>{
 	// console.log(request.body)
 	let data = req.body;
 	console.log(data.temp);
 	console.log(data.date);

 	// Create new entry for JS Object Endpoint
 	projectData["temp"] = data.temp;
 	projectData["feel"] = data.feel;
 	projectData["date"] = data.date;

 	// Send response to Endpoint
 	res.send(projectData);
});