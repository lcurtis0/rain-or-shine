



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
    
/*
 
    function getApi() {
console.log(fetch(APIURL));

fetch(APIURL)
.then(function (response) {
    return response.json();
    console.log(response);
    if (response.ok){
        console.log("it worked");
    }
  })
  .then(function (data) {
    console.log(data)
    console.log(data.main.temp);
    console.log(data.main.humidity);
    console.log(data.wind.speed);
  });
}
getApi();
*/

var searchCityWeatherInput = function(event){ // this function will be called on first when event happens 
    event.preventDefault();
    var cityName = inputCityName.value.trim();

    //This section is for the search bar for location
    if (cityName){

        getCityNameInfo(cityName); // This will set the value of cityName to getCityNameInfo function thus not needing to restablish the value
        daysAfterPrediction(cityName);

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
          daysAfterPrediction(populousCities);

         // openAreaDiv.textContent = '';
         // inputCityName.value would not apply here because it is not inputed into search bar

        }
      };
     
var getCityNameInfo = function (cityName) { // Once the cityName have been made into the search bar it will activate this function
        var APIURL = baseOpenWeatherURL + cityName + keyAPI;
   
    fetch(APIURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {  
        console.log(data);
                userInputTitle.textContent = " " + cityName; // whenever the user searches a city name it will appear to reminder the user on the page
                //displayCities(data.items, cityName);
                console.log("fetch cityName is working");

        var forcastEl = document.createElement('h2');

        if (data.weather[0].main === 'Rain') {
        forcastEl.innerHTML =
          "<i class='rain-icon '></i>" + ' today will have ' + data.weather[0].description;
          console.log(data.weather[0].main);
          openAreaDiv.append(forcastEl);
      } else if (data.weather[0].main === 'Clouds'){
        forcastEl.innerHTML =
          "<i class='cloudy-icon '></i>" + 'today will have' + data.weather[0].description;
          console.log(data.weather[0].main);
          openAreaDiv.append(forcastEl);
      } else if (data.weather[0].main  === 'Clear'){
        forcastEl.innerHTML =
          "<i class='sunshine-icon '></i>" + 'today will have' + data.weather[0].description;
          console.log(data.weather[0].main);
          openAreaDiv.append(forcastEl);
      } else if (data.weather[0].main  === 'Thunderstorms'){
        forcastEl.innerHTML =
          "<i class='thunderstorms-icon '></i>" + 'today will have' + data.weather[0].description;
          console.log(data.weather[0].main);
          openAreaDiv.append(forcastEl);
      }  else if (data.weather[0].main){
        forcastEl.innerHTML =
          "Today is unqiue weather" + data.weather[0].main + 'today will have' + data.weather[0].description;
          console.log(data.weather[0].main);
          openAreaDiv.append(forcastEl);
      } else {
        forcastEl.innerHTML =
          "<i class='error-icon '></i>" + 'error: wheather cannot be found';
          alert("Error: wheather cannot be found ")
          openAreaDiv.append(forcastEl);
      }

      var tempEl = document.createElement('p');
      //tempEl.classList('')
      // may have to create an if statement to have date be the same or display throgh page 1
      tempEl.textContent = data.main.temp;
      openAreaDiv.append(tempEl);
  
      var windSpeedEl = document.createElement('p');
      windSpeedEl.textContent = data.wind.speed;
      openAreaDiv.append(windSpeedEl);
  
      var humidityEl = document.createElement('p');
      humidityEl.textContent = data.main.humidity;
      openAreaDiv.append(humidityEl);

    var latNum = data.coord.lat;

    var lonNum = data.coord.lon;

    console.log(lonNum);
    console.log(latNum);
    daysAfterPrediction(latNum,lonNum);
    daysAfterPrediction(lonNum);

    })
    
      }

var getPopularCities = function (populousCities) { 
    var APIURL = baseOpenWeatherURL + populousCities + keyAPI;

    fetch(APIURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) { 
        userInputTitle.textContent = " " + populousCities; 
        console.log("fetch populousCities is working");
        var forcastEl = document.createElement('h2');

        if (data.weather[0].main === 'Rain') {
        forcastEl.innerHTML =
          "<i class='rain-icon '></i>" + ' today will have ' + data.weather[0].main + "<p>" + data.weather[0].description +"</p>";
          console.log(data.weather[0].main);
          openAreaDiv.append(forcastEl);
      } else if (data.weather[0].main === 'Clouds'){
        forcastEl.innerHTML =
          "<i class='cloudy-icon '></i>" + 'today will have ' + data.weather[0].main + "<p>" + data.weather[0].description +"</p>";
          console.log(data.weather[0].main);
          openAreaDiv.append(forcastEl);
      } else if (data.weather[0].main  === 'Clear'){
        forcastEl.innerHTML =
          "<i class='sunshine-icon '></i>" + 'today will have ' + data.weather[0].main + "<p>" + data.weather[0].description +"</p>";
          console.log(data.weather[0].main);
          openAreaDiv.append(forcastEl);
      } else if (data.weather[0].main  === 'Thunderstorms'){
        forcastEl.innerHTML =
          "<i class='thunderstorms-icon '></i>" + 'today will have ' + data.weather[0].main + "<p>" + data.weather[0].description +"</p>";
          openAreaDiv.append(forcastEl);
      }  else if (data.weather[0].main){
        forcastEl.innerHTML =
          "Today is unqiue weather" + 'today will have ' + data.weather[0].main + "<p>" + data.weather[0].description +"</p>";
          console.log(data.weather[0].main);
          openAreaDiv.append(forcastEl);
      } else {
        forcastEl.innerHTML =
          "<i class='error-icon '></i>" + 'error: wheather cannot be found';
          alert("Error: wheather cannot be found ")
          openAreaDiv.append(forcastEl);
      }

      var tempEl = document.createElement('p');
      //tempEl.classList('')
      // may have to create an if statement to have date be the same or display throgh page 1
      tempEl.textContent = data.main.temp;
      openAreaDiv.append(tempEl);
  
      var windSpeedEl = document.createElement('p');
      windSpeedEl.textContent = data.wind.speed;
      openAreaDiv.append(windSpeedEl);
  
      var humidityEl = document.createElement('p');
      humidityEl.textContent = data.main.humidity;
      openAreaDiv.append(humidityEl);

      var latNum = data.coord.lat;

      var lonNum = data.coord.lon;

      console.log(lonNum);
      console.log(latNum);
      daysAfterPrediction(latNum);
      daysAfterPrediction(lonNum);

    })
    
      }


var displayWeather = function (currentWeek, cityName) {
    if (currentWeek.length === 0) {
        openAreaDiv.textContent = 'Enter a location or city in the search bar' + "<i class=' status-icon icon-'></i>";
      return;
    }
}


var daysAfterPrediction = function (latNum) {
    var fullForecastURL = baseOpenForcastURL + "lat=" + latNum + "&" + "lon=" + lonNum + keyAPI;
fetch(fullForecastURL).then(function (response) {
    if(response.ok){
        console.log(response);
        console.log("response is working");
    } else{
        console.log("error");
    }
    return response.json();
})

.then(function (data) {  
console.log(data);


})

}

for (var i = 0; i < 5; i++){
    
  var weekDay = 0; 
}
/*
for (var i = 0; i < repos.length; i++) {
    // What is the result of this string concatenation?
    // TODO: Write your answer here
    var repoName = repos[i].owner.login + '/' + repos[i].name;

    var repoEl = document.createElement('div');
    repoEl.classList = 'list-item flex-row justify-space-between align-center';

    var titleEl = document.createElement('span');
    titleEl.textContent = repoName;

    repoEl.appendChild(titleEl);

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    repoEl.appendChild(statusEl);

    repoContainerEl.appendChild(repoEl);
  }
};



daysAfterPrediction ();



//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}.

    /*

 for (var i = 1; i < 6; i++) { //This for loop will cycle through the dates after the current date

    var futureDateDiv = document.open-area.createElement('div');

    var weekDate = month + day[i].year + '/' + .year;

    var forcastEl = document.open-area.futureDateDiv.createElement('h2');
    forcastEl = parameter.property[i].forcast;

        if (parameter.property[0].forcast === rain) {
        statusEl.innerHTML =
          "<i class='rain-icon '></i>" + 'today will have' + percentage + 'chance of rain';
      } else if (parameter.property[0].forcast === cloudy){
        statusEl.innerHTML =
          "<i class='cloudy-icon '></i>" + 'today will have' + percentage + 'chance of cloudy';
      } else if (parameter.property[0].forcast === sunshine){
        statusEl.innerHTML =
          "<i class='sunshine-icon '></i>" + 'today will have' + percentage + 'chance of sunshine';
      } else if (parameter.property[0].forcast === thunderstorms){
        statusEl.innerHTML =
          "<i class='thunderstorms-icon '></i>" + 'today will have' + percentage + 'chance of thunderstorms';
      } else {
        statusEl.innerHTML =
          "<i class='error-icon '></i>" + 'error: wheather cannot be found';
      }

    var tempEl = document.open-area.futureDateDiv.createElement('p');
    tempEl = parameter.property[i].temp;

    var windSpeedEl = document.open-area.futureDateDiv.createElement('p');
    windSpeedEl = parameter.property[i].windSpeed;

    var humidityEl = document.open-area.futureDateDiv.createElement('p');
    humidityEl = parameter.property[i].humidity;

                  });
            } else {
              alert('Error: ' + response.statusText + 'date not found');
            }

    }
  };
  */ 
  
  userCitySearch.addEventListener('submit',searchCityWeatherInput);
  populousCities.addEventListener('click',buttonClickHandler);
  



/*

Plan of attack 

Have a search bar that serches city repos 

...

after everything is set up, have a course of 5 days 
each with a display of name, date, weather, weather icon,
 wind speed, tempture, and humitaty 

 For each day will be a box and have the stats inside of them

 for loop for each of the days 
*/ 

