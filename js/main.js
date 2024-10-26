// days
var days =[
     "Sunday",
     "Monday",
     "Tuesday",
     "Wedensday",
     "Thursday",
     "Friday",
     "Saturday",
]
const searchInput=document.getElementById("search")
const weatherIcon=document.getElementById("weatherIcon")
async function getWeather(searchInput) {
  // get api
try {
          const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=22675e38675b451fa8b143103240601&q=${searchInput}&days=7`)
          if (!response.ok) {
               throw new Error(`Failed to fetch weather data. HTTP error! Status: ${response.status}`)
             }
   const data = await response.json()
   
  //  weather conditions
   if (data.current.condition.text.toLowerCase().includes("sunny")) {
     weatherIcon.src="images/sunny.gif" 
   }
   if (data.current.condition.text.toLowerCase().includes("clear")){
     weatherIcon.src="images/clear.gif" 
   }
   else if (data.current.condition.text.toLowerCase().includes("cloud")||data.current.condition.text.toLowerCase().includes("cloudy")) {
     weatherIcon.src="images/clouds.gif" 
   }
   else if (data.current.condition.text.toLowerCase().includes("snow")||data.current.condition.text.toLowerCase().includes("snowy")) {
     weatherIcon.src="images/snow.gif" 
   }
   else if (data.current.condition.text.toLowerCase().includes("drizzle")|| data.current.condition.text.toLowerCase().includes("patchy")) {
     weatherIcon.src="images/drizzle.gif" 
   }
   else if (data.current.condition.text.toLowerCase().includes("rain")||data.current.condition.text.toLowerCase().includes("rainy")) {
     weatherIcon.src="images/rain.gif" 
   }
   else if (data.current.condition.text.toLowerCase().includes("mist")||data.current.condition.text.toLowerCase().includes("overcast")) {
     weatherIcon.src="images/mist.gif" 
   }
   
  //  weather info
   document.querySelector("#weather .city").innerHTML =`
   <i class="fa-solid fa-location-dot pe-2"></i>
   <h5 class="fs-2 diphylleia">${data.location.region + ", "+ data.location.country}</h5>
   `
   document.querySelector(".description").innerHTML = data.current.condition.text
   document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + "°C"
   document.querySelector(".humidity").innerHTML = `
   <i class="fa-solid fa-water ps-2 pe-3 i-color"></i>
   <p>${data.current.humidity + "%"}</p>
   `
   document.querySelector(".wind").innerHTML = `
   <i class="fa-solid fa-wind ps-2 pe-3 i-color"></i>
   <p class="wind">${data.current.wind_kph + "km/h"}</p>
   `
   document.querySelector(".compass").innerHTML = `
   <i class="fa-regular fa-compass ps-2 pe-3 i-color"></i>
   <p class="compass">${data.current.wind_dir}</p>
   `

  //  the current day
  function getCurrentDay(date = new Date(), locale = "en-US") {
    return date.toLocaleDateString(locale, { weekday: "long" });
  }
  document.getElementById("dayOne").innerHTML = getCurrentDay();

  // The rest of the week
  function getDay(date, index) {
    const forecastDate = new Date(data.forecast.forecastday[index].date);
    return forecastDate.toLocaleDateString("en-US", { weekday: "long" });
  }

  for (let i = 1; i <= 6; i++) {
    const dayElement = document.querySelector(`#days .day${i + 1}`);
    const imageElement = document.querySelector(`#days .image${i + 1}`);
    const tempElement = document.querySelector(`#days .temp${i + 1}`);

    dayElement.innerHTML = getDay(data.forecast.forecastday[i], i).slice(0,3);
    imageElement.innerHTML = `<img src="http://${data.forecast.forecastday[i].day.condition.icon}" class="img2 w-100" alt="temp">`;
    tempElement.innerHTML = `${Math.round(data.forecast.forecastday[i].hour[0].temp_c)}°C`;
  }
 } catch (error) {
   console.error("Error fetching weather data:", error)
 }
}

//search cities
search.addEventListener("input", async function () {
     var searchTerm = searchInput.value
     if (searchTerm !== "") {
       getWeather(searchTerm)
     }
})

//find your location
function getLocation() {
  startTime()

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition,defaultCity)
  } else {
    getWeather('cairo')
  }
}


function showPosition(position) {
  var y = position.coords.latitude
  var x = position.coords.longitude
  getWeather(`${y} ${x}`)
}

//deny the request
function defaultCity() {
     getWeather('cairo')
}

//clock
function startTime() {
  const today = new Date()
  let h = today.getHours()
  let m = today.getMinutes()
  let s = today.getSeconds()
  m = checkTime(m)
  s = checkTime(s)
  document.getElementById('clock').innerHTML =  h + " : " + m + " : " + s
  setTimeout(startTime, 1000)
}

function checkTime(i) {
  if (i < 10) {i = "0" + i}
  return i
}
