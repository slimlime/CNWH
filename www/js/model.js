app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {

  // use the HTML5 History API
  // $locationProvider
  // $locationProvider.html5Mode(true);

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