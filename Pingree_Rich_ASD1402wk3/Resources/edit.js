var selections = {
	title: "Edit or Delete Entry?",
	options: ["Edit", "Cancel", "Delete"],
	cancel: 1,
	selectedIndex: 1,
	destructive: 2,
	
};

//edit window
editWin = Ti.UI.createWindow({
	title: "Edit or Delete.",
	backgroundColor: 'blue',
	layout: 'vertical'
});

var editFirstName = Ti.UI.createTextField({
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	color: "#336699",
	height: 30,
	width: 250,
	top: 60,
});

var editLastName = Ti.UI.createTextField({
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	color: "#336699",
	height: 30,
	width: 250,
});

var editYear = Ti.UI.createTextField({
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	color: "336699",
	height: 30,
	width: 250,
});

var saveButton = Ti.UI.createButton({
	title: "Save",
	backgroundColor: "green",
	color: "black",
	borderRadius: 5,
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

editWin.add(editFirstName, editLastName, editYear, saveButton, cancelButton);

table.addEventListener('click', function(e){
	var id = e.rowData.id;
	
	var currentEntryRow = db.execute('SELECT * FROM names WHERE ID=?', id);
	
	var rowEntryData = {};
		rowEntryData.id = currentEntryRow.fieldByName('id');
		rowEntryData.first = currentEntryRow.fieldByName('firstName');
		rowEntryData.last = currentEntryRow.fieldByName('lastName');
		rowEntryData.year = currentEntryRow.fieldByName('birthYear');
		
	var options = Ti.UI.createOptionDialog(selections);
	
	options.addEventListener('click', function(e){
		if(e.index === 0) {
			
			editFirstName.value = rowEntryData.first;
			editLastName.value = rowEntryData.last;
			editYear.value = rowEntryData.year;
			
			editWin.open();
			
			var editSave = function() {
				if (editFirstName.value == '' && editLastName.value == '' && editYear.value == ''){
					alert("First Name, Last Name, and Birth Year are rquired.");
				} else if (editFirstName.value == ''){
					alert("First Name is required.");
				} else if (editLastName.value == ''){
					alert("Last Name is required.");
				}else if (editYear.value == '' || editYear.value.length > 4){
					alert("Birth Year is required or is invalid. Format: xxxx.");
				}else {
					var userInput = {};
						userInput.firstName = editFirstName.value;
						userInput.lastName = editLastName.value;
						userInput.birthYear = editYear.value;
					
				//Clear
				editFirstName.value = '';
				editLastName.value ='';
				editYear.value ='';
			
				//keyboard
				editFirstName.blur;
				editLastName.blur;
				editYear.blur;
					
				db.execute("UPDATE names SET firstName=?, lastName=?, birthYear=? WHERE id=?", userInput.firstName, userInput.lastName, userInput.birthYear,id);
			
				data = getRowData();
				table.setData(data);
				
				saveButton.removeEventListener('click', editSave);
				editWin.close();
				alert('Row updated!');
				}
				
			};
			saveButton.addEventListener('click', editSave);
			
			var cancelEdit = function(){
				cancelButton.removeEventListener('click', cancelEdit);
				editWin.close();
			};
			cancelButton.addEventListener('click', cancelEdit);
			
			editWin.open();
		}else if (e.index === 2){
			db.execute('DELETE FROM names WHERE id=?', id);
			
			data = getRowData();
			table.setData(data);
			
			alert('Entry has been deleted.');
		}
	}) ;
	options.show();
});