(function() {
    EB_Common.views.main = {};
    $.extend(EB_Common.views.main, {
        initProfilePage: function() {
            $('#mainForm').validate({
                submitHandler: function(form) {
                    $('#successInfo').show();
                    var fn = function(){
                        form.submit();
                    };
                    setTimeout(fn, 500);
                }
            });
        },
        initLocationPage: function() {
            $('#mainForm').validate({
                submitHandler: function(form) {
                    form.submit();
                }
            });
            $('#myLocation').click(function() {
                var edit = $('#addLocation').data('edit');
                $('#addLocation').removeData('edit');
                if (!edit) {
                    var html = '<tr>\n\
                        <td>Home 1</td>\n\
                        <td>23 mAIN sT. Waltham .MA</td>\n\
                        <td><a class="btn btn-link" editlink href="#">Edit</a> \n\
                            <a class="btn btn-link" deletelink>Delete</a></td>\n\
                    </tr>';
                    $('#locationGrid tbody').append(html);
                }
                $('#locationList').show();
                $('#locationContainer').empty();
                $('#addLocation,#saveContinue').show();
                $('#verifyAddress,#skipThis').hide();
            });
            $('#addLocation').click(function() {
                var anotherLocation = $('#anotherLocationTmpl').clone();
                $('#locationContainer').append(anotherLocation.html());
                $('#verifyAddress,#skipThis').show();
                $('#addLocation,#saveContinue').hide();
            });

            $('#locationGrid').on('click', 'a.btn-link', function(e) {
                e.preventDefault();
                var el = $(this);
                var type = el.attr('editlink') !== undefined ? 'edit' : 'delete';
                if (type == 'edit') {
                    var anotherLocation = $('#anotherLocationTmpl').clone();
                    $('#locationContainer').append(anotherLocation.html());
                    $('#locationContainer input[name="address"]').val('23 mAIN sT. Waltham .MA');
                    $('#verifyAddress,#skipThis').show();
                    $('#addLocation,#saveContinue').hide();
                    $('#addLocation').data('edit', true);
                } else {
                    el.closest('tr').remove();
                }
            });

        },
        initEditProfilePage: function() {
            $("#change_pswlink").bind("click", function(e) {
                e.preventDefault();
                $("#change_pswbox").show();
            });

            $("#change_sqlink").bind("click", function(e) {
                e.preventDefault();
                $("#change_sqbox").show();
            });
            var locationHref = window.location.href;
            if (locationHref.indexOf('from=review') != -1) {
                $('#mainForm').attr('action','main_review.html');
            }
            
            $('#mainForm').validate({
                submitHandler: function(form) {
                    form.submit();
                }
            });
            $('#cancelBtn').click(function(){
                window.location.href = $('#mainForm').attr('action');
            });
        },
        initEditSubscriptionPage : function(){
            var locationHref = window.location.href;
            if (locationHref.indexOf('from=review') != -1) {
                $('#mainForm').attr('action','main_review.html');
            }
            $('#cancelBtn').click(function(){
                window.location.href = $('#mainForm').attr('action');
            });
        },
        
        initEditInformationPage : function(){
            var locationHref = window.location.href;
            if (locationHref.indexOf('from=review') != -1) {
                $('#mainForm').attr('action','main_review.html');
            }
            $('#cancelBtn').click(function(){
                window.location.href = $('#mainForm').attr('action');
            });
        },
                
        initEditLocationPage : function(){
            var locationHref = window.location.href;
            if (locationHref.indexOf('from=review') != -1) {
                $('#mainForm').attr('action','main_review.html');
            }
            
            $('#mainForm').validate({
                submitHandler: function(form) {
                    form.submit();
                }
            });
            $('#myLocation').click(function() {
                var add = $('#addLocation').data('add');
                $('#addLocation').removeData('add');
                if (add) {
                    var html = '<tr>\n\
                        <td>Home 1</td>\n\
                        <td>23 mAIN sT. Waltham .MA</td>\n\
                        <td><a class="btn btn-link" editlink href="#">Edit</a> \n\
                            <a class="btn btn-link" deletelink>Delete</a></td>\n\
                    </tr>';
                    $('#locationGrid tbody').append(html);
                }
                $('#locationContainer').empty();
                $('#addLocation').show();
                $('#verifyAddress').hide();
            });
            $('#addLocation').click(function() {
                var anotherLocation = $('#anotherLocationTmpl').clone();
                $('#locationContainer').append(anotherLocation.html());
                $('#verifyAddress').show();
                $('#addLocation').hide();
                $('#addLocation').data('add', true);
            });

            $('#locationGrid').on('click', 'a.btn-link', function(e) {
                e.preventDefault();
                var el = $(this);
                var type = el.attr('editlink') !== undefined ? 'edit' : 'delete';
                if (type == 'edit') {
                    var anotherLocation = $('#anotherLocationTmpl').clone();
                    $('#locationContainer').append(anotherLocation.html());
                    $('#locationContainer input[name="address"]').val('23 mAIN sT. Waltham .MA');
                    $('#verifyAddress').show();
                    $('#addLocation').hide();
                } else {
                    el.closest('tr').remove();
                }
            });
            $('#cancelBtn').click(function(){
                window.location.href = $('#mainForm').attr('action');
            });
        }
    });
})();
