/**
 * Created with IntelliJ IDEA.
 * User: carl
 * Date: 7/14/12
 * Time: 2:57 PM
 * To change this template use File | Settings | File Templates.
 */
(function(view){
    view.contact.upload = function(){};
    view.contact.upload.initPage=function(context){
        EB_Common.validation.validate("upload_form1");
        $('#upload_file').change(function(){
            $('#upload_method_div').show();
            $('#uploadBtn').removeAttr("disabled").removeClass("gray");
        });
        var upload_options = {
            beforeSend:function(){
                $('#uploadBtn').attr("disabled",true).addClass("gray");
            },
            url:context+'/contacts/upload/process',
            type:'post',
            success: function(data) {
//                    $("#ajax_bg").hide();
                if(data.result=='failed'){
                    EB_Common.dialog.alert(data.error);
                }
                $("#uploadFileForm").dialog( "close" );
//                $("#uploadFileForm").dialog('destroy');
                EB_Common.dialog.alert("We have started processing your upload file.  You should receive an email informing you when  finish processing the file.");
                $("#uploads_gridTable").trigger("reloadGrid");
            },
            error:function(){
                $('#uploadBtn').removeAttr("disabled").removeClass("gray");
            }};
        var upload_settings = {
            title:i18n['contact.upload.dialog.title'],
            modal: true,
            width:500,
            resizable:false,
            autoOpen:false,
            buttons: {
                Ok: {
                    click:function() {
                        $("#upload_form1").ajaxForm(upload_options).submit();
                    },
                    'class' : 'orange',
                    text : i18n['button.upload'],
                    id:'uploadBtn'
                },
                Cancel:{
                    click:function() {
                        $(this).dialog( "close" );
                    },
                    'class' : 'gray',
                    text : i18n['global.dialog.button.cancel']
                }

            },
            close:function(){
                $('#upload_method_div').remove();
                $("#upload_form1").resetForm();
//                $(this).dialog('destroy');
            },
            open:function(){
                $('#uploadBtn').attr("disabled",true).addClass("gray");

            }
        };
//        var uploadFormDialog = $("#uploadFileForm").dialog(upload_settings);
        EB_Common.dialog.dialog('uploadFileForm',upload_settings);
        $("#buttonUplod").click(function () {
            var inputSpan = $('<span class="margin10-T">');
            var upload_method_div = $('<div style="display: none" id="upload_method_div" class="margin10-T">' );
//            var inputFile = $('<input name="file" type="file" id="upload_file" size="50" class="input_long">');
//            var upload_method_div=$('#upload_method_div');

            var radio1= $('<input type="radio" name="uploadMethodName" value="PARTIAL" checked="checked" class="margin3-R">');
            var radio2= $('<input type="radio" name="uploadMethodName"value="WITH_RECORD_TYPE" class="margin3-R">');
            var optionMessage1 =$('<div id="optionMessage1" class="tip_message_upload">').text(i18n['contact.upload.option.insert.message']);
            var optionMessage2 =$('<div id="optionMessage2" class="tip_message_upload">').text(i18n['contact.upload.option.replace.message']);
            upload_method_div.append(radio1).append(i18n['contact.upload.option.insert']).append(optionMessage1).append('<br>')
                            .append(radio2).append(i18n['contact.upload.option.replace']).append(optionMessage2).append('<br>');


            $("#upload_form1").append(upload_method_div);


            $("#uploadFileForm").dialog('open');
        });

        $("#refresh_upload").click(function(){
            $("#uploads_gridTable").trigger("reloadGrid");
        });
        $('#downloadTemplate').click(function(){
            location=context+"/statics/CSVTemplate.csv";
        });
        $("#uploads_gridTable").jqGrid({
            autoencode:true,
            url:context+"/contacts/upload/json",
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
            colNames:[i18n['contact.field.FileName'],
                i18n['contact.field.batch.ID'],
                i18n['contact.field.FileSize'],
                i18n['contact.field.UploadDate'],
                i18n['contact.field.UploadByName'],
                i18n['contact.field.UploadStatus'],
                i18n['contact.field.RecordsReceived'],
                i18n['contact.field.RecordsLoaded'],
                ''],
            colModel:[{name:'fileName',index:'fileName', width:100, sorttype:"string"},
                {name:'id',index:'id', width:90, sorttype:"string"},
                {name:'fileSize',index:'fileSize', width:90},
                {name:'createdDate',index:'createdDate', width:120, sorttype:"datetime"},
                {name:'createdName',index:'createdName', width:80},
                {name:'uploadStatus',index:'uploadStatus', width:80,formatter:function(val,rec,rowObject){
                    return i18n['contact.upload.field.UploadStatus.'+val];
                }},
                {name:'receivedNum',index:'receivedNum', width:100},
                {name:'loadNum',index:'loadNum', width:100},
                {name:'id', index:'id', width:60,align:"center", sortable:false, formatter:function(value,rec,rowObject){
                    return '<a class="icon_view upload_jqgridEditRowBtn"  title="'+i18n['button.view']+'" href="javascript:void(0);" recordId="'+rowObject.id+'"></a>';
                }}
            ],
            sortname:'createdDate',
            sortorder:'desc',
            viewrecords:true,
            pager:"#uploads_gridPager",
            multiselect:false,
            multiselectWidth : 40,
            scrollOffset : 0,
            prmNames : {
                page:"pageNo", //
                totalrows:"totalrows" //
            },
            gridComplete:function(){
                $(".upload_jqgridEditRowBtn").click(function(event){
                    event.stopPropagation();
                    location=context+'/contacts/upload/'+$(this).attr("recordId");
                });
            }
        });
    };
})(EB_View)

