// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// setup fill color
var typeColor = d3.scaleOrdinal().domain(['grass','water','fire'])
  .range(['green','blue','red'])

// append the svg object to the body of the page
var svg = d3.select("#scatterplot")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Add X axis
var x = d3.scaleLinear()
  .domain([0, 5])
  .range([ 0, width ]);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 5])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));

//Read the data
d3.csv("../data/pokemon_small.csv", function(data) {

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.against_water); } )
      .attr("cy", function (d) { return y(d.against_fire); } )
      .attr("r", 4)
      .style("fill", function (d) {return typeColor(d.type1);
      })

})