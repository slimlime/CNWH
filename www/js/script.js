$(document).ready(function () {

    console.log('loaded');

    $(".navbar-form").submit(function(e) {
        console.log("form submitted");
        
        e.preventdefault();
        
        window.location = '#/postcode/' + $("#search-form").val();
    });


});