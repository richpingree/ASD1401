// Open SQLite, create one if not exist
var db = Titanium.Database.open("names");
db.excute('CREATE TABLE IF NOT EXISTS names (id INTEGER PRIMARY KEY, firstName TEXT, lastName TEXT)');

var data = getRowData();

var table = Ti.UI.createTableView({
	data:data,
	top: 50
});
