var myData = require('data');

//Main Window
var mainWin = Ti.UI.createWindow({
	backgroundColor: "#0202CF"
});

//Container for data
var viewContainer = Ti.UI.createScrollView({
	showVerticalScaleIndicator: true,
	layout: "vertical"
	
});

//Array loop that creates views and labels
function objectViews() {
	for (i=0; i<myData.data.length; i++){
		var announceView = Ti.UI.createView({
			backgroundColor: "#000",
			height: 100
		});
		
		var announceText = Ti.UI.createLabel({
			color: "#fff",
			text: myData.data[i].announce(),
			font: {fontSize: 15, fontFamily: "Times New Roman"},
			textalign: "center",
			width: "auto",
			top: 5
			
		});
		announceView.add(announceText);
		viewContainer.add(announceView);
		mainWin.add(viewContainer);
	};
	
};

objectViews();

mainWin.open();
