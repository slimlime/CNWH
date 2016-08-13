app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "templates/home.htm",
    controller: 'homeCtrl'
  })
  .when("/postcode/:postcode", {
    templateUrl : "templates/postcode.htm",
    controller: 'postcodeCtrl'
  })
});