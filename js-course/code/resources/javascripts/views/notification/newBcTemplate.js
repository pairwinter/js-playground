(function(view) {
    view.newBc = function() {
    };
    view.newBc.pageLoadCount = 0;
    /* start of external calls from widgets */
    view.newBc.polygons = function() {

    };
    /*
     * @param polygons @param filterIds or Rules @contactNum
     */
    view.newBc.polygons.getDataFromMap = function(params, contactNum) {
        EB_Common.logger.log(params);
        var polygons = params ? params.polygons : false;
        var filterIds = params ? params.filterIds : false;
        var filterRules = params ? params.filterRules : false;
        var polygonIsIncludes = params ? params.polygonIsIncludes : false;
        $("input[name='filterIds']").val("");
        $("input[name='filterRules']").val("");
        $("input[name='polygonsStr']").val("");
        $("input[name='polygonIsIncludes']").val("");
        if (filterIds) {
            $("input[name='filterIds']").val(filterIds);
        } else if (filterRules) {
            $("input[name='filterRules']").val(filterRules);
        }
        if (polygons) {
            $("input[name='polygonsStr']").val(polygons);
            $('#errSelContactMessage').val('true').valid();
        }
        if (polygonIsIncludes) {
            $("input[name='polygonIsIncludes']").val(polygonIsIncludes);
        }
        $("#mapContactsCount").html(contactNum);
        checkContactsSelection();
    };
    view.newBc.polygons.addContactToList = function(contactId, firstName, lastName) {
        var jselectContact = $('#select_contact');
        var hadExit = false;
        jselectContact.children().each(function() {
            if (this.value == contactId) {
                hadExit = true;
            }
        });
        if (!hadExit) {
            jselectContact.append("<option value='" + contactId + "'>" + firstName + "," + lastName + "</option>");
        }
        $("#individuals").text(jselectContact.children().length);
        checkContactsSelection();
    };
    view.newBc.polygons.setWeatherNotificationData = function(title, body) {
        $("#messageTitle").val(title);
        $("#textMessage").val(body);
    };
    view.newBc.polygons.closeWidget = function(func) {
        func();
    };
    view.newBc.changeSettingItemDisplay=function(display){
        if (!display) {
            $("#leave_message").attr("checked", false).change();
            $("#leave_message").attr("disabled", true);
            $("#confirm").prop("checked", false).change();
            $("#confirm").prop("disabled", true);
            $("#vm_li").hide();
            $("#confirm_li").hide();
        }else{
            $("#leave_message").attr("disabled", false);
            $("#confirm").attr("disabled", false);
            $("#vm_li").show();
            $("#confirm_li").show();
        }
    }
    /* end of external calls from widgets */
    view.newBc.initialize = function(source, sessionId, bcId) {
        if (!bcId) {
            bcId = 0;
        }
        // load inner contents
        EB_Common.Ajax.load($("#bc_message_li"), "/bcTemplates/inner/msg/" + bcId + "/" + source, function() {

            if ($(".polling_answer").length == 1) {
                $(".remove_polling_answer").hide();
            }

            $("input[name^='type']").click(function() {
                var id = $(this).attr('id').split('_');
                if (id[1] == 'Polling') {
                    $("#poldiv").show();
                    $("#confdiv").hide();
                    EB_View.notifications.newBc.changeSettingItemDisplay(false);
                } else if (id[1] == 'Conference') {
                    $("#poldiv").hide();
                    $("#confdiv").show();
                    EB_View.notifications.newBc.changeSettingItemDisplay(false);
                } else {
                    $("#poldiv").hide();
                    $("#confdiv").hide();
                    EB_View.notifications.newBc.changeSettingItemDisplay(true);
                }
            });
            $("#priority").click(function() {
                if ($(this).attr("checked")) {
                    $("#i_warring").removeClass("icn_priority_16");
                    $("#i_warring").addClass("icn_priority_hover_16");
                } else {
                    $("#i_warring").addClass("icn_priority_16");
                    $("#i_warring").removeClass("icn_priority_hover_16");
                }
            });
            onLoadComplete(sessionId);

        });
        // load contacts contents and init select contacts dialog
        EB_Common.Ajax.load($("#bc_contacts_li"), "/bcTemplates/inner/contacts/" + bcId + "/" + source, function() {
            if (EB_View.universe && EB_View.universe.widget) {
                var filterRules = $.parseJSON($("#notification_filterRules").val());
                var polygons = $.parseJSON($("#notification_polygonsStr").val());
                var isIncludes = $.parseJSON($("#notification_polygonIsIncludes").val());
                var searchShapes = [];
                if(polygons && isIncludes && polygons.length == isIncludes.length){
                    for(var i=0;i<polygons.length;i++){
                        searchShapes.push({polygon:polygons[i],isInclude:isIncludes[i]});
                    }
                }
                EB_View.universe.widget.fillMap(filterRules,searchShapes);
            }
            EB_Common.Ajax.load($("#select_contacts"), "/bcTemplates/inner/selContacts/" + bcId + "/" + source,
                    function() {
                        if (EB_View.universe && EB_View.universe.widget) {
                            EB_View.universe.widget.setDataToNotificationWidget();
                            EB_View.universe.widget.recipientapp.addNotificationData();
                        }
                        $("#select_contacts").dialog({
                            autoOpen : false,
                            title : i18n["notification.title.contact"],
                            width : 800,
                            height : 510,
                            modal : true,
                            resizable : false,
                            buttons : {
                                Ok : {
                                    click : function() {
                                        checkContactsSelection();
                                        $(this).dialog("close");
                                    },
                                    'class' : 'orange',
                                    text : i18n['global.dialog.button.ok']
                                },
                                Cancel : {
                                    click : function() {
                                        checkContactsSelection();
                                        $(this).dialog("close");
                                    },
                                    'class' : 'gray',
                                    text : i18n['global.dialog.button.cancel']
                                }
                            }
                        });
                        view.contacts.initialize();
                        checkContactsSelection();
                    });
            $('.contact_link').click(function() {
                var link = $(this);
                $("#" + link.attr("data-ref")).click();
                $('#select_contacts').dialog('open');
            });
            $("#forwardMap").click(function() {
                if (source == 1 || source == 4 || source == 5) {
                    $('form').attr('action', wrappedBaseUrl + 'notifications/map');
                    // if (source) {
                    appendSelectedContactsToForm();
                    $("#notification").ajaxSubmit({
                        data : {
                            fromUniverse : true
                        },
                        success : function(retData) {
                            window.location.href = wrappedBaseUrl + "universe?fromNotification"
                        }
                    });
                }
            });
            onLoadComplete(sessionId);
        });
        EB_Common.Ajax.load($("#bc_settings_li"), "/bcTemplates/inner/settings/" + bcId + "/" + source, function() {
            onLoadComplete(sessionId);
        });
        EB_Common.Ajax.load($("#bc_schedule_li"), "/bcTemplates/inner/schedule/" + bcId + "/" + source, function() {
            EB_Common.logger.log("#category size:" + $("#category").length)
            $("#category").combobox({
                comboboxWidth : true
            });
            //set value to the category
            if($("#hidden_category_name").val()){
                $("#category").next().find("input").val($("#hidden_category_name").val());
            }
            // save as template
            $("#saveAsTemplate").click(function() {
                if ($(this).attr("checked")) {
                    $("#save").show();
                    $("#send").hide();
                    $("#category_td").show();
                    // $("#bc_schedule_li").hide();
                } else {
                    $("#save").hide();
                    $("#send").show();
                    $("#category_td").hide();
                    // $("#bc_schedule_li").show();
                }
            });

            if (bcId) {
                // edit bc template
                // $("#saveAsTemplate").click();
                $(".launch_type_radio:first").attr("checked", "checked");
            } else if (source != 5 && source != 3) {
                $(".launch_type_radio:first").attr("checked", "checked");
            }
            if ($("#saveAsTemplate").is(":checked")) {
                $("#category_td").show();
                $("#saveAsTemplate").click();
            }
            onLoadComplete(sessionId);
        });
        EB_Common.Ajax.load($("#bc_event_li"), "/bcTemplates/inner/events/" + bcId + "/" + source, function() {
            EB_Common.logger.log("#event size:" + $("#event").length)
            $("#event").combobox({
                comboboxWidth : true
            });
            //set value to the hidden input
            if($("#hidden_event_name").val()){
                $("#div_sendevent .ui-combobox").find("input").val($("#hidden_event_name").val());
            }
            // include part of event
            $("#input_sendevent").click(function() {
                if ($(this).attr("checked") == "checked") {
                    $("#div_sendevent").show();
                } else {
                    $("#div_sendevent").hide();
                }

            });
            onLoadComplete(sessionId);
        });
        var wrappedBaseUrl = EB_Common.Ajax.wrapperUrl("/");
        // add event listener to buttons
        $("#send").click(function() {
            $('form').attr('action', wrappedBaseUrl + 'notifications/create');
            if ($("#notification").valid()) {
                if (checkBroadcastOptions()) {
                    $("#send").hide();
                    $("#cancel").hide();
                    $("#notification").ajaxSubmit({
                        success : function(data) {
                            view.onServerSuccess(data, 3, "send", true);
                        }
                    });
                }
            }
        });
        $("#save").click(function() {
            var notificationFrom = $('#notification');
            if (notificationFrom.attr("status") == "edit" && notificationFrom.attr("editType") == 'bcTemplate') {
                notificationFrom.attr('action', wrappedBaseUrl + 'bcTemplates/update');
            } else {
                notificationFrom.attr('action', wrappedBaseUrl + 'bcTemplates/create');
            }
            if (checkBroadcastOptionsWhenSave()) {
                $("#save").hide();
                $("#cancel").hide();
                $("#notification").ajaxSubmit({
                    success : function(data) {
                        view.onServerSuccess(data, 1, "save");
                    }
                });
            }
        });
        $("#schedule").click(function() {
            $(".datevalidate_field").each(function() {
                $(this).rules("add", {
                    required : true
                });
            });

            var notificationFrom = $('#notification');
            if (notificationFrom.attr("status") == "edit" && notificationFrom.attr("editType") == 'launchPolicy') {
                notificationFrom.attr('action', wrappedBaseUrl + 'launchPolicies/update');
            } else {
                notificationFrom.attr('action', wrappedBaseUrl + 'notifications/create');
            }
            if (checkBroadcastOptions()) {
                $("#schedule").hide();
                $("#cancel").hide();
                $("#notification").ajaxSubmit({
                    success : function(data) {
                        view.onServerSuccess(data, 2, "schedule");
                    }
                });
            }

        });
        $("#cancel").click(function() {
            if (source == 2 || source == 3) {
                EB_View.notifications.newBc.polygons.closeWidget(EB_View.universe.widget.removeSendNotification);
            } else {
                window.location = EB_Common.Ajax.wrapperUrl("/notifications");
            }
        });

        // init validation

        EB_Common.validation.validate('notification', {
            // debug : true,
            messages : {
                errSelContactMessage : {
                    required : i18n['notification.text.nocontact']
                }
            },

            submitHandler : function() {

            }
        });

        $.validator.addMethod('alternative', function(value, element, param) {
            if ($.trim(value) == '' && $('#voice_info_div ul li').length == 0) {
                return false;
            }
            return true;
        }, i18n['notification.err.nomessage']);
    }

    function onLoadComplete(sessionId) {
        view.newBc.pageLoadCount++;
        if (view.newBc.pageLoadCount == 5) {
            // page loaded with Ajax content, start to initialize form
            // EB_Common.validation.validate("notification");
            view.messages.initialize();
            view.settings.initialize();
            EB_Common.toolTip.initialize();
            // create attachment files btn
            EB_View.notifications.newBc.upload1 = EB_View.uploader.createUploadBtn({
                sessionId : sessionId,
                uploadUrl : "/upload/file",
                uploaderKey : "msgAttachmentsUploader",
                containerId : "msgAttachmentsContainer",
                fileInfoDivId : "attachment_info_div",
                btnText : i18n['notification.model.attachmentfiles'],
                maxFilesCount : 5,
                fileTypes : "*.*",
                fieldName : "uploadedAttachments",
                fileLimit : "1 MB",
                removeIconClass : 'up_attachment_del_btn'
            });
            EB_View.notifications.newBc.upload2 = EB_View.uploader.createUploadBtn({
                sessionId : sessionId,
                uploadUrl : "/upload/file",
                uploaderKey : "pollingVoiceUploader",
                containerId : "pollingUploadContainer",
                fileInfoDivId : "voice_info_div",
                btnText : i18n['notification.title.uploadmessage'],
                maxFilesCount : 1,
                fileTypes : "*.wav",
                fieldName : "uploadedVoice",
                fileLimit : "2.4 MB",
                removeIconClass : 'up_voice_del_btn',
                validation : true,
                handlers : {
                    uploadComplete : function() {
                        $("#notification").validate().element("#textMessage");
                    }
                }
            });
            // load complete
            EB_Common.Ajax.get("/bcTemplates/complete");
            if (EB_View.universe && EB_View.universe.widget) {
                EB_View.universe.widget.weather.setWeatherNotificationData();
            }
        }
    }
    /*
     * view.newBc.updateUploadLimit=function(upload){ var existFileCount = $("#" +
     * upload.customSettings.fileInfoDivId).find("ul:first li").length; var stats = upload.getStats();
     * stats.successful_uploads=existFileCount; upload.setStats(stats); return existFileCount; }
     */

    function checkContactsSelection() {
        var contacts = $('#select_contact option');
        $("#individuals").html("<strong>" + contacts.length + "</strong>");

        var groups = $('#select_group option');
        $("#groups").html("<strong>" + groups.length + "</strong>");

        var filters = $('#select_filter option');
        $("#rule").html("<strong>" + filters.length + "</strong>");

        var map = $('input[name="polygonsStr"]:hidden');
        var filterIds = $('input[name="filterIds"]:hidden');
        var filterRules = $('input[name="filterRules"]:hidden');
        EB_Common.logger.debug("filterRules: "+filterRules.val());
        var contactSelected = contacts.length > 0 || groups.length > 0 || filters.length > 0
                || (map.length > 0 && $.trim(map.val()) != "")
                || (filterIds.length > 0 && $.trim(filterIds.val()) != "")
                || (filterRules.length > 0 && $.trim(filterRules.val()) != "");

        $('#errSelContactMessage').val(contactSelected ? 'true' : '');
        $('#errSelContactMessage').valid();
        return contactSelected;
    }

    /**
     * validate the broadcast options and settings before sending and scheduling
     */
    function checkBroadcastOptions() {
        var result = true;
        // var booltitle = $("#notification").validate().element($("#messageTitle"));
        // if (!booltitle) {
        // $("#messageTitle").focus();
        // result = false;
        // }
        // if (!$("#textMessage").val() && !$("input[name='uploadedVoice']").val() && !$("#audioKey").val()) {
        // $("#textMessage").focus();
        // $("#errNobodyAndVoice").show();
        // result = false;
        // } else {
        // $("#errNobodyAndVoice").hide();
        // }

        // check if there are duplicate polling responses
        // if ($('#type_Polling').attr('checked') == 'checked') {
        // if (!$('.polling_answer').valid()) {
        // result = false;
        // }
        // if (!$('#pollingAnswerValidation').valid()) {
        // result = false;
        // }
        // }

        result = checkContactsSelection() && result;
        if (!$("#messageTitle").valid()) {
            $("#messageTitle").focus();
        }
        if (!$("#textMessage").valid()) {
            $("#textMessage").focus();
        }
        if(!$("#notification").validate().element($("#err_polling_answers_limit"))){
            result = false;
        }
        var sendemail = $("#notification").validate().element($("#senderEmail"));
        if (!sendemail) {
            $('#edit_link').click();
            result = false;
        }
        
        // check the messageType/deliverPath mapping
        var onlyVoice = ($.trim($("#textMessage").val()) == "")&& ($("#voice_info_div ul li").length>0);
        if (onlyVoice) {
            var voicePathCount = 0;
            var textPathCount = 0;
            $(".deliver_path_chbox:checked").each(function() {
                var pathType = $(this).attr("data-type");
                if (pathType == "PHONE") {
                    voicePathCount++;
                } else {
                    textPathCount++;
                }
            })
            if (voicePathCount == 0) {
                $('#edit_link').click();
                EB_Common.dialog.alert(i18n["notification.text.noVoicePath"], i18n["dialog.title.warning"]);
                result = false;
            }
            if (textPathCount > 0) {
                $('#edit_link').click();
                EB_Common.dialog.alert(i18n["notification.text.hasTextPathWithlVoiceMessageOnly"],
                        i18n["dialog.title.warning"]);
                result = false;
            }
        }

        var sendCallerValid = true;
        $(".sender_caller_ids").each(function() {
            if (!$(this).valid()) {
                sendCallerValid = false;
            }
        })
        if ($(".sender_caller_ids").length == 0) {
            $('#errNoneCallerId').show();
            sendCallerValid = false;
        } else {
            $('#errNoneCallerId').hide();
        }
        if (!sendCallerValid) {
            $('#edit_link').click();
            result = false;
        }

        if ($(".deliver_path_chbox:checked").length == 0) {
            $('#errSelContactDeliverpath').show();
            $('#errSelContactDeliverpath').html(i18n['notification.text.nodelivery']);
            $('#edit_link').click();
            $("#orgpath_lbl").hide();
            result = false;
        }
        if ($("input[name^='type']:checked").val() == 'Conference') {
            // EB_Common.logger($("input[name^='type']:checked").val());
        }
        var eventIdInput = $("input[name='event.id']");
        if (!eventIdInput.val()) {
            eventIdInput.val(0);
        }

        var eventIdInput = $("input[name='category.id']");
        if (!eventIdInput.val()) {
            eventIdInput.val(0);
        }
        // check schedule
        var schedule_valid = true;
        if ($('#launchtype_Schedule').attr('checked')) {
            schedule_valid = $('#scheduledate').valid();
            if (!schedule_valid)
                result = false;
        } else if ($('#launchtype_Recurring').attr('checked')) {
            var v1 = $('#repeatNumber').valid();
            var v2 = $('#repeatStartOn').valid();
            var v3 = $('#repeatEnds').valid();
            var v4 = $('#hourMinutes').valid();

            schedule_valid = v1 && v2 && v3 && v4;

            if ($('#repeatType').val() == "YEARLY") {
                var v5 = $('#yearly_repeat').valid();
                schedule_valid = schedule_valid && v5;
                if (!schedule_valid) {
                    result = false;
                }
            } else if ($('#repeatType').val() == "WEEKLY") {
                var v6 = $('#weekly_repeat').find('input:checked').length > 0;
                if (v6) {
                    $('#errWeekdays').hide();
                } else {
                    $('#errWeekdays').show();
                }
                schedule_valid = schedule_valid && v6;

                if (!schedule_valid) {
                    result = false;
                }
            } else {
                if (!schedule_valid) {
                    result = false;
                }
            }
        }
        if (result) {
            // append selected contacts/groups/filters
            appendSelectedContactsToForm();
        }
        return result;
    }

    /**
     * validate the broadcast options and settings before saving
     */
    function checkBroadcastOptionsWhenSave() {
        var result = true;
        // check if there are duplicate polling responses or empty response
        if ($('#type_Polling').attr('checked') == 'checked') {
            if (!$('.polling_answer').valid()) {
                result = false;
            }
            if(!$("#notification").validate().element($("#err_polling_answers_limit"))){
                result = false;
            }
        }
        
        // check the messageType/deliverPath mapping
        var onlyVoice = $.trim($("#textMessage").val()) == "" && ($("#voice_info_div ul li").length>0);
        if (onlyVoice) {
            var voicePathCount = 0;
            var textPathCount = 0;
            $(".deliver_path_chbox:checked").each(function() {
                var pathType = $(this).attr("data-type");
                if (pathType == "PHONE") {
                    voicePathCount++;
                } else {
                    textPathCount++;
                }
            })
            if (voicePathCount == 0) {
                $('#edit_link').click();
                EB_Common.dialog.alert(i18n["notification.text.noVoicePath"], i18n["dialog.title.warning"]);
                result = false;
            }
            if (textPathCount > 0) {
                $('#edit_link').click();
                EB_Common.dialog.alert(i18n["notification.text.hasTextPathWithlVoiceMessageOnly"],
                        i18n["dialog.title.warning"]);
                result = false;
            }
        }
        // check if there are duplicate polling responses
        if ($('#type_Polling').attr('checked') == 'checked') {
            if (!$('.polling_answer').valid()) {
                result = false;
            }
        }
        // check sendemail and callerid
        sendemail = $("#notification").validate().element($("#senderEmail"));
        if (!sendemail) {
            $('#edit_link').click();
            result = false;
        }
        var sendCallerValid = true;
        $(".sender_caller_ids").each(function() {
            if (!$(this).valid()) {
                sendCallerValid = false;
            }
        })
        if (!sendCallerValid) {
            $('#edit_link').click();
            result = false;
        }

        if (result) {
            // append selected contacts/groups/filters
            appendSelectedContactsToForm();
        }
        return result;
    }

    function appendSelectedContactsToForm() {
        $('#select_group option').attr("selected", "selected");
        $('#select_contact option').attr("selected", "selected");
        $('#select_filter option').attr("selected", "selected");
        $("#selected_contacts_div").empty().append($("#select_contact").clone()).append($("#select_group").clone())
                .append($("#select_filter").clone());
        // the status of value is unselected in IE8 , so set the value to selcted next
        $("#selected_contacts_div select option").attr("selected", "selected");
    }
})(EB_View.notifications);