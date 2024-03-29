/*
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
*/


//scatter Plot
//var width = parseInt(d3.select("#scatter").style("width"));
//var height = width - width / 3.9;
var width = 1000
var height = 1000
var margin = 20;
var labelArea = 110;
var tPadBot = 40;  // Means Title Padding.  
var tPadLeft = 40;
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "chart");

var chartHeight = height - margin - margin - labelArea;
var chartWidth = width - margin - margin - labelArea;

var circRadius;
function crGet() {
  if (width <= 530) {
    circRadius = 5;
  }
  else {
    circRadius = 10;
  }
}
crGet();

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin}, ${margin})`);


svg.append("g").attr("class", "xText");
var xText = d3.select(".xText");
function xTextRefresh() {
  xText.attr(
    "transform",
    "translate(" +
      ((width - labelArea) / 2 + labelArea) +
      ", " +
      (height - margin - tPadBot) +
      ")"
  );
}
xTextRefresh();

//superhero X axis
xText
  .append("text")
  .attr("y", -26)
  .attr("data-name", "Superhero Height")
  .attr("data-axis", "x")
  .attr("class", "aText active x")
  .text("Superhero Height");


var leftTextX = margin + tPadLeft;
var leftTextY = (height + labelArea) / 2 - labelArea;

svg.append("g").attr("class", "yText");

var yText = d3.select(".yText");

/*
function yTextRefresh() {
  yText.attr(
    "transform",
    "translate(" + leftTextX + ", " + leftTextY + ")rotate(-90)"
  );
}
yTextRefresh();

*/

// superhero Y
yText
  .append("text")
  .attr("y", 26)
  .attr("data-name", "Superhero Weight")
  .attr("data-axis", "y")
  .attr("class", "aText inactive y")
  .text("Superhero Weight");




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
      visualize(heroes)
      console.log(heroes)
    });  
//d3.json("/MarvelSuperHeroes").then(function(data) {
//  visualize(data);
//});

function visualize(theData) {
  
  var curX = "X";
  var curY = "Y";

  
  var xMin;
  var xMax;
  var yMin;
  var yMax;

  function xMinMax() {
    xMin = d3.min(theData, function(d) {
      return parseFloat(d[curX]) * 0.90;
    });
    xMax = d3.max(theData, function(d) {
      return parseFloat(d[curX]) * 1.10;
    });
  }
  function yMinMax() {
    yMin = d3.min(theData, function(d) {
      return parseFloat(d[curY]) * 0.90;
    });

    yMax = d3.max(theData, function(d) {
      return parseFloat(d[curY]) * 1.10;
    });
  }
/*
  function labelChange(axis, clickedText) {
    d3
      .selectAll(".aText")
      .filter("." + axis)
      .filter(".active")
      .classed("active", false)
      .classed("inactive", true);

    clickedText.classed("inactive", false).classed("active", true);
  }
*/
  xMinMax();
  yMinMax();

  var xScale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([margin + margin +labelArea, width - margin - margin]);
  var yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([height - margin - margin - labelArea, margin]);
  //create the axes  
  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);
  function tickCount() {
    if (width <= 500) {
      xAxis.ticks(5);
      yAxis.ticks(5);
    }
    else {
      xAxis.ticks(10);
      yAxis.ticks(10);
    }
  }
  tickCount();
  svg
    .append("g")
    .call(xAxis)
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + (height - margin - labelArea) + ")");
  svg
    .append("g")
    .call(yAxis)
    .attr("class", "yAxis")
    .attr("transform", "translate(" + (margin + labelArea) + ", 0)");
  var theCircles = svg.selectAll("g theCircles").data(theData).enter();

  theCircles
    .append("circle")
    .attr("cx", function(d) {
      return xScale(d[curX]);
    })
    .attr("cy", function(d) {
      return yScale(d[curY]);
    })
    .attr("r", circRadius)
    .attr("class", function(d) {
      return "stateCircle " + d["abbr"];
    })

    .on("mouseover", function(d) {
      toolTip.show(d, this);
      d3.select(this).style("stroke", "#323232");
    })
    .on("mouseout", function(d) {
      toolTip.hide(d);
      d3.select(this).style("stroke", "#e3e3e3");
    });

  theCircles
    .append("text")
    .text(function(d) {
      return d["abbr"];
    })
    .attr("dx", function(d) {
      return xScale(d[curX]);
    })
    .attr("dy", function(d) {

      return yScale(d[curY]) + circRadius / 2.5;
    })
    .attr("font-size", circRadius)
    .attr("class", "stateText")
    .on("mouseover", function(d) {
      toolTip.show(d);
      d3.select("." + d["abbr"]).style("stroke", "#323232");
    })
    .on("mouseout", function(d) {
      toolTip.hide(d);
      d3.select("." + d["abbr"]).style("stroke", "#e3e3e3");
    });

    d3.selectAll("text").style("fill", "green");

  d3.selectAll(".aText").on("click", function() {
    var self = d3.select(this);
    if (self.classed("inactive")) {
      var axis = self.attr("data-axis");
      var name = self.attr("data-name");

      if (axis === "x") {
        curX = name;

        xMinMax();

        xScale.domain([xMin, xMax]);
        svg.select(".xAxis").transition().duration(300).call(xAxis);

        d3.selectAll("circle").each(function() {
          d3
            .select(this)
            .transition()
            .attr("cx", function(d) {
              return xScale(d[curX]);
            })
            .duration(300);
        });

        
        d3.selectAll(".stateText").each(function() {
          d3
            .select(this)
            .transition()
            .attr("dx", function(d) {
              return xScale(d[curX]);
            })
            .duration(300);
        });
        labelChange(axis, self);
      }
      else {
        curY = name;

      
        yMinMax();
        yScale.domain([yMin, yMax]);
        svg.select(".yAxis").transition().duration(300).call(yAxis);

        d3.selectAll("circle").each(function() {
          d3
            .select(this)
            .transition()
            .attr("cy", function(d) {
              return yScale(d[curY]);
            })
            .duration(300);
        });
      }
    }
  })};
  