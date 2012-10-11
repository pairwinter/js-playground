(function(view) {
    view.histories = function() {
    };
    view.histories.loadchart = function(container, recdata) {
        Highcharts.setOptions({
            // mono-theme
            colors : [ '#DCBFB6', '#DF7E67', '#D02029', '#901A1D', '#46232F', '#F4DCCE', '#ESA385', '#D87148',
                    '#A0573A', '#664839', '#BF96A8', '#c198aa', '#C5559F', '#83205B', '#605560' ]
        // multiple-theme
        // colors: ['#c28e78', '#ed5840', '#882445', '#c3a3c1', '#78738b', '#cacfe9', '#458bba', '#8a98cd', '#eae2b2',
        // '#d0c347', '#8d8648','#7eb261','#50574d']
        });
        new Highcharts.Chart({
            chart : {
                renderTo : container,
                borderWidth : 0,
                plotBorderWidth : 0,
                marginLeft : 10,
                events : {
                    load : function() {
                        // set up the updating of the chart each second
                        var series = this.series[0];
                        var data = [];
                        for ( var ele in recdata) {
                            data.push([ ele, parseFloat(recdata[ele]) ]);
                        }
                        series.setData(data);
                    }
                }
            },
            title : {
                text : ''
            },
            credits : {
                enabled : false
            },
            exporting : {
                enabled : false
            },
            tooltip : {
                formatter : function() {
                    return '<b>' + this.point.name + '</b>: ' + this.percentage + ' %';
                }
            },
            legend : {
                enabled : true,
                align : 'right',
                layout : 'vertical',
                verticalAlign : 'top',
                x : 0,
                y : 0,
                labelFormatter : function() {
                    return (this.name.length>20?(this.name.substring(0,20)+"..."):this.name) + ': ' + this.y;
                },
                itemStyle : {
                    color : '#333333',
                    fontFamily : 'Arial',
                    fontSize : '11px'
                }
            },
            plotOptions : {
                pie : {
                    size : "100%",
                    center : [ 50, 50 ],
                    allowPointSelect : false,
                    cursor : 'pointer',
                    dataLabels : {
                        enabled : false
                    },
                    showInLegend : true,
                    point : {
                        events : {
                            legendItemClick : function(event) {
                                return false;
                            }
                        }
                    }
                }

            },
            series : [ {
                type : 'pie',
                name : 'test'
            } ]
        });
    };
    view.histories.list = function(status) {
        $("#active_gridTable").jqGrid(
                {
                    autoencode : true,
                    url : EB_Common.Ajax.wrapperUrl("/histories/list/" + status),
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
                    colNames : [ '', i18n['activebroadcast.field.messagetitle'],
                            i18n['activebroadcast.field.eventname'], i18n['activebroadcast.field.startdate'],
                            i18n['activebroadcast.field.broadcastoptions'], i18n['activebroadcast.field.report'], '' ],
                    colModel : [
                            {
                                name : 'priority',
                                index : 'priority',
                                colGetLength : false,
                                sorttype : "string",
                                width : 20,
                                sortable : false,
                                formatter : function(value, rec, row) {
                                    return row.priority == 'Priority' ? '<i class="icn_priority_hover_16"></i>' : '';
                                }
                            },
                            {
                                name : 'messageTitle',
                                colGetLength : false,
                                index : 'messageTitle',
                                formatter : function(value, rec, row) {
                                    return '<a style="width:100px" href="'
                                            + EB_Common.Ajax.wrapperUrl('/histories/report/' + row.id)
                                            + '#ui-tabs-1"  title="' + i18n['button.showsummary'] + '">'
                                            + $.jgrid.htmlEncode(row.message.title) + '</a>';
                                }
                            },
                            {
                                name : 'event',
                                index : 'event',
                                colGetLength : false,
                                sortable : false,
                                width : 120,
                                formatter : function(value, rec) {
                                    return value ? $.jgrid.htmlEncode(value.name) : '';
                                }
                            },
                            {
                                name : 'formattedStartDate',
                                index : 'startDate',
                                colGetLength : false,
                                width : 125,
                                sorttype : "datetime",
                                formatter : function(value, rec, row) {
                                    if (row.notificationStatus == 'Inprogress') {
                                        return value + '<br><span class="green_active ">active</span>';
                                    } else {
                                        return value;
                                    }
                                }
                            },
                            {
                                name : 'broadcastoption',
                                index : 'broadcastoption',
                                width : 125,
                                sorttype : "string",
                                colGetLength : false,
                                sortable : false,
                                formatter : function(value, rec, row) {
                                    var formatter = [];
                                    formatter.push(row.broadcastSettings.senderEmail + "</br>");
                                    formatter.push("Duration:" + row.broadcastSettings.duration + "</br>");
                                    formatter.push("Contact Cycles:" + row.broadcastSettings.contactCycles);
                                    return formatter.join("");
                                }
                            },
                            {
                                name : 'chart',
                                index : 'chart',
                                width : 280,
                                sortable : false,
                                colGetLength : false,
                                formatter : function(id, rec, rowObject) {
                                    return '<div style="max-width: 280px; min-width: 240px; height: 120px;"></div>';
                                }
                            },
                            {
                                name : 'notificationStatus',
                                index : 'notificationStatus',
                                colGetLength : false,
                                sortable : false,
                                width : 150,
                                align : "center",
                                formatter : function(value, rec, row) {
                                    if (value == 'Completed' || value == 'Stopped') {
                                        if (row.notificationResult.notConfirmedCount > 0) {
                                            return '<a href="javascript:void(' + row.id
                                                    + ')" class="button orange resend_noti_btn" title="'
                                                    + i18n['button.resendbroadcast'] + '">'
                                                    + i18n['activebroadcast.button.rebroadcast'] + '</a>';
                                        } else {
                                            return "";
                                        }
                                    } else if (value == 'Inprogress') {
                                        return '<a href="javascript:void(' + row.id
                                                + ')" class="button gray stop_noti_btn" title="'
                                                + i18n['button.stopbroadcast'] + '">'
                                                + i18n['activebroadcast.button.stop'] + '</a>';
                                    } else {
                                        return '';
                                    }
                                }
                            } ],
                    afterInsertRow : function(id, rowdata, rowele) { // display chart after insert
                        var chart_cell = jQuery("#active_gridTable").getInd(id, true);
                        if (chart_cell && chart_cell.cells) {
                            var chart_container = chart_cell.cells[6].childNodes[0];
                            var ret = rowele.notificationResult;
                            if (!ret || ret.totalCount == 0) {
                                if (chart_container) {
                                    $(chart_container).replaceWith("<span>NO Data</span>");
                                }
                                return;
                            }
                            if(rowele.type == "Polling" && (!ret.pollingDetails||ret.pollingDetails.length==0)){
                                if (chart_container) {
                                    $(chart_container).replaceWith("<span class='div_nodata' >NO Data</span>");
                                }
                                return;
                            }
                            EB_View.notifications.histories.loadchart(chart_container,
                                    rowele.type == "Polling" ? convertResponseData(ret) : convertI18n(ret));
                        }
                    },
                    // shrinkToFit: false,
                    sortname : 'startDate',
                    sortorder : 'desc',
                    viewrecords : true,
                    pager : "#active_gridPager",
                    multiselect : false,
                    prmNames : {
                        page : "pageNo", // 
                        totalrows : "totalrows" //
                    },
                    loadComplete : function() {
                        $(".resend_noti_btn").click(function() {
                            resendNotification($(this).attr('href').match(/\d+/), 1);
                        });

                        $(".stop_noti_btn").click(function() {
                            stopNotification($(this).attr('href').match(/\d+/), 1);
                        })
                    }
                });
        view.listenSearch("active_gridTable");
    };
    view.histories.chart = function(notificationId, notificationType) {
        $('#sendfollowup').dialog({
            autoOpen : false,
            width : 425,
            height : "auto",
            modal : true,
            resizable : false,
            buttons : {
                Ok : {
                    click : function() {
                        if ($("input[type='checkbox']:checked").length > 0) {
                            var action = EB_Common.Ajax.wrapperUrl("/notifications/follow/" + notificationId);
                            $('#activehistory').attr("action", action);
                            $('#activehistory').ajaxSubmit({
                                success : function(data) {
                                    window.location = EB_Common.Ajax.wrapperUrl("/bcTemplates/new/4");
                                }
                            });
                        }
                        $(this).dialog("close");
                    },
                    'class' : 'orange',
                    text : i18n['button.send']
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
        $(".polling_res_chbox").click(function(){
            var elem = $(this);
            if(elem.attr("checked")) {
                $(".polling_chbox_"+elem.attr("data-index")).attr("checked", "checked");
            } else {
                $(".polling_chbox_"+elem.attr("data-index")).removeAttr("checked");
            }
        })
        $('#sendfollowup_link').click(function() {
            $('#sendfollowup').dialog('open');
        });

        $("#report_stopbroadcast").click(function() {
            stopNotification($("#notificationid").val(), 2);
        });

        $("#report_resend").click(function() {
            resendNotification($("#notificationid").val(), 2);
        });

        $("#confirmationrate").click(function() {
            EB_Common.Ajax.get('/histories/chart/' + notificationId + '/confirmation', {}, function(data) {
                EB_View.notifications.histories.loadchart("reportChart", convertI18n(data));
            }, 'json')
        });

        $("#confirmationcontact").click(function() {
            loadPieChart("reportChart", '/histories/chart/' + notificationId + '/path');
        });

        $("#pollingpie").click(function() {
            loadPieChart("reportChart", '/histories/chart/' + notificationId + '/polling');
        });

        if (notificationType != 'Polling') {
            $("#confirmationrate").trigger("click");
        } else {
            $("#pollingpie").trigger("click");
        }
    };
    view.histories.loadDetails = function(notificationId) {
        $("#detail_gridTable")
                .jqGrid(
                        {
                            autoencode : true,
                            url : EB_Common.Ajax.wrapperUrl("/histories/details/" + notificationId),
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
                            colNames : [ '', 'Contact Name', 'Confirmed', 'First Attempt Time', 'Confirmed Path', 'Polling Result' ],
                            colModel : [
                                    {
                                        name:'contactId',
                                        index:'contactId',
                                        hidden:true,
                                        width : 10,
                                        colGetLength : false
                                    },
                                    {
                                        name : 'fullName',
                                        index : 'fullName',
                                        width : 120
                                    },
                                    {
                                        name : 'confirmed',
                                        index : 'confirmed',
                                        width : 120
                                    },
                                    {
                                        name : 'formattedAttemptTime',
                                        index : 'formattedAttemptTime',
                                        // width : 150,
                                        sortable : false
                                    },
                                    {
                                        name : 'orgPath',
                                        index : 'orgPath',
                                        width : 125,
                                        colGetLength : false,
                                        sortable : false,
                                        formatter : function(value, rec, row) {
                                            return value ? value.prompt : '';
                                        }
                                    },
                                    {
                                        name : 'responseTextMessage',
                                        index : 'responseTextMessage',
                                        width : 350,
                                        sortable : false,
                                        colGetLength : false,
                                        formatter : function(value, rec, row) {
                                            if (row.circumstanceList && row.circumstanceList.length>0) {
                                                return $
                                                        .map(
                                                                row.circumstanceList,
                                                                function(element, i) {
                                                                    return (element.summary.length > 10 ? (element.summary
                                                                            .substring(0, 10) + '...')
                                                                            : element.summary)
                                                                            + ' <a href="javascript:void(0);" class="viewDetails" rowId="'
                                                                            + row.id
                                                                            + '" index="'
                                                                            + i
                                                                            + '">View Details</a>';
                                                                }).join('<br>');
                                            }
                                            return value;
                                        }
                                    } ],
                            sortname : 'startDate',
                            sortorder : 'desc',
                            viewrecords : true,
                            pager : "#detail_gridPager",
                            multiselect : false,
                            subGrid : true,
                            subGridRowExpanded: function(subgrid_id, row_id) {
                                // we pass two parameters
                                // subgrid_id is a id of the div tag created whitin a table data
                                // the id of this elemenet is a combination of the "sg_" + id of the row
                                // the row_id is the id of the row
                                // If we wan to pass additinal parameters to the url we can use
                                // a method getRowData(row_id) - which returns associative array in type name-value
                                // here we can easy construct the flowing
                                var subgrid_table_id, pager_id;
                                subgrid_table_id = subgrid_id+"_t";
                                pager_id = "p_"+subgrid_table_id;
                                var rowObject=$("#detail_gridTable").jqGrid('getRowData',row_id);
                                console.log(rowObject);
                                $("#"+subgrid_id).html("<table id='"+subgrid_table_id+"' class='scroll'></table><div id='"+pager_id+"' class='scroll'></div>");
                                jQuery("#"+subgrid_table_id).jqGrid({
                                    url:EB_Common.Ajax.wrapperUrl("/histories/callResult?notificationId=" + notificationId+"&contactId="+rowObject.contactId),
                                    datatype: "json",
                                    jsonReader : {
                                        root : "callResults",
                                        records : "totalCount",
                                        repeatitems : false
                                    },
                                    colNames: ['Contact Name','Confirmed','Attempt','Attempt Time','Path Type','Call Result'],
                                    colModel: [
                                        {name:"contactName",index:"firstName",width:100,sortable:false},
                                        {name:"isConfirmed",index:"isConfirmed",width:100,sortable:false},
                                        {name:"attemptOrder",index:"attemptOrder",width:100,sortable:false},
                                        {name:"attemptTime",index:"attemptTime",width:100,sortable:false},
                                        {name:"path",index:"path",width:100,sortable:false},
                                        {name:"callResult",index:"callResult",width:100,sortable:false}
                                    ],

                                    rowNum:20,
                                    //pager: pager_id,
                                    sortname: 'firstName',
                                    sortorder: "asc",
                                    height: '100%'
                                });
                                //jQuery("#"+subgrid_table_id).jqGrid('detail_gridTable',"#"+pager_id,{edit:false,add:false,del:false})
                            },
                            subGridRowColapsed: function(subgrid_id, row_id) {
                                // this function is called before removing the data
                                //var subgrid_table_id;
                                //subgrid_table_id = subgrid_id+"_t";
                                //jQuery("#"+subgrid_table_id).remove();
                            },
                            prmNames : {
                                page : "pageNo", // 
                                totalrows : "totalrows" //
                            },
                            loadComplete : function(data) {
                                $('.viewDetails').click(
                                    function(e) {
                                        e.stopPropagation();
                                        var aDom = $(this);
                                        $.each(data.data, function(i, element) {
                                            if (element.id == aDom.attr('rowId')) {

                                                $('body').append(
                                                        $('<div class="recip_details">').css({
                                                            "z-index" : 9999,
                                                            "position" : "absolute"
                                                        }).append(
                                                                $("#RecipientappMessagesTemplate_solicited")
                                                                        .render(
                                                                                element.circumstanceList[aDom
                                                                                        .attr('index')])).offset(
                                                                $(e.target).offset()).click(function(e) {
                                                            e.stopPropagation();
                                                        }));

                                            }
                                        });
                                });

//                                var rowIds = $("#detail_gridTable").getDataIDs();
//                                $.each(rowIds, function (index, rowId) {
//                                    $("#detail_gridTable").expandSubGridRow(rowId);
//                                });
                            }


                        });
    };
    $(document).bind('click', function(e) {
        $('.recip_details').remove();
        // if(!$(e.target).parentsUntil('.recip_details').is(".recip_details")){
        // $('.recip_details').remove();
        // }
    });
    function resendNotification(notificationId, source) {
        EB_Common.dialog.confirm(i18n['global.dialog.content.notification.resend.confirm'],
                i18n['global.dialog.title.confirm'], function() {
                    var dialog = $(this);
                    EB_Common.Ajax.get("/notifications/resend/" + notificationId, {}, function(data) {
                        dialog.dialog("close");
                        if (data.success) {
                            // go to active page
                            if (source == 1) {
                                view.reloadGrid("active_gridTable");
                            } else {
                                window.location = EB_Common.Ajax.wrapperUrl("/notifications#ui-tabs-3");
                            }
                        } else {
                            EB_Common.dialog.alert(data.message, 'alert', function() {
                                $(this).dialog('close');
                            });
                        }
                    })
                });
    }

    function stopNotification(notificationId, source) {
        EB_Common.dialog.confirm(i18n['global.dialog.content.notification.stop.confirm'],
                i18n['global.dialog.title.confirm'], function() {
                    var dialog = $(this);
                    EB_Common.Ajax.get("/notifications/stop/" + notificationId, {}, function(data) {
                        dialog.dialog("close");
                        if (data.success) {
                            // go to active page
                            if (source == 1) {
                                view.reloadGrid("active_gridTable");
                                var old = $("#inprogress").text();
                                old = parseInt(old);
                                if(old){
                                    $("#inprogress").text(old-1);
                                }
                            } else {
                                window.location = EB_Common.Ajax.wrapperUrl("/notifications#ui-tabs-3");
                            }
                        } else {
                            EB_Common.dialog.alert(data.message, 'alert', function() {
                                $(this).dialog('close');
                            });
                        }
                    })
                });
    }

    function loadPieChart(containerId, url) {
        EB_Common.Ajax.get(url, {}, function(data) {
            EB_View.notifications.histories.loadchart(containerId, data);
        }, 'json')
    }

    function convertI18n(data) {
        var chartData = {};
        chartData[i18n['global.chart.confirmed']] = data.confirmedCount ? data.confirmedCount : 0;
        chartData[i18n['global.chart.notConfirmed']] = data.notConfirmedCount ? data.notConfirmedCount : 0;
        chartData[i18n['global.chart.confirmLate']] = data.confirmedLateCount ? data.confirmedLateCount : 0;
        chartData[i18n['global.chart.unreachable']] = data.unreachableCount ? data.unreachableCount : 0;
        return chartData;
    }

    function convertResponseData(data) {
        var chartData = {};
        var details = data.pollingDetails;
        if (details) {
            for ( var i = 0; i < details.length; i++) {
                var detail = details[i];
                chartData[detail.responseText] = detail.count ? detail.count : 0;
            }
        }
        return chartData;
    }
})(EB_View.notifications);