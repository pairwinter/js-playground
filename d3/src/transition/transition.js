var svg = d3.select('body').append('svg').attr('width', 400).attr('height', 400);

var circle1 = svg.append('circle')
    .attr('cx', 100)
    .attr('cy', 100)
    .attr('r', 45)
    .style('fill','#A3c5d3');
var circle2 = svg.append('circle')
    .attr('cx', 100)
    .attr('cy', 200)
    .attr('r', 45)
    .style('fill', '#C3B5A6');

var circle3 = svg.append('circle')
    .attr('cx', 100)
    .attr('cy', 300)
    .attr('r', 45)
    .style('fill', '#F4D5A3')
    .transition()
    .duration(5000)
    .style('fill', '#1D2C3A')
    .attr('cx', 300)
		