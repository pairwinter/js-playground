/**
 * @ignore  =====================================================================================
 * @file    pie
 * @version 1.0.0
 * @author  Damon Liu(damon.liudong@gmail.com)
 * @date    Created at 4:36 PM 24/03/2017
 * @ignore  =====================================================================================
 */

var dataset = [50, 40, 60, 80, 70, 54, 23, 22, 42, 52, 23];

var pieLayout = d3.layout.pie();

var pieData = pieLayout(dataset);

var arc = d3.svg.arc()
    .innerRadius(20)
    .outerRadius(100);


var svg = d3.select('#root').append('svg').attr('width', 400).attr('height', 400);

var arcs = svg.selectAll('g')
    .data(pieData)
    .enter()
    .append('g')
    .attr('transform', 'translate(200, 200)');

var colors = d3.scale.category10();

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .html(function (d) {
        tip.attr('transform', 'translate(' + arc.centroid(d) + ')');

        return "<strong>Departments:</strong> <span style='color:red'>" + d.data + "</span>";
    });

svg.call(tip);

arcs.append('path')
    .attr('fill', function (d, i) {
        return colors(i);
    })
    .attr('d', function (d, i) {
        return arc(d);
    })
    .on('mouseover', tip.show)
    .on('mouseout', top.hide);


arcs.append('text')
    .attr('transform', function (d) {
        return 'translate(' + arc.centroid(d) + ')'
    })
    .attr('rotation', function (d) {
        return d.endAngle;
    })
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .attr('dx', 0)
    .text(function (d) {
        return d.data
    });