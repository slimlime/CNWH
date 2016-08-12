$(document).ready(function() {

    items = [];

    function get_items(request_url, callback) {

    $.getJSON(request_url, function(data) {
        console.log(data);
        data = data.photos.photo;
        console.log(data);
        items = [];

        for (var i = 0; i < data.length; i++) {
            url = 'https://farm' + data[i].farm + '.staticflickr.com/' + data[i].server +'/' + data[i].id + '_'+ data[i].secret +'_b.jpg';
            thumb = 'https://farm' + data[i].farm + '.staticflickr.com/' + data[i].server +'/' + data[i].id + '_'+ data[i].secret +'_m.jpg';
            temp = {
                "image": url,
                "thumb": thumb,
                "caption": data[i].title
            }
            log_size(data[i].id);
            items.push(temp);
        }
        if (callback) {
            callback();
        }
    });

    }

    get_items('https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=2564c5860d587b11245b33f7e4b25d6a&per_page=20&format=json&nojsoncallback=1');

    $("#form-submit").submit(function (e){
        e.preventDefault();
        var query = $("#search-form").val();
        query = query.toLowerCase();
        query = query.trim();

        olditems = items;
        
        get_items('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a4dc801fcd306e0c7494ffee49b598ce&text=' + query + '&per_page=20&format=json&nojsoncallback=1', function() {
            if (items.length > 0) {
                render(items);
            } else if (query == '') {
                render(olditems);
            } else {
                $("#content-section").text('No Results Found');
            }
        });

    });

    function render(render_items) {

        content = '<div class="row"> <button id="back" class="btn btn-primary">Back...</button> <p>&nbsp; </p> </div><div class="row">';

        for (var i = 0; i < render_items.length; i++) {
            if (i % 3 == 0 || i == 0) { 
                content +='</div><div class="row">'
            }
            content += '<div class="col-md-4">';
            content += '<div class="well">';
            content += '<a href="' + render_items[i].image + '" data-lightbox="images" data-title="' + render_items[i].caption + '">';
            content += '<img src="' + render_items[i].thumb + '" alt="lovely photo" class="center-block img-responsive">';
            content += '</a>';
            content +=  '<p class="text-center"> ' + render_items[i].caption + ' </p>';
            content += '</div>';
            content +=  '</div>' ;
        }

        $("#content-section").html(content);

    }

    $('body').on('click', '#photo-load', function() {
        $("#welcome").hide();
        render(items);
        $(".search-form").show();
        $( "#content-section" ).hide();
        $( "#content-section" ).fadeIn("slow");
        
    });

    $('body').on('click', '#back', function() {
        splash();
        $(".search-form").hide();
        $("#welcome").show();
    });

    function splash() {
        $("#content-section").html('<p class="text-center"> <button id="photo-load" class="btn btn-primary">Load!</button> </p>');
        $(".search-form").hide();        
    }

    splash();

});

$("#login-button").click(function(){
    alert("This feature is not available yet");
});