# Weather Forecast Application

## Project Overview
This project is a **Weather Forecast Application** built using **JavaScript, HTML, and Tailwind CSS**. The application fetches weather data from an API and displays it in a user-friendly interface, including current weather conditions and extended forecasts.

## Features
- Fetch and display real-time weather data.
- Search weather by city name.
- Location-based weather updates.
- Responsive design using Tailwind CSS.
- Extended forecast display.

## Technologies Used
- HTML
- CSS (Tailwind CSS)
- JavaScript
- OpenWeatherMap API

## Setup Instructions

### Prerequisites
- A text editor (VS Code, Sublime Text, etc.)
- A web browser
- An OpenWeatherMap API key (Sign up at [OpenWeatherMap](https://openweathermap.org/) to get your API key)

### Project Structure
```
weather-app/
│── index.html         # Main HTML file
│── style.css          # Optional styles (if needed alongside Tailwind)
│── script.js          # JavaScript for API calls and DOM manipulation
│── README.md          # Documentation
│── .gitignore         # Files to be ignored in Git
│── assets/            # Folder for images or icons
```

### Clone the Repository
```sh
git clone https://github.com/hemanthkumar387/Weather_Forecast_Application
cd Weather_Forecast_Application
```

### Install Tailwind CSS

Run the following commands:
Install `tailwindcss` and `@tailwindcss/cli` via npm.
```
npm install tailwindcss @tailwindcss/cli
```
Create a `styles.css` file

Import Tailwind in your CSS
Add the `@import "tailwindcss";` import to your main CSS file.
```
@import "tailwindcss";
```
Start the Tailwind CLI build process
Run the CLI tool to scan your source files for classes and build your CSS.
```
npx @tailwindcss/cli -i ./styles.css -o ./output.css --watch
```
Start using Tailwind in your HTML
Add your compiled CSS file to the <head> and start using Tailwind’s utility classes to style your content.
Finally, link `output.css` in `index.html`.
```
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="./output.css" rel="stylesheet">
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>
```

### Set Up Version Control (Git)
```sh
git init
git add .
git commit -m "commit"
```
Create a `.gitignore` file and add:
```
node_modules/
output.css
```
Push the project to GitHub:
```sh
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

### Configuration

1. Open `script.js`
2. Replace `YOUR_API_KEY` with your actual OpenWeatherMap API key:
   ```js
   const apiKey = "YOUR_API_KEY";
   ```

### Usage
1. Enter a city name in the search bar.
2. Click the "Search" button to fetch weather data.
3. View the temperature, humidity, wind speed, and weather conditions displayed on the page.


### Output
Current Loaction:

![Weather Application Output](https://github.com/user-attachments/assets/c2faabe3-7cc5-49f4-b860-d2b01fa3b937)

Input Field:

![Weather Application Output1](https://github.com/user-attachments/assets/342b07a8-50e4-4035-8844-bd45bd6333fc)

Recent Search:

![Weather Application Output2](https://github.com/user-attachments/assets/1c718c72-4a60-4363-a1ef-8a0955399864)




