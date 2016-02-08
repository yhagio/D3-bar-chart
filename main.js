var data_url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';

d3.json(data_url, function(error, json) {
  if (error) {
    console.log('===Error===', error);
  }

  // List of Month strings used to convert from number to text later
  var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"
  ];

  var w = 1200;
  var h = 500 - 20;

  var minDate = new Date(json.data[0][0]);
  var maxDate = new Date(json.data[json.data.length - 1][0]);

  // ===== Create SVG =====
  var svg = d3.select('body')
    .append('svg')
    .attr({
      width: w,
      height: h
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
  })
  .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -30)
    .attr('y', 5)
    .attr('dy', '1em')
    .style('text-anchor', 'end')
    .text('Gross Domestic Product, USA');

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
       height: function(d) {
         return ( (h * d[1]) / 20000 );
       },
       transform: 'translate(50, -20)',
       fill: '#3399CC'
     })
     // Creating tooltp on mouseover event
     .on('mouseover', function(d) {
       //Get this bar's x/y values, then augment for the tooltip
      var xPosition = parseFloat(d3.select(this).attr("x"));
      (xPosition > 900) ? xPosition = 900 : xPosition;
      (xPosition < 50) ? xPosition = 50 : xPosition;
      var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2;

      //Update the tooltip position and value
      var thisDate = new Date(d[0]);
      d3.select("#tooltip")
        .style("left", xPosition + "px")
        .style("top", yPosition + "px")
        .select("#value")
          .html('<strong>$'+d[1].toLocaleString()+' Billion</strong><p>'+thisDate.getFullYear()+' - '+monthNames[thisDate.getMonth()]+'</p>');

      //Show the tooltip
      d3.select("#tooltip").classed("hidden", false);
     })
     .on('mouseout', function(d) {
       // Hide the tooltip on mouseout
       d3.select('#tooltip').classed("hidden", true);
     });

});
