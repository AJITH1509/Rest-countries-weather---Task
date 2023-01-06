let url = "https://restcountries.com/v3.1/all";
let bodyy = document.querySelector(".row");

async function restapi() {
  try {
    let rest = await fetch(url);
    var response = await rest.json();
    for (let i = 0; i < response.length; i++) {
      var create_div = document.createElement("div");
      create_div.classList.add("col-md-4");
      create_div.classList.add("col-lg-4");
      create_div.classList.add("col-sm-6");
      create_div.classList.add("col-xl-4");
      create_div.innerHTML = `
      <div class="card-deck">
      <div class="card h-100">
      <div class="card-header bg-danger" id="header">
         <H1 id="title" class="text-center">${response[i].name.common}</H1>
      </div>
      <div class="card-body" >
           <div class="card-text">
              <img class="img card-img-top" src="${response[i].flags.png}">
              <p text-center"> country code: ${response[i].cca3}</p>
              <p text-center">Region: ${response[i].region}</p>
              <p text-center">capital: ${response[i].capital?.length > 0? response[i].capital[0]: "NA"}</p>
              <p text-center">lat lng: ${response[i].latlng[0]},${response[i].latlng[1]}</p>
              <div class="reports" id="index-${i}"></div>
            </div>
     </div> 
     <div class="card-footer" >
     <button class="btn btn-primary text-center" onclick="weather('${response[i].name.common}','index-${i}')">Click for Weather</button>
     </div>
  </div>
      </div>
        
    `;
      bodyy.append(create_div);
    }
  } catch (err) {
    console.log("error", err);
  }
}
restapi();

async function weather(countryname, id) {
  var url2 = `https://api.openweathermap.org/data/2.5/weather?q=${countryname}&appid=44f831ed100824c8de74ae8c5e6b38e5`;
  var weath = await fetch(url2);
  var res = await weath.json();
  var bodyElement = document.getElementById(id);
  var value = (`Temperature: ${res.main.temp} Sky:${res.weather[0].main}`);
  bodyElement.append(value);
  
}
