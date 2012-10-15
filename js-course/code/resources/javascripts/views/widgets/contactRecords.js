(function(view) {
    view.dashboard = function() {};
    view.dashboard.widgets = function() {};
    view.dashboard.widgets.contactRecords = function() {};
    view.dashboard.widgets.contactRecords.initPage = function(records) {
        Highcharts.setOptions({
            //mono-theme
            colors: ['#DCBFB6', '#DF7E67', '#D02029', '#901A1D', '#46232F', '#F4DCCE', '#ESA385', '#D87148', '#A0573A', '#664839', '#BF96A8','#c198aa','#C5559F','#83205B','#605560']
        });
        if(records.isEmpty){
    		EB_Common.noData('contactRecords');
		}else{
			try{
    			new Highcharts.Chart({
	                chart: {
	                	height: 250,
	                    renderTo: 'contactRecords',
	                    events : {
	                        load : function() {
	                            // set up the updating of the chart each second
	                            var series = this.series[0];
	                            var data = [];
	                            var recdata = records.data;
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
	                        return '<b>'+ this.point.name +'</b>: '+this.y +' / '+ this.percentage.toFixed(2) +' %';
	                    }
	                },
	                legend: {
	                    enabled: true,
	                    align: 'right',
	                    layout: 'vertical',
	                    verticalAlign: 'top',
	                    x:0,
	                    y:80,
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
	                        fontWeight:'normal',
	                        fontSize:'11px'
	    			    }
	                },
	                plotOptions: {
	                    pie: {
	                        dataLabels: {
	                            enabled: false
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
			}catch(err){
				EB_Common.noData('contactRecords');
			}
    	}
    };
})(EB_View);