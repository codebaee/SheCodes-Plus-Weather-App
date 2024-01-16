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

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temp-emoji"/>`;

  timeElement.innerHTML = formatDate(date);
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = `${temperature} °F`;
  descriptionElement.innerHTML =
    response.data.condition.description.charAt(0).toUpperCase() +
    response.data.condition.description.slice(1);
}

function searchFormSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.getElementById("search-input");
  let city = searchInputElement.value;
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

// let currentDateElement = document.getElementById("current-date");
// let currentDate = new Date();
// currentDateElement.innerHTML = formatDate(currentDate);
