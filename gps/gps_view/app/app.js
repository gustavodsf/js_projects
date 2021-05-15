var vectorLayerGrafo;
var app = angular.module('app', []);
var map;

// Define the `PhoneListController` controller on the `phonecatApp` module
app.controller('mapController', function mapController($scope,$http,mapa,linhaRest) {
    idx = 1
    mapa.cria();
    linhaRest.get().then(function(data) {
        $scope.linhas = data["linhas"];
        atualizaGrafo(data)
    });
});

app.service('mapa',function () {
  this.cria = function () {
      var controls = ol.control.defaults().extend([new ol.control.FullScreen()]);
      var interactions = ol.interaction.defaults().extend([new ol.interaction.DragRotateAndZoom()]);

      map = new ol.Map({
          controls: controls,
          interactions: interactions,
          target: 'map',
          renderer: 'canvas',
          layers: [new ol.layer.Tile({source: new ol.source.OSM(), name:'Mapa'})],
          view: new ol.View({center: ol.proj.transform([-43.238068,-22.137252], 'EPSG:4326', 'EPSG:3857'),zoom: 9.75 })
      });
  };
});

app.factory('linhaRest', function($http) {
   return {
     get: function() {
       return  $http({
           method : "GET",
           url : "http://localhost:9090/map/gera/mapeamento/gps/linha"
           }).then(function mySucces(response) {
               return response.data;
           }, function myError(response) {
               return response.statusText;
           });
     }
   }
});


function atualizaGrafo(data){
  map.removeLayer(vectorLayerGrafo);
  var vectorSourceGrafo =  new ol.source.Vector();
  nos = []
  for(i=0 ; i < data["nos"].length ; i++){
    nos[data["nos"][i][0]] =  data["nos"][i][1];
    var pointFeature = new ol.Feature({
       geometry: new ol.geom.Point([parseFloat(data["nos"][i][1]["longitude"]), parseFloat(data["nos"][i][1]["latitude"])])
    });
    pointFeature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
    var styleNorma = new ol.style.Style({
      image: new ol.style.Circle({
        radius: 5,
        stroke: new ol.style.Stroke({
          color: '#000000'
        }),
        fill: new ol.style.Fill({
          color: '#000000' // attribute colour
        })
      }),
      text: new ol.style.Text({
        font: 'Normal 18px Arial',
        text: "C="+data["nos"][i][1]["chave"], // attribute code
        fill: new ol.style.Fill({
          color: "#696969" // black text // TODO: Unless circle is dark, then white..
        })
      })
    });

    var styleCA = new ol.style.Style({
      image: new ol.style.Circle({
        radius: 5,
        stroke: new ol.style.Stroke({
          color: '#ff0000'
        }),
        fill: new ol.style.Fill({
          color: '#ff0000' // attribute colour
        })
      }),
      text: new ol.style.Text({
        font: 'Normal 18px Arial',
        text: "C="+data["nos"][i][1]["chave"], // attribute code
        fill: new ol.style.Fill({
          color: "#696969" // black text // TODO: Unless circle is dark, then white..
        })
      })
    });

    var styleFC = new ol.style.Style({
      image: new ol.style.Circle({
        radius: 5,
        stroke: new ol.style.Stroke({
          color: '#00ff00'
        }),
        fill: new ol.style.Fill({
          color: '#00ff00' // attribute colour
        })
      }),
      text: new ol.style.Text({
        font: 'Normal 18px Arial',
        text: "C="+data["nos"][i][1]["chave"], // attribute code
        fill: new ol.style.Fill({
          color: "#696969" // black text // TODO: Unless circle is dark, then white..
        })
      })
    });


    if(data["nos"][i][1]["tipo"] ==  "auxiliar"){
        pointFeature.setStyle(styleCA);
    }else if (data["nos"][i][1]["tipo"] ==  "fechamento"){
        pointFeature.setStyle(styleFC);
    }else{
        pointFeature.setStyle(styleNorma);
    }
    vectorSourceGrafo.addFeature(pointFeature);
}

for(i=0 ; i < data["arestas"].length ; i++){
  var no1=nos[data["arestas"][i][0]];
  var no2=nos[data["arestas"][i][1]];

  var lineStringFeature = new ol.Feature({
     geometry: new ol.geom.LineString([[parseFloat(no1["longitude"]), parseFloat(no1["latitude"])],[parseFloat(no2["longitude"]), parseFloat(no2["latitude"])]])
  });
  lineStringFeature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
  vectorSourceGrafo.addFeature(lineStringFeature);
}

 vectorLayerGrafo = new ol.layer.Vector({
     source: vectorSourceGrafo
 });
 map.addLayer(vectorLayerGrafo);
}
