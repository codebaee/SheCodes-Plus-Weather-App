function displayTemp(response) {
  let temperatureElement = document.getElementById("current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.getElementById("current-city");
  let descriptionElement = document.getElementById("weather-description");
  let humidityElement = document.getElementById("humidity-description");
  let windElement = document.getElementById("wind-description");
  let timeElement = document.getElementById("current-date");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.getElementById("weather-icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML =
    response.data.condition.description.charAt(0).toUpperCase() +
    response.data.condition.description.slice(1);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  temperatureElement.innerHTML = `${temperature} °F`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temp-emoji"/>`;

  // Clear search input
  let searchInputElement = document.getElementById("search-input");
  searchInputElement.value = "";

  getForecast(response.data.city);
}
const defaultCity = "Charlotte";
function searchFormSubmit(event, userCity) {
  event.preventDefault();
  let searchInputElement = document.getElementById("search-input");
  const city = userCity || searchInputElement.value || defaultCity;
  let apiKey = "d010da332cob3740f398ft7aa7bdef74";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemp);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  // Convert hours to 12-hour format
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // If hours is 0, set it to 12

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let formattedDay = days[day];

  return `${formattedDay} ${hours}:${minutes} ${ampm}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchFormSubmit);

document.addEventListener("DOMContentLoaded", function () {
  searchFormSubmit(new Event("submit"));
});
// let currentDateElement = document.getElementById("current-date");
// let currentDate = new Date();
// currentDateElement.innerHTML = formatDate(currentDate);
//
//

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "d010da332cob3740f398ft7aa7bdef74";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios(apiUrl).then(displayForecast);
  //  axios(apiUrl).then((response) => displayForecast(response));
}

function displayForecast(response) {
  console.log(response.data);
  // Start from the second day, get the next 6 days
  let days = response.data.daily.slice(1, 7);

  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    forecastHTML += `
            <div class="weather-forecast-date">
              <div class="row">
                <div class="col-2">
                 ${formatDay(day.time)}
                  <img
                    src="${day.condition.icon_url}"
                  />
                  
                  <div class="weather-forecast-temp">
                    <span class="weather-forecast-max">${Math.round(
                      day.temperature.maximum
                    )}°</span>
                    <span class="weather-forecast-min">${Math.round(
                      day.temperature.minimum
                    )}°</span><div class="forecastDescription">${
      day.condition.description
    }</div>
                  </div>
                </div>
                </div>
                </div>
             `;
  });
  let forecastElement = document.getElementById("forecast");
  forecastElement.innerHTML = forecastHTML;
}
