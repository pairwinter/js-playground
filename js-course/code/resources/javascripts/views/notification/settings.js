(function(view) {
    view.settings = function() {

    }
    view.settings.initialize = function(lauchSettings) {
        // load default values to tips
        initSettings();
        $("#hide_link").click(function() {
            $(this).hide();
            $('#edit_link').show();
            $(this).parent().parent().next().find(".noti_content_hid").hide();
        });
        $('#edit_link').click(function() {
            $(this).hide();
            $("#hide_link").show();
            $(this).parent().parent().next().find(".noti_content_hid").show();
        });
        // listen the input fileds change
        $("#senderEmail").keyup(function() {
            $("#senderEmail_lbl").html($("#senderEmail").val());
        });
        // deliver path related
        $("#checkall").click(function() {
            $('input[id^="orgpath_"]:checkbox').attr('checked', 'true');
            onDeliverPathsChange('hasRecip');
        });
        $("#checktext").click(function() {
            $('input[id^="orgpath_"]:checkbox').removeAttr('checked');
            $('input[id $="_EMAIL"]:checkbox').attr('checked', 'true');
            $('input[id $="_SMS"]:checkbox').attr('checked', 'true');
            $('input[id $="_TTYTDD"]:checkbox').attr('checked', 'true');
            $('input[id $="_RECIP"]:checkbox').attr('checked', 'true');
            onDeliverPathsChange('hasRecip');
        });
        $("#checkvoice").click(function() {
            $('input[id^="orgpath_"]:checkbox').removeAttr('checked');
            $('input[id $="_PHONE"]:checkbox').attr('checked', 'true');
            onDeliverPathsChange();
        });
        $(".deliver_path_chbox").click(function() {
            var clickItem = '';
            var id = $(this).attr('id').split('_');
            if (id[2] == 'PHONE') {
                $('#checkvoice').removeAttr('checked');
                $('#checkall').removeAttr('checked');
            } else if (id[2] == 'RECIP') {
                applyRecipPathChange($(this).attr("checked"));
                clickItem = 'hasRecip';
            } else {
                $('#checktext').removeAttr('checked');
                $('#checkall').removeAttr('checked');
            }
            onDeliverPathsChange(clickItem);
        });

        $("#leave_message").change(onVoiceMailChange);

        onTextChange("duration", "hrs");
        onTextChange("contactCycles");
        onTextChange("deliveryMethodInterval");
        onTextChange("cycleInterval");

        $(".recipientAppChbox").click(onRecipientAppChange);
        $("#isThrottle").click(onThrottleChange);
        $("#confirm").click(onCorfirmationChange);
        $("#language").click(onLanguageChange);
        $("#requirePinForMessage").click(onRequirePinChange);
        var sendCallerListener = null
        $(".sender_caller_ids").change(onSendCallerChange).focus(function(){
            sendCallerListener = setInterval(function(){onSendCallerChange()},100);
        }).blur(function(){
            clearInterval(sendCallerListener);
        });
        
        $("#viewRules").click(function(){
            if($("#throttle").is(':hidden')){
                $("#throttle").show();
                $("#viewRules").text('Hide Rules');
            }else{
                $("#throttle").hide();
                $("#viewRules").text('View Rules');
            }
            
        });
        if(!$("#type_Standard").is(":checked")){
            EB_View.notifications.newBc.changeSettingItemDisplay(false);
        }
        /* start of schedue objects */
        initScheduleObjects(lauchSettings);
    }

    function initScheduleObjects(lauchSettings) {
        var calendayIconUrl = EB_Common.Ajax.wrapperUrl("/statics/stylesheets/common/img/icn_calendar_16.png");
        $("#scheduledate").datetimepicker({
            dateFormat: "yy-mm-dd",
            minDate : new Date(),
            showOn : "button",
            buttonImage : calendayIconUrl,
            buttonImageOnly : true,
            changeMonth : true,
            buttonText: "Calendar",
            changeYear : true
        });
        $("#scheduledate").change(function() {
            var dateStr = $("#scheduledate").val();
            if (dateStr) {
                var dateArr = dateStr.split(" ");
                var launchType = $(".launch_type_radio:checked").val();
                if (launchType == 'Schedule') {
                    $("#repeatStartOn").val(dateStr);
                } else {
                    $("#repeatStartOn").val(dateArr[0]);
                    $("#hourMinutes").val(dateArr[1]);
                }
            }
        });

        $("#repeatStartOn").datepicker({
            dateFormat: "yy-mm-dd",
            minDate : new Date(),
            showOn : "button",
            buttonImage : calendayIconUrl,
            buttonImageOnly : true,
            changeMonth : true,
            changeYear : true,
            onSelect : function(dateStr) {
                $('#repeatEnds').datepicker('option', {
                    minDate : $(this).datepicker('getDate')
                });
            },
            onClose : function(dateStr) {
                if ($(this).datepicker('getDate') != '' && $(this).datepicker('getDate') != null) {
                    $("label[for='repeatStartOn']").remove();
                } else {
                    $("#repeatStartOn").rules("add", {
                        required : true
                    });
                }
                $("#repeatStartOn").valid();
            }
        });
        $("#repeatEnds").datepicker({
            dateFormat: "yy-mm-dd",
            minDate : new Date(),
            showOn : "button",
            buttonImage : calendayIconUrl,
            buttonImageOnly : true,
            changeMonth : true,
            changeYear : true,
            onSelect : function(dateStr) {
                $('#repeatStartOn').datepicker('option', {
                    maxDate : $(this).datepicker('getDate')
                });
            },
            onClose : function(dateStr) {
                if ($(this).datepicker('getDate') != '' && $(this).datepicker('getDate') != null) {
                    $("label[for='repeatEnds']").remove();
                } else {
                    $("#repeatEnds").rules("add", {
                        required : true
                    });
                }
                $("#repeatEnds").valid();
            }
        });

        // Settings
        onLaunchTypeChange();

        $(".launch_type_radio").click(function() {
            onLaunchTypeChange($(this));
        });

        $("#repeatType").change(function() {
            var option = $(this).find("option:selected");
            $('#reclabel').html(option.attr("data-msg"));
            $(".repeat_div").hide().parent().hide();
            if(option.attr("data-repeat") == 'yearly'){
            	$(".repeat_div").siblings('img').show();
            }else{
            	$(".repeat_div").siblings('img').hide()
            }
            $("#" + option.attr("data-repeat") + "_repeat").show().parent().show();
            
            $('#bc_schedule_li .error-right').hide();
            $('#bc_schedule_li input').removeClass('error');
            
        });

        $("#hourMinutes").timepicker({
            showOn : "button",
            buttonImage : calendayIconUrl,
            buttonImageOnly : true
        });

        $("#yearly_repeat").datepicker({
            dateFormat : "mm/dd",
            altFormat : "mm/dd",
            showOn : "button",
            buttonImage : calendayIconUrl,
            buttonImageOnly : true,
            changeMonth : true,
            changeYear : true,
            onSelect : function(dateStr) {
                var monthDay = dateStr.split('/');
                $("#time_month").val(Number(monthDay[0]));
                $("#monthly_repeat").val(Number(monthDay[1]));
                
                $("#yearly_repeat").valid();
            }
        });
        
        if($('#repeatType').val()!="YEARLY"){
        	$(".repeat_div").siblings('img').hide();
        }
        formatYearlyRepeat();
    }
    
    function formatYearlyRepeat(){
        //format yearly_repeat date to mm/dd when init page
        var date = $('#yearly_repeat').val();
        if($('#yearly_repeat').val()){
            var month_day = date.split('/');
            var month = Number(month_day[0]);
            var day = Number(month_day[1]);
            var dateString = '';
            if(month<10){
                dateString += '0' + month +'/';
            }else{
                dateString += month +'/';
            }
            if(day<10){
                dateString += '0' + day ;
            }else{
                dateString += day;
            }
            $('#yearly_repeat').val(dateString);
        }
    }
    function initSettings() {
        onDeliverPathsChange();
        onThrottleChange();
        onCorfirmationChange();
        onLanguageChange();
        onRecipientAppChange();
//        onRequirePinChange();
        onVoiceMailChange();
    }

    function onTextChange(id, unit) {
        $("#" + id).click(function() {
            $("#" + id + "_lbl").html($("#" + id).val() + (unit ? (" " + unit) : ""));
        });
    }

    function onRecipientAppChange() {
        var str = "";
        $(".recipientAppChbox").each(function() {
            str += $.trim($(this).parent().text()) + ": " + ($(this).attr("checked") ? "Yes" : "No") + "<br/>";
        })
        $("#recipientapp_showstr").attr("tipcaption", str);
    }
    function onThrottleChange() {
        /**
         * TODO: i18n
         */
        $("#isThrottle_lbl").html($("#isThrottle").attr("checked") ? "Yes" : "No");
    }
    function onCorfirmationChange() {
        if ($("#confirm").attr("checked")) {
            $("#requireConfirmChbox").attr("checked", "checked");
            $("#confirm_lbl").html("Yes");
        } else {
            $("#requireConfirmChbox").removeAttr("checked");
            $("#confirm_lbl").html("No");
        }
    }
    function onLanguageChange() {
        var selectOption = $("#language").find("option:selected");
        if (selectOption.val()) {
            $("#lbl_language").html(selectOption.text());
        }
    }

    function onRequirePinChange() {
        if ($("#requirePinForMessage").attr("checked")) {
            $("#leave_message").removeAttr("checked").removeAttr("disabled").attr("disabled", "disabled");
            $("#requirePinForMessage_lbl").html("Yes");
            $("#voiceMailOption").val('NO_MESSAGE');
            $("#voiceMailOption_lbl").html(i18n['notification.title.setting.voicemail.nomessage']);
        } else {
            $("#leave_message").removeAttr("disabled");
            $("#requirePinForMessage_lbl").html("No");
        }
    }

    /**
     * check and fill the checked delivered path to tips
     */
    function onDeliverPathsChange(flag) {
        $("#errSelContactDeliverpath").html("");
        $('#errSelContactDeliverpath').hide();
        var checkedDeliverPaths = $(".deliver_path_chbox:checked");
        if (checkedDeliverPaths.length > 0) {
            var str = "";
            for ( var i = 0; i < checkedDeliverPaths.length; i++) {
                str += $(checkedDeliverPaths[i]).attr("data-prompt") + "<br/>";
            }
            // if Recip checkbox clicked , apply recipient app changes
            if(flag=='hasRecip'){
            	applyRecipPathChange($(".deliver_path_chbox[data-type='RECIP']").attr("checked"));
            }
            onRecipientAppChange();
            $("#a_showstr").show();
            $("#a_showstr").attr("tipcaption", str);
            $("#orgpath_lbl").hide();
            return true;
        } else {
            $("#a_showstr").hide();
            $("#orgpath_lbl").show();
            return false;
        }
    }
    
    function onSendCallerChange() {
        var str = "";
        $(".sender_caller_ids").each(function() {
            str += $.trim($(this).parent().text()) + ": " + $(this).val() + "<br/>";
        })
        $("#senderCallerTips").attr("tipcaption", str);
    }

    function onVoiceMailChange() {
        if ($("#leave_message").attr("checked")) {
            $("#voiceMailOption").val('MESSAGE_ONLY');
            $("#voiceMailOption_lbl").html(i18n["notification.title.setting.voicemail.messageonly"]);
        } else {
            $("#voiceMailOption").val('NO_MESSAGE');
            $("#voiceMailOption_lbl").html(i18n['notification.title.setting.voicemail.nomessage'])
        }
    }

    function applyRecipPathChange(checked) {
        if (checked) {
            $(".recipientAppChbox").each(function(){
                if($(this).attr("id") != "addUserShareChbox" || $(this).attr("data-allow-share") == "true") {
                    $(this).removeAttr("disabled").attr("checked", "checked");
                }
            })
            $('#recipientAppChbox').attr("checked", "checked");
            $("#pushEnabledChbox").attr("checked", "checked");
        } else {
            $(".recipientAppChbox").removeAttr("checked").attr("disabled", "disabled");
            $('#recipientAppChbox').removeAttr("checked");
            $("#pushEnabledChbox").removeAttr("checked");
        }
    }
    /* start of schedule settings */
    function onLaunchTypeChange(launchType) {
        launchType = launchType ? launchType : $(".launch_type_radio:checked");
        var index = launchType.attr("data-index");
        if (index == 1) {
            $("#repeat_div").hide();
            $("#schedule").hide();
            $("#send").show();
            $("#save").hide();
            $("#div_saveas").show();
            $("#scheduleDiv").hide();
            $("#category_td").hide();
        }
        if (index == 2) {
            $("#repeat_div").hide();
            $("#schedule").show();
            $("#send").hide();
            $("#save").hide();
            $("#div_saveas").hide();
            $("#scheduleDiv").show();
        }
        if (index == 3) {
            $("#repeat_div").show();
            $("#schedule").show();
            $("#send").hide();
            $("#save").hide();
            $("#div_saveas").hide();
            $("#scheduleDiv").hide();
            if($('#repeatType').val()=='DAILY'){
            	$('#repeatOnDiv').hide();
            }else{
            	$('#repeatOnDiv').show();
            }
        }
    }
})(EB_View.notifications);