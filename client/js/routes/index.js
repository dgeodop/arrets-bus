function index() {
	$('#main').empty();
	$('#main').append('<h1>Index</h1>' +
		'<div class="row">' +
		'<div id="info" class="col-md-12"></div>' +
		'<div class="col-md-4">' +
		'<h3>Récupérer un projet existant</h3>' +
		'<input id="dbId" class="form-control col-md-12" type="number" placeholder="ID du projet">' +
		'<button id="projetRecup" class="btn btn-primary col-md-12">OK</button>' +
		'</div><div class="col-md-4 col-md-offset-1">' +
		'<h3>Démarrer un nouveau projet</h3>' +
		'<button id="projetNouveau" class="btn btn-primary col-md-12">Nouveau</button>' +
		'</div</div>');
	$('#projetRecup').on('click', function() {
		var id = $('#dbId').val();
		$.post('/exist/' + id, function(resp) {
			if(resp != 'oui') {
				$('#info').empty();
				$('#info').append('<p class="rouge">Ce projet n existe pas. Avez-vous entré le bon identifiant?</p>');
			} else {
				window.location.hash = 'dessin/' + id;
			}
		});
	});
	$('#projetNouveau').on('click', function() {
		var id = noUnik();
		$.post('create/' + id, function(resp) {
			if(resp != 'ok') { 
				$('#info').empty();
				$('#info').append('<p class="rouge">Le serveur ne répond pas veuillez réessayer plus tard</p>');
			}
			else {
				window.location.hash = 'dessin/' + id;
			}
		})
	});
}
