var departments = ['dev', 'opts', 'qa', 'pm', 'po'];

var members = [
    [100, 20, 33, 12, 44],
    [20, 10, 23, 15, 14],
    [10, 20, 53, 12, 35],
    [30, 23, 14, 22, 32],
    [40, 28, 13, 32, 12]
];

var chordLayout = d3.layout.chord()
    .padding(0.02)
    .sortSubgroups(d3.descending)
    .matrix(members);

var groups = chordLayout.groups();
var chords = chordLayout.chords();

//console.log(groups);
//console.log(chords);

var graph = {
    width: 500,
    height: 500,
    innerRadius: 350/2,
    outerRadius: 350/2 * 1.1,
    colors: d3.scale.category20()
};
var svg = d3.select('body').append('svg').attr('width',graph.width).attr('height', graph.height);

var baseG = svg.append('g')
    .attr('transform', 'translate('+graph.width/2+','+graph.height/2+')');


var departmentsArc = d3.svg.arc()
    .innerRadius(graph.innerRadius)
    .outerRadius(graph.outerRadius);

var outerG = baseG.append('g');


var departmentsPaths = outerG.selectAll('path')
    .data(groups)
    .enter()
    .append('path')
    .style('fill',function(d, i){
        return graph.colors(d.index);
    })
    .attr('stroke', function(d, i){
        return graph.colors(d.index);
    })
    .attr('d', departmentsArc);

var departmentsTexts = outerG.selectAll('text')
    .data(groups)
    .enter()
    .append('text')
    .each(function(d, i){
        d.angle = (d.startAngle + d.endAngle) / 2;
        console.log(departments[i], d.startAngle, d.endAngle, d.angle);
        d.name = departments[i];
    })
    .attr('dy', '0.35em')
    .attr('transform', function(d){
        var rotate = 'rotate(' + (d.angle * 180 / Math.PI) + ')';
        var translate = 'translate(0, '+ ((-1) * (graph.outerRadius + 10)) +')';
        var rotate180 = '';
        if(d.angle > Math.PI*3/4 && d.angle < Math.PI * 3 / 2){
            rotate180 = 'rotate(180)';
        }

        var transform =  rotate + translate + rotate180
        return transform;

    })
    .text(function(d){
        return d.name;
    });

var membersChord = d3.svg.chord()
    .radius(graph.innerRadius);

var tip = d3.tip().attr('class', 'd3-tip')
    .html(function(d){
        return "<strong>Departments:</strong> <span style='color:red'>" + departments[d.source.index] + "</span>";
    });
svg.call(tip);
svg.append('g').attr('class','chord')
    .selectAll('path')
    .data(chords)
    .enter()
    .append('path')
    .attr('d', membersChord)
    .style('fill', function(d, i){
        console.log('chord path fill', graph.colors(d.source.index), d.source)
        return graph.colors(d.source.index)
    })
    .attr('transform', 'translate('+graph.width/2+','+graph.height/2+')')
    .attr('stroke', '#ddd')
    .style('opacity', 0.8)
    .on('mouseover', function(d, i){
        d3.select(this).transition().style('fill', 'yellow');
        this.parentNode.appendChild(this);
        tip.show(d);
    })
    .on('mouseout', function(d, i){
        d3.select(this).transition()
            .duration(500)
            .style('fill', function(d){
                return graph.colors(d.source.index)
            });
        tip.hide(d);
    })