
var dataDir = '/home/anders/Desktop/nodqlite_test/data';

//nosqlite
var nosqlite = require('nosqlite');
var connection = new(nosqlite.Connection)(dataDir);
var db = connection.database('bd');
db.exists(function(exists) {
	if(!exists) { db.createSync(); console.log('La BD a été créée') } 
	else { console.log('BD existe'); }
});

db.put('142314749645952', {age: 35}, function(err,obj){
	db.get('142314749645952', function(err,obj){
		console.log(obj)
	});
});

