function dessin(id) {
	window.dbId = id;
	$('#main').empty();
	$('#main').append('<div id="map" style="height: 200px"></div>');
	window.map = L.map('map').setView([46.51,6.63], 13);

	window.dataPoint = [];
	window.dataPoly = [];
	$.getJSON('/get/' + dbId, function(json) { 
			if(json.points.length >= 1) { 
				dataPoint = json.points; 
				for(i=0;i<dataPoint.length;i++) {
					L.marker([dataPoint[i].lat,dataPoint[i].lng], {
						icon: markBus
					}).addTo(map).bindPopup(dataPoint[i].nom);
				}
			} else { dataPoint = []; }
			if(json.polygones.length >= 1) { 
				for(i=0;i<json.polygones.length;i++) { 
					var nom = json.polygones[i].nom;
					var temp = {};
					temp.nom = nom;
					temp.geom = [];
					for(j=0;j<json.polygones[i].geom.length;j++) {
						temp.geom.push([+json.polygones[i].geom[j][0],+json.polygones[i].geom[j][1]])
					}
					dataPoly.push(temp);
					L.polygon(dataPoly[i].geom, { 
						color: colorTerm, 
						fillColor: colorTerm
					}).addTo(map).bindPopup(dataPoly[i].nom);
				}
			} else { dataPoly = []; }
	});

	map.on('click', function(e) { console.log('click')
		var lat = e.latlng.lat;
		var lng = e.latlng.lng;
		if(mode == 'point') {
			mode = 'rien';
			newPoint = [lat,lng];
			L.marker([lat,lng], {icon: mark}).addTo(map);
			$('#menu').empty();
			$('#menu').append(pointForm);
		}
		if(mode == 'poly') {
			newPoly.push([lat,lng]);
			$('#menu').empty();
			if(newPoly.length == 1) { 
				L.circle([lat,lng], 20).addTo(map);
			}
			if(newPoly.length == 2) { 
				L.polyline(newPoly).addTo(map);
			}
			if(newPoly.length == 3) {
				var polygone = L.polygon(newPoly).addTo(map);
				$('#menu').append(polyForm);
			}
			if(newPoly.length >= 4) {
				$('svg.leaflet-zoom-animated').empty();
				var polygone = L.polygon(newPoly).addTo(map);
				$('#menu').append(polyForm);
			}
		}
	});

	$('#main').append('<div id="menu">' +
		'<button onclick="modePoint()">Points</button>' +
		'<button onclick="modePoly()">Polygones</button>' +
		'</div>');

}
