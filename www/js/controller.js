app.controller('homeCtrl', function($scope, $http) {
    
    requestnum = 0;
    $http.get('/data/' + requestnum).then(function(response) {
        $scope.postcodes = response.data;
        requestnum++;
    });

    $('#load-more').click(function () {

        $("#load-more").text('Loading...');
        $http.get('/data/' + requestnum).then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                $scope.postcodes.push(response.data[i]);
            }
            requestnum++;
            $('#load-more').text('Load More');
        });

    });

}).controller('dataCtrl', function($scope, $http, $route) {

    query = $route.current.query;
    
    requestnum = 0;
    $http.get('/data/' + query + requestnum).then(function(response) {
        $scope.postcodes = response.data;
        requestnum++;
    });

    $('#load-more').click(function () {

        $("#load-more").text('Loading...');
        $http.get('/data/' + requestnum).then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                $scope.postcodes.push(response.data[i]);
            }
            requestnum++;
            $('#load-more').text('Load More');
        });

    });

}).controller('postcodeCtrl', function($scope, $http, $routeParams) {

    $http.get('/data/postcode/' + $routeParams.postcode).then(function(response) {  
        $scope.postcode = response.data;
        console.log(response.data);
    });

});