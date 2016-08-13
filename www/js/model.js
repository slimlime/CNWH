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
  .when("/postcode/:postcode", {
    templateUrl : "templates/postcode.htm",
    controller: 'dataCtrl',
    query: 'popular/'
  })
});