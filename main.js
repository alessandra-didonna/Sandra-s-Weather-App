const apiKey = 'd381ea8537fc0fcea6931ee533a0be50';
const getUrl = 'https://api.openweathermap.org/data/2.5/';

let defaultCall = 1;
let weatherSearch = document.getElementById("weatherSearch");
let citySearchInput = document.getElementById("citySearchInput");
let city = document.getElementById("city");
let localTime = document.getElementById("localTime");
let localDay = document.getElementById("localDay");
let temperature = document.getElementById("temperature");
let weatherDescription = document.getElementById("weatherDescription");
let searchIcon = document.getElementById("searchIcon");

let snowIcon = document.getElementById("snowflake");
let cloudIcon = document.getElementById("cloudy");
let sunIcon = document.getElementById("sunny");
let rainIcon = document.getElementById("rainy");
let stormIcon = document.getElementById("thunderstorm");
let fogIcon = document.getElementById("fog");
let moonIcon = document.getElementById("clearNight");
let rainyMoonIcon = document.getElementById("rainyNight");
let cloudyMoonIcon = document.getElementById("cloudyNight");

let snowImg = document.getElementById("snowImg");
let sunImg = document.getElementById("sunImg");
let rainImg = document.getElementById("rainImg");
let cloudImg = document.getElementById("cloudImg");
let stormImg = document.getElementById("stormImg");
let fogImg = document.getElementById("fogImg");
let nightImg = document.getElementById("nightImg");

let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let d = new Date();
let dayName = days[d.getDay()];
localDay.innerHTML = dayName;

let h = d.getHours();
let m = d.getMinutes();

localTime.innerHTML = h + ':' + m;

if(m < '10') {
    localTime.innerHTML = h + ':' + '0' + m;
}

getWeather(defaultCall);
//Setting defaultCall on 0 if users search through input
searchIcon.addEventListener('click', function() { getWeather(defaultCall = 0) });

citySearchInput.addEventListener('keydown', function(e){
    if(e.key ==  "Enter") {
        getWeather(defaultCall = 0);
    }
});

function getWeather(defaultCall) {
    // default Call on 1 when weatherApp is opened
    if (defaultCall == 1) {
        fetch (getUrl + 'weather?q=' + "Milano" + '&units=metric&APPID=' + apiKey)
        .then ((resolve) => {
            return resolve.json();
        })
        .then (data => {
            if (data.name == null) {
                alert('Insert a valid location');
            } else {
                city.innerHTML = data.name;
                temperature.innerHTML = data.main.temp + '°C';
                let descriptionResponse = data.weather[0].main;
                weatherDescription.innerHTML = descriptionResponse;
                //check if the api response has more info about rain and thunderstorm (more than only one array)
                if(data.weather.length > 1) {
                    //if descriptionResponse contains two arrays (rain, thunderstorm)
                    let moreDescriptionResponse = data.weather[1].main;
                    setWeather(moreDescriptionResponse);
                }
                setWeather(descriptionResponse);
            }
        })
    } else { //Users Call
        if (citySearchInput.value !== '') {
            fetch (getUrl + 'weather?q=' + citySearchInput.value + '&units=metric&APPID=' + apiKey)
            .then ((resolve) => {
                return resolve.json();
            })
            .then (data => {
                if (data.name == null) {
                    alert('Insert a valid location');
                } else {
                    city.innerHTML = data.name;
                    temperature.innerHTML = data.main.temp + '°C';
                    let descriptionResponse = data.weather[0].main;
                    weatherDescription.innerHTML = descriptionResponse;
                    //check if the api response has more info about rain and thunderstorm (more than one array)
                    if(data.weather.length > 1) {   
                        //if descriptionResponse contains two arrays (rain, thunderstorm)
                        let moreDescriptionResponse = data.weather[1].main;
                        setWeather(moreDescriptionResponse);
                    }
                    setWeather(descriptionResponse);
                }
            })
        } else {
            alert('Insert a valid location');
        }
    }
    
}

//getting visible icon/bg images
function setWeather(descriptionResponse) {
    if (descriptionResponse === "Thunderstorm") {
        setHiddenIcon();
        setHiddenImages();
        stormIcon.style.visibility = "visible";
        stormImg.style.visibility = "visible";
    }
    if (descriptionResponse === "Snow") {
        setHiddenIcon();
        setHiddenImages();
        snowIcon.style.visibility = "visible";
        snowImg.style.visibility = "visible";
    }
    if (descriptionResponse === "Clear") {
        setHiddenIcon();
        setHiddenImages();
        sunIcon.style.visibility = "visible";
        sunImg.style.visibility = "visible";
    }
    if (descriptionResponse === "Rain") {
        setHiddenIcon();
        setHiddenImages();
        rainIcon.style.visibility = "visible";
        rainImg.style.visibility = "visible";
    }
    if (descriptionResponse === "Drizzle") { //rain or drizzle
        setHiddenIcon();
        setHiddenImages();
        rainIcon.style.visibility = "visible";
        rainImg.style.visibility = "visible";
    }
    if (descriptionResponse === "Clouds") {
        setHiddenIcon();
        setHiddenImages();
        cloudIcon.style.visibility = "visible";
        cloudImg.style.visibility = "visible";
    }
    if (descriptionResponse === "Mist") {
        setHiddenIcon();
        setHiddenImages();
        fogIcon.style.visibility = "visible";
        fogImg.style.visibility = "visible";
    }
    if (descriptionResponse === "Fog") { //mist or fog
        setHiddenIcon();
        setHiddenImages();
        fogIcon.style.visibility = "visible";
        fogImg.style.visibility = "visible";
    }
    if (descriptionResponse === "Clear" && localTime.innerHTML > '17:00') {
        setHiddenIcon();
        setHiddenImages();
        nightImg.style.visibility = "visible";
        moonIcon.style.visibility = "visible";
        city.style.textShadow = "1px 1px 15px #fff";
    }
    if (descriptionResponse === "Rain" && localTime.innerHTML > '17:00') {
        setHiddenIcon();
        setHiddenImages();
        nightImg.style.visibility = "visible";
        rainyMoonIcon.style.visibility = "visible";
        city.style.textShadow = "1px 1px 15px #fff";
    }
    if (descriptionResponse === "Drizzle" && localTime.innerHTML > '17:00') {
        setHiddenIcon();
        setHiddenImages();
        nightImg.style.visibility = "visible";
        rainyMoonIcon.style.visibility = "visible";
        city.style.textShadow = "1px 1px 15px #fff";
    }
    if (descriptionResponse === "Clouds" && localTime.innerHTML > '17:00') {
        setHiddenIcon();
        setHiddenImages();
        nightImg.style.visibility = "visible";
        cloudyMoonIcon.style.visibility = "visible";
        city.style.textShadow = "1px 1px 15px #fff";
    }
    if (descriptionResponse === "Snow" && localTime.innerHTML > '17:00') {
        setHiddenIcon();
        setHiddenImages();
        nightImg.style.visibility = "visible";
        snowIcon.style.visibility = "visible";
        city.style.textShadow = "1px 1px 15px #fff";
    }
    if (descriptionResponse === "Fog" && localTime.innerHTML > '17:00') {
        setHiddenIcon();
        setHiddenImages();
        nightImg.style.visibility = "visible";
        fogIcon.style.visibility = "visible";
        city.style.textShadow = "1px 1px 15px #fff";
    }
    if (descriptionResponse === "Mist" && localTime.innerHTML > '17:00') {
        setHiddenIcon();
        setHiddenImages();
        nightImg.style.visibility = "visible";
        fogIcon.style.visibility = "visible";
        city.style.textShadow = "1px 1px 15px #fff";
    }
}

function setHiddenIcon() {
    snowIcon.style.visibility = "hidden";
    cloudIcon.style.visibility = "hidden";
    sunIcon.style.visibility = "hidden";
    rainIcon.style.visibility = "hidden";
    stormIcon.style.visibility = "hidden";
    fogIcon.style.visibility = "hidden";
    moonIcon.style.visibility = "hidden";
    rainyMoonIcon.style.visibility = "hidden";
    cloudyMoonIcon.style.visibility = "hidden";
}

function setHiddenImages() {
    snowImg.style.visibility = "hidden";
    cloudImg.style.visibility = "hidden";
    sunImg.style.visibility = "hidden";
    rainImg.style.visibility = "hidden";
    stormImg.style.visibility = "hidden";
    fogImg.style.visibility = "hidden";
    nightImg.style.visibility = "hidden";
}

