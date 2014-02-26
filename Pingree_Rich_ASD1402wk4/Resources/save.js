/**
 * @author Richard Pingree
 */

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

table.addEventListener('click', function(){
	var saveOpts = Ti.UI.createOptionDialog(saveOptions);
	saveWin.open();
	
	
	var saveFav = function(){
		var favData = {};
			favData.author = theRow.title.value;
			favData.title =  theRow.state.value;
			favData.score = theRow.score.value;

		db.execute('INSERT INTO remotedb (author, title, score) VALUES (?,?,?)', favData.author, favData.title, favData.score);
	
		data = getRowData();
		table1.setData(data);
		
		saveButton.removeEventListener('click', saveFav);
		saveWin.close();
	};
	saveButton.addEventListener('click',saveFav);
	
	var cancelFav = function(){
		cancelButton.removeEventlistener('click', cancelFav);
		editWin.close();
	};		 
	cancelButton.addEventListener('click', cancelFav);
});


