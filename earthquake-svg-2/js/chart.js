(function() {

  var svg = Snap("svg");
  var info = {
    magnitude: svg.select('.info .magnitude'),
    depth: svg.select('.info .depth'),
    location: svg.select('.info .location')
  };

  var yScale = d3.scale.linear().domain([0, 800]).range([0, 800]);
  var colorScale = d3.scale.linear().domain([2.5, 7]).range(['black', 'yellow']);
  var radiusScale = d3.scale.sqrt().domain([2.5, 7]).range([0, 15]);

  d3.csv('../data/earthquakes-30days-2.5.csv', function(err, csv) {

    // Vertical lines 
    csv.forEach(function(row, i) {
      var y = yScale(+row.depth);
      var l = svg.line(i, 0, i, y);
      l.attr({
        stroke: '#444'
      });
    });

    // Circles to represent magnitude
    csv.forEach(function(row, i) {
      var y = yScale(+row.depth);
      var c = svg.circle(i, y, radiusScale(+row.mag));
      c.attr({
        fill: colorScale(+row.mag)
      });
      c.data('d', row);
      c.hover(function() {
        var d = this.data('d');
        info.magnitude.node.textContent = 'Magnitude ' + d.mag;
        info.depth.node.textContent = 'Depth ' + d.depth + 'km';
        info.location.node.textContent = d.place;
      });


    });
  });


})();