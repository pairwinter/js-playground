var dataset = [2.5, 2.1, 1.7, 1.3, 0.9];
var linear = d3.scale.linear().domain([0, d3.max(dataset)]).range([0, 250]);

var axis = d3.svg.axis().scale(linear).orient('bottom').ticks(7);

var svg = d3.select('#svgContainer');

svg.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(10,100)')
    .call(axis)