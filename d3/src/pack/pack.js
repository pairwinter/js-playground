var width = 400, height = 400;

var svg = d3.select('body').append('svg').attr('width', width).attr('height', height);

var dataset = {
    "name":"中国",
    "children":[
        {
            "name":"浙江" ,
            "children": [ {"name":"杭州" }, {"name":"宁波" }, {"name":"温州" }, {"name":"绍兴" } ]
        },

        {
            "name":"广西" ,
            "children": [ {"name":"桂林","children": [ {"name":"桂林"}, {"name":"南宁"}, {"name":"柳州"}, {"name":"防城港"} ]}, {"name":"南宁"}, {"name":"柳州"}, {"name":"防城港"} ]
        },

        {
            "name":"黑龙江",
            "children": [{"name":"哈尔滨"}, {"name":"齐齐哈尔"}, {"name":"牡丹江"}, {"name":"大庆"} ]
        },

        {
            "name":"新疆" ,
            "children": [ {"name":"乌鲁木齐"}, {"name":"克拉玛依"}, {"name":"吐鲁番"}, {"name":"哈密"} ]
        }
    ]
};

var pack = d3.layout.pack()
    .size([width, height])
    .radius(20);

var nodes = pack.nodes(dataset);
var links = pack.links(nodes);

var packDomG = svg.append('g');

var nodesG = packDomG.selectAll('g')
    .data(nodes)
    .enter()
    .append('g')
    .attr('transform', function(d){
        return 'translate('+ d.x +','+ d.y +')'
    });

nodesG.append('circle')
    .attr('r', function(d){return d.r})
    .on('mouseover', function(d){
        d3.select(this).style('fill', 'yellow');
    })
    .on('mouseout', function(d){
        var toElement = d3.event.toElement;
        var targetElement = d3.select(this.parentNode).select('text')[0][0];
        if(toElement !== targetElement){
            d3.select(this).style('fill', '');
        }
    })
;

nodesG.append('text')
    .text(function(d){return d.name})
    .attr('text-anchor',function(d){
        return 'middle'
    })
    .attr('dy', function(d){
        if(d.children){
            return -d.r + 15
        }else{
            return 5
        }
    })
    .on('mouseover', function(d){
        d3.select(this.parentNode).select('circle').style('fill', 'yellow');
    })
    .on('mouseout', function(d){
        var toElement = d3.event.toElement;
        var targetElement = d3.select(this.parentNode).select('circle')[0][0];
        if(toElement !== targetElement){
            d3.select(targetElement).style('fill', '');
        }
    });


