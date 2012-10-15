/**
 * Created with IntelliJ IDEA.
 * User: carl
 * Date: 7/5/12
 * Time: 11:13 AM
 * To change this template use File | Settings | File Templates.
 */
(function(view){
    view.contactManage = function(){};
    view.contact = function() {};
    view.contactManage.initPage=function(local,context){
        /*$( "#tabs" ).tabs({
            ajaxOptions: {
                error: function( xhr, status, index, anchor ) {
                    $( anchor.hash ).html(
                        "Couldn't load this tab. We'll try to fix this as soon as possible. " +
                            "If this wouldn't be a demo." );
                }
            }
        });*/
        $('#mytab0 a').click(function(e){
//            $.ajaxStop();
            e.preventDefault();
            var href = $(this).attr('href');;
            var tabs = $('#mytab0 a');
            var length = tabs.length;
            for(var i=0;i<length;i++){
                tabs.eq(i).removeClass('mouse_out');
            }
            $(this).addClass('mouse_out');
//            location.hash="#"+$(this).attr("id");
            //remote
            EB_Common.dialog.destroyAll();
            EB_Common.Ajax.ajax({
                url : href,
				type : 'get',
				success : function(r, s) {
					$('#mytab0_Cont0').html(r);
				}
			});
        });
        var hash = "#"+ $('#mytab0 a:first-child').attr("id");
        hash = location.hash||hash;
        $(hash).click();

    };
})(EB_View)
