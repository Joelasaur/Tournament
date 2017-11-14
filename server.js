var express = require("express");

var server = express();

var bodyParser = require("body-parser");

server.use(express.static("pub")); //static files served up (like index.html)
server.use(bodyParser.urlencoded({extended: false})); //we can use req.body

var Tournament = require("./tournament.js");
