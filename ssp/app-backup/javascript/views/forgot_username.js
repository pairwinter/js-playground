(function() {
    EB_Common.views.forgotUsername = {};
    $.extend(EB_Common.views.forgotUsername, {
        initPage: function() {
            $('#form1').validate({
                submitHandler: function(form) {
                    form.submit();
                }
            });
        }
    });
})();
