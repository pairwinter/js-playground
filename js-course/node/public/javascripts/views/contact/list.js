/**
 * Created with IntelliJ IDEA.
 * User: carl
 * Date: 7/14/12
 * Time: 2:21 PM
 * To change this template use File | Settings | File Templates.
 */
(function(view){

    view.contact.list = function(){};


    view.contact.list.initPage = function(context, orgId, isPrivate,isGroupLeader) {
		EB_Common.validation.validate("contactListform");
		var me = this;
        $("#contacts_gridTable").jqGrid({
            autoencode:true,
            url:context+"/contacts/json",
            datatype: "json",
            mtype:"post",
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
            colNames:[i18n['contact.field.id'],
                i18n['contact.field.firstName'],
                i18n['contact.field.middleInitial'],
                i18n['contact.field.lastName'],
                i18n['contact.field.suffix'],
                i18n['contact.field.externalId'],
                i18n['contact.field.recordTypeId'],
                i18n['contact.field.lastModifiedDate'],
                i18n['contact.field.lastModifiedName'],
                ''],
            colModel:[{name:'id',index:'id', hidden:true},
                {name:'firstName',index:'firstName', width:100, sorttype:"string",formatter:function(val,rec,rowObject){
                    return '<a onclick="event.stopPropagation();" href="'+context+'/contacts/show/'+rowObject.id+'">'+
                        $.jgrid.htmlEncode(val)+'</a>';
                }},
                {name:'middleInitial',index:'middleInitial', width:60},
                {name:'lastName',index:'lastName', width:90},{
                    name : 'suffix',
                    index : 'suffix',
                    width : 50
                },
                {name:'externalId',index:'externalId', width:90},
                {name:'recordTypeName',index:'recordTypeName', width:90,sortable:false},
                {name:'lastModifiedDate',index:'lastModifiedDate', width:120},
                {name:'lastModifiedName',index:'lastModifiedName', width:100, sorttype:"string" },
                {name:'id', index:'id', width:60,align:"center", sortable:false, formatter:function(value,rec,rowObject){
                    if(isGroupLeader&&isGroupLeader=='true'){
                        return '<a class="icn_edit_16 contact_jqgridEditRowBtn" title="'+i18n['button.update']+'"  href="javascript:void(0);" recordId="'+rowObject.id+'"></a>';
                    }else if (isPrivate=='true'){
                		return '<a class="icn_edit_16 contact_jqgridEditRowBtn" title="'+i18n['button.update']+'"  href="javascript:void(0);" recordId="'+rowObject.id+'"></a>'+
                            '<a class="icn_trash_16 contact_jqgridDeleteRowBtn" title="'+i18n['button.delete']+'"  href="javascript:void(0);" recordId="'+rowObject.id+'"></a>'+
                        	'<a class="icn_email_16 contact_jqgridSendToSSPBtn" title="'+i18n['button.send']+'" href="javascript:void(0);" recordId="'+rowObject.id+'"></a>';
                	}else{
                		return '<a class="icn_edit_16 contact_jqgridEditRowBtn" title="'+i18n['button.update']+'"  href="javascript:void(0);" recordId="'+rowObject.id+'"></a>'+
                            '<a class="icn_trash_16 contact_jqgridDeleteRowBtn" title="'+i18n['button.delete']+'"  href="javascript:void(0);" recordId="'+rowObject.id+'"></a>';
                	}
                    
                }}
            ],
            sortname:'lastName',
            sortorder:'asc',
            viewrecords:true,
            pager:"#contacts_gridPager",
            multiselect:true,
            multiselectWidth : 40,
            scrollOffset : 0,
            prmNames : {
                page:"pageNo", //
                totalrows:"totalrows" //
            },
            onSelectAll:function(aRowids,status){
                if(aRowids && aRowids.length>0 && status){
                    $(".canDisabled").removeAttr("disabled").removeClass("btn_disabled");
                    $(".canDisabled").find('i').removeClass("icn_gray");
                }else{
                    $(".canDisabled").attr("disabled",true).addClass("btn_disabled");
                    $(".canDisabled").find('i').addClass("icn_gray");
                }
            },
            onSelectRow:function(rowid,status){
                if(status){
                    $(".canDisabled").removeAttr("disabled").removeClass("btn_disabled");
                    $(".canDisabled").find('i').removeClass("icn_gray");
                }else{
                    var selr = $('#contacts_gridTable').jqGrid('getGridParam','selarrrow');
                    if(!selr||selr.length==0){
                        $(".canDisabled").attr("disabled",true).addClass("btn_disabled");
                        $(".canDisabled").find('i').addClass("icn_gray");
                    }
                }
            },
            loadComplete:function(dataStr){
                if($('#contacts_gridTable').getGridParam('records')>0){
                   $("#contact_downloadn_Btn").removeAttr("disabled").removeClass("btn_disabled");
                   $("#contact_downloadn_Btn").find('i').removeClass("icn_gray");
                }else{
                    $("#contact_downloadn_Btn").attr("disabled",true).addClass("btn_disabled");
                    $("#contact_downloadn_Btn").find('i').addClass("icn_gray");
                }
                $(".canDisabled").attr("disabled",true).addClass("btn_disabled");
                $(".canDisabled").find('i').addClass("icn_gray");

            },
            gridComplete:function(){
                $(".contact_jqgridDeleteRowBtn").click(function(event){
                    event.stopPropagation();
                    var id = $(this).attr("recordId");
                    EB_Common.dialog.confirm(
                        function(){
                            EB_Common.Ajax.remove("/contacts/"+id+"?version="+new Date().getMilliseconds()+Math.random(),null,
                                function(data){
                                    $("#contacts_gridTable").trigger("reloadGrid");
                                },null,
                                "json");
                            $(this).dialog("close");
                        },function(){
                            $(this).dialog("close");
                            return;
                        });
                });

                $(".contact_jqgridEditRowBtn").click(function(event){
                    event.stopPropagation();
                    location=context+'/contacts/update/'+$(this).attr("recordId");
                });
                $(".contact_jqgridSendToSSPBtn").click(function(event){
                    event.stopPropagation();
                    var contactId = $(this).attr("recordId");
                    EB_Common.dialog.confirm(i18n['contact.text.ssp.email.alert'],"warning",
                        function(){
                            EB_Common.Ajax.get("/sendemail/ssp/"+orgId+"/"+contactId+"?version="+new Date().getMilliseconds()+Math.random(), null,
                                function(data) {
                                    if ( data.status=="-2"){
                                        EB_Common.dialog.alert(i18n['contact.text.contactpath.null']);
                                        return;
                                    }else
                                    if (data.status=="0") {
                                        EB_Common.dialog.alert(i18n['contact.text.ssp.email.false']);
                                        return;
                                    }else
                                    if (data.status=="1"){
                                        EB_Common.dialog.alert(i18n['contact.text.ssp.email.success']);
                                        return;
                                    }
                                });
                            $(this).dialog("close");
                        } );
                });
            }
        });

        $("#simpleSearch").click(function(){
            var quickSearchValue = $("#quickSearchValue").val();
            $("#contacts_gridTable").jqGrid("clearGridData");
            $("#contacts_gridTable").jqGrid('setGridParam',{postData:{quickSearchValue:$.trim(quickSearchValue),filterRules:''},page:1})
                .trigger("reloadGrid");
        });
        $("#quickSearchValue").keypress(function(event){
            if(event.keyCode==13){
                $('#simpleSearch').click();
            }
        });

        $("#addBut").click(function(){
            document.location=context+"/contacts/create";
        });
        $("#contacts_deleteBatch").click(function(){
            var selr = jQuery('#contacts_gridTable').jqGrid('getGridParam','selarrrow');
            if(selr.length==0){
                EB_Common.dialog.alert("Please select one contact at least!","Error");
                return false;
            }
            EB_Common.dialog.confirm(
                function(){
                    EB_Common.Ajax.remove('/contacts/batchdelete/json?version='+new Date().getMilliseconds()+Math.random(),{ids:selr},function(){
                        $("#contacts_gridTable").trigger("reloadGrid");
                    },null,'json');
                    $(this).dialog("close");
                },function(){return;});
        });
        $('#contacts_clear_search').click(function(){
            $('#quickSearchValue').val('');
            $("#simpleSearch").click();
        });

        //show andvance search
        var isAdvancedSearched = false;

        var isFirstLoad = true;
        $('#forAdvanceSearch').click(function(){
            var search = $('#advancedsearch_div');
            if(search.is(":hidden")){
                if(isFirstLoad){
                    EB_Common.Ajax.get('/contacts/advancedSearch',{
                            isSavedAsRule:"true"
                        },function(r, s){
                            isFirstLoad = false;
                            $('#ajax_advancedSearch').html( r );
                            EB_View.contact.list.advancedSearch.setting.callback.beforeSearch=function(){
                                    isAdvancedSearched = true;
                                }
                        }
                    );

                }


                search.show();
            }else{
                search.hide();
                $("a[name='deleteSearch']").click();
                if(isAdvancedSearched){
                    $('#contacts_clear_search').click();
                    isAdvancedSearched = false;
                }
            }
        });

        //close andvance search
        $('#advancedsearch_div h3 span').click(function(){
            $(this).parent().parent().hide();
            $("a[name='deleteSearch']").click();
            if(isAdvancedSearched){
                $('#contacts_clear_search').click();
                isAdvancedSearched = false;
            }
        });
        $("#contact_downloadn_Btn").click(function(){
            var postData = $("#contacts_gridTable").getGridParam("postData");
            var selr = $('#contacts_gridTable').jqGrid('getGridParam','selarrrow');
            $("#contactDownloadForm").find('input[name="ids"]').remove();
            if(selr&&selr.length>0){
                for(var i=0;i<selr.length;i++){
                    $("#contactDownloadForm").append($('<input name="ids" type="hidden">').val(selr[i]));
                }
            }
//            $("#contactDownloadForm").attr("action",context+"/contacts/download");
            $("#contactDownloadForm").find('input[name="filterRules"]').val(postData.filterRules);
            $("#contactDownloadForm").find('input[name="quickSearchValue"]').val(postData.quickSearchValue);
            $("#contactDownloadForm").find('input[name="sidx"]').val(postData.sidx);
            $("#contactDownloadForm").find('input[name="sord"]').val(postData.sord);
            $("#contactDownloadForm").submit();
        });
        $("#addToGroupBut").click(function(){
            var selr = jQuery('#contacts_gridTable').jqGrid('getGridParam','selarrrow');
            if(selr.length==0){
                EB_Common.dialog.alert("Please select one contact at least!","Error");
                return false;
            }

            var settings = {
                autoOpen : false,
                modal: true,
                resizable: false,
                width:400,
                height:315,
                buttons: {
                    Ok : {
						click : function() {
							if ($("#groupId").val() == "") {
								EB_Common.dialog.alert(
										"Please select a group!", "Error");
								return false;
							}
							$.ajax({
								url : context + '/contacts/addtogroup/json?version='+new Date().getMilliseconds()+Math.random(),
								data : {
									ids : selr,
									groupId : $("#groupId").val()
								},
								type : 'post',
								dataType : 'json',
								success : function(data) {
									if (data.result == "success") {
										$("#selectGroupForm").dialog("close");
									} else {
										EB_Common.dialog
												.alert(
														i18n['contact.error.add.to.group.failed'],
														'Error');
									}
								}
							});
						},
						'class' : 'orange',
						text : i18n['global.dialog.button.ok']
					},
                    Cancel : {
						click : function() {
							$(this).dialog("close");
						},
						'class' : 'gray',
						text : i18n['global.dialog.button.cancel']
					}
                },
                
                open: function() {
		             $buttonPane = $(this).next();
		
		             /*$buttonPane.find('button:first').addClass('accept').addClass('ui-priority-primary');
		
		             $buttonPane.find('button:last').addClass('cancel').addClass('ui-priority-secondary');*/
		
		          },
                close:function(){
                    $("#groupName").text("");
                    $("#groupId").val("");
                    $("#contacts_gridTable").jqGrid('resetSelection');
                    $(".canDisabled").attr("disabled",true).addClass("btn_disabled");
                    $(".canDisabled").find('i').addClass("icn_gray");
                    $(this).dialog('destroy');
                }
            };
            $("#selectGroupForm").attr('title',i18n['contact.text.add.to.group']).dialog(settings);
            
            if(!me.loadGroupTree){// no loading
               var zSetting = {
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
		                selectedMulti: false
		            },
		            callback: {
		                onClick: zTreeOnlClick
		            }
		        };
            	$.ajax({
	                url:context+'/contacts/groups/tree/json?version='+new Date().getMilliseconds()+Math.random(),
	                dataType:'json',
                    async:true,
	                success: function(data){
	                    var zNodes = data;
	                    var zRootNode = {id:-1,name:i18n['contact.text.all.contact.group'],groups:zNodes, open:true};
	                    $.fn.zTree.init($("#contact_grouptree"), zSetting, zRootNode);
	                    $( "#selectGroupForm" ).dialog( "open" );
	                }
	            });
	            $("#showGroup").show();
            }else{
            	$( "#selectGroupForm" ).dialog( "open" );
            }
        });
        
        function zTreeOnlClick(event, treeId, treeNode) {
            if(treeNode.id==-1){
                var treeObj = $.fn.zTree.getZTreeObj(treeId);
                treeObj.cancelSelectedNode(treeNode);
                return false;
            }
            $("#groupName").text(treeNode.name);
            $("#groupId").val(treeNode.id);
        };

    };

})(EB_View)

