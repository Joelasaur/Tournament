class Tournament {
	//teamCount is an int
	//teamNames is an array of strings
	constructor(teamCount, teamNames) {
		this.teamCount = teamCount;
		this.teamNames = teamNames;
		this.gameResults = [];
	}
	// Adapted this method from stackoverflow: 
	// https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript/966938#966938
	initResults(length) {
		var arr = new Array(length || 0),
			i = length;
		arr.fill(0);

		if (arguments.length > 1) {
			var args = Array.prototype.slice.call(arguments, 1);
			while(i--) {
				arr[length - 1 - i] = this.initResults.apply(this, args);
			}
		}
		this.gameResults = arr;
		return arr;
	}

	setGameResults(results) {
		this.gameResults = results;
	}

	gridDimensions() {
		return [this.gameResults.length, this.gameResults[0].length]
	}

	toggleResultsAt(row, column) {
		if (row == column) {
			this.gameResults[row][column] = -1;
			return;
		}
		else if (this.gameResults[row][column] == 3){
			this.gameResults[row][column] = 0;
			return;
		}
		this.gameResults[row][column]++;
	}

	sortResults(results) {
		//Associate each result value with the proper team name
		var resultsByTeamName = {};
		for (var i = 0; i < results.length; i++) {
			resultsByTeamName[results[i]] = this.teamNames[i]
		}

		//Now sort and return the new team name list
		results.sort(function(a, b) {
			return b - a; //Descending order
		});
		console.log(results);
		var sortedNames = [];
		for (var i = 0; i < results.length; i++) {
			sortedNames.push(resultsByTeamName[results[i]]);
		}
		return sortedNames;

	}

	getWinOrder() {
		var results = new Array(this.teamCount).fill(0); //index matches this.teamNames
		for (var i = 0; i < this.gameResults.length; i++) {
			for (var j = 0; j < this.gameResults[i].length; j++) {
				if (this.gameResults[i][j] == 1) { //win
					results[i]++;
				}
				else if (this.gameResults[i][j] == 3) { //draw
					results[i] += 0.5;
				}
			}
		}
		return this.sortResults(results);
	}
}
module.exports = Tournament;
