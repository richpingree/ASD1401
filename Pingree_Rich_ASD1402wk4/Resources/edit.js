/**
 * @author Richard Pingree
 */
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

var editAuthor = Ti.UI.createTextField({
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	color: "#336699",
	height: 30,
	width: 250,
	top: 60,
});

var editTitle = Ti.UI.createTextField({
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	color: "#336699",
	height: 30,
	width: 250,
});

var editScore = Ti.UI.createTextField({
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	color: "336699",
	height: 30,
	width: 250,
});

var editSaveButton = Ti.UI.createButton({
	title: "Save",
	backgroundColor: "green",
	color: "black",
	borderRadius: 5,
	height: 30,
	width: 250,
});

var editCancelButton = Ti.UI.createButton({
	title: "Cancel",
	backgroundColor: 'red',
	color: "black",
	borderRadius: 5,
	height: 30,
	width: 250
});

editWin.add(editAuthor, editScore, editScore, editSaveButton, editCancelButton);

table.addEventListener('click', function(e){
	var id = e.rowData.id;
	
	var currentEntryRow = db.execute('SELECT * FROM remotedb WHERE ID=?', id);
	
	var rowEntryData = {};
		rowEntryData.id = currentEntryRow.fieldByName('id');
		rowEntryData.author = currentEntryRow.fieldByName('author');
		rowEntryData.title = currentEntryRow.fieldByName('title');
		rowEntryData.score = currentEntryRow.fieldByName('score');
		
	var options = Ti.UI.createOptionDialog(selections);
	
	options.addEventListener('click', function(e){
		if(e.index === 0) {
			
			editAuthor.value = rowEntryData.author;
			editTitle.value = rowEntryData.title;
			editScore.value = rowEntryData.score;
			
			editWin.open();
			
			var saveFav = function(){
				var favData = {};
					favData.author = editAuthor.value;
					favData.title =  editTitle.value;
					favData.score = editScore.value;

					
				//Clear
				editAuthor.value = '';
				editTitle.value ='';
				editScore.value ='';
			
				//keyboard
				editAuthor.blur;
				editTitle.blur;
				editScore.blur;
					
				db.execute("UPDATE remotedb SET author=?, title=?, score=? WHERE id=?", favData.author, favData.title, favData.score.birthYear,id);
			
				data = getRowData();
				table.setData(data);
				
				editSaveButton.removeEventListener('click', editSave);
				editWin.close();
				alert('Entry updated!');
				
				
			};
			editSaveButton.addEventListener('click', editSave);
			
			var eidtCancelEdit = function(){
				editCancelButton.removeEventListener('click', cancelEdit);
				editWin.close();
			};
			cancelButton.addEventListener('click', cancelEdit);
			
			editWin.open();
		}else if (e.index === 2){
			db.execute('DELETE FROM remotedb WHERE id=?', id);
			
			data = getRowData();
			table.setData(data);
			
			alert('Entry has been deleted.');
		}
	}) ;
	options.show();
});