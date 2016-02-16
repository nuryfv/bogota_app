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
          controller : "TabsPageController"
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


.controller('TabsPageController', [ '$scope', '$state', function($scope, $state) {
   


    
}])


.controller('HomeTabCtrl', [ '$scope', '$state', function($scope, $state) {
    
}])

