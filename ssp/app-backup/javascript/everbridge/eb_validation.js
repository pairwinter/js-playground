(function() {
    $.validator.setDefaults({
        onfocusout: function(e) {
            $(e).valid();
        },
        ignore: ':hidden, :button',
        errorClass: 'text-danger'
    });
    var customMethod = {
    };
    //add method to jquery.validator
    for (var c in customMethod) {
        var method = customMethod[c];
        $.validator.addMethod(c, method.fun, method.message);
    }
})();