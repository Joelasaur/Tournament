//This updateTeamList function is passed to the $.post() call below. The array that
//we sent back from our server gets passed into the parameter (teamNameArray)

var teamList = [];
var gameData = [];

function updateTeamList(teamNameArray) {
	$("#teamList").html(""); //clear out all HTML inside this element.
	for(var i = 0; i < teamNameArray.length; i++) {
		$("#teamList").append("<li>"+teamNameArray[i]+"</li>");
	}
	teamList = teamNameArray;
}

// Adapted this method from stackoverflow:
// https://stackoverflow.com/questions/7897311/create-an-html-table-with-clickable-columns
function updateTable(gameDataArray) {
	$("#gameTable tr").each(function(r) {
		var row = r;
		$("td", this).each(function(cell) {
			$(this)
				.data("gameState", gameDataArray[row][cell])
				.data("rowIndex", row)
				.data("columnIndex", cell);
		});
	});
}

// Adapted this method from github:
// https://gist.github.com/jineeshjohn/2044414
function createTable(size) {
	mytable = $('<table></table>').attr({ id: "gameTable" });
	for (var i = 0; i < size; i++) {
		// Append the row to the table
		var row = $('<tr></tr>').attr({ class: ["class1", "class2", "class3"].join(' ') }).appendTo(mytable);
		for (var j = 0; j < size; j++) {
			// Append the cell (td) to the row
			$('<td></td>').text("Unplayed").appendTo(row);
		}
		 		 
	}
	return mytable;
}

function runTournament() {
	$("#submitName").click(function() {
		// $.post(URL, JSObject to send to server, callback(dataBackFromServer))
		var name = $("#teamNameInput").val();
		console.log(name);
		$.post("/addTeam", {teamNameInput: name}, updateTeamList);
	});

	$("#generateTournament").click(function() {
		var gameTable = createTable(teamList.length);
		$("#gameTable").replaceWith(gameTable);
		$.post("/initTournament", updateTable);
	});

	// This stackoverflow post was insanely helpful here. You must delegate from a parent to child element
	// after using the replaceWith() function.
	// https://stackoverflow.com/questions/15446093/why-jquery-selector-doesnt-work-for-newly-replaced-tag
	$("#tournament").on("click", "#gameTable tr td", function(event) {
		var gameCell = [$(this).data("rowIndex"), $(this).data("columnIndex")];
		console.log("Cell located at: " + gameCell + " has this state: " + $(this).data("gameState"));
		$.post("/toggleResultsAt", {cell: gameCell}, updateTable);
	})
}

$(runTournament);