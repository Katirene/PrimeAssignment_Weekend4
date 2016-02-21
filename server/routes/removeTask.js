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

router.delete('/', function(req, res) {
    console.log(req.body.id);
    var removeTask = {
        taskId: req.body.id
    };
    console.log(removeTask.taskId);
    pg.connect(connectionString, function (err, client, done) {
        client.query("DELETE FROM tasks WHERE id = ($1)",
            [removeTask.taskId],
            function (err) {
                done();
                if (err) {
                    console.log('error');
                    res.send('error');
                } else {
                    res.send('success');
                }
            });
    });
});

module.exports = router;