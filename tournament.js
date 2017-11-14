class Tournament {
	constructor(teamCount, teamNames) {
		this.teamCount = teamCount;
		this.teamNames = teamNames;
		this.gameResults = this.initResults(teamCount, teamCount);
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
		return arr;
	}

	gridDimensions() {
		return [this.gameResults.length, this.gameResults[0].length]
	}

	toggleResultsAt(row, column) {
		row--;
		column--;
		if (row == column) {
			this.gameResults[row][column] = -1;
			return;
		}
		else if (this.gameResults[row][column] == 3){
			this.gameResults[row][column] = 0;
		}
		this.gameResults[row][column]++;
	}
}
module.exports = Tournament;
