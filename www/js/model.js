app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "templates/splash.htm"
  })
  .when("/photos", {
    templateUrl : "templates/photos.htm",
    controller: 'photoCtrl'
  })
});

$("#login-button").click(function(){
    alert("This feature is not available yet");
});