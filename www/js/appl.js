// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var facebookExample = angular.module('starter', ['ionic', 'ngStorage', 'ngCordova'])

facebookExample.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            //StatusBar.styleDefault();
            StatusBar.hide();
        }
    });
});

facebookExample.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginController'
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'idioma.html',
            controller: 'ProfileController'
        })
        
    $urlRouterProvider.otherwise('/login');
});

facebookExample.controller("LoginController", function($scope, $cordovaOauth, $localStorage, $location) {

    $scope.loginf = function() {
        $cordovaOauth.facebook("1033720436646637", ["email"]).then(function(result) {
            $localStorage.accessToken = result.access_token;
            $location.path("/profile");
        }, function(error) {
            alert("There was a problem signing in!  See the console for logs");
            console.log(error);
        });
    };

    
    $scope.loging = function() {
        $cordovaOauth.google("1083250657921-ud7de933p8nteoj45av48gq0noii6bji.apps.googleusercontent.com", ["email"]).then(function(result) {
            //$localStorage.accessToken = result.access_token;
            console.log(JSON.stringify(result));
            $location.path("/profile");
        }, function(error) {
            alert("There was a problem signing in!  See the console for logs");
            console.log(error);
        });
    };



});

facebookExample.controller("ProfileController", function($scope, $http, $localStorage, $location) {

    $scope.init = function() {
        if($localStorage.hasOwnProperty("accessToken") === true) {
            $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,location,website,picture,relationship_status", format: "json" }}).then(function(result) {
                $scope.profileData = result.data;    

                $http({
                  method: 'GET',
                  data: { nombre: $scope.profileData.name, id: $scope.profileData.id, plataforma: "Facebook" },
                  url: "http://farvel.co/proyectos/bogotaApp/save_user.php"
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    alert('login');
                  }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    alert('not in');
                  });            

            }, function(error) {
                alert("There was a problem getting your profile.  Check the logs for details.");
                console.log(error);
            });
        } else {
            alert("Not signed in");
            $location.path("/login");
        }
    };

});
