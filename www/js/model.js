app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {

  // use the HTML5 History API
  // $locationProvider
  // $locationProvider.html5Mode(true);

  $routeProvider
  .when("/", {
    templateUrl : "templates/home.htm",
    controller: 'dataCtrl',
    query: ''
  })
  .when("/cheapest", {
    templateUrl : "templates/home.htm",
    controller: 'dataCtrl',
    query: 'cheapest/'
  })
  .when("/expensive", {
    templateUrl : "templates/home.htm",
    controller: 'dataCtrl',
    query: 'expensive/'
  })
  .when("/popular", {
    templateUrl : "templates/home.htm",
    controller: 'dataCtrl',
    query: 'popular/'
  })
  .when("/unpopular", {
    templateUrl : "templates/home.htm",
    controller: 'dataCtrl',
    query: 'popular/'
  })
    .when("/act", {
    templateUrl : "templates/home.htm",
    controller: 'dataCtrl',
    query: 'act/'
  })
  .when("/nsw", {
    templateUrl : "templates/home.htm",
    controller: 'dataCtrl',
    query: 'nsw/'
  })
    .when("/vic", {
    templateUrl : "templates/home.htm",
    controller: 'dataCtrl',
    query: 'vic/'
  })
  .when("/qld", {
    templateUrl : "templates/home.htm",
    controller: 'dataCtrl',
    query: 'qld/'
  })
    .when("/tas", {
    templateUrl : "templates/home.htm",
    controller: 'dataCtrl',
    query: 'tas/'
  })
    .when("/nt", {
    templateUrl : "templates/home.htm",
    controller: 'dataCtrl',
    query: 'nt/'
  })
    .when("/wa", {
    templateUrl : "templates/home.htm",
    controller: 'dataCtrl',
    query: 'wa/'
  })
  .when("/postcode/:postcode", {
    templateUrl : "templates/postcode.htm",
    controller: 'dataCtrl',
    query: 'popular/'
  })
});