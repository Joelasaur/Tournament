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
		it("should change a cell's game state from 0 to 1", function() {
			var expected = 1;
			RoundRobin.toggleResultsAt(1, 0); //Row 2 vs. Column 1
			var results =  RoundRobin.gameResults[1][0];
			assert.equal(expected, results);
		});
	});

	describe('#toggleResultsAt', function() {
		it("should cycle a single coordinate's value from 0 through 3 and back to 0, representing each game outcome.", function() {
			//Row 2 vs. Column 1
			RoundRobin.toggleResultsAt(1, 0); //Should be 1
			RoundRobin.toggleResultsAt(1, 0); //Should be 2
			RoundRobin.toggleResultsAt(1, 0); //Should be 3
			RoundRobin.toggleResultsAt(1, 0); //Should be 0
			var expected = 0;
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

	describe('#sortResults', function() {
		it("should return a sorted array of team names by game results", function() {
			var expected = ["team3", "team1", "team0", "team2"];
			var input = [1, 1.5, 0.5, 3];
			var results = RoundRobin.sortResults(input);
			assert.deepEqual(expected, results);
		});
	});

	describe('#getWinOrder', function() {
		it("should return a String list in the order of most wins to least, indexed at 0 for the winner", function() {
			var expected = ["team3", "team1", "team0", "team2"];
			//Set up team3 with 3 wins
			RoundRobin.toggleResultsAt(3, 0); //win
			RoundRobin.toggleResultsAt(3, 1); //win
			RoundRobin.toggleResultsAt(3, 2); //win

			//Set up team1 with 1 win, 1 draw, 1 loss
			RoundRobin.toggleResultsAt(1, 0); //win
			RoundRobin.toggleResultsAt(1, 2);
			RoundRobin.toggleResultsAt(1, 2);
			RoundRobin.toggleResultsAt(1, 2); //draw
			RoundRobin.toggleResultsAt(1, 3);
			RoundRobin.toggleResultsAt(1, 3); //loss

			//Set up team0 with 1 win, 2 losses
			RoundRobin.toggleResultsAt(0, 2); //win
			RoundRobin.toggleResultsAt(0, 3);
			RoundRobin.toggleResultsAt(0, 3); //loss
			RoundRobin.toggleResultsAt(0, 1);
			RoundRobin.toggleResultsAt(0, 1); //loss

			//Set up team2 with 2 losses, 1 draw
			RoundRobin.toggleResultsAt(2, 0);
			RoundRobin.toggleResultsAt(2, 0); //loss
			RoundRobin.toggleResultsAt(2, 1);
			RoundRobin.toggleResultsAt(2, 1);
			RoundRobin.toggleResultsAt(2, 1); //draw
			RoundRobin.toggleResultsAt(2, 3);
			RoundRobin.toggleResultsAt(2, 3); //loss

			var results = RoundRobin.getWinOrder();
			assert.deepEqual(expected, results);
		});
	});
});

