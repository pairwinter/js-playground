(function(view) {
	view.reports = function() {};
	view.reports.reportList = function() {};
	view.reports.reportList.initPage = function(context) {
		console.log(window.location.hash);
		if(window.location.hash == '#event'){
			$('#canned').val('event');
			var cannedItem = $('#canned_item');
			cannedItem.children().hide();
			$('#'+$('#canned').val()).show();
		}
		
		$('#canned').change(function() {
			var value = $(this).val();
			var cannedItem = $('#canned_item');
			cannedItem.children().hide();
			$('#'+$(this).val()).show();
		});
		
		$('#view_event').click(function(){
			var eventId = $('#eventId').val();
			//console.log(eventId);
			if(eventId == null)
				return false;
			location.href=EB_Common.Ajax.wrapperUrl('/reports/event/summary?eventId='+eventId);
		});
		
		$('#view_broadcast').click(function(){
			location.href=EB_Common.Ajax.wrapperUrl('/reports/broadcast/history');
		});

        $("#gridTable").jqGrid({
            url:context+"/reports/json",
            datatype: "json",
            contentType: "application/json",
            autoencode:true,
            emptyDataCaption : i18n['global.grid.report.emptyDataCaption'],
            emptyDataCls : 'report',
            height: "auto",
            autowidth: true,
            colNames:['ID','Name','Type','Created on','Created by','Last updated'],
            colModel:[
                {name:'id', index:'id',hidden:true},
                {name:'name', index:'name',  width:200,sortable:false,formatter:function(val,rec,rowObject){
                    var type=rowObject.reportType;
                    if(type=="contact"){
                        return '<a onclick="event.stopPropagation();" href="'+context+'/reports/custom/update/'+rowObject.id+'?reportType=contact">'+
                            $.jgrid.htmlEncode(val)+'</a>';
                    }else if(type="notification"){
                        return '<a onclick="event.stopPropagation();" href="'+context+'/reports/custom/update/'+rowObject.id+'?reportType=notification">'+
                            $.jgrid.htmlEncode(val)+'</a>';
                    }

                }},
                {name:'reportType', index:'reportType',  width:200,sortable:false},
                {name:'displayCreatedDate', index:'createdDate',  width:200,sortable:false},
                {name:'createdFullName', index:'createdId',  width:200,sortable:false},
                {name:'displayLastModifiedDate', index:'lastModifiedDate',  width:200,sortable:false}
            ],
            jsonReader : {
                root: "data",
                page: "currentPageNo",
                total: "totalPageCount",
                records: "totalCount",
                repeatitems: false
            },
            //sortname:'firstname',
            //sortorder:'asc',

            viewrecords:true,
            pager:"#gridPager",
            multiselect:true,
            prmNames :{
                page:"page",
                rows:"size"
            }
        });

        $("#btn_delete").click(function(){
            var ids=$("#gridTable").getGridParam('selarrrow');
            if(ids==""){
                EB_Common.dialog.alert(i18n['user.list.least']);
                return;
            }
            EB_Common.dialog.confirm(i18n['user.list.confirm.delete'],i18n['user.list.warning'],
                function(){
                    EB_Common.Ajax.post("/reports",{ids:ids,_method:'DELETE'},function(data){
                        $("#gridTable").trigger("reloadGrid");
                    },"json");
                    $(this).dialog("close");
                },function(){
                    return;
                }
            );
        });
	};
	
})(EB_View);