var assert = require("assert");
var Tournament = require("./tournament.js")

describe('Tournament', function() {
	describe('#initResults', function() {
		it('should initialize the results array to be -1 on the diagonal, and 0 otherwise', function() {
			var RoundRobin = new Tournament(3); 
			RoundRobin.initResults();
			var expected = -1;
			var results = RoundRobin.gameResults[1][1];
  			assert.equal(expected, results);
		});
	});
});

