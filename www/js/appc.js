angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "app.html"
    })


    .state('app.about', {
      url: "/about",
      views: {
        'appContent' :{
          templateUrl: "about.html",
          controller : "AboutPageController"
        }
      }
    })

      
  $urlRouterProvider.otherwise("/app/about");
})

.controller('AppController', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})


.controller('AboutPageController', [ '$scope', '$state', function($scope, $state) {
    $scope.navTitle = 'Acerca de Nosotros';
    $scope.aboutText = '';
    
    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            $scope.toggleMenu();
        }
    }];

    
      $.ajax({
        method: "GET",
        url: "http://buhoestudiocreativo.com/bogotaApp/about.php",
        data: {}
      })
      .done(function(msg) {
        /*console.log(msg);
        $scope.aboutText = msg;*/
        $('#aboutText').text(msg);
      });
    
}])


.controller('HomeTabCtrl', [ '$scope', '$state', function($scope, $state) {
    
}])

