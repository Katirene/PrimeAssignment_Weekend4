var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var pg = require('pg');

var connectionString ='';

if(process.env.DATABASE_URL != undefined) {
    connectionString = process.enn.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgress://localhost:5432/postgres';
}

router.post('/', function(req, res) {
    console.log(req.body);
    var addTask = {
        postTask: req.body.postTask
    };
    console.log(addTask.postTask);
    pg.connect(connectionString, function (err, client, done) {
        client.query("INSERT INTO tasks (task_name) VALUES ($1) RETURNING id",
            [addTask.postTask],
            function (err, result) {
                done();
                if (err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    res.send(result);
                }
            });
    });
});

module.exports = router;
