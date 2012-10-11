/**
 * Create User JavaScript.
 * User: tonyzhai
 * Date: 7/11/12
 * Time: 2:34 PM
 */
(function(view){
    view.user=function(){};
    view.user.create = function(){};
    view.user.create.initPage=function(context){
        var doDelete=this.doDelete;

        EB_Common.validation.validate("validation-form",{rules: {}});

        $("#roleSelect").change(function(){
            var value=$(this).val();
            if(value=="role_org_admin" || value=="role_api_user"){
                $("#orgLi").css("display","block");
                $("#leaderSelect").css("display","none");
                $("#tree_divpanel").css("display","none");
            }else if(value=="role_group_leader"){
                $("#orgLi").css("display","none");
                $("#leaderSelect").css("display","block");
                $("#tree_divpanel").css("display","block");
            }else{
                $("#orgLi").css("display","none");
                $("#leaderSelect").css("display","none");
                $("#tree_divpanel").css("display","none");
            }
            $("#orgSelect").val("");
            $("#leaderSelect").val("");
        });

        $("#leaderSelect").change(function(){
            if($(this).val()==""){
                return;
            }
            var orgId=$(this).val();
            EB_Common.Ajax.get("/users/group/tree",{orgId:orgId.split("-")[0]},function(data){
                    var zSetting = {
                        check:{
                            enable:true,
                            chkStyle:"checkbox",
                            chkboxType: { "Y" : "s", "N" : "s" }
                        },
                        data : {
                            keep : {
                                leaf : false,
                                parent : false
                            },
                            key : {
                                checked : "checked",
                                children : "groups",
                                name : "name",
                                id:"id",
                                title : ""
                            }
                        },

                        view: {
                            selectedMulti: true
                        },
                        callback: {
                            //beforeRename: zTreeBeforeRename,
                            //onClick: zTreeOnClick
                            //beforeRemove: zTreeBeforeRemove,
                            //onDrop: zTreeOnDrop
                            onCheck:zTreeOnCheck
                        }
                    };
                    function zTreeOnCheck(event, treeId, treeNode) {
                        //alert(treeNode.tId + ", " + treeNode.name + "," + treeNode.checked);
                        var treeObj = $.fn.zTree.getZTreeObj("groupTree");
                        //treeObj.setChkDisabled(treeNode,true);
                        //var nodes =  treeObj.getNodesByParam("id",treeNode.id,null);
                        var nodes=treeNode.groups;
                        /*if(nodes!=null){
                            if(treeNode.checked==true){
                                for (var i=0, l=nodes.length; i < l; i++) {
                                    treeObj.setChkDisabled(nodes[i], true);
                                }
                            }else{
                                for (var i=0, l=nodes.length; i < l; i++) {
                                    nodes[i].checked=false;
                                    treeObj.setChkDisabled(nodes[i], false);
                                }
                            }
                        }*/
                    };
                    var zNodes = data;
                    var zRootNode = {id:-1, name:"Groups",groups:zNodes, open:true};
                    var selectTreeObj = $.fn.zTree.init($("#groupTree"), zSetting, zRootNode);
            },"json");
        });

        $("#add_role").click(function(){
            var roleTemplete=$("#roleSelect").val();
            var index=$("#roleTable").children().eq(0).children().length;
            var trId=index+"-"+roleTemplete;
            if(roleTemplete=="role_account_admin"){
                var newTr='<tr id="tr'+trId+'">'
                    +'<td></td><input type="hidden" name="organization" value="">'
                    +'<td>'+i18n["user.role.account.admin"]+'</td><input name="role" type="hidden" value="'+roleTemplete+'">'
                    +'<td></td><input name="groups" type="hidden" value="">'
                    +'<td><a onClick=EB_View.user.create.initPage.doDelete("'+trId+'") class="icn_trash_16" href="javascript:void(0)"></a></td></tr>';
                $("#roleTable").append(newTr);
                $("#roleLi").css("display","none");
            }else if(roleTemplete=="role_org_admin"){
                var orgId=$("#orgSelect").val();
                var flag=false;
                if(orgId==""){
                    EB_Common.dialog.alert(i18n['user.create.select_org.label']);
                    return;
                }
                $(":hidden[name='organization']").each(function(){
                    if($(this).val()==orgId.split("-")[0]){
                        EB_Common.dialog.alert(i18n['user.org_selected_message']);
                        flag=true;
                        return;
                    }
                });
                if(flag){
                    return;
                }
                var newTr='<tr id="tr'+trId+'">'
                    +'<td>'+orgId.split("-")[1]+'</td><input type="hidden" name="organization" value="'+orgId.split("-")[0]+'">'
                    +'<td>'+i18n["user.role.org.admin"]+'</td><input name="role" type="hidden" value="'+roleTemplete+'">'
                    +'<td></td><input name="groups" type="hidden" value="">'
                    +'<td><a onClick=EB_View.user.create.initPage.doDelete("'+trId+'") class="icn_trash_16" href="javascript:void(0)"></a></td></tr>';
                $("#roleTable").append(newTr);
                $("#account_admin_option").css("display","none");
            }else if(roleTemplete=="role_group_leader"){
                var orgId=$("#leaderSelect").val();
                var flag=false;
                if(orgId==""){
                    EB_Common.dialog.alert(i18n['user.create.select_org.label']);
                    return;
                }

                var treeObj = $.fn.zTree.getZTreeObj("groupTree");
                var nodes = treeObj.getCheckedNodes(true);
                //var nodes=treeObj.getNodesByFilter(filter)
                var groupNameStr="";
                var groupIdStr=",";
                if(nodes.length==0 || (nodes.length==1 && nodes[0].id==-1)){
                    EB_Common.dialog.alert(i18n['user.create.select_group.label']);
                    return;
                }
                $(":hidden[name='organization']").each(function(){
                    if($(this).val()==orgId.split("-")[0]){
                        EB_Common.dialog.alert(i18n['user.org_selected_message']);
                        flag=true;
                        return;
                    }
                });
                if(flag){
                    return;
                }
                var rootNode = treeObj.getNodeByParam("id", -1, null);
                if(rootNode.checked){
                    for(var i=1;i<nodes.length;i++){
                        groupNameStr+=nodes[i].name+"</br>";
                        groupIdStr+=nodes[i].id+",";
                    }
                }else{
                    for(var i=0;i<nodes.length;i++){
                        groupNameStr+=nodes[i].name+"</br>";
                        groupIdStr+=nodes[i].id+",";
                    }
                }

                var newTr='<tr id="tr'+trId+'">'
                    +'<td>'+orgId.split("-")[1]+'</td><input type="hidden" name="organization" value="'+orgId.split("-")[0]+'">'
                    +'<td>'+i18n["user.role.group.leader"]+'</td><input name="role" type="hidden" value="'+roleTemplete+'">'
                    +'<td>'+groupNameStr+'</d><input name="groups" type="hidden" value="'+groupIdStr+'">'
                    +'<td><a onClick=EB_View.user.create.initPage.doDelete("'+trId+'") class="icn_trash_16" href="javascript:void(0)"></a></td></tr>';
                $("#roleTable").append(newTr);
            }else{
                EB_Common.dialog.alert(i18n['user.create.select_role_label']);
            }
        });

        $("#gridTable").jqGrid({
            url:context+"/users/link/json",
            datatype: "json",
            mtype:"get",
            autoencode:true,
            postData:{orgId:orgId},
            contentType: "application/json",
            emptyDataCaption : i18n['global.grid.emptyDataCaption'],
            jsonReader : {
                root: "data",
                page: "currentPageNo",
                total: "totalPageCount",
                records: "totalCount",
                repeatitems: false
            },
            height: "auto",
            autowidth : true,
            rowNum: 10,
            rowList: [10],

            colNames:['',
                      i18n['contact.field.firstName'],
                      i18n['contact.field.lastName'],
                      i18n['contact.field.externalId']],
            colModel:[
                      {name:'id',index:'id', width:20,sortable:false,formatter:function(firstname,rec,rowObject){
                            return '<input type="radio" value="'+rowObject.id+'" name="contactRecord">';
                      }},
                      {name:'firstName',index:'firstName', width:150,sortable:false},
                      {name:'lastName',index:'lastName', width:150,sortable:false},
                      {name:'externalId',index:'externalId',width:150,sortable:false}
            ],
            sortname:'firstname',
            onSelectRow:function(id){
                //alert(id);
            },
//            beforeSelectRow: function(rowid, e)
//            {
//                $("#gridTable").jqGrid('resetSelection');
//                return(true);
//            },
            sortorder:'asc',
            viewrecords:true,
            pager:"#gridPager",
            //caption: "User List",
            multiselect:false,
            prmNames : {
                page:"pageNo", //
                totalrows:"rows" //
            }
        });

        $("#contactOrgSelect").change(function(){
            orgId=$(this).val();
        });

        $("#orgSearch").click(function(){
            if($("#contactOrgSelect").val()==""){
                EB_Common.dialog.alert(i18n['user.create.select_org.label']);
                return;
            }
            var queryString=$("#queryString").val();
            $("#gridTable").jqGrid('setGridParam',{postData:{firstName:queryString,orgId:orgId}}).trigger("reloadGrid");
        });

        EB_Common.dialog.dialog('dialog',{
            autoOpen: false,
            width:625,
            height:"auto",
            modal:true,
            buttons: {
                    Link: {
                        click: function() {
                            var isSelected=false;
                            var contactId="";
                            var firstName="";
                            var lastName="";
                            var externalId="";
                            $("input[name='contactRecord']").each(function(){
                                if($(this).attr("checked")=="checked"){
                                    isSelected=true;
                                    contactId=$(this).val();
                                    firstName=$(this).parents().next().html();
                                    lastName=$(this).parents().next().next().html();
                                    externalId=$(this).parents().next().next().next().html();
                                }
                            });
                            if(!isSelected){
                                EB_Common.dialog.alert(i18n['user.create.contact.least']);
                                return;
                            }
//                            var selContactId=$("#gridTable").getGridParam('selarrrow');
//                            if(selContactId==""){
//                                EB_Common.dialog.alert(i18n['user.create.contact.least']);
//                                return;
//                            }
                            //var rowData = $("#gridTable").getRowData(selContactId);
                            $("#contactId").val(contactId);
                            $("#contactOrgId").val(orgId);
                            var firstName=firstName;
                            var lastName=lastName;
                            var externalId=externalId;
                            var htmlStr='<div id="contactDiv" class="contact_hidden nowrap"><a id="contactName" href="javascript:void(0)" class="a_link b-tooltip" tipAttach="map" tipcaption="'+i18n['user.create.contact.firstname']+':'+firstName+'<br/>'+i18n['user.create.contact.lastname']+':'+lastName+'<br/>'+i18n['user.create.contact.external']+':'+externalId+'">'+firstName+'</a><a  href="javascript:void(0)" id="btn_delete_contact" class="icn_trash_16"  ></a></div>';
                            $("#dialog_link").hide();
                            $("#dialog_link").after(htmlStr);
                            $("#btn_delete_contact").click(function(){
                                $("#contactId").val("");
                                $("#contactOrgId").val("");
                                $("#contactDiv").remove();
                                $("#dialog_link").show();
                            });
                            $(this).dialog("close");

                        },
                        'class':'orange',
                        text:'Link'

                    }  ,
                Cancel : {
                    click : function() {
                        $(this).dialog("close");
                    },
                    'class' : 'gray',
                    text : i18n['global.dialog.button.cancel']
                }
            }

        });

        $('#dialog_link').click(function(){
            $('#dialog').dialog('open');
            $('#launch_tb').show();
            $('#sender_tb').show();
            $('#throttling_tb').show();
            $('#delivery_tb').show();
            $('#methods_tb').show();
            return false;
        });

        $("#btn_save").click(function(){
            if($("#validation-form").valid()){
                if($(":hidden[name='role']").length>0){
                    if($("#btn_save").attr("hadSubmit")=="true"){
                        return false;
                    }
                    $("#btn_save").attr("hadSubmit","true");
                    $("#validation-form").submit();
                }else{
                    EB_Common.dialog.alert(i18n['user.create.select_role_label']);
                    return;
                }
            }
        });

    };
    view.user.create.initPage.doDelete=function(id){
        $("tr[id=tr"+id+"]").remove();
        var trId=id.split("-");
        if(trId[1]=="role_account_admin"){
            $("#roleLi").css("display","block");
        }else if(trId[1]=="role_org_admin" || trId[1]=="role_group_leader"){
            if($(":hidden[name='organization']").length==0){
                $("#account_admin_option").css("display","block");
            }
        }
    }


})(EB_View)