	function modePoint() { 
		mode = 'point'; 
		$('#menu').empty();
		$('#menu').append(pointPoser);
	}
	function modePoly() { 
		mode = 'poly';
		$('#menu').empty();
		$('#menu').append(polyPoser); 
	}
	var mode = 'rien';
	var mark = L.icon({
		iconUrl: 'img/marker.png',
		iconSize: [50,50],
		iconAnchor: [25,50]
	});
	var markBus = L.icon({
		iconUrl: 'img/marker_bus.png',
		iconSize: [50,50],
		iconAnchor: [25,50],
		popupAnchor: [0,-50]
	});
	var id = 0;
	var newPoint = [];
	var newPoly = [];
	var colorTerm = 'rgb(108,93,83)';


