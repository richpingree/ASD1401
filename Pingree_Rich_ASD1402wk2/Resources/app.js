var table = Ti.UI.createTableView({ 	
});

var mainWin = Ti.UI.createWindow({
	title: "api.reddit.com",
	backgroundColor: "Blue",
	modal: true
	
});
var navWin = Ti.UI.iOS.createNavigationWindow({
	window: mainWin
	
});

var remoteEvent = require('event');
mainWin.add(table);
navWin.open();
