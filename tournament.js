class Tournament {
	constructor(teamCount) {
		this.teamCount = teamCount;
		this.teamNames = [];
		this.gameResults = [[]];
	}
	// Adapted this method from stackoverflow: 
	// https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript/966938#966938
	initResults() {
		var arr = new Array(this.teamCount || 0),
		i = this.teamCount;

		if (arguments.length > 1) {
			var args = Array.prototype.slice.call(arguments, 1);
			while(i--) arr[this.teamCount - 1 - i] = createArray.apply(this, args);
		}

		this.gameResults = arr;
	}
}

module.exports = Tournament;