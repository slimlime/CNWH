app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "templates/home.htm",
    controller: 'postcodeCtrl'
  })
  .when("/view/{postcode}", {
    templateUrl : "templates/photos.htm",
    controller: 'photoCtrl'
  })
});