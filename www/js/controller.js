app.controller('photoCtrl', function($scope, $http) {
    $scope.items = [];

    /**
     * Gets the items from the Flickr API and Sets them in the scope.
     */
    function get_items(request_url, callback) {
        $http.get(request_url).then(function(response) {
            data = response.data.photos.photo;
            $scope.items = [];

            for (var i = 0; i < data.length; i++) {
                url = 'https://farm' + data[i].farm + '.staticflickr.com/' + data[i].server +'/' + data[i].id + '_'+ data[i].secret +'_b.jpg';
                thumb = 'https://farm' + data[i].farm + '.staticflickr.com/' + data[i].server +'/' + data[i].id + '_'+ data[i].secret +'_m.jpg';
                temp = {
                    "image": url,
                    "thumb": thumb,
                    "caption": data[i].title
                }
                $scope.items.push(temp);
            }
            if (callback) {
                callback();
            }
    });

    }

    get_items('https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=2564c5860d587b11245b33f7e4b25d6a&per_page=20&format=json&nojsoncallback=1');

    /**
     * Perform the Flickr Search
     */
    $("#form-submit").submit(function (e){
        e.preventDefault();
        var query = $("#search-form").val();
        query = query.toLowerCase();
        query = query.trim();

        olditems = $scope.items;
        
        get_items('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a4dc801fcd306e0c7494ffee49b598ce&text=' + query + '&per_page=20&format=json&nojsoncallback=1');

    });

});