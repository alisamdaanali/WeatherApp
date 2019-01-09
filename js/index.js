const appKey = "f24f40b1c24505685fce3b8acd0fcffc";

let searchButton = document.getElementById("search-btn");
let searchInput = document.getElementById("search-txt");
let cityName = document.getElementById("city-name");
let icon = document.getElementById("icon");
let temperature = document.getElementById("temp");
let humidity = document.getElementById("humidity-div");

var toggleC = false;

var tempC;
var tempF;



searchButton.addEventListener("click", findWeatherDetails);
searchInput.addEventListener("keyup", enterPressed);

function enterPressed(event) {
  if (event.key === "Enter") {
    findWeatherDetails();
  }
}


function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(findWeatherDetails);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

function findWeatherDetails(position) {
  if (searchInput.value === "") {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude
    let searchLink = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon="+ lon + "&appid="+appKey;
    httpRequestAsync(searchLink, theResponse);
  }else {
    let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid="+appKey;
   httpRequestAsync(searchLink, theResponse);
  }
 }

function theResponse(response) {
  let jsonObject = JSON.parse(response);
  cityName.innerHTML = jsonObject.name;
  icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
  temperature.innerHTML = parseInt(jsonObject.main.temp * 9/5 - 459.67) + "°F";
  tempC = parseInt(jsonObject.main.temp - 273.15) + "°C";
  tempF =  parseInt(jsonObject.main.temp * 9/5 - 459.67) + "°F";
  humidity.innerHTML = jsonObject.main.humidity + "%";
}

function httpRequestAsync(url, callback)
{
  console.log("hello");
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => { 
        if (httpRequest.readyState == 4 && httpRequest.status == 200)
            callback(httpRequest.responseText);
    }
    httpRequest.open("GET", url, true); // true for asynchronous 
    httpRequest.send();
}

var cToF = function(c) {
  return c;
};

var fToC = function(f) {
  return f;
};

$("#temp").on("click", function() {
  var isF = $(this).data("units") === "f";

  var oldTemp = $(this).text();
  var newTemp = isF ? fToC(tempF) : cToF(tempC);
  $(this).text(newTemp);

  var newUnits = isF ? "c" : "f";
  $(this).data("units", newUnits).attr("data-units", newUnits);
 });