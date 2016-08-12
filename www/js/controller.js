app.controller('postcodeCtrl', function($scope, $http) {
    
    $http.get('/data/1').then(function(response) {
        $scope.postcodes = response.data;
    });

});