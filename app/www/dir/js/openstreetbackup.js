var coolPlaces = new L.LayerGroup();
    L.marker([-41.29042, 174.78219])
        .bindPopup('Te Papa').addTo(coolPlaces),
    L.marker([-41.29437, 174.78405])
        .bindPopup('Embassy Theatre').addTo(coolPlaces),
    L.marker([-41.2895, 174.77803])
        .bindPopup('Michael Fowler Centre').addTo(coolPlaces),
    L.marker([-41.28313, 174.77736])
        .bindPopup('Leuven Belgin Beer Cafe').addTo(coolPlaces),
    L.polyline([
        [-41.28313, 174.77736],
        [-41.2895, 174.77803],
        [-41.29042, 174.78219],
        [-41.29437, 174.78405]
        ]
        ).addTo(coolPlaces);
    var osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>',
        thunLink = '<a href="http://thunderforest.com/">Thunderforest</a>';
    
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        osmAttrib = '&copy; ' + osmLink + ' Contributors',
        landUrl = 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png',
        thunAttrib = '&copy; '+osmLink+' Contributors & '+thunLink;
    var osmMap = L.tileLayer(osmUrl, {attribution: osmAttrib}),
        landMap = L.tileLayer(landUrl, {attribution: thunAttrib});
    var map = L.map('map', {
		    layers: [osmMap] // only add one!
	    })
	    .setView([-41.2858, 174.78682], 14);
	var baseLayers = {
		"OSM Mapnik": osmMap,
		"Landscape": landMap
	};
	var overlays = {
		"Interesting places": coolPlaces
	};
	L.control.layers(baseLayers,overlays).addTo(map);