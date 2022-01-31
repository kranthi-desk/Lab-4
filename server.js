require('dotenv').config({path:__dirname + '/lab4.env'})
var express = require('express');
var path = require('path');
var matchesRouter = require('./routes/matches');
var app = express();

PGHOST = process.env.host
PGUSER = process.env.username
PGDATABASE = process.env.dbname
PGPASSWORD = process.env.password
PGPORT = process.env.port


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/matches', matchesRouter);



var server = app.listen(8033, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("cricinfo app listening at http://%s:%s", host, port)
})

module.exports = app;
