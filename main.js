var data_url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';

d3.json(data_url, function(error, json) {
  if (error) {
    console.log('===Error===', error);
  }

  var x = d3.scale.linear()
    .domain([1947, 2015])
    .range([0, 1000]);

  var y = d3.scale.linear()
    .domain([0, 19000])
    .range([500, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(10);
  
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(8);

  var w = 1000;
  var h = 500;

  var svg = d3.select('body')
              .append('svg')
              .attr("width", w)
              .attr("height", h);

  svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0, ' + 470 + ')')
    .call(xAxis);

  svg.append('g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(' + 60 + ', 0)')
    .call(yAxis);

  svg.selectAll('rect')
    .data(json.data)
    .enter()
    .append('rect')
    .attr("x", function(d, i) {
      return i * (1000 / json.data.length);
    })
    .attr("y", function(d, i) {
      return y(d[1]);
    })
    .attr("width", 10)
    .attr("height", 500)
    .attr("fill", "rgba(0,0,0, 0.2)")

});




