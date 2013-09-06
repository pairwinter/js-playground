(function() {
    EB_Common.views.home = {};
    $.extend(EB_Common.views.home, {
        initPage: function() {
            $('#sendMessage').validate();
            
            $("#btn_sendmessage").bind("click", function() {
                $("#sendmessage_box").show();
                $("#btn_sendmessage").hide();
            });

            $("#btn_send").bind("click", function() {
                if($('#sendMessage').valid()){
                    $("#btn_sendmessage").show();
                    $("#sendmessage_box").hide();
                }
            });
            $('#cancleBtn').click(function(){
                $("#btn_sendmessage").show();
                $("#sendmessage_box").hide();
            });

            $("#showmap").bind("click", function() {
                $("#locationmessage").show();
            });
            
            $('#subscrip_oneul li').click(function(){
                var el = $(this);
                var expanded = el.attr('expanded') === 'true' ? true : false;
                el.find('table')[expanded ? 'hide' : 'show']();
                el.find('h3 i').removeClass().addClass(expanded ? 'arrow_right' : 'arrow_down');
                el.attr('expanded',!expanded);
            });
        }
    });
})();
