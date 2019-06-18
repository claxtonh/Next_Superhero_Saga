

    // Use `.html("") to clear any existing metadata
 



var button = d3.select("#filter-btn");
var inputField1 = d3.select("#Start_Date");
var inputField2 = d3.select("#Name");
//var inputField3 = d3.select("state")
var tbody = d3.select("tbody");
var resetbtn = d3.select("#reset-btn");
var columns = ["Name", "Start_Date", "End_Date", "Description"]

//var populate = (dataInput) => {
var tdata = d3.select(tbody)
//d3.json(`http://127.0.0.1:5000/MarvelEvents`).then((data) => {
d3.json(`/MarvelEvents`).then((data) => {
    console.log(data);
    d3.entries(data).forEach((result)=>{
      d3.entries(result.value).forEach((marvel_event)=>{
        var name = ""
        var start_date = ""
        var end_date = ""
        var desc = ""
        d3.entries(marvel_event.value).forEach((prop)=>{
          if (prop.key == "Desc")
            desc = prop.value
          else if (prop.key == "Name")
            name = prop.value
          else if (prop.key == "Start_Date")
            start_date = prop.value
          else if (prop.key == "End_Date")
            end_date = prop.value
        })
        console.log(`${name} ${desc} ${start_date} ${end_date}`)
        var row = tbody.append("tr");
        row.append("td").text(`${name}`)
        row.append("td").text(`${start_date}`)
        row.append("td").text(`${end_date}`)
        row.append("td").text(`${desc}`)
      })
    });
    //d3.entries(metaData).forEach((component) => {
  
   //var row = tbody.append("tr");
   //columns.forEach(column => row.append("td").text(ufo_sightings[column])
   //)
 });
//}

//populate table
/* populate(data);

// filter by attribute
button.on("click", () => {
 d3.event.preventDefault();
 var inputDate = inputField1.property("value").trim();
 var inputName = inputField2.property("value").toLowerCase().trim();
 // filter by field matching input value
 var filterDate = data.filter(data => data.Start_Date === inputDate);
 console.log(filterDate)
 var filterName = data.filter(data => data.Name === inputName);
 console.log(filterName)
 //var filterState = data.filter(data => data.state === inputState);
 //console.log(filterState)
 var filterData = data.filter(data => data.Start_Date === inputDate && data.Name === inputName);
 console.log(filterData)

 // add filtered sighting to table
 tbody.html("");

 let response = {
   filterData, filterName, filterDate
 }

 if (response.filterData.length !== 0) {
   populate(filterData);
 }
   else if (response.filterData.length === 0 && ((response.filterName.length !== 0 || response.filterDate.length !== 0))){
     populate(filterName) || populate(filterDate);

   }
   else {
     tbody.append("tr").append("td").text("No results found!");
   }
})

resetbtn.on("click", () => {
 tbody.html("");
 populate(data)
 console.log("Table reset")
}) */
