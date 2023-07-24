

var userFormEl = document.querySelector('#user-form');
var openAreaDiv = document.querySelector('#open-area');
var userCitySearch = document.querySelector('#user-city-search');
var inputCityName = document.querySelector('#city-name-input');
// ^^ This is the input by the user on the search bar
var populousCities = document.querySelector('#populous-cities');
var userInputTitle = document.querySelector('#phase-city-user-input-title');

// "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=1f607030bc029e79a2a927c3fe3fb558";
var baseOpenWeatherURL = 'http://api.openweathermap.org/data/2.5/weather?q='

var baseOpenForcastURL = 'http://api.openweathermap.org/data/2.5/forecast?'

var keyAPI = '&appid=ff99ce7a71ef0123ade790b4f039ec6c'

var keyAPIforecast = 'ff99ce7a71ef0123ade790b4f039ec6c'



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

            var lonNum = data.coord.lon;

            console.log(lonNum); // variables for latitude and longitude
            console.log(latNum);
            daysAfterPrediction(latNum, lonNum); // passed to daysAfterPrediction function

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
            console.log(weatherIconDay);

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

            console.log(lonNum);
            console.log(latNum);
            daysAfterPrediction(latNum, lonNum);
            appendStorepopulousCities(populousCities);
            localStorage.setItem("areaSearched", populousCities);
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
    console.log(fullForecastURL)
    // seprate URL has to be made different days and must use latitude and longitude to find location
    fetch(fullForecastURL)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                console.log("response is working");
            } else {
                console.log("error");
            }
            return response.json();
        })

        .then(function (data) {
            console.log(data);

            var list = data.list;
            console.log(list);

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

var recentSearches = document.getElementsByClassName("recent-searches");

var searchedrecentArray = JSON.stringify(localStorage.getItem("areaSearched"));

function appendStorepopulousCities(populousCities) {
    if (populousCities) {
            var lastWeather = document.createElement('p');
        lastWeather.textContent = populousCities;
        console.log(lastWeather);
       // lastWeather.addClass('button');
        recentSearches.append("hello this is a test " + lastWeather);
    } else if (searchedrecentArray.length > 5){
        recentSearches.remove(lastWeather);
    }
   // recentSearches.remove(lastWeather); //.pop states that the earliest part added to the array will be selected and removed
}
       // localStorage.setitem("areaSearched", JSON.stringify(populousCities + ));

// Both populousCities and cityName can share the same array
function appendStorecityName(cityName) {
    if (searchedrecentArray.includes(cityName)) {
        searchedrecentArray.unshift(cityName);

        if (searchedrecentArray.length > 5) {
            searchedrecentArray.pop();
        }
        localStorage.setitem("areaSearched", JSON.stringify(populousCities));
        var lastWeather = document.createElement("last-weather");
        lastWeather.text(populousCities + " " + data.weather[0].main + " " + dateEl);
        lastWeather.addClass(".button");
        recentSearches.append(lastWeather);
    }
}
/*
function renderAddressButtons() {
    var storedAddresses = JSON.parse(localStorage.getItem("myAddress"));
    if (storedAddresses !== null) {
        $(".historic-container").removeClass("is-hidden");
        $(addressContainer).text("");
        for (var i = 0; i < storedAddresses.length; i++) {
            var button = document.createElement("button");
            $(button).text(storedAddresses[i].address + ", " + storedAddresses[i].currency);
            $(button).addClass("button  is-link m-4");
            $(addressContainer).append(button);
        }
    }

*/

userCitySearch.addEventListener('submit', searchCityWeatherInput);
populousCities.addEventListener('click', buttonClickHandler);



