app.controller('dataCtrl', function($scope, $http, $route) {

    query = $route.current.query;
    $scope.query = query;
    
    requestnum = 0;
    $http.get('/data/' + query + requestnum).then(function(response) {
        $scope.postcodes = response.data;
        requestnum++;

        // sendReq();
    });

//     function sendReq (){
//     var n = 0;
//     if(n < $scope.postcodes.length) {
//             $http.get('https://query.yahooapis.com/v1/public/yql?q=select%20item.condition.text%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22dallas%2C%20tx%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
//             .then(function(response){
                
//                 console.log($scope.postcodes[n]);
//                 $scope.postcodes[n].weather = response.data;
//                 n++;
//                 sendReq();
//             });
//         }
// }

    $('#load-more').click(function () {

        $("#load-more").text('Loading...');
        $http.get('/data/' + query + requestnum).then(function(response) {
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
