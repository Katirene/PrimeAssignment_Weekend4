var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/todolist_db');

mongoose.model(
    'NewTask',
    new Schema({
            "task_name": String,
            "is_completed": String
        },
        {
            collection: 'taskCollection'
        }
    ));

var NewTask = mongoose.model('NewTask');

router.post('/', function(req, res) {
    console.log(req.body);
    var addTask = new NewTask ({
        "task_name": req.body.task
    });

    console.log(addTask.task_name);

    addTask.save(function(err, data) {
        if(err) {
            console.log('ERR: ', err);
        }

        NewTask.find({}, function(err, data) {
            if(err) {
                console.log('ERR: ', err);
            }
            console.log(data);
            res.send(data);
        });
    });
});

module.exports = router;
exports.NewTask = NewTask;


