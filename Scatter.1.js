//svg container
var svgHeight = 1000;
var svgWidth = 1000;

//margins
var margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
};

// char area minus margins
var chartHeight = svgHeight - margin.top -margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;

console.log(chartHeight);
console.log(chartWidth);

// create svg container
var svg = d3.select("#scatter").append("svg") 
    .attr("height", svgHeight)
    .attr("width", svgWidth);

// shift everything over by the margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Load the data from the csv
var scatdata = d3.select("#scatter")
  //var arrName =[]
  //var arrheight = []
  //var arrweight = []
  //var dict = {"abbr":[], "X":[], "Y":[]}
  var heroes = []
  d3.json(`/MarvelSuperHeroes`).then((data) => {
      console.log(data);
      d3.entries(data).forEach((result)=>{
        d3.entries(result.value).forEach((Hero)=>{
          var name = ""
          var height = ""
          var weight = ""
          d3.entries(Hero.value).forEach((prop)=>{
            if (prop.key == "SuperHero Name")
              name = prop.value
            else if (prop.key == "Height")
              height = prop.value
            else if (prop.key == "Weight")
              weight = prop.value
            
          })
          //console.log(`${name} ${height} ${weight}`)
          //arrName.push(name)
          //dict["abbr"].push(name)
          //dict["X"].push(height)
          //dict["Y"].push(weight)
          heroes.push({"abbr":name, "X":height, "Y":weight})
          
        })
      })
      //visualize(heroes)
      console.log(heroes)
    });  

 

    var yScale = d3.scaleLinear()
    .domain(d3.extent(heroes, d => d[X]))
    .range([0, chartHeight]);

    var xScale = d3.scaleLinear()
    .domain(d3.extent(heroes, d => d[Y]))
    .range([0, chartWidth]);

    // create axes    
    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale);
    console.log("created axes");
    
    // set x to the bottom of the chart
    chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis);

    // set y to the left of the chart
    chartGroup.append("g")
    .call(yAxis);
    

    // Append Data to chartGroup
    var circlesGroup = chartGroup.selectAll("circle")
    .data(heroes)
    .enter()   // because there are no circles in the html, all of them will be created
    .append("circle")
    .classed(".stateCircle", true)
    .attr("cx", d => xScale(d[X]))
    .attr("cy", d => yScale(d[Y]))
    .attr("r", 10)
    .attr("fill", "blue")
    .attr("opacity", ".5")
    .text(d => d[abbr]);




//console.log("loaded data");
