
 var svg = d3.select("svg"),
 margin = 190,
 width = svg.attr("width") - margin,
 height = svg.attr("height") - margin

svg.append("text")
.attr("transform", "translate(100,0)")
.attr("x", 50)
.attr("y", 50)
.attr("font-size", "24px")
.attr("stroke" , "white")
.text("Gender Breakout")

var xScale = d3.scaleBand().range([0, width]).padding(0.4),
 yScale = d3.scaleLinear().range([height, 0]);

var g = svg.append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")");


// var scatdata = d3.select("#scatter")

data = d3.json(`/MarvelSuperHeroes`).then((data) => {
console.log(data);
            d3.entries(data).forEach((result)=>{
              d3.entries(result.value).forEach((Hero)=>{
                var name = ""
                var gender = ""
             
                d3.entries(Hero.value).forEach((prop)=>{
                  if (prop.key == "SuperHero Name")
                    name = prop.value
                  else if (prop.key == "Gender")
                    gender = prop.value
                  
                  
                })
                console.log(`${name} ${gender}`)
                
              })
            })
xScale.domain(data.map(data, function(d) { return d.gender; }));
yScale.domain([0, d3.max(data, function(d) { return d.value; })]);
          });  

       

// xScale.domain(data.map(function(d) { return d.gender; }));
// yScale.domain([0, d3.max(data, function(d) { return d.name; })]);

 g.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(xScale))
  .append("text")
  .attr("font-size", "16px")
  .attr("y", height - 290)
  .attr("x", width - 200)
  .attr("text-anchor", "end")
  .attr("stroke", "gray")
  .text("Gender");

 g.append("g")
  .call(d3.axisLeft(yScale).tickFormat(function(d){
      return d;
  })
  .ticks(10))
  .append("text")
  .attr("x", height - 425)
  .attr("font-size", "16px")
  .attr("transform", "rotate(-90)")
  .attr("y", 3)
  .attr("dy", "-3.1em")
  .attr("text-anchor", "end")
  .attr("stroke", "gray")
  .text("Breakout");

 g.selectAll(".bar")
  .data(data)
  .enter().append("rect")
  .attr("class", "bar")
  .attr("x", function(d) { return xScale(d.name); })
  .attr("y", function(d) { return yScale(d.gender); })
  .attr("width", xScale.bandwidth())
  .attr("height", function(d) { return height - yScale(d.value); });

/*    
    var svg = d3.select("svg"),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin

    svg.append("text")
       .attr("transform", "translate(100,0)")
       .attr("x", 50)
       .attr("y", 50)
       .attr("font-size", "24px")
       .attr("stroke" , "white")
       .text("XYZ Superhero data")

    var xScale = d3.scaleBand().range([0, width]).padding(0.4),
        yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g")
               .attr("transform", "translate(" + 100 + "," + 100 + ")");


   // var scatdata = d3.select("#scatter")
  
d3.json(`/MarvelSuperHeroes`).then((data) => {
    console.log(data);
                   d3.entries(data).forEach((result)=>{
                     d3.entries(result.value).forEach((Hero)=>{
                       var name = ""
                       var gender = ""
                    
                       d3.entries(Hero.value).forEach((prop)=>{
                         if (prop.key == "SuperHero Name")
                           name = prop.value
                         else if (prop.key == "Gender")
                           gender = prop.value
                         
                         
                       })
                       console.log(`${name} ${gender}`)
                       
                     })
                   })
                 });  

     /*          
    d3.csv("testdata.csv", function(error, data) {
        if (error) {
            throw error;
        }

        xScale.domain(data.map(function(d) { return d.year; }));
        yScale.domain([0, d3.max(data, function(d) { return d.value; })]);

        g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale))
         .append("text")
         .attr("y", height - 250)
         .attr("x", width - 100)
         .attr("text-anchor", "end")
         .attr("stroke", "white")
         .text("Power Type");

        g.append("g")
         .call(d3.axisLeft(yScale).tickFormat(function(d){
             return "$" + d;
         })
         .ticks(10))
         .append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 6)
         .attr("dy", "-5.1em")
         .attr("text-anchor", "end")
         .attr("stroke", "white")
         .text("Power Level");

        g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return xScale(d.year); })
         .attr("y", function(d) { return yScale(d.value); })
         .attr("width", xScale.bandwidth())
         .attr("height", function(d) { return height - yScale(d.value); });
    }); */
    
