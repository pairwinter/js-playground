(function(view) {
    view.dashboard = function() {};
    view.dashboard.widgets = function() {};
    view.dashboard.widgets.contactCount = function() {};
    view.dashboard.widgets.contactCount.initPage = function(totalCount,data) {
        Highcharts.setOptions({
            //mono-theme
            colors: ['#DCBFB6', '#DF7E67', '#D02029', '#901A1D', '#46232F', '#F4DCCE', '#ESA385', '#D87148', '#A0573A', '#664839', '#BF96A8','#c198aa','#C5559F','#83205B','#605560']
        });
    	var options = {
                chart: {
                    height: 250,
                    renderTo: 'contactCount'
                },
                credits:{
                    enabled:false
                },
                exporting: { 
                    enabled: false
                },
                title: {
                    text: '',
                    align: 'right',
                    verticalAlign: 'top',
                    x:0,
                    y:60
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
                    y:80,
                    labelFormatter: function() {
                        return this.name +': ' + this.y;
                    },
                    itemStyle: {
                        color: '#333333',
                        fontFamily: 'Arial',
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
                    data: data
                }]
            };
    	options.title.text = i18n['dashboard.totalContact.title']+': '+ totalCount;
    	options.series[0].data = data;
    	var chart = new Highcharts.Chart(options);
    };

})(EB_View);