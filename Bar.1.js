
d3.json(`/MarvelSuperHeroes`).then((data) => {
  console.log(data);
  var malecount = 0;
  var femalecount = 0;
  var neithercount = 0;
              d3.entries(data).forEach((result)=>{
                d3.entries(result.value).forEach((Hero)=>{
                  var name = ""
                  var gender = ""

               
                  d3.entries(Hero.value).forEach((prop)=>{
                    if (prop.key == "SuperHero Name")
                      name = prop.value
                    else if (prop.key == "Gender") {
                      gender = prop.value
                      if (gender == "Male")
                      malecount = malecount +1;
                      if (gender == "Female")
                      femalecount = femalecount + 1;
                      if (gender == "-")
                      neithercount = neithercount +1;
                      
                    }

                    
                    
                  })
                  console.log(`${name} ${gender} ${malecount} ${femalecount} ${neithercount}`)
                  
                })
              })
  //xScale.domain(data.map(data, function(d) { return d.gender; }));
  //yScale.domain([0, d3.max(data, function(d) { return d.value; })]);
            
 
  

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
type: 'bar',
data: {
    labels: ["Male", "Female", "Neither"],
    datasets: [{
        label: '# Marvel Superheroes',
        data: [malecount, femalecount, neithercount],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(75, 192, 192, 0.2)'
            
            
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
            'rgba(255,99,132,1)',
            'rgba(75, 192, 192, 1)'
            
            
        ],
        borderWidth: 1
    }]
},
options: {
  title: {
    display: true,
    text: '# of Marvel Superheroes per Gender'
  },
  legend: {
    display: false,
},
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
}
});
});
