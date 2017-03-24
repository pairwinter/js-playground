var width = 500, height = 500;

var svg = d3.select('body').append('svg').attr('width', width).attr('height', height);
var clusterDomG = svg.append('g').attr('transform', 'translate(40,0)')
var clusterData = {
    "name":"中国",
    "children":[
        {
            "name":"浙江" ,
            "children": [ {"name":"杭州" }, {"name":"宁波" }, {"name":"温州" }, {"name":"绍兴" } ]
        },

        {
            "name":"广西" ,
            "children": [
                {
                    "name":"桂林",
                    "children":[ {"name":"1"}, {"name":"2"}]
                },
                {"name":"南宁"}, {"name":"柳州"}, {"name":"防城港"}
            ]
        },
        {"name":"黑龙江",
            "children": [{"name":"哈尔滨"}, {"name":"齐齐哈尔"}, {"name":"牡丹江"}, {"name":"大庆"} ]
        },

        {
            "name":"新疆" ,
            "children": [ {"name":"乌鲁木齐"}, {"name":"克拉玛依"}, {"name":"吐鲁番"}, {"name":"哈密"} ]
        }
    ]
};

var tree = d3.layout.tree()
    .size([width, height-100]);

var nodes = tree.nodes(clusterData);

var links = tree.links(nodes);

var diagonal = d3.svg.diagonal().projection(function(d){ return [d.y, d.x] });

console.log(links);
var linkPaths = clusterDomG.selectAll('path')
    .data(links)
    .enter()
    .append('path')
    .attr('d', diagonal);

var nodesG = clusterDomG.selectAll('g')
    .data(nodes)
    .enter()
    .append('g')
    .attr('transform', function(d){ return 'translate('+ d.y +',' + d.x + ')'});

nodesG.append('circle').attr('r', 7).on('click', function(d, i){
    console.log('circle data', d);
    if(d.children){

    }
});


nodesG.append("text")
    .attr("dx", function(d) { return d.children ? -8 : 8; })
    .attr("dy", 3)
    .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
    .text(function(d) { return d.name; });
