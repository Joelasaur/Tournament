var express = require("express");

var server = express();

var bodyParser = require("body-parser");

server.use(express.static("pub")); //static files served up (like index.html)
server.use(bodyParser.urlencoded({extended: true})); //we can use req.body

var Tournament = require("./tournament.js");
var teamNames = [];
var RoundRobin;

server.use("/addTeam", function(req, res) {
	res.setHeader("Content-Type", "application/json");
	teamNames.push(req.body.teamNameInput);
	res.write(JSON.stringify(teamNames)); //send back the whole array to the client
	res.end();
});

server.use("/initTournament", function(req, res) {
	res.setHeader("Content-Type", "application/json");
	RoundRobin = new Tournament(teamNames.length, teamNames);
	RoundRobin.initResults(teamNames.length, teamNames.length);
	console.log(RoundRobin);
	res.write(JSON.stringify(RoundRobin.gameResults));
	res.end();
});

server.use("/toggleResultsAt", function(req, res) {
	res.setHeader("Content-Type", "application/json");
	var row = req.body.tablecell[0];
	var column = req.body.tablecell[1];
	RoundRobin.toggleResultsAt(row, column);
	res.write(JSON.stringify(RoundRobin.gameResults));
	res.end();
});

server.use("/getWinOrder", function(req, res) {
	res.setHeader("Content-Type", "application/json");
	var winOrder = RoundRobin.getWinOrder();
	res.write(JSON.stringify(winOrder));
	res.end();
});

server.listen(80, function() {
	console.log("Server is running...");
});
