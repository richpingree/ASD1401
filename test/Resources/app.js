//this sets the background color of the master UIView (when there is no window/tabs groups on it)
Ti.UI.setBackgroundColor('#000');

//require('test');

//Open SQLite, if does not exist, create one.
var db = Ti.Database.open('users');
//db.execute('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, user TEXT)');

db.execute('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, fname TEXT, lname TEXT)');

var data = getRowData();

var tableView = Ti.UI.createTableView({
	data:data,
	editable:false,
	top:50
});

// create tab group
var tabGroup = Ti.UI.createTabGroup();

//
//create base UI tab and root window
//
var win1 = Ti.UI.createWindow({
	title: 'Form',
	backgroundColor: '#fff'
});

var tab1 = Ti.UI.createTab({
	icon: 'KS_nav_views_png',
	title: 'Form',
	window:win1
});

//create input fields for form
var fnameField = Ti.UI.createTextField({
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	color: '#336699',
	top: 10, left: 10,
	width: 450, height: 60,
	hintText: "First Name"
});

var lnameField = Ti.UI.createTextField({
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	color: '#336699',
	top: 70, left: 10,
	width: 450, height: 60,
	hintText: "Last Name"	
});

var submitBtn = Ti.UI.createButton({
	top: 140, left: 10,
	width: 450, height: 50,
	title: "Submit"
});

//Click Event for submit button
submitBtn.addEventListener('click', function(e){
	
	//make sure required fields are entered, else error.
	//this should be a function.
	if (lnameField.value == '' && fnameField.value){
		alert('First Name and Last Name are required field.');
	}else if (lnameField.value == ''){
		alert('Last Name is a required field.');
	}else if (fnameField.value == ''){
		alert('First Name is a required field.');
	}else {
		var userInput = {};
			userInput.first_name = fnameField.value;
			userInput.last_name = lnameField.value;
		
		//Clear input fields upon success
		fnameField.value = '';
		lnameField.value = '';
		
		//Drop keyboard
		fnameField.blur();
		lnameField.blur();
		
		//var saveData = escape(JSON.stringify(userInput));
		
		//Set that data, and sanitize with parameterization.
		//db.execute('INSERT INTO names (fname, lname) VALUES (?,?)', userInput.first_name, userInput.last_name);
		db.execute('INSERT INTO users (fname, lname) VALUES(?,?)', userInput.first_name, userInput.last_name);
		//db.execute('INSERT INTO users (user) VALUES(?)', saveData);
		
		data = getRowData();
		tableView.setData(data);
		
		//Let the user know it has saved
		alert(userInput.first_name + " " + userInput.last_name + 'has been saved.');
	}
});

//edit window
var editWindow = Ti.UI.createWindow({
	title: 'this is a test',
	backgroundColor: "#fff",
	layout: 'vertical'
});

var editfname = Ti.UI.createTextField({
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	color: "#336699",
	width: 250, height: 60,
	top: 30,
	hintText: "First Name"
});

var editlname = Ti.UI.createTextField({
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	color: "#336699",
	width: 250, height: 60,
	hintText: "Last Name"
});

var saveButton = Ti.UI.createButton({
	title: "Save",
	height: 50, width: 250
});

var cancelButton = Ti.UI.createButton({
	title: "Cancel",
	height: 50, width: 350
});

editWindow.add(editfname, editlname, saveButton, cancelButton);

win1.add(fnameField, lnameField, submitBtn);

//
// create controls tab and root window
//
var win2 = Ti.UI.createWindow({
	title:'Data',
	backgroundColor: "#fff",
	layout: 'vertical'
});
var tab2 = Ti.UI.createTab({
	icon: 'KS_nav_ui.png',
	title: "Data",
	window:win2
});

function getRowData(){
	var newdata = [];
	//Loop through data for window 2
	var rows = db.execute("SELECT * FROM users");
	while (rows.isValidRow()) {
		var parseData = unescape(rows.fieldByName('user'));
		var displayData = JSON.parse(parseData);
	
		//Add table row
		//Store the fields directly to the rowData
		newdata.push({
			title: displayData.first_name + " " + displayData.last_name,
			first_name: displayData.first_name,
			last_name: displayData.last_name,
			id: rows.fieldByName('id')
		});
		rows.next();
	}	
	return newdata;
};

//create options dialog box
var opts = {
	cancel: 2,
	options: ['Edit', 'Delete', 'Cancel'],
	selectedIndex: 2,
	destructive: 1,
	title: 'Delete File?'	
};

//click event for options dialog
tableView.addEventListener('click', function(e){
	
	//grab rowData stored in the row
	var id = e.rowData.id;
	var fname = e.rowData.first_name;
	var lname = e.rowData.last_name;
	
	//add dialogue options
	var dialog = Ti.UI.createOptionDialog(opts);
	
	//listen for each option in the option dialog
	dialog.addEventListener('click', function(e){
		if(e.index === 0){
			//edit
			
			//populate that into the fields
			editfname.value = fname;
			editlname.value = lname;
			
			editWindow.open();
			
			var saveMagic = function() {
				//this should be a funciton
				if(editfname.value == '' && editlname.value == ''){
					alert("First Name and Last Name are required fields.");
				}else if (editlname.value == ''){
					alert("Last Name is a required field.");
				}else if (editfname.value == ''){
					alert("First Name is a required field.");
				}else {
					var userInput = {};
						userInput.first_name = editfname.value;
						userInput.last_name = editlname.value;
						
					//clear input fields upon success
					editfname.value = '';
					editlname.value = '';
					
					//drop keyboard
					editfname.blur();
					editlname.blur();	
					
					var saveData = escape(JSON.stringify(userInput));
					
					//set that data, and sanitize with parameteriaztion
					
					db.execute("UPDATE users SET user=? WHERE id=?",saveData,id);
					
					//update into db
					
					data = getRowData();
					tableView.setData(data);
					
					//remove event listener
					saveButton.removeEventListener('click', saveMagic);
					editWindow.close();
					alert("Row updated!");
				}
			};
			saveButton.addEventListener('click', saveMagic);
			
			var cancelMagic = function(){
				//remove event listener
				cancelButton.removeEventListener('click', cancelMagic);
				editWindow.close();
			};
			cancelButton.addEventListener('click', cancelMagic);
			
			editWindow.open();	
		}else if(e.index ===1){
			//delete
			db.execute('DELETE FROM users WHERE id=?', id);
				
			data = getRowData();
			tableView.setData(data);
				
			alert('Row deleted');
		};
	});
	dialog.show();
		
});	

win2.add(tableView);

//
// add tabs
//
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
//open tab group
tabGroup.open();