(function() {
    EB_Common.views.signUp = {};
    $.extend(EB_Common.views.signUp, {
        passwordRule: [/[a-z]+/g, /[A-Z]+/g, /\d+/g, /[!@#\$\%\^&\*\(\)]/g],
        currentPopover: undefined,
        initPage: function() {
            $('#signUpForm').validate({
                rules: {
                    acceptInput: {
                        required: true
                    }
                },
                messages: {
                    acceptInput: {
                        required: 'In order to use our services, you must agree to Terms of use.'
                    }
                },
                submitHandler: function(form) {
                    $('#successInfo').show();
                    var fn = function() {
                        form.submit();
                    };
                    setTimeout(fn, 500);
                }
            });

            $('#acceptCheckbox').change(function() {
                $('#acceptInput').val($(this).prop('checked') ? 'true' : '').valid();
            });

            $('#password').on({
                keyup: function(e) {
                    me.validPassword(e);
                },
                focus: function(e) {
                    me.validPassword(e);
                }
            });

            $('#createBtn').click(function() {
                $('#acceptCheckbox').change();
            });
        },
                
        validPassword: function(e) {
            var el = $(e.target);
            var val = el.val();
            var num = 0;
            for (var i = 0; i < 4; i++) {
                var re = this.passwordRule[i];
                if (val.search(re) != -1) {
                    num++;
                }
            }
            $('#passwordRule div').css('visibility', 'hidden');
            if ($.trim(val).length >= 8) {
                if (num == 1) {
                    $('#passwordRule div:eq(0)').css('visibility', 'visible');
                } else if (num == 2 || num == 3) {
                    $('#passwordRule div:lt(2)').css('visibility', 'visible');
                } else if (num == 4) {
                    $('#passwordRule div').css('visibility', 'visible');
                }
            }
        }
    });
})();
