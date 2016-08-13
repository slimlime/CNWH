$(document).ready(function () {

    console.log('loaded');

    $("#nav-form").submit(function(e) {
        console.log("form submitted");
        e.preventdefault();
        window.location = '#/postcode/' + $("#search-form").val();
    });


});