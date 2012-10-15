/**
 * Created with IntelliJ IDEA.
 * User: carl
 * Date: 7/14/12
 * Time: 3:10 PM
 * To change this template use File | Settings | File Templates.
 */

(function(view){
    view.contact.filter = function(){};
    view.contact.filter.deleteRecord=function(id){
        event.stopPropagation();
        EB_Common.dialog.confirm(
            function(){
                EB_Common.Ajax.remove("/contacts/filters/json/"+id+"?version="+new Date().getMilliseconds()+Math.random(),
                    null,
                    function(data){
                        $("#filter_gridTable").trigger("reloadGrid");
                    },null,"json");
                $(this).dialog("close");
            },function(){
                $(this).dialog("close");
                return;
            });


    }
    view.contact.filter.initPage=function(context){

        $("#filter_gridTable").jqGrid({
            autoencode:true,
            url:context+"/contacts/filters/json",
            datatype: "json",
            mtype:"get",
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
                i18n['contact.field.RuleName'],
                i18n['contact.field.lastModifiedDate'],
                i18n['contact.field.lastModifiedName'],
                ''],
            colModel:[{name:'id',index:'id', hidden:true},
                {name:'name',index:'name', width:100, sorttype:"string"},
                {name:'lastModifiedDate',index:'lastModifiedDate', width:120},
                {name:'lastModifiedName',index:'lastModifiedName', width:100, sorttype:"string" },
                {name:'id', index:'id', width:60,align:"center", sortable:false, formatter:function(value,rec,rowObject){
                    return '<a class="icn_edit_16 filter_jqgridEditRowBtn" title="'+i18n['button.update']+'" href="javascript:void(0);" recordId="'+rowObject.id+'"></a>'+
                        '<a class="icn_trash_16 filter_jqgridDeleteRowBtn" title="'+i18n['button.delete']+'" href="javascript:void(0);" recordId="'+rowObject.id+'"></a>';
                }}
            ],
            sortname:'lastModifiedDate',
            sortorder:'desc',
            viewrecords:true,
            pager:"#filter_gridPager",
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
                    var selr = $('#filter_gridTable').jqGrid('getGridParam','selarrrow');
                    if(!selr ||selr.length==0){
                        $(".canDisabled").attr("disabled",true).addClass("btn_disabled");
                        $(".canDisabled").find('i').addClass("icn_gray");
                    }
                }
            },
            loadComplete:function(dataStr){
                $(".canDisabled").attr("disabled",true).addClass("btn_disabled");
                $(".canDisabled").find('i').addClass("icn_gray");
            },
            gridComplete:function(){
                $(".filter_jqgridDeleteRowBtn").click(function(event){
                    event.stopPropagation();
                    var id = $(this).attr("recordId");
                    EB_Common.dialog.confirm(
                        function(){
                            EB_Common.Ajax.remove("/contacts/filters/json/"+id+"?version="+new Date().getMilliseconds()+Math.random(),
                                null,
                                function(data){
                                    $("#filter_gridTable").trigger("reloadGrid");
                                },null,"json");
                            $(this).dialog("close");
                        },function(){
                            $(this).dialog("close");
                            return;
                        });
                });
                $(".filter_jqgridEditRowBtn").click(function(event){
                    event.stopPropagation();
                    location=context+'/contacts/filters/update/'+$(this).attr("recordId");
                });
            }
        });
        $("#filter_simpleSearch").click(function(){
            var filter_searchValue = $("#filter_searchValue").val();
            $("#filter_gridTable").jqGrid('setGridParam',{postData:{searchValue:$.trim(filter_searchValue)},page:1})
                .trigger("reloadGrid");
        });

        $("#filter_searchValue").keypress(function(event){
            if(event.keyCode==13){
                $('#filter_simpleSearch').click();
            }
        });
        $("#filter_addBut").click(function(){
            document.location=context+"/contacts/filters/create";

        });
        $("#deleteBtn").click(function(){
            var selr = jQuery('#filter_gridTable').jqGrid('getGridParam','selarrrow');
            if(!selr||selr.length==0){
                EB_Common.dialog.alert("Please select one contact at least!","Error");
                return false;
            }
            EB_Common.dialog.confirm(
                function(){
                    EB_Common.Ajax.post("/contacts/filters/json/batch?version="+new Date().getMilliseconds()+Math.random(),
                        {
                            ids:selr,
                            _method:'DELETE'},
                        function(data){
                            $("#filter_gridTable").trigger("reloadGrid");
                        },
                        "json");
                    $(this).dialog("close");
                },function(){
                    return;
                });
        });

        $('#quickSearchValue').focus(function(){
            var search = $(this),
                val = search.val();
            if(val == 'Enter value name'){
                search.val('');
                $.style(search[0], 'color', '#000000');
            }
        });
        $('#quickSearchValue').blur(function(){
            var search = $(this),
                val = search.val();
            if($.trim(val) == ''){
                search.val('Enter value name');
                $.style(search[0], 'color', '#999999');
            }
        });

        $('#clear_search').click(function(){
            $('#filter_searchValue').val('');
            $('#filter_simpleSearch').click();

        });
    };
})(EB_View)
