var assert = require("assert");
var Tournament = require("./tournament.js")

var SIZE = 4;
var NAMES = ["team0", "team1", "team2", "team3"];

describe('Tournament', function() {
	var RoundRobin;
	var gameResults;

	beforeEach(function buildTournament() {
		RoundRobin = new Tournament(SIZE, NAMES);
		RoundRobin.initResults(SIZE, SIZE);
		console.log(RoundRobin.gameResults);
	});

	describe('#initResults', function() {
		it("should initialize the results array to be 0.", function() {
			var expected = 0;
			var results = RoundRobin.gameResults[0][3];
  			assert.equal(expected, results);
		});
	});

	describe('#getGridDimensions', function() {
		it("should be a square grid of [SIZE, SIZE] dimensions.", function() {
			var expected = 4;
			var results = RoundRobin.gridDimensions();
  			assert.equal(expected, results[0]);
  			assert.equal(expected, results[1]);
		});
	});

	describe('#toggleResultsAt', function() {
		it("should cycle a single coordinate's value from 0 through 3, representing each game outcome.", function() {
			var expected = 1;
			RoundRobin.toggleResultsAt(1, 0); //Row 2 vs. Column 1
			var results =  RoundRobin.gameResults[1][0];
			assert.equal(expected, results);
		});
	});

	describe('#toggleResultsAt', function() {
		it("should return -1 for mirror matches.", function() {
			var expected = -1;
			RoundRobin.toggleResultsAt(2, 2); //Row 3 vs. Column 3 makes no sense
			var results = RoundRobin.gameResults[2][2];
			assert.equal(expected, results);
		});
	});
});

