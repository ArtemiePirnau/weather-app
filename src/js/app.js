 "use strict";

 class WeatherApp {
     constructor(degrees, city, moodImage, moodText, cloudy, humidity, windSpeed, pressure, input, btn) {
         this.degrees = document.querySelector(degrees);
         this.KEY = "7c4ab7e231e1b8bafa102cc18b4c86f9";
         this.city = document.querySelector(city);
         this.moodImage = document.querySelector(moodImage);
         this.moodText = document.querySelector(moodText);
         this.cloudy = document.querySelector(cloudy);
         this.humidity = document.querySelector(humidity);
         this.windSpeed = document.querySelector(windSpeed);
         this.pressure = document.querySelector(pressure);
         this.input = document.querySelector(input);
         this.btn = document.querySelector(btn);
     }
     generateValues(mainObject) {
         let urlIcon = `http://openweathermap.org/img/w/${mainObject.weather[0].icon}.png`;
         this.city.textContent = mainObject.name;
         this.degrees.textContent = (mainObject.main.temp - 273.15).toFixed(2) + "°C";
         this.pressure.textContent = mainObject.main.pressure;
         this.humidity.textContent = mainObject.main.humidity;
         this.windSpeed.textContent = mainObject.wind.speed;
         this.cloudy.textContent = mainObject.sys.country;
         this.moodText.textContent = mainObject.weather[0].main;
         this.moodImage.setAttribute("src", urlIcon);

         document.querySelector(".weather").classList.remove("loading");
         document.querySelector(".weather__details-list").classList.remove("loading");

         this.input.value = "";
     }
     searchCity() {
         let inputValue = this.input.value.trim().toLowerCase();
         if (!inputValue || inputValue == null) {
             return;
         } else {
             fetch(`http://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${this.KEY}`)
                 .then(data => data.json())
                 .then(json => {
                     this.generateValues(json);
                 })
                 .catch(err => console.log(err));
         }
     }
 }

 const weather = new WeatherApp(
     ".weather__degrees",
     ".weather__city",
     ".weather__mood-icon",
     ".weather__mood-text",
     ".cloudy",
     ".humidity",
     ".wind-speed",
     ".pressure",
     ".weather__details-input",
     ".weather__details-btn"
 );
 weather.btn.addEventListener("click", (e) => {
     e.preventDefault();
     weather.searchCity();
 });

 weather.input.addEventListener("keyup", event => {
     if (event.key === "Enter") weather.searchCity();
 });