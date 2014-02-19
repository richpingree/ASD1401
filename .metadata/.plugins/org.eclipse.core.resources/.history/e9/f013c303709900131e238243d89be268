function getRowData(){
	var newData = [];
	
	var rows = db.execute("SELECT * FROM names");
	while (rows.isValidRow()) {
		var id, fname, lname;
		
		id = rows.fieldByName('id');
		fname = row.fieldByName('firstname');
		lname = row.fieldByName('lastname');
		
		newData.push({
			title: fname + " " + lname,
			id:id
		});
		rows.next();
	}
	return newData;
};

var data = getRowData();
table.setData(data);
exports.database = db;