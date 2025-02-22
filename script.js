const API_KEY = "ad17ab2efeef77130c6afe8cd42230ef";
const cityInput = document.getElementById("cityInput");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const precipitation = document.getElementById("precipitation");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const currentTime = document.getElementById("currentTime");

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

        // Reset input field after successful search
        cityInput.value = "";
    } catch (error) {
        alert("Error fetching weather data. Please try again later.");
    }
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
            } catch (error) {
                alert("Error fetching location weather.");
            }
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

function updateWeatherUI(data) {
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    condition.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    precipitation.textContent = data.rain ? `${data.rain["1h"]} mm` : "0%";
    currentTime.textContent = new Date().toLocaleString();
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

// Load recent cities on page load
document.addEventListener("DOMContentLoaded", updateCityDropdown);


function getWeatherFromDropdown() {
    const selectedCity = document.getElementById("cityDropdown").value;
    if (selectedCity) {
        document.getElementById("cityInput").value = selectedCity;
        getWeather();
    }
}

