angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "app.html"
    })


    .state('app.home', {
      url: "/home",
      views: {
        'appContent' :{
          templateUrl: "home.html",
          controller : "HomeController"
        }
      }
    })

    .state('app.tabs', {
      url: "/tabs",
      views: {
        'appContent': {
          templateUrl: "templates/tabs.html",
          controller: 'HomeTabCtrl'
        }
      }
    })
        
  
  $urlRouterProvider.otherwise("/app/home");
})

.controller('AppController', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})


.controller("HomeController", ['$scope','$http', function($scope,$http) {
  

  google.maps.event.addDomListener(window, 'load', function() {
        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
 
        var mapOptions = {
            center: myLatlng,
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
 
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
        });

        /// Call to url to ger places
        /*$http({method: 'POST', url: 'http://buhoestudiocreativo.com/bogotaApp/load_map.php'}).
          then(function(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log(response);
            var pointsP = response;
          }, function(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert(response);
          });*/

        var points;
        $.ajax({
          method: "POST",
          url: "http://buhoestudiocreativo.com/bogotaApp/load_map_en.php",
        })
          .done(function( msg ) {
            //console.log(msg.toString())
            //var valores = msg.toString();
            //alert(valores);
            points = $.parseJSON(msg);

            setMarkers(map, points);
          });

 
        $scope.map = map;
        $scope.points = points;


    });

  
}])


.controller('HomeTabCtrl', [ '$scope', '$state', function($scope, $state) {
    $scope.navTitle = 'Tab Page';

    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            $scope.toggleMenu();
        }
    }];
}])



/*var points = [
  ['Bogota 1', 4.626055, -74.102314, 4, 'centro', 'museo', 'Calle 111', '61111', 'Lunes a Viernes 8:00am a 10:00pm'],
  ['Bogota 2', 4.574038, -74.094074, 5, 'norte', 'galeria', 'Calle 111', '61111', 'Lunes a Viernes 8:00am a 10:00pm'],
  ['Bogota 3', 4.701336, -74.107120, 3, 'sur', 'museo', 'Calle 111', '61111', 'Lunes a Viernes 8:00am a 10:00pm'],
  ['Bogota 4', 4.754712, -74.065922, 2, 'centro', 'fundacion', 'Calle 111', '61111', 'Lunes a Viernes 8:00am a 10:00pm'],
  ['Bogota 5', 4.637005, -74.174412, 1, 'norte', 'independiente', 'Calle 111', '61111', 'Lunes a Viernes 8:00am a 10:00pm']
];*/
var markers = [];
var myMap;

function setMarkers(map, points) {
  // Adds markers to the map.

  // Marker sizes are expressed as a Size of X,Y where the origin of the image
  // (0,0) is located in the top left of the image.

  // Origins, anchor positions and coordinates of the marker increase in the X
  // direction to the right and in the Y direction down.

  var image = {
    url: '',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(18, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };
  // Shapes define the clickable region of the icon. The type defines an HTML
  // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  // The final coordinate closes the poly by connecting to the first coordinate.
  var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };
  for (var i = 0; i < points.length; i++) {

    var beach = points[i];
    //console.log(beach[2]);
    console.log(beach);
    image.url = 'img/'+beach[5]+'Icon.png';
    var marker = new google.maps.Marker({
      position: {lat: parseFloat(beach[1]), lng: parseFloat(beach[2])},
      map: map,
      title: beach[0],
      zone: beach[4],
      tipo: beach[5],
      icon: image,
      address: beach[6],
      phone: beach[7],
      horario: beach[8],
      picture: beach[9],
      description: beach[10],
      web: beach[11]
    });

    markers.push(marker);

    
    //google.maps.event.addListener(marker, 'click', function() {
    marker.addListener('click', function() {  
        infoLayerClose();
        //alert(this.title);
        var Mtitulo = this.title;
        var Mhorario = this.horario;
        var Mdireccion = this.address;
        var Mphone = this.phone;
        var Mpicture = this.picture;
        var Mtext = this.description;
        var Mweb = "<a href='http://"+this.web+"'>"+this.web+"</a>";
        infoLayer(Mtitulo,Mhorario,Mdireccion,Mphone,Mpicture,Mtext,Mweb);
    });

    // event to close the infoWindow with a click on the map
    google.maps.event.addListener(map, 'click', function() {
      infoLayerClose();
    });
      
    
   
    
    //alert(marker.title);

  }



  myMap = map;
}

function infoLayerClose(){
  var infoBox = document.getElementById('layerBox');
  var infoBoxTitulo = document.getElementById('Mtitulo');
  var infoBoxDireccion = document.getElementById('Mdireccion');
  var infoBoxHorario = document.getElementById('Mhorario');
  var infoBoxPhone = document.getElementById('Mphone');
  var infoBoxPicture = document.getElementById('Mpicture');
  var infoBoxDescription = document.getElementById('Mdescription');
  var infoBoxWeb = document.getElementById('Mweb');

  //alert('deleted');

  infoBoxTitulo.innerHTML ="";
  infoBoxDireccion.innerHTML ="";
  infoBoxHorario.innerHTML ="";
  infoBoxPhone.href = "tel:+";
  infoBoxPicture.src = "";
  infoBoxDescription.innerHTML = "";
  infoBoxWeb.innerHTML = "";
  infoBox.style.display = "none";
}

function infoLayer(titulo,horario, direccion, phone, picture, description, web ){
//  alert('passing info '+info);
  var infoBox = document.getElementById('layerBox');
  var infoBoxTitulo = document.getElementById('Mtitulo');
  var infoBoxDireccion = document.getElementById('Mdireccion');
  var infoBoxHorario = document.getElementById('Mhorario');
  var infoBoxPhone = document.getElementById('Mphone');
  var infoBoxPicture = document.getElementById('Mpicture');
  var infoBoxDescription = document.getElementById('Mdescription');
  var infoBoxWeb = document.getElementById('Mweb');

  infoBoxTitulo.innerHTML = titulo;
  infoBoxDireccion.innerHTML = direccion;
  infoBoxHorario.innerHTML = horario;
  infoBoxPhone.href = "tel:+"+phone;
  infoBoxPicture.src = picture;
  infoBoxDescription.innerHTML = description;
  infoBoxWeb.innerHTML = web;
  infoBox.style.display = "block";
  //$('#layer').css('display','block');
}

function setMapOnAll(myMap) {
  //alert(myMap);
  for (var d = 0; d < markers.length; d++) {
    markers[d].setMap(myMap);
  }
}

function hiddeMarkers(zone, tipo){
    
   
    setMapOnAll(null);
    setMapOnAll(myMap);
    if(zone != 'todos')
    {
      if(tipo != 'todos')
      {
        for(j=0; j<markers.length; j++){
            var marker = markers[j];
            console.log(marker);
            if(marker.zone != zone || marker.tipo != tipo)
            {
              markers[j].setMap(null);  
            }
            
        }  
      }
      else
      {
        for(j=0; j<markers.length; j++){
            var marker = markers[j];
            console.log(marker);
            if(marker.zone != zone)
            {
              markers[j].setMap(null);  
            }
            
        } 
      }
    }
    else
    {
      if(tipo != 'todos')
      {
        for(j=0; j<markers.length; j++){
              var marker = markers[j];
              console.log(marker);
              if(marker.tipo != tipo)
              {
                markers[j].setMap(null);  
              }
              
        }
      } 
    }
    
}

function hiddeMarkersType(tipo, zone){
    setMapOnAll(null);
    setMapOnAll(myMap);
    //alert(tipo);
    if(tipo != 'todos')
    {
      if(zone != 'todos')
      {
        for(j=0; j<markers.length; j++){
            var marker = markers[j];
            console.log(marker);
            if(marker.tipo != tipo || marker.zone != zone)
            {
              markers[j].setMap(null);  
            }
            
        }
      }
      else
      {
        for(j=0; j<markers.length; j++){
            var marker = markers[j];
            console.log(marker);
            if(marker.tipo != tipo)
            {
              markers[j].setMap(null);  
            }
            
        }
      }  
    }
    else
    {
      if(zone != 'todos')
      {
        for(j=0; j<markers.length; j++){
              var marker = markers[j];
              console.log(marker);
              if(marker.zone != zone)
              {
                markers[j].setMap(null);  
              }
              
        }
      } 
    }
}

