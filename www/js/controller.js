app.controller('dataCtrl', function($scope, $http, $route, $routeParams) {

    query = $route.current.query;
    $scope.query = query;
    
    if (query == 'search/postcode/') {
        query += $routeParams.postcode + '/';
    }

    requestnum = 0;
    $http.get('/data/' + query + requestnum).then(function(response) {
        $scope.postcodes = response.data;
        requestnum++;
        if (response.data.length < 29) {
            $("#load-more").hide();
        }
    });

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


    $scope.searchForm = function() {

        console.log('form submit');
        window.location = '#/search/postcode/' + $("#search").val();

    };

}).controller('postcodeCtrl', function($scope, $http, $routeParams) {

    $http.get('/data/postcode/' + $routeParams.postcode).then(function(response) {  
        $scope.postcode = response.data;

        $http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+ $scope.postcode.closestCity +'%2C%20au%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
        .then(function(response){
            $scope.postcode.weather = response.data.query.results.channel;
            console.log($scope.postcode.weather);
        });
    });

    

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