# Weather Forecast Application

## Project Overview
This project is a **Weather Forecast Application** built using **JavaScript, HTML, and Tailwind CSS**. The application fetches weather data from an API and displays it in a user-friendly interface, including current weather conditions and extended forecasts.

## Features
- Fetch and display real-time weather data.
- Search weather by city name.
- Location-based weather updates.
- Responsive design using Tailwind CSS.
- Extended forecast display.

## Project Structure
```
weather-app/
│── index.html         # Main HTML file
│── style.css          # Optional styles (if needed alongside Tailwind)
│── script.js          # JavaScript for API calls and DOM manipulation
│── README.md          # Documentation
│── .gitignore         # Files to be ignored in Git
│── assets/            # Folder for images or icons
```

## Setup Instructions

### 1. Clone the Repository
```sh
git clone <https://github.com/hemanthkumar387/Weather_Forecast_Application>
cd Weather_Forecast_Application
```

### 2. Install Tailwind CSS

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

### 3. Set Up Version Control (Git)
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

