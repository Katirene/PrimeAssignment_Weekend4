var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var postTask = require('./postTask');
var NewTask = require('./postTask').NewTask;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//mongoose.connect('mongodb://localhost/todolist_db');

var NewTask = mongoose.model('NewTask');

router.get('/', function(req, res) {
    NewTask.find({}, function(err, data) {
        if(err) {
            console.log('ERR: ', err);
        }
        console.log(data);
        res.send(data);
    });
});

module.exports = router;