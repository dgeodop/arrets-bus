
	function pointSave() {
		id = id + 1;
		var lat = newPoint[0];
		var lng = newPoint[1];
		var nom = $('#pointNom').val();
		if(nom == '') {
			$('#menu').append(pasPointNom);
		} else {
			$('div.leaflet-marker-pane').empty();
			dataPoint.push({id:id, nom:nom, lat:lat, lng:lng});
			$.post('/put/' + dbId, {points: dataPoint}, function(resp) {
				dataPoint = resp.points; console.log(dataPoint)
			});
			for(i=0;i<dataPoint.length;i++) {
				L.marker([dataPoint[i].lat,dataPoint[i].lng], {icon: markBus}).addTo(map).bindPopup(dataPoint[i].nom);
			}
			$('#menu').empty();
			$('#menu').append(btnPointPoly);
		}
	}
	function polySave() {
		mode = 'rien';
		id = id + 1;
		var geom = newPoly;
		var nom = $('#polyNom').val();
		if(nom == '') {
			$('#menu').append(pasPolyNom);
		} else {
			$('svg.leaflet-zoom-animated').empty();
			dataPoly.push({id:id,nom:nom,geom:geom})
			$.post('/put/' + dbId, { polygones: dataPoly}, function(resp) {
				dataPoly = resp.polygones; console.log(dataPoly)
			});
			newPoly = [];
			for(i=0;i<dataPoly.length;i++) {
				L.polygon(dataPoly[i].geom, { 
					color: colorTerm, 
					fillColor: colorTerm
				}).addTo(map).bindPopup(dataPoly[i].nom);
			}
			$('#menu').empty();
			$('#menu').append(btnPointPoly);
		}
	}
