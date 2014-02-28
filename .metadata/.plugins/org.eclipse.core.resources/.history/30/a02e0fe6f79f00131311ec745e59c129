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

var sections = [];

var remoteResponse = function(){
	//Ti.API.debug(this.responseText);
	
	var json = JSON.parse(this.responseText);
	
//console test for success	
	// var testTitle = json.data.children[0].data.title;
	// var testAuthor = json.data.children[0].data.author;
	// var testScore = json.data.children[0].data.score;
	
//creates table sections and rows
	var tableSecs = Ti.UI.createTableViewSection({
		
	});
	
	for(var i = 0; i<json.data.children.length; i++){
		var theRow = Ti.UI.createTableViewRow({
			title: json.data.children[i].data.author,
			state: json.data.children[i].data.title,
			score: json.data.children[i].data.score,
			//hasChild: true
		});
		tableSecs.add(theRow);
		
	};
	sections.push(tableSecs);
	table.setData(sections);


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
	
//console calls for test
	// Ti.API.debug(testTitle);
	// Ti.API.debug(testAuthor);
	// Ti.API.debug(testScore);
};
console.log(remoteResponse);
var remoteError = function(e){
	Ti.API.debug("Status: " + this.status);
	Ti.API.debug("Text: " + this.responseText);
	Ti.API.debug("Error: " + e.error);
	
	
};
var xhr = Ti.Network.createHTTPClient({

	onload: remoteResponse,
	onerror: remoteError,
	timeout: 5000 
});

xhr.open('GET', "http://api.reddit.com/");

xhr.send();

exports.remote = xhr;
