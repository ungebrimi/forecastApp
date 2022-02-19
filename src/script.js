import { gsap } from "../node_modules/gsap"
/**
 * Searchbar
 */
const searchInput = document.getElementById("search-input")
// if searchBtn isClick display weather and forecast
const searchButton = document.querySelector(".search__btn")
searchButton.addEventListener('click', () =>
{
    const forecast = document.querySelector(".forecast").style.display = "flex"
    const weather = document.querySelector(".weather").style.display = "flex"
})

let tableRows = document.querySelectorAll('.tablerow')
/*
for (let tableRow of tableRows) 
{
    tableRow.addEventListener('mouseenter', () => 
    {
        gsap.to(tableRow, { scale: 1.1, ease: 'slow', duration: 0.5, })
    })
    tableRow.addEventListener('mouseleave', () => 
    {
        gsap.to(tableRow, { scale: 1, ease: 'slow', duration: 0.5, })
    })
}
*/
console.log(tableRows)

const weather = {
    APIkey: '76aeffd51c52e2a8916aa011fde997e5',
    fetchWeather: function (city) 
    {
        fetch (
            "http://api.openweathermap.org/data/2.5/weather?q="
            + city
            + '&units=metric'
            + "&lang=no"
            + "&appid="
            + this.APIkey
        ).then((response) => response.json())
        .then((data) => this.displayWeather(data))
    },
    displayWeather: function (data) 
    {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        // diplay weather in the DOM
        let location = document.getElementById("location").textContent = "Værvarselet for " + name;
        let weatherDescription = document.getElementById("description").textContent = description;
        let weatherIcon = document.getElementById("icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        let temperature = document.getElementById("temperature").textContent = temp + "℃";
        let wind = document.getElementById("wind").textContent = "Vind: " + speed + "ms";
        let humid = document.getElementById("humidity").textContent = "Luftfuktighet: " + humidity + "%";
    },
    searchbar: function() 
    {
        this.fetchWeather(searchInput.value);
    }
};
// forecast
/* for each tr append a table data of weather... */
const forecast = {
    APIkey: '76aeffd51c52e2a8916aa011fde997e5',
    fetchForecast: function (city)
    {
        fetch(
        "http://api.openweathermap.org/data/2.5/forecast?q="
        + city
        + "&units=metric"
        + "&lang=no"
        + "&appid="
        + this.APIkey
        ).then((response) => response.json())
        .then((data) => this.displayForecastT1(data))
    },
    displayForecastT1: function (data) 
    {
        // FIRST TABLE ROw FOR WEATHER TOMMOROW
        const tbody = document.getElementById("tbody")
        data.list.forEach(list_item => 
        {
            const { icon, description } = list_item.weather[0];
            const { temp, humidity } = list_item.main;
            const { speed } = list_item.wind;
            let tableRow = document.createElement("tr");
            tableRow.className = 'tablerow'            
            let weatherRow = document.createElement("tr")
            let tableDate = document.createElement("td");
            let tableTemp = document.createElement("td");
            let tableHumidity = document.createElement("td");
            let tableSpeed = document.createElement("td");
            let tableDescription = document.createElement("td")
            let tableIcon = document.createElement("img")
            tableDate.textContent = list_item.dt_txt;
            tableTemp.textContent = temp + "℃";
            tableSpeed.textContent = speed + "ms";
            tableDescription.textContent = description;
            tableIcon.src = "https://openweathermap.org/img/wn/" + icon + ".png";
            tableRow.append(tableDate, tableIcon, tableDescription, tableTemp, tableSpeed)
            tbody.appendChild(tableRow)
            
        })
    // GETS THE FORECAST DATA FROM SEARCHBAR
    },
    searchbar: function() 
    {
        this.fetchForecast(searchInput.value);
    }
}

document.getElementById("search-submit").addEventListener("click", function ()
{
    weather.searchbar();
    forecast.searchbar();
})