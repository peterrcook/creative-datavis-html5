(function() {

  // Get the canvas element's context
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  var yScale = d3.scale.linear().domain([0, 800]).range([0, 800]);
  var colorScale = d3.scale.linear().domain([0, 650]).range(['yellow', 'black']);
  var radiusScale = d3.scale.sqrt().domain([2.5, 7]).range([0.5, 10]);


  var projection = d3.geo.mercator()
    // var projection = d3.geo.orthographic()
    .center([0, 0])
    .scale(200)
    .translate([480, 425]);


  d3.json('../data/countries.geo.json', function(err, geojson) {
    // Draw world
    drawGeoJSON(ctx, geojson, projection)


    // Load the CSV and draw a rectangle for each earthquake
    d3.csv('../data/earthquakes-30days-2.5.csv', function(err, csv) {
      _.each(csv, function(row, i) {
        var pt = projection([+row.longitude, +row.latitude]);
        // Let's set area to magnitude and shade to depth
        ctx.fillStyle = colorScale(+row.depth);
        drawCircle(ctx, pt[0], pt[1], radiusScale(+row.mag));
      });
    });

  });


})();