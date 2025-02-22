const API_KEY = "ad17ab2efeef77130c6afe8cd42230ef";
const cityInput = document.getElementById("cityInput");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const precipitation = document.getElementById("precipitation");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const currentTime = document.getElementById("currentTime");
const forecastContainer = document.getElementById("forecastContainer");

async function getWeather() {
    const city = cityInput.value.trim();
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();

        if (data.cod !== 200) {
            alert("City not found. Please try again.");
            return;
        }

        updateWeatherUI(data);
        saveToRecentCities(city);
        getFiveDayForecast(city);

        // Reset input field after successful search
        cityInput.value = "";
    } catch (error) {
        alert("Error fetching weather data. Please try again later.");
    }
}



async function getFiveDayForecast(cityname = null, latitude = null, longitude = null) {
    let url;
    if (cityname) {
        url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${API_KEY}&units=metric`;
    } else if (latitude !== null && longitude !== null) {
        url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    } else {
        console.error("No valid location provided for forecast");
        return;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Forecast Data:", data);

        if (!data.list) {
            throw new Error("No forecast data available");
        }

        updateFiveDayForecastUI(data.list);
    } catch (error) {
        console.error("Error fetching 5-day forecast:", error);
        alert("Error fetching 5-day forecast.");
    }
}


function updateFiveDayForecastUI(forecastData) {
    const forecastContainer = document.getElementById("forecastContainer");
    forecastContainer.innerHTML = "";

    // Get forecast for the next 5 days (every 24 hours at 12:00 PM)
    const dailyForecasts = forecastData.filter((entry) =>
        entry.dt_txt.includes("12:00:00")
    );

    dailyForecasts.forEach((day) => {
        const date = new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "short" });
        const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
        const temp = `${Math.round(day.main.temp_min)}° / ${Math.round(day.main.temp_max)}°C`;

        // Create a new forecast item
        const forecastItem = document.createElement("div");
        forecastItem.classList.add("text-gray-400", "text-center", "p-2");

        forecastItem.innerHTML = `
            <p class="font-semibold">${date}</p>
            <img src="${icon}" class="w-10 mx-auto">
            <p class="text-sm">${temp}</p>
        `;

        forecastContainer.appendChild(forecastItem);
    });
}


async function getCurrentLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
                );
                const data = await response.json();

                if (data.cod !== 200) {
                    alert("Could not retrieve weather for your location.");
                    return;
                }

                updateWeatherUI(data);

                getFiveDayForecast(null, latitude, longitude);
            } catch (error) {
                alert("Error fetching location weather.");
            }
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}


function getLocalTime(timezoneOffset) {
    const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const localTime = new Date(utcTime + timezoneOffset * 1000);
    
    return localTime.toLocaleString("en-US", { 
        weekday: "long", // Full day name (e.g., Monday)
        year: "numeric", 
        month: "long", // Full month name (e.g., January)
        day: "numeric", 
        hour: "2-digit", 
        minute: "2-digit", 
        second: "2-digit", 
        hour12: true // AM/PM format
    });
}

function updateWeatherUI(data) {
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    condition.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    precipitation.textContent = data.rain ? `${data.rain["1h"]} mm` : "0%";
    currentTime.textContent = getLocalTime(data.timezone);
}

// Save recently searched cities in session storage
function saveToRecentCities(city) {
    let cities = JSON.parse(sessionStorage.getItem("recentCities")) || [];
    if (!cities.includes(city)) {
        cities.unshift(city);
        if (cities.length > 5) cities.pop(); // Keep only 5 recent cities
        sessionStorage.setItem("recentCities", JSON.stringify(cities));
    }
    updateCityDropdown();
}

// Display recent city dropdown
function updateCityDropdown() {
    let cities = JSON.parse(sessionStorage.getItem("recentCities")) || [];
    let dropdown = document.getElementById("cityDropdown");

    dropdown.innerHTML =
        `<option value="" disabled selected>Select from recent search</option>` +
        cities.map((city) => `<option value="${city}">${city}</option>`).join("");

    dropdown.style.display = cities.length ? "block" : "none";
}



function getWeatherFromDropdown() {
    const selectedCity = document.getElementById("cityDropdown").value;
    if (selectedCity) {
        document.getElementById("cityInput").value = selectedCity;
        getWeather();
    }
}


// Load recent cities on page load
document.addEventListener("DOMContentLoaded", updateCityDropdown);

