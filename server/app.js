var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var postTask = require('./routes/postTask');
var getTasks = require('./routes/getTasks');


app.use(bodyParser.urlencoded({expanded: true}));

app.set('port', process.env.PORT || 5000);

app.use('/postTask', postTask);
app.use('/getTasks', getTasks);

app.get('/*', function(req, res) {
    console.log("Here is the request: " , req.params);
    var file = req.params[0] || '/views/index.html';
    res.sendFile(path.join(__dirname, '../public/', file));
});

app.listen(app.get('port'), function() {
    console.log('Server is ready on port  ' + app.get('port'));
});