(function() {

  // Get the canvas element's context
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  ctx.fillStyle = 'yellow';

  // Set up y-scale
  var yScale = d3.scale.linear().domain([0, 10]).range([0, 500]);

  // Load the CSV and draw a rectangle for each earthquake
  d3.csv('../data/earthquakes-30days-2.5.csv', function(err, csv) {
    csv.reverse();

    csv.forEach(function(row, i) {
      var x = i;
      var y = 600;
      var width = 1;
      var height = -yScale(+row.mag);
      ctx.fillRect(x, y, width, height);
    });
  });

})();