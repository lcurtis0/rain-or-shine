
var userFormEl = document.querySelector('#user-form');
var openAreaDiv = document.querySelector('#open-area');
var userCitySearch = document.querySelector('#user-city-search');
var inputCityName = document.querySelector('#city-name-input');
// ^^ This is the input by the user on the search bar
var populousCities = document.querySelector('#populous-cities');
var userInputTitle = document.querySelector('#phase-city-user-input-title');

// "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=1f607030bc029e79a2a927c3fe3fb558";
var baseOpenWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q='

var baseOpenForcastURL = 'https://api.openweathermap.org/data/2.5/forecast?'

var keyAPI = '&appid=ff99ce7a71ef0123ade790b4f039ec6c'

var keyAPIforecast = 'ff99ce7a71ef0123ade790b4f039ec6c'

var recentSearches = document.getElementsByClassName("recent-searches");

var searchedrecentArray = JSON.stringify(localStorage.getItem("areaSearched"));

var searchCityWeatherInput = function (event) { // this function will be called on first when event happens 
    event.preventDefault();
    var cityName = inputCityName.value.trim();

    //This section is for the search bar for location
    if (cityName) {

        getCityNameInfo(cityName); // This will set the value of cityName to getCityNameInfo function thus not needing to restablish the value

        openAreaDiv.textContent = '';
        inputCityName.value = '';

    } else {
        alert("Invalid: The user must enter a valid location");
    }
}
// This ection is for the well known city locations i.e. Denvier or New York
var buttonClickHandler = function (event) {
    var populousCities = event.target.getAttribute('popular-cities'); // popular cities  is the attribute to each button in the HTML doc
    console.log("populousCities: ", populousCities)

    if (populousCities) {
        getPopularCities(populousCities); // when click event happens it creates a value and uses it as a place holder

        // openAreaDiv.textContent = '';
        // inputCityName.value would not apply here because it is not inputed into search bar

    }
};

var getCityNameInfo = function (cityName) { // Once the cityName have been made into the search bar it will activate this function
    var APIURL = baseOpenWeatherURL + cityName + keyAPI + "&units=imperial";

    fetch(APIURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            userInputTitle.textContent = " " + cityName; // whenever the user searches a city name it will appear to reminder the user on the page
            //displayCities(data.items, cityName);
            console.log("fetch cityName is working");

            var weatherIconDay = data.weather[0].icon;
            console.log(weatherIconDay);

            var forcastEl = document.createElement('h2');

            if (data.weather[0].main === 'Rain') {
                forcastEl.innerHTML =
                    "<img src='https://openweathermap.org/img/wn/" + weatherIconDay + ".png'>" + ' today will have ' + data.weather[0].description;
                console.log(data.weather[0].main);
                openAreaDiv.append(forcastEl);
            } else if (data.weather[0].main === 'Clouds') {
                forcastEl.innerHTML =
                    "<img src='https://openweathermap.org/img/wn/" + weatherIconDay + ".png'>" + 'today will have' + data.weather[0].description;
                console.log(data.weather[0].main);
                openAreaDiv.append(forcastEl);
            } else if (data.weather[0].main === 'Clear') {
                forcastEl.innerHTML =
                    "<img src='https://openweathermap.org/img/wn/" + weatherIconDay + ".png'>" + data.weather[0].description;
                console.log(data.weather[0].main);
                openAreaDiv.append(forcastEl);
            } else if (data.weather[0].main === 'Thunderstorms') {
                forcastEl.innerHTML =
                    "<img src='https://openweathermap.org/img/wn/" + weatherIconDay + ".png'>" + 'today will have' + data.weather[0].description;
                console.log(data.weather[0].main);
                openAreaDiv.append(forcastEl);
            } else if (data.weather[0].main) {
                forcastEl.innerHTML =
                    "Today is unqiue weather" + data.weather[0].main + 'today will have' + data.weather[0].description;
                console.log(data.weather[0].main);
                openAreaDiv.append(forcastEl);
            } else {
                forcastEl.innerHTML =
                    "<img src='https://openweathermap.org/img/wn/" + weatherIconDay + ".png'>" + 'error: wheather cannot be found';
                alert("Error: wheather cannot be found ")
                openAreaDiv.append(forcastEl);
            }

            var dateEl = document.createElement('h3');
            dateEl.textContent = dayjs.unix(data.dt).format('MMM D, YYYY');
            openAreaDiv.append("date: " + dayjs.unix(data.dt).format('MMM D, YYYY'));

            var tempEl = document.createElement('p');
            //tempEl.classList('')
            // may have to create an if statement to have date be the same or display throgh page 1
            tempEl.textContent = data.main.temp;
            openAreaDiv.append("temp: " + data.main.temp + " F ");

            var windSpeedEl = document.createElement('p');
            windSpeedEl.textContent = data.wind.speed;
            openAreaDiv.append("wind speed: " + data.wind.speed);

            var humidityEl = document.createElement('p');
            humidityEl.textContent = data.main.humidity;
            openAreaDiv.append("humidity: " + data.main.humidity);

            var latNum = data.coord.lat;

            var lonNum = data.coord.lon;// variables for latitude and longitude

            daysAfterPrediction(latNum, lonNum); // passed to daysAfterPrediction function

            let searchedrecentArray = [];
            searchedrecentArray.push(cityName);
            //searchedrecentArray = ['Denver', 'LA', 'LV']

            localStorage.setItem("areaSearched", JSON.stringify(searchedrecentArray));


            daysAfterPrediction(latNum, lonNum);
            saveslastWeather(cityName, searchedrecentArray);

        })

}

var getPopularCities = function (populousCities) {
    var APIURL = baseOpenWeatherURL + populousCities + keyAPI + "&units=imperial";

    fetch(APIURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            userInputTitle.textContent = " " + populousCities;
            console.log("fetch populousCities is working");
            var forcastEl = document.createElement('h2');



            var weatherIconDay = data.weather[0].icon;

            if (data.weather[0].main === 'Rain') {
                forcastEl.innerHTML =
                    "<img src='https://openweathermap.org/img/wn/" + weatherIconDay + ".png'>" + ' today will have ' + data.weather[0].main + "<p>" + data.weather[0].description + "</p>";
                console.log(data.weather[0].main);
                openAreaDiv.append(forcastEl);
            } else if (data.weather[0].main === 'Clouds') {
                forcastEl.innerHTML =
                    "<img src='https://openweathermap.org/img/wn/" + weatherIconDay + ".png'>" + 'today will have ' + data.weather[0].main + "<p>" + data.weather[0].description + "</p>";
                console.log(data.weather[0].main);
                openAreaDiv.append(forcastEl);
            } else if (data.weather[0].main === 'Clear') {
                forcastEl.innerHTML =
                    "<img src='https://openweathermap.org/img/wn/" + weatherIconDay + ".png'>" + 'today will have ' + data.weather[0].main + "<p>" + data.weather[0].description + "</p>";
                console.log(data.weather[0].main);
                openAreaDiv.append(forcastEl);
            } else if (data.weather[0].main === 'Thunderstorms') {
                forcastEl.innerHTML =
                    "<img src='https://openweathermap.org/img/wn/" + weatherIconDay + ".png'>" + 'today will have ' + data.weather[0].main + "<p>" + data.weather[0].description + "</p>";
                openAreaDiv.append(forcastEl);
            } else if (data.weather[0].main) {
                forcastEl.innerHTML =
                    "<img src='https://openweathermap.org/img/wn/" + weatherIconDay + ".png'>" + 'today will have ' + data.weather[0].main + "<p>" + data.weather[0].description + "</p>";
                console.log(data.weather[0].main);
                openAreaDiv.append(forcastEl);
            } else {
                forcastEl.innerHTML =
                    "<i class='error-icon '></i>" + 'error: wheather cannot be found';
                alert("Error: wheather cannot be found ")
                openAreaDiv.append(forcastEl);
            }

            var dateEl = document.createElement('h3');
            dateEl.textContent = dayjs.unix(data.dt).format('MMM D, YYYY');
            openAreaDiv.append("date: " + dayjs.unix(data.dt).format('MMM D, YYYY'));

            var tempEl = document.createElement('p');
            //tempEl.classList('')
            // may have to create an if statement to have date be the same or display throgh page 1
            tempEl.textContent = data.main.temp;
            openAreaDiv.append("temp: " + data.main.temp + " F ");

            var windSpeedEl = document.createElement('p');
            windSpeedEl.textContent = data.wind.speed;
            openAreaDiv.append("wind speed: " + data.wind.speed);

            var humidityEl = document.createElement('p');
            humidityEl.textContent = data.main.humidity;
            openAreaDiv.append("humidity: " + data.main.humidity);

            var latNum = data.coord.lat;

            var lonNum = data.coord.lon;

            let searchedrecentArray = [];
            searchedrecentArray.push(populousCities);
            //searchedrecentArray = ['Denver', 'LA', 'LV']

            localStorage.setItem("areaSearched", JSON.stringify(searchedrecentArray));


            daysAfterPrediction(latNum, lonNum);
            saveslastWeather(populousCities, searchedrecentArray);
        })

}

var displayWeather = function (currentWeek, cityName) {
    if (currentWeek.length === 0) {
        openAreaDiv.textContent = 'Enter a location or city in the search bar' + "<i class=' status-icon icon-'></i>";
        return;
    }
}

var daysAfterPrediction = function (latNum, lonNum) {
    //https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key} 
    var fullForecastURL = baseOpenForcastURL + "lat=" + latNum + "&lon=" + lonNum + "&appid=" + keyAPIforecast + "&units=imperial";
    // seprate URL has to be made different days and must use latitude and longitude to find location
    fetch(fullForecastURL)
        .then(function (response) {
            if (response.ok) {
                console.log("response is working");
            } else {
                console.log("error");
            }
            return response.json();
        })

        .then(function (data) {

            var list = data.list;

            for (var i = 0; i < list.length; i++) {

                if (list[i].dt_txt.includes('06:00:00')) {

                    var weatherDay = list[i].weather[0].main;

                    var tempDay = list[i].main.temp;
                    var descriptionDay = list[i].weather[0].description;
                    var windDay = list[i].wind.speed;
                    var humidityDay = list[i].main.humidity;
                    var weatherIconDay = list[i].weather[0].icon;
                    var dateDay = list[i].dt_txt;

                    var weekDayDiv = document.createElement('div');
                    weekDayDiv.classList = 'weekDaybox list-item flex-row justify-space-between align-center';

                    var titleWeather = document.createElement('h3');
                    titleWeather.textcontent = dateDay + " weather is " + weatherDay;
                    weekDayDiv.append(titleWeather);

                    var statsDiv = document.createElement('div');
                    weekDayDiv.append(statsDiv);
                    statsDiv.textContent = 'list-item';

                    if (weatherDay === 'Rain') {
                        titleWeather.innerHTML =
                            "<img src='https://openweathermap.org/img/wn/" + weatherIconDay + ".png'>" + ' today will have ' + weatherDay + "<p>" + descriptionDay + "</p>";
                        console.log(weatherDay);
                        weekDayDiv.append(weatherDay + " " + weatherIconDay);
                    } else if (weatherDay === 'Clouds') {
                        titleWeather.innerHTML =
                            "<img src='https://openweathermap.org/img/wn/" + weatherIconDay + ".png'>" + 'today will have ' + weatherDay + "<p>" + descriptionDay + "</p>";
                        console.log(weatherDay);
                        weekDayDiv.append(weatherDay + " " + weatherIconDay);
                    } else if (weatherDay === 'Clear') {
                        titleWeather.innerHTML =
                            "<img src='https://openweathermap.org/img/wn/" + weatherIconDay + ".png'>" + 'today will have ' + weatherDay + "<p>" + descriptionDay + "</p>";
                        console.log(weatherDay);
                        weekDayDiv.append(weatherDay + " " + weatherIconDay);
                    } else if (weatherDay === 'Thunderstorms') {
                        titleWeather.innerHTML =
                            "<img src='https://openweathermap.org/img/wn/" + weatherIconDay + ".png'>" + 'today will have ' + weatherDay + "<p>" + descriptionDay + "</p>";
                        weekDayDiv.append(weatherDay + " " + weatherIconDay);
                    } else if (weatherDay) {
                        titleWeather.innerHTML =
                            "Today is unqiue weather" + 'today will have ' + weatherDay + "<p>" + descriptionDay + "</p>";
                        console.log(weatherDay);
                        weekDayDiv.append(weatherDay + " " + weatherIconDay);
                    } else {
                        titleWeather.innerHTML =
                            "<img src='https://openweathermap.org/img/wn/" + weatherIconDay + ".png'>" + 'error: wheather cannot be found';
                        alert("Error: wheather cannot be found ")
                        weekDayDiv.append(titleWeather);
                    }

                    weekDayDiv.append('date: ' + dateDay)

                    weekDayDiv.append('temp: ' + tempDay);

                    weekDayDiv.append('wind: ' + windDay);

                    weekDayDiv.append('humidity' + humidityDay);

                    openAreaDiv.append(weekDayDiv);

                }
            }

        });

}

populousCities.addEventListener('click', saveslastWeather);

function putInStorage(populousCities) {
    localStorage.getItem("areaSearched", JSON.parse(searchedrecentArray));
    if (searchedrecentArray.indexOf(populousCities) !== -1) { // if populousCities exists then it will move to the else if
        return;
    } else if (searchedrecentArray.length < 5) { // if under 5 the populousCities willl be pushed into array
        searchedrecentArray.push(populousCities);
    }
    localStorage.setItem("areaSearched", JSON.stringify(searchedrecentArray));
    saveslastWeather(); // finally array will go to a function to be appended
}

// Both populousCities and cityName can share the same array
function putInStorageCityName(cityName) {
    localStorage.getItem("areaSearched", JSON.parse(searchedrecentArray));
    if (searchedrecentArray.indexOf(cityName) !== -1) {
        return;
    } else if (searchedrecentArray.length < 5) {
        searchedrecentArray.push(cityName);
    }
    localStorage.setItem("areaSearched", JSON.stringify(searchedrecentArray));
    saveslastWeather();
}

function saveslastWeather() {
    var storedLocation = JSON.parse(localStorage.getItem("areaSearched"));
    var lastWeather = document.createElement('button');
    for (var i = 0; i < storedLocation.length; i++) {
        lastWeather.textContent = ("This location is  " + storedLocation[i]);
        recentSearches[i].appendChild(lastWeather);
    }
}

userCitySearch.addEventListener('submit', searchCityWeatherInput);
populousCities.addEventListener('click', buttonClickHandler);


