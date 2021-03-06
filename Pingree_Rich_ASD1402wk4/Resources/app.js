// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');



// Open SQLite, create one if not exist
var db = Ti.Database.open("remotedb");
db.execute('CREATE TABLE IF NOT EXISTS names (id INTEGER PRIMARY KEY, author TEXT, title TEXT, score INTEGER)');

data = getRowData();
//table
var table = Ti.UI.createTableView({
	
});

var table1 = Ti.UI.createTableView({
	data:data,
	top: 50
});


// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Remote Data',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});

require('remote');

win1.add(table);

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});
function getRowData(){
	var newData = [];
	
	var rows = db.execute("SELECT * FROM names");
	while (rows.isValidRow()) {
		var id, first, last, year;
		
		id = rows.fieldByName('id');
		author = rows.fieldByName('author');
		title = rows.fieldByName('title');
		score = rows.fieldByName('score');
		
		newData.push({
			title: author + " " + title + " " + score,
			id:id
		});
		rows.next();
	}
	return newData;
};

require("edit");

win2.add(table1);




//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
