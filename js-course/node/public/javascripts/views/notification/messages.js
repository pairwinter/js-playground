(function(view) {
    view.messages = function() {
    }
    view.messages.initializeListPage = function() {
        EB_Common.validation.validate("messageTemplate");
        $("#messagetemplate_gridTable").jqGrid(
                {
                    autoencode:true,
                    url : EB_Common.Ajax.wrapperUrl("/msgTemplates/list"),
                    datatype : "json",
                    emptyDataCaption : i18n['global.grid.emptyDataCaption'],
                    gridGetLength : true,
                    jsonReader : {
                        root : "data",
                        page : "currentPageNo",
                        total : "totalPageCount",
                        records : "totalCount",
                        repeatitems : false
                    },
                    height : "auto",
                    autowidth : true,
                    colNames : [ '', i18n['messagetemplate.field.messagetitle'],
                            i18n['messagetemplate.field.category'], i18n['messagetemplate.field.voicetext'],
                            i18n['messagetemplate.field.createby'], i18n['messagetemplate.field.createddate'], '' ],
                    colModel : [
                            {
                                width : 10,
                                colGetLength : false
                            },
                            {
                                name : 'title',
                                index : 'title',
                                width : 120
                            },
                            {
                                name : 'category',
                                index : 'category',
                                width : 120,
                                sortable : false,
                                formatter : function(value, rec, row) {
                                    return row.category ? $.jgrid.htmlEncode(row.category.name) : '';
                                }
                            },
                            {
                                name : 'contentType',
                                index : 'contentType',
                                width : 125,
                                sorttype : "string"
                            },
                            {
                                name : 'createdName',
                                index : 'createdName',
                                width : 125,
                                sorttype : "string"
                            },
                            {
                                name : 'formattedCreatedDate',
                                index : 'createdDate',
                                width : 125,
                                sorttype : "datetime"
                            },
                            {
                                name : 'id',
                                index : 'id',
                                colGetLength : false,
                                width : 80,
                                align : "center",
                                sortable : false,
                                formatter : function(value, rec) {
                                    return '<a href="javascript:void(' + value + ')" title="' + i18n['button.update']
                                            + '" class="icn_edit_16 edit_msg_btn"></a><a href="javascript:void('
                                            + value + ')" class="icn_trash_16 del_msg_btn" title="'
                                            + i18n['button.delete'] + '"> </a>';
                                }
                            } ],
                    sortname : 'createdDate',
                    sortorder : 'desc',
                    viewrecords : true,
                    pager : "#messagetemplate_gridPager",
                    multiselect : false,
                    prmNames : {
                        page : "pageNo", // 
                        totalrows : "totalrows" //
                    },
                    loadComplete : function() {
                        $(".edit_msg_btn").click(
                                function() {
                                    window.location.href = EB_Common.Ajax.wrapperUrl("/msgTemplates/edit/"
                                            + $(this).attr("href").match(/\d+/)[0]);
                                });
                        $(".del_msg_btn").click(function() {
                            var msgId = $(this).attr("href").match(/\d+/)[0];
                            EB_Common.dialog.confirm(i18n['global.dialog.content.confirm'], i18n['global.dialog.title.confirm'], function() {
                                $(this).dialog("close");
                                // send delete request
                                EB_Common.Ajax.remove('/msgTemplates/delete/' + msgId, {}, function(data) {
                                    if (data.success) {
                                        view.reloadGrid("messagetemplate_gridTable");
                                    }
                                })
                            });
                        })
                    }
                });
        view.listenSearch("messagetemplate_gridTable");
        $("#addMessageTemplate").click(function() {
            window.location = EB_Common.Ajax.wrapperUrl("/msgTemplates/new");
        });
    };
    view.messages.initializeEditPage = function(msgTemplateId) {
        commonInitialization();
        $("#category").combobox({
            width : 165
        });
        $("#btnsave").click(function() {
            // at least has textMessage or recorded voice or uploaded voice
                if ($("#messageTemplate").validate().element($("#messageTitle"))) {
                    if($.trim($("#textMessage").val()) || $.trim($("#audioKey").val()) || ($("input[name='uploadedFile']").val() && $("#pol_upload_option").attr("checked"))
                            || ($("input[name='recordedVoice']").val() && $("#pol_record_option").attr("checked"))) {   
                        $("#btnsave").hide();
                        $("#cancel").hide();
                        var action = msgTemplateId ? "save" : "create";
                        $("#messageTemplate").attr("action", EB_Common.Ajax.wrapperUrl("/msgTemplates/" + action));
                        $("#messageTemplate").ajaxSubmit({
                            success : function(data) {
                                view.onServerSuccess(data, 4, "btnSave");
                            }
                        });
                    } else{
                        EB_Common.dialog.alert(i18n["notification.text.incompleteMessage"]);
                    }
                }
        });

        $("#cancel").click(function() {
            window.location.href = EB_Common.Ajax.wrapperUrl("/notifications#ui-tabs-4");
        });
        $("#pol_upload_option").click(function() {
            $("#recorderDiv").hide();
            $("#uploaderDiv").show();
        })
        $("#pol_record_option").click(function() {
            $("#recorderDiv").show();
            $("#uploaderDiv").hide();
        })
    };
    view.messages.initialize = function() {
        countTextMessage();
        commonInitialization();
        $("#pollingResponseDiv").find('input').each(function() {
            $(this).rules('add', {noitemsduplicate : true});
        });
        $('.polling_answer').blur(function(){
            $("#err_polling_answers_limit").valid();
        });
        $("#add_polling_answer")
                .click(
                        function() {
                            if ($(".polling_answer").length >= 9) {
                                return false;
                            }
                            if ($(".polling_answer").length >= 8) {
                                $("#add_polling_answer").hide();
                            }
                            $(".remove_polling_answer").show();
                            
                            var new_input_div = $('<div class="margin5-B"><span class="polling_answer_span nowrap"><label></label><input type="text" class="polling_answer width_percent80 required validate_field" maxlength="250" name="message.questionaire.answers[0].name"/><i class="remove_polling_answer icn_action_delete"> </i></span></div>');
                            $("#pollingResponseDiv").append(new_input_div);
                            //add name attribute to the input
                            reOrderPollingResponse();
                            //add rules after the input has name attribute
                            new_input_div.find('input').each(function() {
                                $(this).rules('add', {noitemsduplicate : true});
                            });
                            new_input_div.find('input').blur(function(){
                                $("#err_polling_answers_limit").valid();
                            });
                            
                        });
        // remove existed polling response
        $(".remove_polling_answer").live("click", function() {
            var count = $(".remove_polling_answer").length;
            if (count > 1) {
                $(this).parent().remove();
                reOrderPollingResponse();
                $("#err_polling_answers_limit").valid();
            }
            if (count == 2){
                $(".remove_polling_answer").hide();
            }
            if ($(".polling_answer").length <= 8) {
                $("#add_polling_answer").show();
            }
        });
        
        $.validator.addMethod('noitemsduplicate', function(value, element, param) {
            var values = {},
                inputs = $(element).closest('div').parent().find('input').not(element),
                lastRepeatValue = $(element).prop('lastRepeatValue'),
                repeatInputs = [];
            $(element).prop('lastRepeatValue', $.trim(value));
            inputs.each(function(index, element){
                values[$.trim($(this).val())] = true;
                if($.trim($(this).val()) == lastRepeatValue){
                    repeatInputs.push(element);
                }
            });
            // remove validation info
            if(lastRepeatValue != $.trim(value) && repeatInputs.length == 1){
                $(repeatInputs[0]).removeClass('error').parent().children('.error-right').remove();
            }
              
            if(values[$.trim(value)]){
                return false;
            }else{
                return true;
            }
            
        }, i18n["notification.err.duplicatePollingrResponse"]);
        
        $.validator.addMethod('charactercountexceed', function(value, ele) {
            var i=0;
            $('.polling_answer').each(function(){
                i += $(this).val().length;
            });
            return i <= 500;
        }, i18n["notification.err.pollingResponseCharacterExceed"]);
        
        $('#textMessage').blur(function(){
            if (!$.trim($("#textMessage").val()) && ($("#voice_info_div ul li").length==0)) {
                $("#textMessage").addClass('error');
                $("#errNobodyAndVoice").show();
            } else {
                $("#textMessage").removeClass('error');
                $("#errNobodyAndVoice").hide();
            }
        });
    }
    
    function reOrderPollingResponse() {
        $(".polling_answer_span").each(function(index) {
            $(this).find("label:first").html((index + 1) + " ");
            $(this).find("input").attr("name", "message.questionaire.answers[" + index + "].name");
        })
    }

    function countTextMessage() {
        var max1 = 2500;
        var max2 = 120;
        var textMessage = $("#textMessage");
        var title = $("#messageTitle");
        var textLen = textMessage.val().length;
        var titleLen = title.val().length;
        var len = textLen + titleLen;
        if (textLen > max1 - titleLen) {
            textMessage.val(textMessage.val().substring(0, max1 - titleLen));
            textMessage.scrollTop(100000);
            return;
        }
        max1 = max1 - len;
        max2 = max2 - (len % 120);
        var count2 = parseInt(len / 120) + 1;
        $("#tipTextMessage").html($.validator.format(i18n['notification.text.smsmessage'], max1.toString(), max2, count2));
    }

    function commonInitialization() {
        setInterval(function() {
            countTextMessage();
        }, 100);
        $("#message_gridTable").jqGrid(
                {
                    autoencode:true,
                    url : EB_Common.Ajax.wrapperUrl("/msgTemplates/list"),
                    datatype : "json",
                    emptyDataCaption : i18n['global.grid.emptyDataCaption'],
                    jsonReader : {
                        root : "data",
                        page : "currentPageNo",
                        total : "totalPageCount",
                        records : "totalCount",
                        repeatitems : false
                    },
                    height : "auto",
                    width : 570,
                    rowNum: 10,
                    rowList: [10],
                    colNames : [ '', i18n['broadcasttemplate.field.messagetitle'],
                            i18n['broadcasttemplate.field.voicetext'], i18n['broadcasttemplate.field.createby'],
                            i18n['broadcasttemplate.field.createdate'] ],
                    colModel : [
                            {
                                name : 'id',
                                index : 'id',
                                width : 10,
                                align : "center",
                                sortable : false,
                                formatter : function(value, rec) {
                                    return '<input type="radio" name="select" value="' + value
                                            + '" class="msg_select_radio"/>';
                                }
                            }, {
                                name : 'title',
                                index : 'title',
                                width : 90
                            }, {
                                name : 'contentType',
                                index : 'contentType',
                                width : 30,
                                sorttype : "string"
                            }, {
                                name : 'createdName',
                                index : 'createdName',
                                width : 40,
                                sorttype : "string"
                            }, {
                                width : 70,
                                name : 'formattedCreatedDate',
                                index : 'createdDate',
                                sorttype : "datetime",
                                sortable : true
                            } ],
                    sortname : 'createdDate',
                    sortorder : 'desc',
                    viewrecords : true,
                    pager : "#message_gridPager",
                    multiselect : false,
                    prmNames : {
                        page : "pageNo", // 
                        totalrows : "totalrows" //
                    }
                });
        EB_Common.logger.log("message_gridPager size"+$("#message_gridPager").length);
        EB_Common.Ajax.get("/statics/tmpl/notification/audioItem.html", {}, function(data) {
            $.template("audioItemTmpl", data);
        }, 'html');
        $("#remove_existed_voice").live("click", function() {
            $("#existedVoiceDiv").hide();
            $("#updateVoiceDiv").show();
            $("#audioKey").val("");
            $("#voiceSource").val("WebUploader");
        });
        $('#message').dialog({
            autoOpen : false,
            width : 600,
            height : "auto",
            modal : true,
            resizable : false,
            buttons : {
                Ok : {
                    click : function() {
                        var dialog = $(this);
                        var msgId = $(".msg_select_radio:checked").val();
                        EB_Common.Ajax.get('/msgTemplates/' + msgId, {}, function(msgTemplate) {
                            if (msgTemplate) {
                                dialog.dialog("close");
                                $("#messageTitle").val(msgTemplate.title);
                                $("#textMessage").val(msgTemplate.textMessage);
                                // apply category
                                var categoryName = msgTemplate.category ? msgTemplate.category.name : '';
                                $("#category").siblings(".ui-combobox").find("input").val(categoryName);
                                $("input[name='category.name']").val(categoryName);
                                if (msgTemplate.audio) {
                                    var ul = $("#voice_info_div").show().find("ul").empty();
                                    var audio = $.tmpl("audioItemTmpl", [ msgTemplate.audio ]);
                                    audio.find(".audiokey").val(msgTemplate.audioKey);
                                    audio.find(".voicesource").val("PreRecorded");
                                    ul.append(audio);
                                    EB_View.uploader.updateUploadLimit(EB_View.uploader.uploadersMap["pollingVoiceUploader"]);
                                }
                            }
                        }, 'json')
                        $(this).dialog("close");
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
            }
        });
        $('#message_link').click(function() {
            $('#message').dialog('open');
            return false;
        });
    }
})(EB_View.notifications);
