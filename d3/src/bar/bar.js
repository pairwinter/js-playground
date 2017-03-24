var width = 400, height = 400;

var svg = d3.select('body').append('svg').attr('width', width).attr('height', height);
var padding = {
    left: 30,
    right: 30,
    top: 20,
    bottom: 20
}

var dataset = [592, 7, 554, 129, 591, 40, 828, 456, 780, 170];

dataset = [];
for(var i= 0;i<10;i++){
    dataset.push(Math.floor(Math.random() * 100));
}

console.log('dataset', dataset);
var domainRange = d3.range(dataset.length);
console.log('domainRange', domainRange);
var xScale = d3.scale.ordinal()
    .domain(domainRange)
    .rangeRoundBands(
        [0, width - padding.left - padding.right]
    );
var yScale = d3.scale.linear()
    .domain([0, d3.max(dataset)])
    .range(
        [height - padding.top - padding.bottom, 0]
    );
console.log('Test yScale', yScale(10))
var xAxis = d3.svg.axis().scale(xScale).orient('bottom');
var yAxis = d3.svg.axis().scale(yScale).orient('left');

var rectPadding = 4;
var rects = svg.selectAll('.myRect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('class', 'myRect')
        .on('mouseover', function(d, i){
            console.log('mouseover', new Date().getTime());
            d3.select(this).transition().style('fill', 'yellow')
        })
        .on('mouseout', function(d, i){
            console.log('mouseover');
            d3.select(this)
                .transition()
                .duration(1000)
                .style('fill', '#333')
        })
        .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
        .attr('width', xScale.rangeBand() - rectPadding)
        .attr('height', 0)
        .attr('x', function(d, i){
            return xScale(i) + rectPadding/2;
        })
        .attr('y', function(d){
            return yScale(yScale.domain()[0])
        })
        .transition()
        .duration(1000)
        .ease("bounce")
        .attr('y', function(d){
            return yScale(d)
        })
        .attr('height', function(d){
            return height - padding.top - padding.bottom - yScale(d)
        })
    ;

var texts = svg.selectAll('.myText')
    .data(dataset)
    .enter()
    .append('text')
    .attr('class', 'myText')
    .attr('transform', 'translate('+ padding.left +',' + padding.top + ')')
    .attr('x', function(d, i){ return xScale(i) - rectPadding/2})
    .attr('y', function(d){
        return yScale(yScale.domain()[0]) - padding.top
    })
    .attr('dx', function() {return (xScale.rangeBand() - rectPadding)/2})
    .attr('dy', function(){ return 20})
    .text(function(d){return d})
    .transition()
    .duration(1000)
    .attr('y', function(d){return yScale(d)});

svg.append('g').attr('class', 'axis')
    .attr('transform', 'translate(' + padding.left + ',' + (height - padding.bottom) + ')')
    .call(xAxis);

svg.append('g').attr('class', 'axis')
    .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
    .call(yAxis);
							
					 
			
			
					
	

