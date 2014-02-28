/**
 * @author Richard Pingree
 */
var remoteData = require('remote');
var newWin = Ti.UI.createWindow({
	backgroundColor: "blue",
});
var event = table.addEventListener("click", function(e){
		
	var remoteData = Ti.UI.createLabel({
		top: 50,
		height: 50,
		font: {fontSize: 15, FontFamily: "Times New Roman"},
		backgroundColor: "gray",
		text: "Author: " + e.source.title,
		textalign: "center",
		width: "auto"
	});
	var remoteData1 = Ti.UI.createLabel({
		top: 100,
		height: 100,
		font: {fontSize: 15, FontFamily: "Times New Roman"},
		backgroundColor: "white",
		text: "Title: " + e.source.state, 
		textalign: "center",
		width: "auto"
	});
	var remoteData2 = Ti.UI.createLabel({
		font: {fontSize: 15, FontFamily: "Times New Roman"},
		backgroundColor: "gray",
		text: "Score: " + e.source.score,
		textalign: "center",
		width: "auto",
		top: (remoteData1.height + remoteData1.top) + 10
		
	});
	newWin.add(remoteData, remoteData1, remoteData2);
	newWin.open();
});	

//exports.event = event;
var saveOptions = {
	title: "Save or Cancel",
	options: ["Save", "Cancel"],
	cancel: 1,
	selectedIndex: 0
};

var saveWin = Ti.UI.createWindow({
	title: "Save to Favorites",
	backgroundColor: "blue",
	layout: 'vertical'
}); 

var saveButton = Ti.UI.createButton({
	title: "Save",
	backgroundColor: "green",
	color: "black",
	borderRadius: 5,
	top: 200,
	height: 30,
	width: 250,
});

var cancelButton = Ti.UI.createButton({
	title: "Cancel",
	backgroundColor: 'red',
	color: "black",
	borderRadius: 5,
	height: 30,
	width: 250
});

saveWin.add(saveButton, cancelButton);

newWin.addEventListener('click', function(e){
	var db = Ti.Database.open("remotedb");
	db.execute('INSERT INTO remotedb(id, author, title, score) VALUES(?,?,?)', json.data.children[e.index].data.author, json.data.children[e.index].data.title, json.data.children[e.index].data.score);
	db.close();
	createRows();
});
