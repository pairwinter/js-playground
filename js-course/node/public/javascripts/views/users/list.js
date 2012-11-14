/**
 * List User JavaScript.
 * User: tonyzhai
 * Date: 7/11/12
 * Time: 4:06 PM
 */
(function(view){
    view.user=function(){};
    view.user.list = function(){};
    view.user.list.initPage=function(context){
        var doDelete=this.doDelete;
        var doInactive=this.doInactive;
        var sendMail=this.sendMail;

        var rowsToColor = [];
        $("#gridTable").jqGrid({
            url:context+"/users",
            datatype: "json",
            autoencode:true,
            emptyDataCaption : i18n['global.grid.emptyDataCaption'],
            height: "auto",
            autowidth: true,
            colNames:[i18n['user.list.model.firstname'],i18n['user.list.model.lastname'],i18n['user.list.model.role'], i18n['user.list.model.lastModifiedDate'], i18n['user.list.model.lastModifiedBy'],i18n['user.list.model.status'],''],
            colModel:[
                {name:'firstname', index:'firstname',  width:200, formatter:function(firstname,rec,rowObject){
                    var onlineStatus=rowObject.onlineStatus;
                    var userStatus=rowObject.userStatus;
                    if(onlineStatus=='ONLINE'){
                        return '<i class="icon_user_online"></i>'+$.jgrid.htmlEncode(firstname);
                    }else if(userStatus=='NOTREGISTERED'){
                        return '<i class="icon_notregistereduser"></i>'+$.jgrid.htmlEncode(firstname);
                    }else{
                        return '<i class="icon_user_offline"></i>'+ $.jgrid.htmlEncode(firstname);
                    }

                }},
                {name:'lastname', index:'lastname',  width:200},
                {name:'roles',    index:'roles',     width:300,sortable:false, formatter:function(roles,rec){
                    var returnStr="";
                    if(roles != null){
                        for(var i=0;i<roles.length;i++){
                            returnStr+=roles[i].description+"</br>";
                        }
                        return returnStr;
                    }else{
                        return "";
                    }
                }},
                {name:'lastModifiedDate', index:'lastModifiedDate',width:200,formatter:function(userStatus,rec,rowObj){
                    return $.jgrid.htmlEncode(rowObj.lastModifiedDateStr);
                }},
                {name:'lastModifiedName',index:'lastModifiedName', width:200,sortable:true},
                {name:'userStatus',index:'userStatus', width:200,formatter:function(userStatus,rec,rowObj){
                    if(userStatus == 'INACTIVE'){
                        rowsToColor[rowsToColor.length] = rec.rowId;
                        return "Inactive";
                    }else if(rowObj.userStatus=="NOTREGISTERED"){
                        return "Not registered";
                    }else{
                        return "Active";
                    }
                }},
                {name:'id',index:'id', width:100, formatter:function(id,rec,rowObject){
                    var returnHtml="";

                    if(rowObject.userStatus=="INACTIVE"){
                        if(rowObject.userStatus=="INACTIVE"){
                            returnHtml='<a onClick=EB_View.user.list.initPage.doInactive("'+rowObject.userStatus+'",'+id+') href="javascript:void(0)" class="icn_undisable_16" title="'+i18n['button.enable']+'"></a>';
                        }else{
                            returnHtml='<a onClick=EB_View.user.list.initPage.doInactive("'+rowObject.userStatus+'",'+id+') href="javascript:void(0)" class="icn_undisable_16" title="'+i18n['button.disable']+'"></a>';
                        }
                    }else if(rowObject.userStatus=="NOTREGISTERED"){
                        returnHtml='<a onClick="EB_View.user.list.initPage.sendMail('+id+')" href="javascript:void(0)" class="icn_action_sendmail" title="'+i18n['button.mail']+'"></a>';
                    }else if(currentUserId != id && rowObject.onlineStatus!='ONLINE'){
                        if(rowObject.userStatus=="INACTIVE"){
                            returnHtml='<a onClick=EB_View.user.list.initPage.doInactive("'+rowObject.userStatus+'",'+id+') href="javascript:void(0)" class="icn_disable_16" title="'+i18n['button.enable']+'"></a>';
                        }else{
                            returnHtml='<a onClick=EB_View.user.list.initPage.doInactive("'+rowObject.userStatus+'",'+id+') href="javascript:void(0)" class="icn_disable_16" title="'+i18n['button.disable']+'"></a>';
                        }

                    }
                    if(rowObject.onlineStatus=="ONLINE"){
                        return '<a href='+context+'/users/'+id+' class="icn_edit_16" title="'+i18n['button.update']+'"></a>'+returnHtml;
                    }
                    return '<a href='+context+'/users/'+id+' class="icn_edit_16" title="'+i18n['button.update']+'"></a>'
                        +'<a onClick="EB_View.user.list.initPage.doDelete('+id+')" href="javascript:void(0)" class="icn_trash_16" title="'+i18n['button.delete']+'"></a>'
                        +returnHtml;

                }
                }
            ],
            jsonReader : {
                root: "data",
                page: "currentPageNo",
                total: "totalPageCount",
                records: "totalCount",
                repeatitems: false
            },
            viewrecords:true,
            onSelectAll:function(param1,param2){
                initButton();
            },
            onSelectRow:function(id){
                initButton();
            },
            pager:"#gridPager",
            //caption: "User List",
            multiselect:false,
            gridComplete: function () {
                for (var i = 0; i < rowsToColor.length; i++) {
                    var status = $("#" + rowsToColor[i]).find("td").eq(6).html();
                    if (status == "Inactive") {
                        $("#" + rowsToColor[i]).find("td").css("color", "#cccccc");
                    }
                }
            },
            prmNames :{
                page:"page",
                rows:"size"
            }
        });

        function initButton(){
            var selIds=$("#gridTable").getGridParam('selarrrow');
            if(selIds.length>0){
                $("#btn_batch_switch_status").removeAttr("disabled");
                $("#btn_batch_delete").removeAttr("disabled");
                $("#btn_batch_switch_status").removeClass("btn_disabled");
                $("#btn_batch_delete").removeClass("btn_disabled");
                $("#batchDis").attr("class","");
                $("#batchDel").attr("class","icn_action_delete");
            }else{
                $("#btn_batch_switch_status").attr("disabled","disabled");
                $("#btn_batch_delete").attr("disabled","disabled");
                $("#btn_batch_switch_status").addClass("btn_disabled");
                $("#btn_batch_delete").addClass("btn_disabled");
                $("#batchDis").attr("class","");
                $("#batchDel").attr("class","icn_action_delete_gray");
            }
        }

        $("#reset").click(function(){
            $(":input[name='firstname']").val("");
            $(":input[name='lastname']").val("");
        });
        $("#search_input").click(function(e){
            e.preventDefault();
            var queryString=encodeURIComponent($(":input[name='queryString']").val());
            $("#gridTable").jqGrid('setGridParam',{postData:{queryString:queryString},page:1}).trigger("reloadGrid");
        });

        $("#btn_add").click(function(){
            window.location.href=context+"/users/create";
        });

        $("#btn_batch_switch_status").click(function(){
            var ids=$("#gridTable").getGridParam('selarrrow');
            EB_Common.dialog.confirm(i18n['user.list.confirm.disable'],i18n['user.list.warning'],
                function(){
                    EB_Common.Ajax.post("/users?batch",{ids:ids,_method:'PUT'},function(data){
                        $("#gridTable").trigger("reloadGrid");
                        initButton();
                    },"json");
                    $(this).dialog("close");

                },function(){
                    return;
                }
            );
        });

        $("#btn_batch_delete").click(function(){
            var ids=$("#gridTable").getGridParam('selarrrow');
            if(ids==""){
                EB_Common.dialog.alert(i18n['user.list.least']);
                return;
            }
            EB_Common.dialog.confirm(i18n['user.list.confirm.delete'],i18n['user.list.warning'],
                function(){
                    EB_Common.Ajax.post("/users?batch",{ids:ids,_method:'DELETE'},function(data){
                        $("#gridTable").trigger("reloadGrid");
                    },"json");
                    $(this).dialog("close");
                },function(){
                    return;
                }
            );
        });
    };
    view.user.list.initPage.doDelete=function(id){
        EB_Common.dialog.confirm(i18n['user.list.confirm.delete'],i18n['user.list.warning'],
            function(){
                EB_Common.Ajax.post("/users/"+id,{_method:'DELETE'},function(data){
                    if(data.status=="failed"){
                        EB_Common.dialog.alert('This user already deleted.');
                    }
                    $("#gridTable").trigger("reloadGrid");
                },"json");
                $(this).dialog("close");
            },function(){
                return;
            }
        );
    };

    view.user.list.initPage.doInactive=function(status,id,obj){
        if(status=="INACTIVE"){
            EB_Common.dialog.confirm(i18n['user.list.confirm.enable'],i18n['user.list.warning'],
                function(){
                    EB_Common.Ajax.post("/users?switch",{_method:'PUT',id:id},function(data){
                        $("#gridTable").trigger("reloadGrid");
                    },"json");
                    $(this).dialog("close");

                },function(){
                    return;
                }
            );
        }else{
            EB_Common.dialog.confirm(i18n['user.list.confirm.disable'],i18n['user.list.warning'],
                function(){
                    EB_Common.Ajax.post("/users?switch",{_method:'PUT',id:id},function(data){
                        $("#gridTable").trigger("reloadGrid");
                    },"json");
                    $(this).dialog("close");

                },function(){
                    return;
                }
            );
        }

    };

    view.user.list.initPage.sendMail=function(id){
        /*EB_Common.dialog.confirm(i18n['user.list.confirm.mail'],i18n['user.list.warning'],
            function(){
                EB_Common.Ajax.post("/users?mail",{id:id},function(data){
                    $("#gridTable").trigger("reloadGrid");
                },"json");
                $(this).dialog("close");
            },function(){
                return;
            }
        );*/
        EB_Common.Ajax.post("/users?mail",{id:id},function(data){
            if(data.status!=""){
                EB_Common.dialog.alert(i18n['user.list.mail.success']);
            }else{
                EB_Common.dialog.alert(i18n['user.list.mail.fail']);
            }
        },"json");
    };
})(EB_View)