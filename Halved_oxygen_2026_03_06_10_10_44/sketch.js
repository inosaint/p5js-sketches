let weather = null;
let loading = true;
let lat = 12.97;
let lon = 77.59;
let myCity;

function setup() {
  createCanvas(600, 400);
  textFont('monospace');
  
  myCity = createInput('Bangalore');
  
  myCity.position(420, 350);
  myCity.changed(() => fetchCoordinates(myCity.value()));

  fetchWeather();
}

async function fetchCoordinates(cityName) {
  const url = 'https://geocoding-api.open-meteo.com/v1/search?name=' + cityName + '&count=1';
  const res  = await fetch(url);
  const data = await res.json();

  if (data.results && data.results.length > 0) {
    lat = data.results[0].latitude;
    lon = data.results[0].longitude;
    fetchWeather();
  } else {
    console.log('City not found!');
  }
}

async function fetchWeather() {
  loading = true;
  const url =
    'https://api.open-meteo.com/v1/forecast' +
    '?latitude=' + lat + '&longitude=' + lon +
    '&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,wind_direction_10m' +
    '&timezone=auto';
  const res  = await fetch(url);
  const data = await res.json();
  weather = data.current;
  loading = false;
}

function draw() {
  background(240);

  fill(0);
  textSize(16);
  textAlign(LEFT);
  text('Weather now at', 420, 340);
  
  if (loading) {
    fill(0);
    textSize(14);
    textAlign(CENTER);
    text('Loading weather...', width / 2, height / 2);
    return;
  }

  drawCard(20, 20, 170, 170, 'TEMPERATURE', weather.temperature_2m + ' °C', color('#c9503a'));
  drawCard(210, 20, 170, 170, 'HUMIDITY', weather.relative_humidity_2m + ' %', color('#5b9bd5'));
  drawCard(20, 210, 170, 170, 'WIND', weather.wind_speed_10m + ' km/h', color('#339966'));
  drawCard(210, 210, 170, 170, 'PRECIPITATION', weather.precipitation + ' mm', color('#9933ee'));
  drawCompass(490, 120, weather.wind_direction_10m);
}

function drawCard(x, y, w, h, label, value, col) {
  fill(col);
  noStroke();
  rect(x, y, w, h, 8);
  fill(255);
  textAlign(LEFT);
  textSize(10);
  text(label, x + 12, y + 24);
  textSize(28);
  text(value, x + 12, y + h - 20);
}

function drawCompass(cx, cy, degrees) {
  fill(255);
  stroke(180);
  strokeWeight(1);
  ellipse(cx, cy, 140, 140);
  fill(0);
  noStroke();
  textAlign(CENTER);
  textSize(11);
  text('N', cx,      cy - 56);
  text('S', cx,      cy + 64);
  text('E', cx + 60, cy + 4);
  text('W', cx - 60, cy + 4);
  push();
  translate(cx, cy);
  rotate(radians(degrees));
  fill('#c9503a');
  noStroke();
  triangle(0, -50, -8, 10, 8, 10);
  fill(80);
  triangle(0, 50, -8, -10, 8, -10);
  pop();
  fill(0);
  textSize(10);
  textAlign(CENTER);
  text(degrees + '°', cx, cy + 90);
}
