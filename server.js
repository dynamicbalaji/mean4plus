//Importing express, body-parser, path & http in constants
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');

//constant app which binds to Express server
const app = express();

//API file for interacting with MongoDB
const api = require('./server/routes/api');

//Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

//API Location
app.use('/api', api);

//Send all other requests to angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set port - Notice process.env.PORT & not PROD... app.set here & not app.use
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Server is running on port ${port}`));