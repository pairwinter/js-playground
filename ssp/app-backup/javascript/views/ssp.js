$(function() {
    $("#help_hide").bind("click", function() {
        $("#help_show").slideToggle();
    });
    
    $('i.red').after('<span class="sr-only">This information is required</span>');
});