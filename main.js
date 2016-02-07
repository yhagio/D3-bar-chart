var data_url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';

d3.json(data_url, function(error, json) {
  if (error) {
    console.log('===Error===', error);
  }

  var w = 1200;
  var h = 500;

  var minDate = new Date(json.data[0][0]);
  var maxDate = new Date(json.data[json.data.length - 1][0]);

  // ===== Create SVG =====
  var svg = d3.select('body')
    .append('svg')
    .attr({
      width: w,
      height: h
    });

  // ===== Create bar chart graph =====
  svg.selectAll('rect')
     .data(json.data)
     .enter()
     .append('rect')
     .attr({
       x: function(d, i) {
         return i * (1000 / json.data.length);
       },
       y: function(d, i) {
         return h - ( (h * d[1]) / 20000 );
       },
       width: (w / json.data.length),
       height: function(d) { return d[1]; },
       transform: 'translate(50, -20)',
       fill: '#3399CC'
     });

  // ===== Create X axis =====
  var xScale = d3.time.scale()
    .domain([minDate, maxDate])
    .range([0, 1000]);

  var xAxisCreate = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')
    .ticks(d3.time.years, 5);;

  var xAxis = svg.append('g')
    .call(xAxisCreate)
    .attr({
      'class':'axis',
      'transform': 'translate(50, ' + (h-20) + ')'
    });

  // ===== Create Y axis =====
  var yScale = d3.scale.linear()
    .domain([0, 20000])
    .range([h, 0]);

  var yAxisCreate = d3.svg.axis()
    .scale(yScale)
    .orient('left');

  var yAxis = svg.append('g')
    .call(yAxisCreate)
    .attr({
      'class': 'axis',
      'transform': 'translate(50, -20)'
    });

  // ===== Create tooltip =====

});
