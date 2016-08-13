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
  .when("/cheapest", {
    templateUrl : "templates/home.htm",
    controller: 'cheapestCtrl'
  })
  .when("/expensive", {
    templateUrl : "templates/home.htm",
    controller: 'expensiveCtrl'
  })
  .when("/postcode/:postcode", {
    templateUrl : "templates/postcode.htm",
    controller: 'postcodeCtrl'
  })
});