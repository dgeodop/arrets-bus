
var dataDir = '/home/anders/Desktop/nodqlite_test/data';

//nosqlite
var nosqlite = require('nosqlite');
var connection = new(nosqlite.Connection)(dataDir);
var db = connection.database('bd');
db.exists(function(exists) {
	if(!exists) { db.createSync(); console.log('La BD a été créée') } 
	else { console.log('BD existe'); }
});

db.put('1', {age: 35}, function(err) {
	if(err) { console.log(err); }
	db.get('1', function(err, obj) {
		if(err) { console.log(err); }
		console.log(obj)
	})
});



