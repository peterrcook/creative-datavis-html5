(function() {

  // Get the canvas element's context
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  var colorScale = d3.scale.linear().domain([0, 650]).range(['#4F6CFF', 'black']);
  var radiusScale = d3.scale.sqrt().domain([2.5, 7]).range([1, 10]);

  var angleScale = d3.scale.linear().domain([new Date('2014-08-18T00:00'), new Date('2014-08-25T00:00')]).range([0, 2 * Math.PI]);
  var orbitRadiusScale = d3.scale.linear().domain([new Date('2014-07-21T13:02:12'), new Date('2014-08-20T11:31')]).range([200, 360]);

  ctx.translate(600, 400);

  d3.csv('../data/earthquakes-30days-2.5.csv', function(err, csv) {
    csv.reverse(); // so that most recent earthquakes are drawn on top

    drawPolarDayGrid(ctx, 360);

    // Draw earthquakes
    _.each(csv, function(row, i) {
      ctx.fillStyle = colorScale(+row.depth);
      var t = new Date(row.time);
      var r = orbitRadiusScale(t);
      var x = r * Math.sin(angleScale(t));
      var y = -r * Math.cos(angleScale(t));
      drawCircle(ctx, x, y, radiusScale(+row.mag));
    });
  });


})();