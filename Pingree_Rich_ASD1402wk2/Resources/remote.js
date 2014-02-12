/**
 * @author Richard Pingree
 */
var sections = [];

var remoteResponse = function(){
	Ti.API.debug(this.responseText);
	
	var json = JSON.parse(this.responseText);
	// var testTitle = json.data.children[0].data.title;
	// var testAuthor = json.data.children[0].data.author;
	// var testScore = json.data.children[0].data.score;
	var tableSecs = Ti.UI.createTableViewSection({
		
	});
	
	for(var i = 0; i<10; i++){
		var theRow = Ti.UI.createTableViewRow({
			title: json.data.children[i].data.author,
			state: json.data.children[i].data.title,
			score: json.data.children[i].data.score,
			hasChild: true
		});
		tableSecs.add(theRow);
	};
	sections.push(tableSecs);
	table.setData(sections);
	// Ti.API.debug(testTitle);
	// Ti.API.debug(testAuthor);
	// Ti.API.debug(testScore);
};

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
