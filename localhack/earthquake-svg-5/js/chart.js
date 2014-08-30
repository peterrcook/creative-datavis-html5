(function() {

  var svg = Snap('svg')
    .select('.container');

  var depthScale = d3.scale.linear().domain([0, 800]).range([0, 300]);
  var magnitudeScale = d3.scale.linear().domain([0, 7]).range([0, 300]);
  var barWidth = 5;

  localload('../data/earthquakes-30days-2.5.csv', function(err, csv) {
    csv.forEach(function(row, i) {
      var y = i * (barWidth + 1) + 1;

      // Line (for depth)
      var l = svg.line(-depthScale(+row.depth), y, 0, y);

      // Bar (for magnitude)
      var r = svg.rect(0, y -0.5 * barWidth, magnitudeScale(+row.mag), barWidth);
    });
  });


})();