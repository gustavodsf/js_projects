var map;
var json;
var controls = ol.control.defaults().extend([new ol.control.FullScreen()]);
var interactions =  ol.interaction.defaults().extend([new ol.interaction.DragRotateAndZoom()]);
var idx = 0

$(document).ready(function(){
    mountMap();
});

function mountMap(){
  map = new ol.Map({
      controls: controls,
      interactions: interactions,
      target: 'map',
      renderer: 'canvas',
      layers: [new ol.layer.Tile({source: new ol.source.OSM(), name:'Mapa'})],
      view: new ol.View({center: ol.proj.transform([-43.238068,-22.137252], 'EPSG:4326', 'EPSG:3857'),zoom: 9.75 })
  });
}

$("#buttonProcessAnotherLine").click(function(){
  url = "http://localhost:8000/map/processaMaisUmaLinha/1";
  $.when(ajax1(url)).done(function(a1){
      colocaPCMapa();
  });
});

function ajax1(url){
   return $.ajax({
    type: 'GET',
    url: "http://localhost:8000/map/processaMaisUmaLinha/1",
    crossDomain : true,
    success: function(response){
        json = response;
    },
    error: function(xhr) {}
  });
}

function colocaPCMapa(){
    alert(json);
}
