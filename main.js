var osmTile = new ol.layer.Tile ({
    title: 'Open Street Map',
    visible: true,
    source: new ol.source.OSM()
});

//URL Geoserver
var url_geoserver = "http://localhost:8081/geoserver/wms";
//noms des couches
var name_layer_landuse = "formation_gs:gis_osm_landuse_a_free_1_gis";
var name_layer_roads = "formation_gs:gis_osm_roads_free_1_gis";
var name_layer_pois = "formation_gs:gis_osm_pois_free_1_gis";
var name_layer_places = "	formation_gs:gis_osm_places_free_1_gis";
var name_layer_adm1 = "formation_gs:civ_admbnda_adm1_cntig_ocha_itos_20180706";
var name_layer_adm2 = "formation_gs:civ_admbnda_adm2_cntig_ocha_itos_20180706";
var name_layer_adm3 = "formation_gs:civ_admbnda_adm3_cntig_ocha_itos_20180706";
var name_layer_raster = "formation_gs:Abidjan_HR_ext";

//déclaration des couches openlayers
var lyr_landuse = new ol.layer.Tile({
 source: new ol.source.TileWMS(({
 url: url_geoserver,
 params: {"LAYERS": name_layer_landuse, "TILED": "true"}
 })),
 title: "Occupation du sol"
});
var lyr_roads = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
    url: url_geoserver,
    params: {"LAYERS": name_layer_roads, "TILED": "true"}
    })),
    title: "Routes"
   });
var lyr_pois = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
    url: url_geoserver,
    params: {"LAYERS": name_layer_pois, "TILED": "true"}
    })),
    title: "POIs"
   });
var lyr_places = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
    url: url_geoserver,
    params: {"LAYERS": name_layer_places, "TILED": "true"}
    })),
    title: "Lieux"
   });
var lyr_adm1 = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
    url: url_geoserver,
    params: {"LAYERS": name_layer_adm1, "TILED": "true"}
    })),
    title: "Districts"
   });
var lyr_adm2 = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
    url: url_geoserver,
    params: {"LAYERS": name_layer_adm2, "TILED": "true"}
    })),
    title: "regions"
   });
var lyr_adm3 = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
    url: url_geoserver,
    params: {"LAYERS": name_layer_adm3, "TILED": "true"}
    })),
    title: "departements"
   });
var lyr_raster = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
    url: url_geoserver,
    params: {"LAYERS": name_layer_raster, "TILED": "true"}
    })),
    title: "raster"
   });

//ici je vais ajouter les couches de la tunisie 
var layer_tun_gouvernorats_utm = "formation_gs:tun_gouvernorats_utm";
//déclaration des couches openlayers
var lyr_gov_utm = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: url_geoserver,
        params: { "LAYERS": layer_tun_gouvernorats_utm, "TILED": "true" },
    }),
    title: "Gouvernorats",
});
var layer_roads_utm = "formation_gs:roads_utm";
//déclaration des couches openlayers
var lyr_roads_utm = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: url_geoserver,
        params: { "LAYERS": layer_roads_utm, "TILED": "true" },
    }),
    title: "Roads",
});
var layer_clients_utm = "formation_gs:clients_utm";
//déclaration des couches openlayers
var lyr_clients_utm = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: url_geoserver,
        params: { "LAYERS": layer_clients_utm, TILED: "true" },
    }),
    title: "Clients",
});

var layer_pdv_rtm = "formation_gs:pdv_rtm";
//déclaration des couches openlayers
var lyr_pdv_rtm = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: url_geoserver,
        params: { "LAYERS": layer_pdv_rtm, TILED: "true" },
    }),
    title: "PDV",
});
//
   //visibilité par défaut des couches au chargement de la carte
lyr_landuse.setVisible(true);
lyr_roads.setVisible(true);
lyr_pois.setVisible(true);
lyr_places.setVisible(true);
lyr_adm1.setVisible(true);
lyr_adm2.setVisible(true);
lyr_adm3.setVisible(true);
lyr_raster.setVisible(true);
osmTile.setVisible(true);
lyr_gov_utm.setVisible(true);
lyr_roads_utm.setVisible(true);
lyr_clients_utm.setVisible(true);
lyr_pdv_rtm.setVisible(true);

////////////////////

   //déclaration de la liste des couches à afficher dans un ordre précis
var layersList = [osmTile,lyr_adm1,lyr_adm2,lyr_adm3,lyr_landuse,lyr_roads,lyr_pois,lyr_places,lyr_raster,lyr_gov_utm,lyr_roads_utm,lyr_clients_utm,lyr_pdv_rtm];
   
   var mapView = new ol.View({ 
       projection: 'EPSG:3857', 
       center: new ol.geom.Point([-5.690183, 7.786829]).transform('EPSG:4326', 'EPSG:3857').getCoordinates(), 
       zoom: 7 });
      //Definition des popups pour affichage des infos
   var container = document.getElementById('popup'); 
   var content = document.getElementById('popup-content'); 
   var closer = document.getElementById('popup-closer'); 
   closer.onclick = function() { 
       container.style.display = 'none'; 
       closer.blur(); 
       return false; 
   };
   var overlayPopup = new ol.Overlay({ 
       element: container 
   });
   // --------------------------------------------------
      var map = new ol.Map({
       target: 'map',
       overlays: [overlayPopup],
       layers: layersList,
       view: mapView
      });
   //    ---------------------------------------------------
      var layerSwitcher = new ol.control.LayerSwitcher({
       tipLabel: 'Legende'
      });
      map.addControl(layerSwitcher);
   // -----------------------------------------------------------
   var MousePosition = new ol.control.MousePosition({ 
       coordinateFormat: ol.coordinate.createStringXY(4), 
       projection: 'EPSG:4326' });
   
      map.on('pointermove', function(event) { 
       var coord3857 = event.coordinate; 
       var coord4326 = ol.proj.transform(coord3857, 'EPSG:3857', 'EPSG:4326'); 
       $('#mouse3857').text(ol.coordinate.toStringXY(coord3857, 2)); 
       $('#mouse4326').text(ol.coordinate.toStringXY(coord4326, 5));
    });
   
    map.on('singleclick', function(evt) { 
       onSingleClick(evt); 
   });
   
   var clicked_coord;
   var onSingleClick = function(evt) { 
       var coord = evt.coordinate; 
       // console.log(coord); 
       var source1 = name_layer_adm1; 
       var source2 = name_layer_adm2; 
       var source3 = name_layer_adm3; 
       var layers_list = source3 + ',' + source2 + ',' + source1; 
       var wmslyr_adm1 = new ol.source.TileWMS({ 
           url: url_geoserver, 
           params: {'LAYERS': name_layer_adm1, 'TILED': true}, 
           serverType: 'geoserver', 
           crossOrigin: 'anonymous' }); 
       var view = map.getView(); 
       var viewResolution = view.getResolution(); 
       var url=wmslyr_adm1.getFeatureInfoUrl( 
           evt.coordinate, viewResolution, view.getProjection(), 
           { 'INFO_FORMAT': 'text/javascript', 
           'FEATURE_COUNT': 20, 
           'LAYERS': layers_list, 
           'QUERY_LAYERS': layers_list }); 
       // console.log(url); 
       if (url) { 
           //call parseResponse(data) 
           clicked_coord = coord; 
           $.ajax(url, {
               dataType: 'jsonp'} 
           ).done(function (data) { });
        } }
        function parseResponse(data) { 
           var vectorSource = new ol.source.Vector({ features: (new ol.format.GeoJSON()).readFeatures(data) }); 
           // console.log((new ol.format.GeoJSON()).readFeatures(data)); 
           var features = vectorSource.getFeatures(); 
           var str="";
           var district = ""; 
           var region = ""; 
           var departement = ""; 
           for(x in features) { 
               var id = features[x].getId(); 
               // console.log(id); 
               var props = features[x].getProperties(); 
               if(id.indexOf("adm1")>-1) district = props["adm1_fr"]; 
               if(id.indexOf("adm2")>-1) region = props["adm2_fr"]; 
               if(id.indexOf("adm3")>-1) departement = props["adm3_fr"]; }
           str = str + "District: " + district+ '<br/>'; 
           str = str + "Région: " + region+ '<br/>'; str = str + "Département: " + departement+ '<br/>'; 
           if(str) {
               str = '<p>' + str + '</p>'; 
               overlayPopup.setPosition(clicked_coord);
               content.innerHTML = str; 
               container.style.display = 'block'; } 
           else{ container.style.display = 'none'; closer.blur(); } }
       
   
   
   
   
   // Define Geometries 
   var point = new ol.geom.Point( ol.proj.transform([-5.690183, 7.786829], 'EPSG:4326', 'EPSG:3857') ); 
   var circle = new ol.geom.Circle( ol.proj.transform([-5.690183, 7.786829], 'EPSG:4326', 'EPSG:3857'), 450000 ); 
   // Features 
   var pointFeature = new ol.Feature(point); 
   var circleFeature = new ol.Feature(circle); 
   // Source 
   var vectorSource = new ol.source.Vector({ 
       projection: 'EPSG:4326' }); 
   vectorSource.addFeatures([pointFeature, circleFeature]); 
   
   
   var style = new ol.style.Style({
   fill: new ol.style.Fill({ color: 'rgba(255, 100, 50, 0.3)' }),
   stroke: new ol.style.Stroke({ width: 2, color: 'rgba(255, 100, 50, 0.8)' }), 
   image: new ol.style.Circle({ 
       fill: new ol.style.Fill({ color: 'rgba(55, 200, 150, 0.5)' }), 
       stroke: new ol.style.Stroke({ width: 1, color: 'rgba(55, 200, 150, 0.8)' }), 
       radius: 7 }), });
   
   // vector layer 
   var vectorLayer = new ol.layer.Vector({ 
   source: vectorSource,
   style: style }); 
   //add layer to the map 
   map.addLayer(vectorLayer);
   // ************
   var button = $('#pan').button('toggle'); 
   var interaction; 
   $('div.navbar button').on('click', function(event) { 
   var id = event.target.id; 
   // Toggle buttons 
   button.button('toggle'); 
   button = $('#'+id).button('toggle'); 
   // Remove previous interaction 
   map.removeInteraction(interaction); 
   // Update active interaction
   //Here we will make all the changes that allows saving the drowing to our database
   switch(event.target.id) { 
       case "select": 
           interaction = new ol.interaction.Select();
           map.addInteraction(interaction); 
           break; 
       case "point": 
           interaction = new ol.interaction.Draw({ 
               type: 'Point', 
               source: vectorLayer.getSource() 
           }); 
           map.addInteraction(interaction);
           interaction.on('drawend', function(event) {
               // Get the coordinates of the feature
               const feature = event.feature;
               var coordinates = feature.getGeometry().getCoordinates();                 
               console.log(coordinates)
               const id = prompt('Mark your point with a unique ID:');
   
               // we can then send the coordinates of the drown point to the server using an HTTP POST request
               fetch('http://localhost:3000/save-point', {
                   method: 'POST',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify({
                       shape_id: id,
                       lat: coordinates[1],
                       lng: coordinates[0]
                   })
               }).then(function(response) {
                   console.log('The Coordinates of the drown point are saved with success.');
                   console.log(coordinates)
               }).catch(function(error) {
                   console.error(error);
               });
                   
   
   
             });
           break; 
       case "line":
           interaction = new ol.interaction.Draw({ 
               type: 'LineString', 
               source: vectorLayer.getSource() 
           });
           map.addInteraction(interaction); 
   
           interaction.on('drawend', function(event) {
               // Get the coordinates of the feature
               const feature = event.feature;
               const coordinates = feature.getGeometry().getCoordinates();
               const id = prompt('Mark your line with a unique ID:');
               // Send the coordinates to the server to be saved in the database
               fetch('http://localhost:3000/save-line', {
                   method: 'POST',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify({
                       id: id,
                       coord: coordinates
                   })
               }).then(function(response) {
                   console.log('The Coordinates of the drown line are saved with success.');
                   console.log(coordinates)
               }).catch(function(error) {
                   console.error(error);
               });
               console.log(coordinates) 
           });
           
           break; 
       case "polygon": 
           interaction = new ol.interaction.Draw({ 
               type: 'Polygon', 
               source: vectorLayer.getSource() 
           }); 
           map.addInteraction(interaction); 
           interaction.on('drawend', function(event) {
               // Get the coordinates of the feature
               const feature = event.feature;
               const coordinates = feature.getGeometry().getCoordinates();
               const id = prompt('Mark your polygon with a unique ID:');
               // Send the coordinates to the server to be saved in the database
               fetch('http://localhost:3000/save-polygon', {
                   method: 'POST',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify({
                       id: id,
                       coord: coordinates
                   })
               }).then(function(response) {
                   console.log('The Coordinates of the drown polygon are saved with success.');
                   console.log(coordinates)
               }).catch(function(error) {
                   console.error(error);
               });
               console.log(coordinates) 
           });
           break; 
       case "modify": 
           interaction = new ol.interaction.Modify({ 
               features: new ol.Collection(vectorLayer.getSource().getFeatures()) }); 
           map.addInteraction(interaction); 
           break; 
       default: break; } });
   
   //Geolocation 
   var geolocation = new ol.Geolocation({ 
   projection: map.getView().getProjection(), 
   tracking: true 
   }); 
   var marker = new ol.Overlay({ 
   element: document.getElementById('location'), 
   positioning: 'center-center'
   }); 
   map.addOverlay(marker); 
   geolocation.on('change:position', function() { 
   //real time tracking 
   map.getView().setCenter(geolocation.getPosition()); 
   map.getView().setZoom(15); 
   marker.setPosition(geolocation.getPosition()); 
   });
   
   
   
   function zoomToMyPosition(){
       
       console.log(geolocation.getPosition())
       map.getView().setCenter(geolocation.getPosition())
       map.getView().setZoom(7)
   }
   
   
   
   function goToFullExtent(){
   
   map.getView().fit(circle)
   map.getView().setZoom(4)
   }
   //User (the Client) Interaction with the Database to add a geometry(point,polygon,line) -> sending the GET request and parsing the different geometries

   
   function getPoint() {
       const id = prompt('Set the ID of the saved Point:');
   
       fetch(`http://localhost:3000/api/points/${id}`)
         .then(response => response.json())
         .then(data => {
   
           const st_astext = data.geom['st_astext']
           const match = st_astext.match(/POINT\((-?\d+\.\d+) (-?\d+\.\d+)\)/);
           const coordinate = [match[1], match[2]];
           console.log(match[1], match[2]);
           const layer = new ol.layer.Vector({
               source: new ol.source.Vector({
                   features: [
                   new ol.Feature({
                       geometry: new ol.geom.Point([match[1], match[2]])
                       
                   })
                   ]
               }),
               projection: 'EPSG:4326' ,
               style: new ol.style.Style({
                   image: new ol.style.Icon({
                   
                   crossOrigin: 'anonymous',
                   src: 'https://openlayers.org/en/latest/examples/data/icon.png',
                   })
               })
               });
               map.addLayer(layer);
       });
       
       
     }
   
   
   
   function getLine() {
       const id = prompt('Set the ID of the saved Line:');
   
       fetch(`http://localhost:3000/api/lines/${id}`)
         .then(response => response.json())
         .then(data => {
   
           const st_astext = data.geom['st_astext']
           
           const match = st_astext.match(/LINESTRING\(([^)]+)\)/);
           const coordinates = match[1].split(',').map(pair => pair.split(' ').map(Number));
           console.log(coordinates[0][0])
   
   
           
           const layer = new ol.layer.Vector({
               source: new ol.source.Vector({
                   features: [
                   new ol.Feature({
                       geometry: new ol.geom.LineString([[coordinates[0][0], coordinates[0][1]], [coordinates[1][0], coordinates[1][1]]])
                       
                   })
                   ]
               }),
               projection: 'EPSG:4326' ,
               style: new ol.style.Style({
                   stroke: new ol.style.Stroke({
                       color: 'Yellow',
                       width: 2
                     })
               })
               });
               map.addLayer(layer);
       });
       
       
     }
   
   
     function getPolygon() {
       const id = prompt('Set the ID of the saved Polygon:');
   
       fetch(`http://localhost:3000/api/polygons/${id}`)
         .then(response => response.json())
         .then(data => {
           const st_astext = data.geom['st_astext']
           console.log(st_astext)
           
           const coordinatesString = st_astext.match(/\(([^)]+)\)/)[1];
           const coordinates = coordinatesString.split(',').map(coordinateString => coordinateString.split(' ').map(Number));
           const firstCoordinate = coordinates[0];
           const lastCoordinate = coordinates[coordinates.length - 1];
           coordinates[0] = lastCoordinate;
   
           console.log(coordinates);
   
           
           const layer = new ol.layer.Vector({
               source: new ol.source.Vector({
                   features: [
                   new ol.Feature({
                       geometry: new ol.geom.Polygon([coordinates])
                       
                   })
                   ]
               }),
               projection: 'EPSG:4326' ,
               style: new ol.style.Style({
                   fill: new ol.style.Fill({
                       color: 'Yellow'
                     }),
                   stroke: new ol.style.Stroke({
                       color: 'Yellow',
                       width: 2
                     })
               })
               });
           map.addLayer(layer);
       });
       
       
     }

   



