(function() {

  // Get the canvas element's context
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  ctx.fillStyle = 'yellow';

  // Load the CSV and draw a rectangle for each earthquake
  localload('../data/earthquakes-30days-2.5.csv', function(err, csv) {
    csv.reverse();
    csv.forEach(function(row, i) {
      ctx.fillRect(i, 0, 1, +row.depth);
    });
  });

})();