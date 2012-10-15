(function(view) {
    view.dashboard = function() {};
    view.dashboard.widgets = function() {};
    view.dashboard.widgets.broadcastActive = function() {};
    view.dashboard.widgets.broadcastActive.initPage = function() {
    	displayPies($('#maintab_Cont0'));
    };
    
    function loadchart(container, recdata) {
        Highcharts.setOptions({
            // mono-theme
            colors : [ '#DCBFB6', '#DF7E67', '#D02029', '#901A1D', '#46232F', '#F4DCCE', '#ESA385', '#D87148',
                    '#A0573A', '#664839', '#BF96A8', '#c198aa', '#C5559F', '#83205B', '#605560' ]
        });
        new Highcharts.Chart({
            chart: {
                height: 250,
                renderTo: container,
                events : {
                    load : function() {
                        // set up the updating of the chart each second
                        var series = this.series[0];
                        var data = [];
                        for ( var ele in recdata) {
                            data.push([ EB_Common.escapeHTML(ele), parseFloat(recdata[ele]) ]);
                        }
                        series.setData(data);
                    }
                }
            },
            title: {
                text: null
            },
            credits:{
                enabled:false
            },
            exporting: {
                enabled: false
            },
            tooltip: {
                formatter: function() {
                    return '<b>'+ this.point.name +'</b>: '+ this.percentage.toFixed(2) +' %';
                }
            },
            legend: {
                enabled: true,
                align: 'right',
                layout: 'vertical',
                verticalAlign: 'top',
                x:0,
                y:0,
                labelFormatter: function() {
                	var name = this.name;
                	if(name.length > 20){
                		name = name.substring(0,20) + '...'
                	}
                	return name +': ' + this.y;
                },
                itemStyle: {
                    color: '#333333',
                    fontFamily: 'Arial',
                    fontSize:'11px',
                    paddingRight:'10px'
			    }
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        distance: -30,
                        color:'black',
                        formatter: function() {
                        	var percentage = this.percentage.toFixed(2);
                            return percentage==0.00?'':percentage +' %';
                        }
                    },
                    point:{
                    	events: {
                            legendItemClick: function(event) {
                                return false;
                            }
                        }
                    },
                    showInLegend: true
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                data: []
            }]
        });
    }
    
    function convertI18n(data) {
        var chartData = {};
        chartData[i18n['global.chart.confirmed']] = data.confirmedCount ? data.confirmedCount : 0;
        chartData[i18n['global.chart.notConfirmed']] = data.notConfirmedCount ? data.notConfirmedCount : 0;
        chartData[i18n['global.chart.confirmLate']] = data.confirmedLateCount ? data.confirmedLateCount : 0;
        chartData[i18n['global.chart.unreachable']] = data.unreachableCount ? data.unreachableCount : 0;
        return chartData;
    }

    function displayPies(container){
    	EB_Common.Ajax.get("/widgets/broadcast/overview/data?timeStamp="+new Date().getTime(), {}, 
				function(data) {
    				var notifications = data.list;
		    		var length = notifications.length;
		    		var size = data.size;
		    		for(var i = 0; i < length; i++){
		    			var notificationVo = notifications[i];
		    			var key = notificationVo.notificationId;
		    			var wrapper = $('<div class="text_left margin5-T margin5_B border_bom padding15-bom overf-h" ></div>');
						var orgNameLabel = $('<p><label>'+i18n['dashboard.organization']+'</label>: '+EB_Common.escapeHTML(notificationVo.organizationName)+'</p>');
						var eventLabel = $('<p><label>'+i18n['dashboard.event']+'</label>: '+EB_Common.escapeHTML(notificationVo.eventName)+'</p>');
						var msgTitleLabel = $('<p><label>'+i18n['dashboard.msgTitle']+'</label>: '+EB_Common.escapeHTML(notificationVo.messageTitle)+'</p>');
						var startDateLabel = $('<p><label>'+i18n['dashboard.startDate']+'</label>: '+notificationVo.startDate+'</p>');
						var div = $('<div class="chart_container margin5-T"></div>');
						var link = $('<a class="right margin8-R"  href="'+EB_Common.Ajax.wrapperUrl("/histories/report/"+key)+'">'+i18n['dashboard.report.link']+'</a>');
						div.attr('id',key.toString()+'_bc');
						
						wrapper.append(orgNameLabel);
						wrapper.append(eventLabel);
						wrapper.append(msgTitleLabel);
						wrapper.append(startDateLabel);
						wrapper.append(div);
						wrapper.append(link);
						container.append(wrapper);
						if(notificationVo.isEmpty){
							EB_Common.noData(key.toString()+'_bc');
						}else{
							try{
								loadchart(key.toString()+'_bc',notificationVo.type == "Polling" ? notificationVo.data : convertI18n(notificationVo.data));
							}catch(err){
								EB_Common.noData(key.toString()+"_bc");
							}
						}
		    		}
		    		if(size > 3){
		        		var more = $('<a class="margin10_B" href="'+EB_Common.Ajax.wrapperUrl("/notifications#ui-tabs-3")+'">'+i18n['dashboard.more']+'</a>');
		        		container.append(more);
						return false;
					}
    		});
    }
    
})(EB_View);