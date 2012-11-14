(function(view) {
    var uploadersMap = {};
    view.uploader = function() {};
    view.uploader.uploadersMap=uploadersMap;
    var defaultOptions = {
        sessionId : "",
        uploadUrl : "",
        uploaderKey : "uploader",
        containerId : "uploaderContainer",
        fileInfoDivId : "upload_info_div",
        removeIconClass : "file_del_btn",
        btnText : "upload files",
        maxFilesCount : 5,
        fileTypes : "*.*",
        fieldName : "uploadedFiles",
        buttonImageUrl : "/statics/stylesheets/common/img/uploader_bg.png",
        fileLimit : "1 MB",
        handlers : {
            swfupload_loaded:function(){
                //EB_View.notifications.newBc.updateUploadLimit(this);
            	updateUploadLimit(this);
            },
            fileQueued : function(file) {
                EB_Common.logger.log("file id: " + file.id + ", file name: " + file.name);
                var container = $("#" + this.customSettings.fileInfoDivId);
                container.show();
                $.tmpl("uploadedItemTmpl", [ {
                    id : file.id,
                    name : file.name,
                    key : this.customSettings.uploaderKey,
                    fieldName : this.customSettings.fieldName,
                    removeIconClass : this.customSettings.removeIconClass
                } ]).appendTo(container.find("ul:first"));
                $("#progress_" + file.id).progressbar({
                    value : 0
                });
                reOrderUploadedItem(this.settings.button_placeholder_id, this.customSettings.removeIconClass);
                this.startUpload(file.id);
            },
            fileQueuedError : function(file, errorCode, message) {
                try {
                    switch (errorCode) {
                    case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                        EB_Common.dialog.alert(file.name + " exceeds the size limit: " + this.settings.file_size_limit);
                        break;
                    case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
                        EB_Common.dialog.alert("Selected files exceeds the max file count: " + this.settings.file_upload_limit);
                        break;
                    case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                        EB_Common.dialog.alert(file.name + "'s file type is invalid, supported file types: "
                                + this.settings.file_types);
                        break;
                    case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                        EB_Common.dialog.alert(file.name + " is an empty file.");
                        break;
                    default:
                        EB_Common.dialog.alert("The file: " + file.name + " is not allowed");
                    }
                } catch (e) {
                    EB_Common.dialog.alert("The file: " + file + " is not allowed, " + e);
                }
            },
            fileDialogComplete : function(numFilesSelected, numFilesQueued) {
                EB_Common.logger.log("numFilesSelected: " + numFilesSelected + ", numFilesQueued: " + numFilesQueued);
            },
            uploadStart : function(file) {
                EB_Common.logger.log("file id: " + file.id + ", file name: " + file.name);
            },
            uploadProgress : function(file, bytesLoaded, bytesTotal) {
                try {
                    var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
                    EB_Common.logger.log("percent: " + percent);
                    $("#progress_" + file.id).progressbar('value', percent);
                } catch (ex) {
                    EB_Common.logger.log(ex);
                }
            },
            uploadSuccess : function(file, serverData) {
                try {
                    var fileDiv = $("#progress_" + file.id).parent();
                    var ret = $.parseJSON(serverData);
                    if (ret && ret.success) {
                        fileDiv.find("input").val(ret.fileName + "-" + ret.originFileName);
                        //trigger the messageBody and voice validation (use should input at least one of them)
                        if(this.customSettings.fieldName=='uploadedVoice'){
                            $('#textMessage').trigger('blur');
                        }
                    } else {
                        //remove this file
                        fileDiv.find(".up_voice_del_btn").click();
                        EB_Common.dialog.alert("Unsupported file");
                    }
                    EB_Common.logger.log("serverData: " + serverData);
                } catch (ex) {
                    EB_Common.logger.log(ex);
                }
            },
            uploadError : function(file, errorCode, message) {
                try {
                    switch (errorCode) {
                    case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
                        EB_Common.logger.log("Error Code: HTTP Error, File name: " + file.name + ", Message: "
                                + message);
                        break;
                    case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
                        EB_Common.logger.log("Error Code: Upload Failed, File name: " + file.name + ", File size: "
                                + file.size + ", Message: " + message);
                        break;
                    case SWFUpload.UPLOAD_ERROR.IO_ERROR:
                        EB_Common.logger.log("Error Code: IO Error, File name: " + file.name + ", Message: " + message);
                        break;
                    case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
                        EB_Common.logger.log("Error Code: Security Error, File name: " + file.name + ", Message: "
                                + message);
                        break;
                    case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
                        EB_Common.logger.log("Error Code: Upload Limit Exceeded, File name: " + file.name
                                + ", File size: " + file.size + ", Message: " + message);
                        break;
                    case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
                        EB_Common.logger.log("Error Code: File Validation Failed, File name: " + file.name
                                + ", File size: " + file.size + ", Message: " + message);
                        break;
                    case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
                        break;
                    case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
                        break;
                    default:
                        EB_Common.logger.log("Error Code: " + errorCode + ", File name: " + file.name + ", File size: "
                                + file.size + ", Message: " + message);
                        break;
                    }
                } catch (ex) {
                    EB_Common.logger.log(ex);
                }
            },
            uploadComplete : function(file) {
                // hide progress bar after complete
                // $("#progress_" + file.id).hide();
            }
        }
    }
    // sessionId, uploaderKey, uploadUrl, containerId, btnText, maxFilesCount,
    // fileTypes, fieldName, fileLimit, handlers
    /**
     * create a upload btn to upload multi files
     */
    view.uploader.createUploadBtn = function(options) {
        var newOptions = $.extend({}, defaultOptions);
        if (options) {
            newOptions = $.extend(true, newOptions, options);
        }
        EB_Common.Ajax.get("/statics/tmpl/notification/uploadedItem.html", {}, function(data) {
            $.template("uploadedItemTmpl", data);
        }, 'html');
        $("." + newOptions.removeIconClass).live("click", function() {
            // cancel upload
            var uploaderInstance = uploadersMap[$(this).attr("data-swf-key")];
            $(this).parent().parent().remove();
            if (uploaderInstance) {
                uploaderInstance.cancelUpload($(this).attr("data-file-id"));
                //var exist = EB_View.notifications.newBc.updateUploadLimit(uploaderInstance);
                var exist = updateUploadLimit(uploaderInstance);
                if(exist == 0){
                    $("#" + uploaderInstance.customSettings.fileInfoDivId).hide();
                } else {
                    $("#" + uploaderInstance.customSettings.fileInfoDivId).show();
                }
                reOrderUploadedItem(uploaderInstance.settings.button_placeholder_id, uploaderInstance.customSettings.removeIconClass);
            }
            if(newOptions.validation){
            	$("#notification").validate().element("#textMessage");
            }
            //trigger the messageBody and voice validation (use should input at least one of them)
            if(newOptions.fieldName=='uploadedVoice'){
                $('#textMessage').trigger('blur');
            }
        });
        var uploaderInstance = new SWFUpload({
            flash_url : EB_Common.Ajax.wrapperUrl("/statics/swf/swfupload.swf"),
            upload_url : EB_Common.Ajax.wrapperUrl(newOptions.uploadUrl + ";jsessionid=" + newOptions.sessionId),
            post_params : {
                "JSESSIONID" : newOptions.sessionId
            },
            file_size_limit : newOptions.fileLimit,
            file_types : newOptions.fileTypes,
            file_types_description : "All Files",
            file_upload_limit : newOptions.maxFilesCount,
            file_queue_limit : newOptions.maxFilesCount,
            custom_settings : {
                queuedFileCount : 0,
                uploadedFileCount : 0,
                maxFilesCount : newOptions.maxFilesCount,
                uploaderKey : newOptions.uploaderKey,
                fieldName : newOptions.fieldName,
                fileInfoDivId : newOptions.fileInfoDivId,
                removeIconClass : newOptions.removeIconClass
            },
            debug : false,
            button_window_mode : SWFUpload.WINDOW_MODE.OPAQUE,
            // Button settings
            button_image_url : EB_Common.Ajax.wrapperUrl(newOptions.buttonImageUrl),
            button_width : 150,
            button_height : 27,
            button_placeholder_id : newOptions.containerId,
            button_text : '<a class="upFont">' + newOptions.btnText + '</a>',
            button_text_style : ".upFont {font-size: 12; font-family:arial; text-align:center;color: #1A77C7;text-decoration: underline;}",
            button_text_top_padding : 3,
            button_cursor : SWFUpload.CURSOR.HAND,

            // The event handler functions are defined in handlers.js
            swfupload_loaded_handler : newOptions.handlers.swfupload_loaded,
            file_queued_handler : newOptions.handlers.fileQueued,
            file_queue_error_handler : newOptions.handlers.fileQueuedError,
            file_dialog_complete_handler : newOptions.handlers.fileDialogComplete,
            upload_start_handler : newOptions.handlers.uploadStart,
            upload_progress_handler : newOptions.handlers.uploadProgress,
            upload_error_handler : newOptions.handlers.uploadError,
            upload_success_handler : newOptions.handlers.uploadSuccess,
            upload_complete_handler : newOptions.handlers.uploadComplete
        });
        if (newOptions.uploaderKey) {
            uploadersMap[newOptions.uploaderKey] = uploaderInstance;
        }
        return uploaderInstance;
    }
    function reOrderUploadedItem(containerId, clazz) {
        $("." + clazz, "#"+containerId).each(function(index) {
            $(this).siblings("label").html(index + 1 + ':');
        });
    }
    
    function updateUploadLimit(upload){
        var existFileCount =  $("#" + upload.customSettings.fileInfoDivId).find("ul:first li").length;
        var stats = upload.getStats();
        stats.successful_uploads=existFileCount;
        upload.setStats(stats);
        return existFileCount;
    }
    view.uploader.updateUploadLimit = updateUploadLimit;
})(EB_View);
