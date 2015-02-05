var port = 3001;
var dataDir = '/home/anders/Desktop/nodqlite_test/data';
//express
var express = require('express');
var app = express();
//bodyparser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//client
app.use('/lib', express.static(__dirname + '/client/bower_components'));
app.use('/js', express.static(__dirname + '/client/js'));
app.use('/img', express.static(__dirname + '/client/img'));
app.get('/', function(req, res){
	res.sendFile(__dirname + '/client/index.html');
});

//nosqlite
var nosqlite = require('nosqlite');
var connection = new(nosqlite.Connection)(dataDir);
var db = connection.database('bd');
db.exists(function(exists) {
	if(!exists) { 
		db.create(function(err) { 
			if(err) {console.log(err);}
			console.log('BD crée');
		})	
	} 
	else { console.log('BD existe'); }
});

//REST
app.post('/exist/:id', function(req,res) {
	var id = req.params.id;
	db.get(req.params.id, function(err,obj) {
		if(err) { res.send('non')} 
		else { res.send('oui') }
	});
});
app.post('/create/:id', function(req,res) {
	var id = req.params.id;
	var obj = { id: id };
	db.post(obj, function(err, id) {
		if(err) {console.log(err); res.send('non')}
		res.send('ok')
	});
});
app.post('/put/:id', function(req,res) {
	var id = req.params.id;
	var data = req.body;
	db.put(id, data, function(err) {
		if(err) { console.log(err) }
		else {
			db.get(id, function(err,obj) {
				if(err) { console.log(err) }
				else { res.send(obj) }
			});		
		}
	});
});
app.get('/get/:id', function(req,res) {
	var id = req.params.id;
	db.get(id, function(err,obj) {
		if(err) { console.log(err); }
		else { res.send(obj) }
	})
});


app.listen(port, function() { console.log('listening on port ' + port + '...')});
