/**
 * @author Richard Pingree
 */
var selections = {
	title: "Edit or Delete Entry?",
	options: ["Cancel", "Delete"],
	cancel: 0,
	selectedIndex: 0,
	destructive: 1,
	
};

//edit window
editWin = Ti.UI.createWindow({
	title: "Delete Entry.",
});

var cancelButton = Ti.UI.createButton({
	title: "Cancel",
	backgroundColor: 'red',
	color: "black",
	borderRadius: 5,
	bottom: 20,
	height: 30,
	width: 250
});

editWin.add(cancelButton);

table.addEventListener('click', function(e){
	var id = e.rowData.id;
	
	var currentEntryRow = db.execute('SELECT * FROM names WHERE ID=?', id);
	
	var rowEntryData = {};
		rowEntryData.id = currentEntryRow.fieldByName('id');
		rowEntryData.author = currentEntryRow.fieldByName('author');
		rowEntryData.title = currentEntryRow.fieldByName('title');
		rowEntryData.score = currentEntryRow.fieldByName('score');
		
	var options = Ti.UI.createOptionDialog(selections);
	
	options.addEventListener('click', function(e){
		if(e.index === 0) {
			
			e.source.title = rowEntryData.author;
			e.source.state = rowEntryData.title;
			e.source.score= rowEntryData.score;
			
			editWin.open();
			
			
			var cancelEdit = function(){
				cancelButton.removeEventListener('click', cancelEdit);
				editWin.close();
			};
			cancelButton.addEventListener('click', cancelEdit);
			
			editWin.open();
		}else if (e.index === 1){
			db.execute('DELETE FROM remotedb WHERE id=?', id);
			
			data = getRowData();
			table.setData(data);
			
			alert('Entry has been deleted.');
		}
	}) ;
	options.show();
});