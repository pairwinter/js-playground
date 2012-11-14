(function(view) {
    view.dashboard = function() {};
    view.dashboard.widgets = function() {};
    view.dashboard.widgets.templateOverview = function() {};
    view.dashboard.widgets.templateOverview.initPage = function(categories,data,flag) {
    	Highcharts.setOptions({
 //          colors: ['#DCBFB6', '#DF7E67', '#D02029', '#901A1D', '#46232F', '#F4DCCE', '#ESA385', '#D87148', '#A0573A', '#664839', '#BF96A8','#c198aa','#C5559F','#83205B','#605560']
            colors: ['#c28e78', '#ed5840', '#882445', '#c3a3c1', '#78738b', '#cacfe9', '#458bba', '#8a98cd', '#eae2b2', '#d0c347', '#8d8648','#7eb261','#50574d']
        });
    	var options = {
    			chart: {
                    height: 250,
                    renderTo: 'templateOverview',
                    type: 'column'
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
                xAxis: {
                    categories: [],
                    title: {
                        text: null
                    },
                    lineColor:'#cccccc'
                },
                yAxis: {
                	title: {
                        text: "count",
                        style: {
        					color: '#333333',
                            fontFamily: 'Arial',
                            fontWeight:'bold',
                            fontSize:'11px'
        			    }
                        
                    },
                    gridLineWidth:1,
                    lineWidth: 1,
                    lineColor:'#cccccc'
                },
                tooltip: {
                    formatter: function() {
                        return ''+
                            this.series.name +': '+ this.y ;
                    }
                },
                plotOptions: {
                	column: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    floating: false,
                    borderWidth: 1,
                    symbolWidth:15,
                    backgroundColor: '#FFFFFF',
                    shadow: true,
    				itemStyle: {
    					color: '#333333',
                        fontFamily: 'Arial',
                        fontSize:'11px'
    			    }
                },
                series:[]
            };
    	options.xAxis.categories = categories;
    	options.series = data;
    	if(flag == 'false')
    		EB_Common.noData('templateOverview');
    	else
    		var chart = new Highcharts.Chart(options);
    };

})(EB_View);