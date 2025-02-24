// Define the API key for OpenWeatherMap API
const API_KEY = "API_KEY";

// Get references to the HTML elements
const cityInput = document.getElementById("cityInput");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const precipitation = document.getElementById("precipitation");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const currentTime = document.getElementById("currentTime");
const forecastContainer = document.getElementById("forecastContainer");

// Function to fetch and display weather based on user input
async function getWeather() {
    const city = cityInput.value.trim();
    // If the input field is empty raise an message
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    try {
        // Fetch weather data from OpenWeatherMap API
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        
        // If city is not found, show an error message
        if (data.cod !== 200) {
            alert("City not found. Please try again.");
            return;
        }

        // Update the UI with weather data
        updateWeatherUI(data);

        // Save the searched city to recent cities list
        saveToRecentCities(city);

        // Fetch 5-day weather forecast
        getFiveDayForecast(city);

        // Reset input field after successful search
        cityInput.value = "";
    } catch (error) {
        alert("Error fetching weather data. Please try again later."); // If any issue is raised like network issue
    }
}

// Function to fetch and display a 5-day weather forecast
async function getFiveDayForecast(cityname = null, latitude = null, longitude = null) {
    let url;

    // Construct API URL based on whether city name or coordinates are provided
    if (cityname) {
        url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${API_KEY}&units=metric`;
    } else if (latitude !== null && longitude !== null) {
        url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    } else {
        console.error("No valid location provided for forecast"); // if the location is not valid
        return;
    }

    try {
        const response = await fetch(url); // taking the response if city name it will take the cityname url else latitude and longitude url
        const data = await response.json(); // converting to json format

        if (!data.list) {
            throw new Error("No forecast data available"); // if no data throw the error
        }

        // Update UI with the 5-day forecast
        updateFiveDayForecastUI(data.list);
    } catch (error) {
        alert("Error fetching 5-day forecast."); // If 5-Days forecast is not fetched raise an error message
    }
}

// Function to update the 5-day forecast UI
function updateFiveDayForecastUI(forecastData) {
    const forecastContainer = document.getElementById("forecast");
    forecastContainer.innerHTML = "";  // initially the value is empty

    // Display heading if forecast data is available
    if (forecastData.length > 0) { // checking for data availablity
        const heading = document.createElement("h2"); // Creating the heading tag
        heading.textContent = "5-Day Forecast"; // Keeping the heading
        heading.className = "text-2xl md:text-3xl font-bold text-white text-center w-full my-8"; // adding styles to the heading
        forecastContainer.appendChild(heading); // appending the heading
    }

    // Filter forecasts for the next 5 days at 12:00 AM
    const dailyForecasts = forecastData.filter((entry) =>
        entry.dt_txt.includes("00:00:00")
    );

    // Loop through each day's forecast and create a display card
    dailyForecasts.forEach((day) => {
        const date = new Date(day.dt * 1000).toLocaleDateString("en-IN", { 
            weekday: "short", day: "numeric", month: "short" 
        });

        // Getting data to display
        const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`; // icon data
        const temp = `${Math.round(day.main.temp)}°C`; // Temperature data
        const wind = `${day.wind.speed} km/h`; // wind speed data
        const humidity = `${day.main.humidity}%`; // Humidity data

        // Create forecast card
        const forecastItem = document.createElement("div"); // Creating a div tag to display the 5 day forecast data
        forecastItem.className = "bg-gray-800 text-white rounded-lg p-4 w-full md:w-1/4 lg:w-1/6 h-full"; // styling the div tag

        // Updating the Ui to display the forecast data
        forecastItem.innerHTML = `
            <p class="font-semibold text-lg">${date}</p>
            <img src="${icon}" class="w-26 mx-auto">
            <p class="text-md">🌡️ Temp: ${temp}</p>
            <p class="text-sm">💨 Wind: ${wind}</p>
            <p class="text-sm">💧 Humidity: ${humidity}</p>
        `;

        forecastContainer.appendChild(forecastItem);
    });
}

// Function to fetch weather data based on the user's current location
async function getCurrentLocationWeather() {
    // Getting the user's geographical location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                // Fetch data using latitude and longitude
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
                );
                const data = await response.json();

                if (data.cod !== 200) {
                    alert("Could not retrieve weather for your location."); // if the loaction not detected
                    return;
                }

                // Displat the data to the UI
                updateWeatherUI(data);

                // Get the five day forecast for that location and update it to the UI
                getFiveDayForecast(null, latitude, longitude);
            } catch (error) {
                alert("Error fetching location weather."); // error if data is not fetched
            }
        });
    } else {
        alert("Geolocation is not supported by your browser."); // if location not recognised
    }
}


// Getting the systems date
function getSystemDate() {
    return new Date().toLocaleDateString("en-IN", { 
        weekday: "long", // Example: Monday
        year: "numeric", // Example: 2025
        month: "long", // Example: January
        day: "numeric" // Example: 20
    });
}

// Function to update the UI with the fetched weather data
function updateWeatherUI(data) {
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; // Icon 
    temperature.textContent = `${Math.round(data.main.temp)}°C`; // Temperature data
    // getting condition data and making the first character to uppercase and adding the remaining part to it
    condition.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
    humidity.textContent = `${data.main.humidity}%`; //Humidity data
    windSpeed.textContent = `${data.wind.speed} km/h`; // Wind speed data
    precipitation.textContent = data.rain ? `${data.rain["1h"]} mm` : "0%"; // precipitation data
    currentTime.textContent = getSystemDate(); // Getting the date from the system to display

    // Displaying the cityname to the UI for which the data is showing
    document.getElementById("cityNameDisplay").textContent = data.name;
}

// Save recently searched cities in session storage
function saveToRecentCities(city) {
    let cities = JSON.parse(sessionStorage.getItem("recentCities")) || []; // Creating the empty item initially
    if (!cities.includes(city)) {
        // add it to the session storage
        cities.unshift(city);
        sessionStorage.setItem("recentCities", JSON.stringify(cities));
    }
    // Updating the added cities to the Ui
    updateCityDropdown();
}

// Display recent city dropdown
function updateCityDropdown() {
    let cities = JSON.parse(sessionStorage.getItem("recentCities")) || [];
    let dropdown = document.getElementById("cityDropdown"); 

    // Updating to the UI
    dropdown.innerHTML =
        `<option value="" disabled selected>Select from recent search</option>` +
        cities.map((city) => `<option value="${city}">${city}</option>`).join("");

    // controls the visibility of a dropdown menu based on the number of cities available.
    dropdown.style.display = cities.length ? "block" : "none"; 
}

// Getting weather for the selected city from the dropdown
function getWeatherFromDropdown() {
    const selectedCity = document.getElementById("cityDropdown").value;
    if (selectedCity) {
        document.getElementById("cityInput").value = selectedCity;
        getWeather();
    }
}

// Fetch weather data on page load
document.addEventListener("DOMContentLoaded", () => {
    updateCityDropdown(); // Automatically fetch dropdown data on page reload
    getCurrentLocationWeather(); // Automatically fetch weather on load
});

