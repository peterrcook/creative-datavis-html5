(function() {

  // Get the canvas element's context
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  var yScale = d3.scale.linear().domain([0, 800]).range([0, 800]);
  var colorScale = d3.scale.linear().domain([2.5, 7]).range(['black', 'yellow']);
  var radiusScale = d3.scale.sqrt().domain([2.5, 7]).range([0, 15]);

  // Load the CSV and draw a rectangle for each earthquake
  d3.csv('../data/earthquakes-30days-2.5.csv', function(err, csv) {

    // Vertical lines 
    ctx.fillStyle = '#444';
    _.each(csv, function(row, i) {
      var y = yScale(+row.depth);
      ctx.fillRect(i, 0, 1, y);
    });

    // Circles to represent magnitude
    _.each(csv, function(row, i) {
      var y = yScale(+row.depth);
      ctx.fillStyle = colorScale(+row.mag);
      drawCircle(ctx, i, y, radiusScale(+row.mag));
    });
  });


})();