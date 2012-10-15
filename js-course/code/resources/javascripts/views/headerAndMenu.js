/**
 * Created with IntelliJ IDEA.
 * User: carl
 * Date: 7/13/12
 * Time: 4:35 PM
 * To change this template use File | Settings | File Templates.
 */
(function(view){
    view.headerAndMenu = function(){};
    view.headerAndMenu.initMenuPage = function(){
        $("#changeLanguage").click(function(){
            if($("#languageUL").is(":hidden")){
                $("#languageUL").show();
                $("#language_gray").removeClass("icon_gray_downarrow").addClass("icon_gray_uparrow");
                $("#languageUL > li").bind('click',function(){
                    $("#languageUL").hide();
                    var newUrl = $.queryUrl.set("lang", $(this).attr("id"));
                    window.location = newUrl;
                });
            }else{
                $("#languageUL").hide();
                $("#language_gray").removeClass("icon_gray_uparrow").addClass("icon_gray_downarrow");
                $("#languageUL > li").ubbind('click');
            }

        });
        $("#changeOrg").click(function(){
            alert ("headerAndMenu.js  changeOrg");
            if($("#orgUL").is(":hidden")){
                $("#orgUL").show();
                $("#org_gray").removeClass("icon_gray_downarrow").addClass("icon_gray_uparrow");
                $("#orgUL > li").bind("click",function(){
                    var orgId=$(this).attr("id").split("_")[1];
                    EB_Common.Ajax.post("/settings?init",{orgId:orgId},function(data){
                        var newUrl = $.queryUrl.set("orgId", orgId);
                        window.location = newUrl;
                    },"json");
                });
            }else{
                $("#orgUL").hide();
                $("#org_gray").removeClass("icon_gray_uparrow").addClass("icon_gray_downarrow");
                $("#orgUL > li").unbind("click");
            }
        });
        
        $("#portalHelp").click(function(){
            EB_Common.Ajax.get("/portalHelp",function(data){
                if (data.url) {
                    window.open(data.url, "_blank", "toolbar=no,titlebar=no,location=no");
                } else if (data.error) {
                    EB_Common.dialog.alert(data.error);
                }
            },"json");
        });
    }
})(EB_View)
