// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Ti.UI.setBackgroundColor('#fff');

var remotedb = require('database');

// create tab group
var tabGroup = Ti.UI.createTabGroup();



// create tabs and windows
var win1 = Ti.UI.createWindow({  
    title:'Entry Form',
    backgroundColor:'blue'
});
var tab1 = Ti.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});

var textfield1 = Ti.UI.createTextField({
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	color: "#336699",
	height: 30,
	width: 125,
	top: 10,
	left: 10,
	hintText: "First Name"
});

var textfield2 = Ti.UI.createTextField({
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	color: "#336699",
	height: 30,
	width: 125,
	top: 10,
	right: 10,
	hintText: "Last Name"
});

var submitButton = Ti.UI.createButton({
	title: "Submit",
	backgroundColor: "green",
	color: "black",
	borderRadius: 5,
	height: 30,
	width: 125,
	top: (textfield1.top + textfield1.height) + 10
	
});
win1.add(textfield1, textfield2, submitButton);


// create controls tab and root window

var win2 = Ti.UI.createWindow({  
    title:'Database',
    backgroundColor:'#fff'
});
var tab2 = Ti.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});


win2.add();



//  add tabs

tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
