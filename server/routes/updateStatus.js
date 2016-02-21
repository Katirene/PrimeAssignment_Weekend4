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

router.put('/', function(req, res) {
    console.log(req.body.id);
    var updateTask = {
        taskId: req.body.id
    };
    console.log(updateTask.taskId);
    pg.connect(connectionString, function (err, client, done) {
        client.query("UPDATE tasks SET is_completed = TRUE WHERE id = ($1) RETURNING id",
            [updateTask.taskId],
            function (err, result) {
                done();
                if (err) {
                    console.log('error');
                    res.send('error');
                } else {
                    res.send(result);
                }
            });
    });
});

module.exports = router;