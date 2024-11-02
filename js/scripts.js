$(document).ready(function() {
    $('.progress').each(function() {
        $(this).animate({
            width: $(this).data('percentage') + '%'
        }, 1000);
    });
});
