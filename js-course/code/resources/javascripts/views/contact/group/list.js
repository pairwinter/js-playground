/**
 * Created with IntelliJ IDEA.
 * User: carl
 * Date: 7/14/12
 * Time: 3:10 PM
 * To change this template use File | Settings | File Templates.
 */

(function(view){
    view.contact.group = function(){};
    view.contact.group.initPage=function(groupsJson,context,isGroupLeader){
        /**
         zTree function
         */
        var setting = {

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
                    parentId:"parentId"
                }
            },
            edit: {
                enable: true,
                drag: {
                    isCopy: false,
                    isMove: true
                }
            },
            view: {
                selectedMulti: false
            },
            callback: {
                beforeRename: zTreeBeforeRename,
                onClick: zTreeOnClick,
                beforeRemove: zTreeBeforeRemove,
                onDrop: zTreeOnDrop,
                beforeDrop:zTreeBeforeDrop
            }
        };
        if(isGroupLeader&&isGroupLeader=='true'){
            setting.edit={};
        }
        function zTreeBeforeDrop(treeId, treeNodes, targetNode, moveType) {
            return !(targetNode == null || (moveType != "inner" && !targetNode.parentTId));
        };
//        var zNodes = eval("("+groupsJson+")");
		var rootNode = {id:-1,name:i18n['contact.text.all.contact.group'],groups:groupsJson, open:true};
		var treeObj = $.fn.zTree.init($("#grouptree"), setting, rootNode);
		var isNotLive = false;
		function zTreeBeforeRename(treeId, treeNode, newName){
//            var treeObj = $.fn.zTree.getZTreeObj(treeId);

            if(treeNode.id==-1){
                treeObj.cancelEditName();
                return false;
            }
            var hasError = true;
			var parentNode = treeNode.getParentNode();
			var parentId = (parentNode==null)?-1:parentNode.id;
            if($.trim(newName) == "")
            {
                //EB_Common.dialog.alert("empty","Error");
                treeObj.cancelEditName();
                if($.trim(treeNode.id)==""){
                    treeObj.removeNode(treeNode);
                }
                return false;
            }
			if($.trim(treeNode.id)!="" && treeNode.name==newName){

			    return;
			}
			$.ajax({
		        url:context+'/contacts/groups/tree/json',
		        data:{
		        	id:treeNode.id,
		        	name:newName,
		        	parentId:parentId},
		        dataType:'json',
		        type:'post',
//		        global:false,
                async: false,
		        success: function(data){
		            if(data.result=="success"){
		        	    treeNode.id=data.group.id;
		        	    treeNode.parentId=data.group.parentId;
		        	    treeNode.lastModifiedName=data.group.lastModifiedName;
		        	    treeNode.lastModifiedDate=data.group.lastModifiedDate;
                        hasError = false;
	        	    }
		         }
		    });
            if(hasError) {
                if($.trim(treeNode.id)=="" ){
                    treeObj.removeNode(treeNode);
                }else{
                    treeObj.cancelEditName();
                }
                return false;
            }
            else
                return true;
		};
		function zTreeOnClick(event, treeId, treeNode) {
            $(".canDisabled").attr("disabled",true);
		    if(treeNode.id==-1){
                if(isGroupLeader=="true"){
                    treeObj.cancelSelectedNode(treeNode);
                    return false;
                }
				$('#selectedGrid').hide();
				$('#noSelectGrid').show();
		    	return false;
		    }
		    
		    $('#selectedGrid').show();
			$('#noSelectGrid').hide();
		    $("#grouInfo1").text(treeNode.name);
		    $("#grouInfo2").text(treeNode.lastModifiedDate+", "+treeNode.lastModifiedName);
            $("#group_gridTable").jqGrid('clearGridData');
		    $("#group_gridTable").jqGrid('setGridParam',{datatype:'json',postData:{groupId:treeNode.id}});
//                                    .jqGrid('setGridParam',{});
//                                    .trigger("reloadGrid");
            $("#group_contacts_quickSearchValue").val('');
            $("#group_contacts_simpleSearch").click();
		};
		function zTreeBeforeRemove(treeId, treeNode) {
            EB_Common.dialog.confirm(
                function(){
                    if(treeNode.id==-1){return false;}
                    EB_Common.Ajax.post("/contacts/groups/tree/json/"+treeNode.id+"?version="+new Date().getMilliseconds()+Math.random(),
                        {_method:'DELETE'},
                        function(data){
                            $("#grouInfo1").empty();
                            $("#grouInfo2").empty();
                            $("#group_gridTable").jqGrid('clearGridData');
                            treeObj.removeNode(treeNode,false);
                        },
                        "json");
                    $(this).dialog("close");
                },function(){
                    $(this).dialog("close");
                    return false;
                });
            return false;

		}

		function zTreeOnDrop(event, treeId, treeNodes, targetNode, moveType) {
            if(!targetNode)return false;
		    moveForAjax(treeNodes[0].id, targetNode.id);
		};

		function moveForAjax(id,parentId){
		    EB_Common.Ajax.post("/contacts/groups/tree/json/"+id+"?version="+new Date().getMilliseconds()+Math.random(),
    		        {
		        	parentId:parentId,
		        	_method:'PUT'},
    		        function(data){
		        	    if(data.result=="succes"){
	    		            $("#grouInfo1").empty();
	    				    $("#grouInfo2").empty();
	    		            $("#group_gridTable").jqGrid('clearGridData');
		        	    }else{
		        	        return false;
		        	    }
    				},
    				"json");
		};
		$("#addGroup").click(function(){
		    if(isNotLive){return false;}
		    var nodes = treeObj.getSelectedNodes();
	        var newNode = {id:'',name:"New Group"};
		    if(nodes==null || nodes.length==0){
		        EB_Common.dialog.alert("Please select a node!");
		        return false;
		    }else{
		        var currentNode = nodes[0];
		        newNode = treeObj.addNodes(currentNode, newNode)[0];
		    }
		    treeObj.editName(newNode);
		});

		$("#renameGroup").click(function(){
		    var nodes = treeObj.getSelectedNodes();
		    if(nodes==null || nodes.length==0){
		        EB_Common.dialog.alert("Please select a node!");
		        return false;
		    }else{
		        var currentNode = nodes[0];
			    treeObj.editName(currentNode);
		    }
		});
		$("#deleteGroup").click(function(){
		    var nodes = treeObj.getSelectedNodes();
		    if(nodes==null || nodes.length==0){
		        EB_Common.dialog.alert("Please select a node!");
		        return false;
		    }else{
	            var currentNode = nodes[0];
			    treeObj.removeNode(currentNode,zTreeBeforeRemove);


		    }
		});
		$("#moveGroup").click(function(){
		    $.ajax({
		        url:context+'/contacts/groups/tree/json?version='+new Date().getMilliseconds()+Math.random(),
		        dataType:'json',
		        success: function(data){
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
		                	}
		        		};
		            var zNodes = data;
		    		var zRootNode = {id:-1,name:i18n['contact.text.all.contact.group'],groups:zNodes, open:true};
            var selectTreeObj = $.fn.zTree.init($("#selectgrouptree"), zSetting, zRootNode);
            var settings = {
                modal: true,
                width:300,
                height:500,
                buttons: {
                Ok: function() {
                var tNodes = selectTreeObj.getSelectedNodes();
                var target = tNodes[0];
                var sNodes = treeObj.getSelectedNodes();
                var sNode = sNodes[0];
                var sTarget = treeObj.getNodeByParam("id",target.id,null);
                sNode.parentId=target.id;
                moveForAjax(sNode.id,sNode.parentId);
                treeObj.moveNode(sTarget, sNode, "inner");
                $(this).dialog( "close" );
                },
            	Cancel:function() {
                $(this).dialog( "close" );
                }
            },
            close:function(){
                $(this).dialog("destroy");
                }
            };
            $("#forSelect").dialog(settings);
            }
            });

            });
            $("#contacts_deleteBatch").click(function(){
                var selr = $('#group_gridTable').jqGrid('getGridParam','selarrrow');
                if(selr.length==0){
                EB_Common.dialog.alert(i18n['contact.text.select.contact.alert']);
                    return false;
                }
                var sNodes = treeObj.getSelectedNodes();
                // 		    var contactIds = eval("("+selr+")");
                EB_Common.Ajax.remove('/contacts/groups/removecontact/json/'+sNodes[0].id+"?version="+new Date().getMilliseconds()+Math.random()
                                ,{
                                    contactIds:selr,
                                    _method:'DELETE'},
                                function(data){
                                    if(data.result=="success"){
                                        $("#group_gridTable").trigger("reloadGrid");
                                    }else{
                                        EB_Common.dialog.alert(i18n['contact.text.remove.contact.failed.alert']);
                                    }
                                },'','json')

            });

            $("#group_contacts_simpleSearch").click(function(){
                var quickSearchValue = $("#group_contacts_quickSearchValue").val();
                $("#group_gridTable").jqGrid('setGridParam',{postData:{quickSearchValue:$.trim(quickSearchValue)},page:1})
                .trigger("reloadGrid");
            });

            $("#group_contacts_quickSearchValue").keypress(function(event){
                if(event.keyCode==13){
                    $('#group_contacts_simpleSearch').click();
                }
            });
            /**
            jqGrid
            */

            $("#group_gridTable").jqGrid({
                url:context+"/contacts/json",
                autoencode:true,
                datatype: "local",
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
                autowidth:true,
                colNames:[i18n['contact.field.id'],
                    i18n['contact.field.firstName'],
                    i18n['contact.field.middleInitial'],
                    i18n['contact.field.lastName'],
                    i18n['contact.field.externalId'],
                    i18n['contact.field.recordTypeId']
                ],
                colModel:[{name:'id',index:'id', hidden:true},
                         {name:'firstName',index:'firstName', width:100, sorttype:"string"},
                         {name:'middleInitial',index:'middleInitial', width:60},
                         {name:'lastName',index:'lastName', width:100},
                         {name:'externalId',index:'externalId', width:100},
                         {name:'recordTypeName',index:'recordTypeName', sortable:false, width:80}
                ],
                hidegrid:false,
                sortname:'lastName',
                sortorder:'asc',
                viewrecords:true,
                pager:"#group_gridPager",
                /*caption: "jqGrid",*/
                multiselect:true,
                prmNames : {
                    page:"pageNo", //
                    totalrows:"totalrows" //
                    },
                onSelectAll:function(aRowids,status){
                    if(aRowids && aRowids.length>0 && status){
                        $(".canDisabled").removeAttr("disabled").removeClass("btn_disabled");
                    }else{
                        $(".canDisabled").attr("disabled",true).addClass("btn_disabled");
                    }
                },
                onSelectRow:function(rowid,status){
                    if(status){
                        $(".canDisabled").removeAttr("disabled").removeClass("btn_disabled");
                    }else{
                        var selr = jQuery('#group_gridTable').jqGrid('getGridParam','selarrrow');
                        if(!selr || selr.length==0){
                            $(".canDisabled").attr("disabled",true).addClass("btn_disabled");
                        }
                    }
                },
                loadComplete:function(dataStr){
                    $(".canDisabled").attr("disabled",true).addClass("btn_disabled");
                }
            });
//        var defaultSelected=treeObj.getNodesByParam("parentId", -1, null)[0];
        var defaultNode=treeObj.getNodes()[0];
        if(defaultNode.groups.length>0){
            treeObj.selectNode(defaultNode.groups[0]);
            zTreeOnClick(null,null,defaultNode.groups[0]);
        }else{
            if(isGroupLeader=="false"){
                treeObj.selectNode(defaultNode);
                zTreeOnClick(null,null,defaultNode);
            }
        	$('#selectedGrid').hide();
        }
        
        // draggable
        // Linder Wang add
        // 2012-8-6
        var distance = [-100,300],
            actualDistance = 0,
            leftOriginalW = $('#leftArea').width(),
            rightOriginalW = $('#rightArea').width(),
            dragOriginalElLeft = $('#adjustPos').position().left;
        $('#adjustPos').draggable({
            opacity: 0.5,
            axis: 'x',
		    zIndex: 2700,
			start: function(event, ui) {
			    $(event.target).css({backgroundColor:'#EEEEEE',border:'1px dashed #BBBBBB'});
			},
			drag: function(event, ui) {
				var dragElLeft = $(event.target).position().left,
				    dragDiffX = dragElLeft - dragOriginalElLeft;
				if(dragDiffX < distance[0] || dragDiffX > distance[1]){
					return false;
				}
			},
			stop: function(event, ui) {
				var diffX = ui.position.left - ui.originalPosition.left,
					leftArea = $('#leftArea'),
				    rightArea = $('#rightArea');
				actualDistance += diffX; 
				$(event.target).css({top:0,left:0,backgroundColor:'',border:''});
				if(actualDistance < distance[0]){
					actualDistance = distance[0];
				}
				if(actualDistance > distance[1]){
					actualDistance = distance[1];
				}
				leftArea.width(leftOriginalW + actualDistance);
				rightArea.width(rightOriginalW - actualDistance);
				$("#group_gridTable").jqGrid('resizeGrid');
			}
		});

    };
})(EB_View)
