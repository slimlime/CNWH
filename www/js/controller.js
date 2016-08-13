app.controller('postcodeCtrl', function($scope, $http) {
    
    $http.get('/data/0').then(function(response) {
        $scope.postcodes = response.data;
        console.log(response.data);
    });

});