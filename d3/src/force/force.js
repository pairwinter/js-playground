var width = 400, height = 400;
var nodes = [
    {name: 'name1'},
    {name: 'name2'},
    {name: 'name3'},
    {name: 'name4'},
    {name: 'name5'},
    {name: 'name6'},
    {name: 'name7'},
    {name: 'name8'},
    {name: 'name9'},
    {name: 'name10'}
];

var links = [
    {source: 0, target: 3},
    {source: 1, target: 2},
    {source: 1, target: 4},
    {source: 2, target: 5},
    {source: 3, target: 8},
    {source: 4, target: 9},
    {source: 5, target: 3},
    {source: 6, target: 9},
    {source: 7, target: 6}
];

var svg = d3.select('body').append('svg').attr('width', width).attr('height', height);

var forceLayout = d3.layout.force()
    .nodes(nodes)
    .links(links)
    .size([width, height])
    .linkDistance(100)
    .charge([-400]);

console.log('nodes');
forceLayout.start();
console.log('start');


var svgLinks = svg.selectAll('line')
    .data(links)
    .enter()
    .append('line')
    .style('stroke', '#ccc')
    .style('stroke-width', 1);


var colors = d3.scale.category20();

var svgCircles = svg.selectAll('circle')
    .data(nodes)
    .enter()
    .append('circle')
    .attr('r', 10)
    .style('fill', function(d, i){
        return colors(i);
    })
    .call(forceLayout.drag);


var svgTexts = svg.selectAll('text')
    .data(nodes)
    .enter()
    .append('text')
    .style('fill', '#512412')
    .attr('dx', 11)
    .attr('dy', 8)
    .text(function(d){
        return d.name
    });

forceLayout.on('tick', function(){
    svgLinks.attr('x1', function(d){ return d.source.x})
        .attr('y1', function(d){ return d.source.y})
        .attr('x2', function(d){ return d.target.x})
        .attr('y2', function(d){ return d.target.y});

    svgCircles.attr('cx', function(d){ return d.x })
        .attr('cy', function(d){ return d.y });

    svgTexts.attr('x', function(d) {return d.x})
        .attr('y', function(d) { return d.y });
});