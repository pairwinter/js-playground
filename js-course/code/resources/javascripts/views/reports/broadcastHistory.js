(function(view) {
	view.reports = function() {};
	view.reports.broadcastHistory = function() {};
	view.reports.broadcastHistory.initPage = function() {
		setChart();
		$("#select").click(function() {
			setChart();
		});

		$("#startDate, #endDate").focus(function () {
	        $(".ui-datepicker-calendar").hide();
            $(".ui-datepicker.ui-widget.ui-widget-content.ui-helper-clearfix.ui-corner-all").addClass("d-index");
	        $(".ui-datepicker-current.ui-state-default.ui-priority-secondary.ui-corner-all").hide();
	        $("#ui-datepicker-div").position({
	            my: "center top",
	            at: "center bottom",
	            of: $(this)
	        }); 
		});
		
		$("#startDate, #endDate").datepicker({
	           changeMonth: true,
	           changeYear: true,
	           showButtonPanel: true,
	           dateFormat: 'yy-mm',
	           onClose: function(dateText, inst) {
	               var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
	               var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
	               $(this).val($.datepicker.formatDate('yy-mm', new Date(year, month, 1)));
	           },
	           beforeShow : function(input, inst) {
	               if ((datestr = $(this).val()).length > 0) {
	                   year = datestr.substring(0, 4);
	                   month = datestr.substring(5, 7) - 1;
	                   $(this).datepicker('option', 'defaultDate', new Date(year, month, 1));
	                   $(this).datepicker('setDate', new Date(year, month, 1));
	               }
	               var other = this.id == "startDate" ? "#endDate" : "#startDate";
	               if ((selectedDate = $(other).val()).length > 0) {
	                   year = selectedDate.substring(0, 4);
	                   month = selectedDate.substring(5, 7);
	                   if(this.id == "startDate"){
	                	   $(this).datepicker( "option", "maxDate", new Date(year, month-1, 1));
	                	   $(this).datepicker( "option", "minDate", new Date(year-1, month, 1));
	                   }else{
	                	   $(this).datepicker( "option", "minDate", new Date(year, month-1, 1));
	                	   $(this).datepicker( "option", "maxDate", new Date(new Number(year)+1, month - 2, 1));
	                   }
	               }
	           }
	       });
		
	};
	
	function setChart(){
		EB_Common.Ajax.get("/reports/broadcast/history/data", {
			startDate : $("#startDate").val(),
			endDate : $("#endDate").val()
		}, function(data) {
			$('#totalBroadcasts').text(data.totalBroadcasts);
			loadColumnChart(data.bcCount,data.tickInterval);
			loadStackColumnChart(data.typeCount,data.tickInterval);
		});
	}
	
	function loadColumnChart(recdata,tickInterval){
		Highcharts.setOptions({
            //mono-theme
            colors: ['#c28e78', '#ed5840', '#882445', '#c3a3c1', '#78738b', '#cacfe9', '#458bba', '#8a98cd', '#eae2b2', '#d0c347', '#8d8648','#7eb261','#50574d']
        });
		new Highcharts.Chart({
			chart : {
				renderTo : 'broadcastByMonth',
				type : 'column',
				events : {
                    load : function() {
                        // set up the updating of the chart each second
                        var series = this.series[0];
                        var categories = [];
                        var data = [];
                        for ( var ele in recdata) {
                        	categories.push(EB_Common.escapeHTML(ele));
                        	data.push(parseFloat(recdata[ele]));
                        }
                        this.xAxis[0].setCategories(categories);
                        series.setData(data);
                    }
                }
			},
			title : {
				text : i18n['report.broadcast.history.bcByMonth'],
                style:{
                	color: '#333333',
                	fontSize: '14px',
                    fontFamily: 'Arial'
                }
			},
			credits : {
				enabled : false
			},
			exporting : {
				enabled : false
			},
			xAxis : {
				categories : [],
				labels : {
					 align: 'right',
					 rotation: -45
				}
			},
			yAxis : {
				min : 0,
				title : {
                    text :  i18n['report.yaxis.title'],
                    style:{
                        color: '#333333',
                        fontSize: '11px',
                        fontFamily: 'Arial',
                        fontWeight:'normal'
                    }
				},
				allowDecimals: false,
				tickInterval : tickInterval,
				lineWidth: 1
			},
			legend: {
				itemStyle: {
					color: '#333333',
                    fontFamily: 'Arial'
			    },
			    symbolWidth: 15
			},
			tooltip: {
			     formatter: function() {
			         return ''+
			         this.x +': '+ this.y ;
			     }
			},
			plotOptions : {
				column : {
					pointPadding : 0.2,
					borderWidth : 0,
					showInLegend : true,
					dataLabels: {
                         enabled: true
                    },
                    events: {
                        legendItemClick: function(event) {
                            return false;
                        }
                    }
				}
			},
			series : [{name:'Broadcast'}]
		});
	}
	
	function loadStackColumnChart(recdata,tickInterval){
		Highcharts.setOptions({
            //mono-theme
            colors: ['#c28e78', '#ed5840', '#882445', '#c3a3c1', '#78738b', '#cacfe9', '#458bba', '#8a98cd', '#eae2b2', '#d0c347', '#8d8648','#7eb261','#50574d']
        });
		var stackColumnChart = new Highcharts.Chart({
			chart : {
				renderTo : 'notificationByMonth',
				type : 'column',
				events : {
                    load : function() {
                        // set up the updating of the chart each second
                        var categories = [];
                        var data0 = [];
                        var data1 = [];
                        var data2 = [];
                        for ( var ele in recdata) {
                        	categories.push(EB_Common.escapeHTML(ele));
                        	var list = recdata[ele];
                        	data0.push(parseFloat(list[0]));
                        	data1.push(parseFloat(list[1]));
                        	data2.push(parseFloat(list[2]));
                        }
                        this.xAxis[0].setCategories(categories);
                        this.series[0].setData(data0);
                        this.series[1].setData(data1);
                        this.series[2].setData(data2);
                    }
                }
			},
			title : {
				text : i18n['report.broadcast.history.typeByMonth'],
                style:{
                	color: '#333333',
                	fontSize: '14px',
                    fontFamily: 'Arial'
                }
			},
			credits : {
				enabled : false
			},
			exporting : {
				enabled : false
			},
			xAxis : {
				categories : [],
				labels : {
					 align: 'right',
					 rotation: -45
				}
			},
			yAxis : {
				min : 0,
				title : {
					text :  i18n['report.yaxis.title'],
                    style:{
                        color: '#333333',
                        fontSize: '11px',
                        fontFamily: 'Arial',
                        fontWeight:'normal'
                    }
				},
				allowDecimals: false,
				tickInterval : tickInterval,
				lineWidth: 1,
				stackLabels : {
					enabled : true
				}
			},
			tooltip : {
				formatter : function() {
					return '<b>' + this.x + '</b><br/>' + this.series.name
							+ ': ' + this.y + '<br/>' + 'Total: '
							+ this.point.stackTotal;
				}
			},
			legend: {
				align: 'center',
				verticalAlign: 'bottom',
				itemStyle: {
					color: '#333333',
                    fontFamily: 'Arial'
			    },
			    symbolWidth: 15
			},
			plotOptions : {
				column : {
					stacking : 'normal',
					showInLegend : true,
					dataLabels : {
						enabled : true,
						color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
						formatter: function() {
	                        return this.y == 0 ? '':this.y;
	                    }
					},
					events: {
                        legendItemClick: function(event) {
                        	if(this.visible){
	                        	var seriesObj = stackColumnChart.series; 
	                        	var count = 0;
	                        	for(var i=0;i<seriesObj.length;i++) { 
	                        		if(seriesObj[i].visible)
	                        			count++;
	                        	}
	                        	if(count > 1){
	                        		return true;
	                        	}else{
	                        		return false;
	                        	}
                        	}else{
                        		return true;
                        	}
                        	
                        }
                    }
				}
			},
			series : [{name:'Standard'},{name:'Polling'},{name:'Conference'}]
		});
	}
	
})(EB_View);