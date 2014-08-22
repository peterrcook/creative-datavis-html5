(function() {

  var svg = d3.select('svg .container');

  var depthScale = d3.scale.linear().domain([0, 800]).range([0, 300]);
  var magnitudeScale = d3.scale.linear().domain([0, 7]).range([0, 300]);
  var barWidth = 5;

  d3.csv('../data/earthquakes-30days-2.5.csv', function(err, csv) {
    csv.reverse();

    var groups = svg.selectAll('g')
      .data(csv)
      .enter()
      .append('g')
      .classed('earthquake', true)
      .attr('transform', function(d, i) {
        var y = i * (barWidth + 1) + 0.5 * barWidth;
        return 'translate(0, ' + y + ')';
      });

    groups
      .append('line')
      .attr('x1', function(d) {return -depthScale(+d.depth);});

    groups
      .append('rect')
      .attr('y', -0.5 * barWidth)
      .attr('width', function(d) {return magnitudeScale(+d.mag);})
      .attr('height', barWidth);

    // Hover annotation
    var annotations = groups
      .append('g')
      .classed('annotation', true);

    annotations
      .append('text')
      .attr('x', function(d) {return magnitudeScale(+d.mag) + 5;})
      .attr('y', 3.4)
      .text(function(d) {return +d.mag;});

    annotations
      .append('text')
      .attr('x', function(d) {return magnitudeScale(+d.mag) + 50;})
      .attr('y', 3.4)
      .text(function(d) {return '(' + d.place + ')';});

    annotations
      .append('text')
      .attr('x', function(d) {return -depthScale(+d.depth) - 5;})
      .attr('y', 3.4)
      .text(function(d) {return +d.depth + ' km';})
      .style('text-anchor', 'end');
  });


})();