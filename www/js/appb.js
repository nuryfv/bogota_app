angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "app.html"
    })


    .state('app.tabs', {
      url: "/tabs",
      views: {
        'appContent' :{
          templateUrl: "tabs.html",
          controller : "TabsPageController"
        }
      }
    })

      
  $urlRouterProvider.otherwise("/app/tabs");
})

.controller('AppController', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})


.controller('TabsPageController', [ '$scope', '$state', function($scope, $state) {
    $scope.navTitle = 'Tab Page';

    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            $scope.toggleMenu();
        }
    }];



    /* List */
    var currentStart = 0
    /*----- Instituciones -------*/
    $scope.itemsI = [];
    //var elementI;

    $scope.addItemsI = function() {
      console.log('in');
      $.ajax({
        method: "POST",
        url: "http://buhoestudiocreativo.com/bogotaApp/load_list.php",
        data: { tipo: "Independiente", ini: "I"}
      })
      .done(function(msg) {

        //console.log(msg)
        var elementI = $.parseJSON(msg);
        //console.log(elementI);
        var longI = elementI.length;

        for (var i = 0; i < longI; i++) {
          var ele = elementI[i];

          if(ele[7] != ""){var face = "active";}else{ var face = "hidden";}
          if(ele[8] != ""){var twit = "active";}else{ var twit = "hidden";}
          if(ele[9] != ""){var emai = "active";}else{ var emai = "hidden";}

          var web = "http://"+ele[10];
          
          data = {"id":ele[0], "title": ele[1], 
              "img": ele[2], 
              "descripcion": ele[3], 
              "telefono": ele[4], "direccion": ele[5], 
              "horario": ele[6], 
              "facebook": ele[7], "twitter": ele[8], "email": "mailto:"+ele[9], "web": web, "zona": ele[11], "fa": face, "ta": twit, "ea": emai, };
          $scope.itemsI.push(data);
          
        }
      });
 
      //currentStart += 0
    }

    $scope.addItemsI()

    /*----- Galerias -------*/
    $scope.itemsG = []
    
    $scope.addItemsG = function() {
      /*for (var i = 0; i < 5; i++) {
        data = {"id":"contentG"+i, "title": "Galeria "+i, 
                "img": "http://www.olympia-greece.org/museum7.jpg", 
                "descripcion": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed urna neque, eleifend eu lacus a, ullamcorper aliquet sapien. Vivamus auctor facilisis massa eu vestibulum.", 
                "telefono": "611111", "direccion": "Calle 21 # 28 - 15", 
                "horario": "Lunes a Sabado 11:30 am a 11:30pm ", 
                "facebook": "#", "twitter": "#", "email": "#", "web": "www.asesoramos.com", "zona": "Centro", };
        $scope.itemsG.push(data)*/

        console.log('in');
      $.ajax({
        method: "POST",
        url: "http://buhoestudiocreativo.com/bogotaApp/load_list.php",
        data: { tipo: "Galeria", ini: "G"}
      })
      .done(function(msg) {

        //console.log(msg)
        var elementI = $.parseJSON(msg);
        //console.log(elementI);
        var longI = elementI.length;

        for (var i = 0; i < longI; i++) {
          var ele = elementI[i];

          if(ele[7] != ""){var face = "active";}else{ var face = "hidden";}
          if(ele[8] != ""){var twit = "active";}else{ var twit = "hidden";}
          if(ele[9] != ""){var emai = "active";}else{ var emai = "hidden";}

          var web = "http://"+ele[10];
          
          data = {"id":ele[0], "title": ele[1], 
              "img": ele[2], 
              "descripcion": ele[3], 
              "telefono": ele[4], "direccion": ele[5], 
              "horario": ele[6], 
              "facebook": ele[7], "twitter": ele[8], "email": "mailto:"+ele[9], "web": web, "zona": ele[11], "fa": face, "ta": twit, "ea": emai, };
          $scope.itemsG.push(data);
          
        }
      });
    
      //}

      //currentStart += 0
    }

    $scope.addItemsG()

    /*----- Fundaciones -------*/
    $scope.itemsF = []
    
    $scope.addItemsF = function() {
      /*for (var i = 0; i < 5; i++) {
        data = {"id":"contentF"+i, "title": "Fundacion "+i, 
                "img": "http://www.olympia-greece.org/museum7.jpg", 
                "descripcion": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed urna neque, eleifend eu lacus a, ullamcorper aliquet sapien. Vivamus auctor facilisis massa eu vestibulum.", 
                "telefono": "611111", "direccion": "Calle 21 # 28 - 15", 
                "horario": "Lunes a Sabado 11:30 am a 11:30pm ", 
                "facebook": "#", "twitter": "#", "email": "#", "web": "www.asesoramos.com", "zona": "Centro", };
        $scope.itemsF.push(data)*/

        console.log('in');
      $.ajax({
        method: "POST",
        url: "http://buhoestudiocreativo.com/bogotaApp/load_list.php",
        data: { tipo: "Fundacion", ini: "F"}
      })
      .done(function(msg) {

        //console.log(msg)
        var elementI = $.parseJSON(msg);
        //console.log(elementI);
        var longI = elementI.length;

        for (var i = 0; i < longI; i++) {
          var ele = elementI[i];
          
          if(ele[7] != ""){var face = "active";}else{ var face = "hidden";}
          if(ele[8] != ""){var twit = "active";}else{ var twit = "hidden";}
          if(ele[9] != ""){var emai = "active";}else{ var emai = "hidden";}

          var web = "http://"+ele[10];
          
          data = {"id":ele[0], "title": ele[1], 
              "img": ele[2], 
              "descripcion": ele[3], 
              "telefono": ele[4], "direccion": ele[5], 
              "horario": ele[6], 
              "facebook": ele[7], "twitter": ele[8], "email": "mailto:"+ele[9], "web": web, "zona": ele[11], "fa": face, "ta": twit, "ea": emai, };
          $scope.itemsF.push(data);
          
        }
      });
    
      //}

      //currentStart += 0
    }

    $scope.addItemsF()

    /*----- Museo -------*/
    $scope.itemsM = []
    
    $scope.addItemsM = function() {
      /*for (var i = 0; i < 5; i++) {
        data = {"id":"contentM"+i, "title": "Museo "+i, 
                "img": "http://www.olympia-greece.org/museum7.jpg", 
                "descripcion": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed urna neque, eleifend eu lacus a, ullamcorper aliquet sapien. Vivamus auctor facilisis massa eu vestibulum.", 
                "telefono": "611111", "direccion": "Calle 21 # 28 - 15", 
                "horario": "Lunes a Sabado 11:30 am a 11:30pm ", 
                "facebook": "#", "twitter": "#", "email": "#", "web": "www.asesoramos.com", "zona": "Centro", };
        $scope.itemsM.push(data)*/

        console.log('in');
      $.ajax({
        method: "POST",
        url: "http://buhoestudiocreativo.com/bogotaApp/load_list.php",
        data: { tipo: "Museo", ini: "M"}
      })
      .done(function(msg) {

        //console.log(msg)
        var elementI = $.parseJSON(msg);
        //console.log(elementI);
        var longI = elementI.length;

        for (var i = 0; i < longI; i++) {
          var ele = elementI[i];
          
          if(ele[7] != ""){var face = "active";}else{ var face = "hidden";}
          if(ele[8] != ""){var twit = "active";}else{ var twit = "hidden";}
          if(ele[9] != ""){var emai = "active";}else{ var emai = "hidden";}

          var web = "http://"+ele[10];
          
          data = {"id":ele[0], "title": ele[1], 
              "img": ele[2], 
              "descripcion": ele[3], 
              "telefono": ele[4], "direccion": ele[5], 
              "horario": ele[6], 
              "facebook": ele[7], "twitter": ele[8], "email": ele[9], "web": web, "zona": ele[11], "fa": face, "ta": twit, "ea": emai, };
          $scope.itemsM.push(data);
          
        }
      });
    
      //}

      //currentStart += 0
    }

    $scope.addItemsM()
    /* List */
}])


.controller('HomeTabCtrl', [ '$scope', '$state', function($scope, $state) {
    
}])

