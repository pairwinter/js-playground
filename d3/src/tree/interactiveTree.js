/**
 * @ignore  =====================================================================================
 * @file    interactiveTree
 * @version 1.0.0
 * @author  Damon Liu(damon.liudong@gmail.com)
 * @date    Created at 10:14 AM 27/03/2017
 * @ignore  =====================================================================================
 */
require('./interactiveTree.css');
var log = function (data) {
    console.log(JSON.stringify(data, null, '4'));
};
var treeData = [{
    name: 'Top Level',
    parent: null,
    children: [
        {
            name: 'Level 2 : A',
            parent: 'Top Level',
            children: [
                {
                    name: 'Level 3 : A',
                    parent: 'Level 2 : A'
                },
                {
                    name: 'Level 3 : B',
                    parent: 'Level 2 : A'
                }
            ]
        },
        {
            name: 'Level 2 : B',
            parent: 'Top Level'
        }
    ]
}];
var TRANSFORM = 'transform',
    TRANSLATE_TEMP = 'translate({0}, {1})',
    translateFormat = TRANSLATE_TEMP.format.bind(TRANSLATE_TEMP);
var body = {w: 1000, h: 500}, nodeIdSeed = 0, duration = 1000;
var margin = {left: 100, top: 30, right: 30, bottom: 30};
var svgConfig = {
    w: body.w - margin.left - margin.right,
    h: body.h - margin.top - margin.bottom
};


var tree = d3.layout.tree()
    .size([svgConfig.h, svgConfig.w]);

var diagonal = d3.svg.diagonal()
    .projection(function (d) {
        return [d.y, d.x];
    });

var svg = d3.select('#root').append('svg')
    .attr('width', svgConfig.w)
    .attr('height', svgConfig.h)
    .append('g')
    .attr(TRANSFORM, function (d) {
        return translateFormat(margin.left, margin.top)
    });

var root = treeData[0];
root.x0 = svgConfig.h / 2;
root.y0 = 0;
update(root);
function update(source) {
    var nodes = tree.nodes(root);
    var links = tree.links(nodes);
    console.log('nodes', nodes, 'links', links);

    nodes.forEach(function (d) {
        d.y = d.depth * 180;
    });

    var node = svg.selectAll('g.node')
        .data(nodes, function (d) {
            return d.id || (d.id = nodeIdSeed++ );
        });
    //Add
    var nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr(TRANSFORM, function (d) {
            return translateFormat(source.y0, source.x0);
        })
        .on('click', click);
    console.log('nodeEnter[0].length ->', nodeEnter[0].length);

    nodeEnter.append('circle').attr('r', 1e-6)
        .style('fill', function (d) {
            return d._children ? 'lightsteelblue' : '#fff';
        });

    nodeEnter.append('text')
        .text(function (d) {
            return d.name;
        })
        .attr('x', function (d) {
            return d.children || d._children ? -13 : 13
        })
        .attr('dy', '.35em')
        .attr('text-anchor', function (d) {
            return d.children || d._children ? 'end' : 'start'
        })
        .style('fill-opacity', 1e-6);
    console.log('nodeEnter');
    //Update
    var nodeUpdate = node.transition()
        .duration(duration)
        .attr(TRANSFORM, function (d) {
            return translateFormat(d.y, d.x);
        });

    nodeUpdate.select('circle')
        .attr('r', 10)
        .style('fill', function (d) {
            return d._children ? 'lightsteelblue' : '#fff'
        });

    nodeUpdate.select('text')
        .style('fill-opacity', 1);
    //Remove
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr(TRANSFORM, function (d) {
            return translateFormat(source.y, source.x)
        })
        .remove();

    nodeExit.select('circle').attr('r', 1e-6);

    nodeExit.select('text').style('fill-opacity', 1e-6);

    var link = svg.selectAll('path.link')
        .data(links, function (d) {
            return d.target.id
        });

    link.enter()
        .insert('path', 'g')
        .attr('class', 'link')
        .attr('d', function (d) {
            var o = {x: source.x0, y: source.y0};
            return diagonal({source: o, target: o});
        });

    link.transition().duration(duration).attr('d', diagonal);

    link.exit().transition()
        .duration(duration)
        .attr('d', function (d) {
            var o = {x: source.x, y: source.y};
            return diagonal({source: o, target: o});
        })
        .remove();

    nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });
}

function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
    update(d);
}



