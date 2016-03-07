var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var postTask = require('./routes/postTask');
var getTasks = require('./routes/getTasks');
var removeTask = require('./routes/removeTask');
//var updateStatus = require('./routes/updateStatus');

//var mongoose = require('mongoose');
//var Schema = mongoose.Schema;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));

app.set('port', process.env.PORT || 5000);

app.use('/postTask', postTask);
app.use('/getTasks', getTasks);
app.use('/removeTask', removeTask);
//app.use('/updateStatus', updateStatus);

app.use(express.static('public'));
app.use(express.static('public/views'));
app.use(express.static('public/scripts'));
app.use(express.static('public/styles'));
app.use(express.static('public/vendors'));

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});