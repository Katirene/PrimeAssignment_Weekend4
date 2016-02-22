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

router.get('/', function(req, res) {
    var results = [];
    pg.connect(connectionString, function(err, client, done) {
        var query = client.query('SELECT task_name, id, is_completed FROM tasks;');

        query.on('row', function(row) {
            results.push(row);
            console.log(results);
        });

        query.on('end', function() {
            client.end();
            return res.json(results);
        });

        if(err) {
            console.log(err);
        }
    });
});

module.exports = router;