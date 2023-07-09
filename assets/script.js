



    var userFormEl = document.querySelector('#user-form');
    var openAreaDiv = document.querySelector('#open-area');
    var userCitySearch = document.querySelector('#user-city-search');
    var inputCityName = document.querySelector('#city-name');
    // ^^ This is the input by the user on the search bar
    var populousCities = document.querySelector('populous-cities');
    var userInputTitle = document.querySelector('phase-city-user-input-title');

   // "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=1f607030bc029e79a2a927c3fe3fb558";
    var baseOpenWeatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=' 

    var keyAPI = '&appid=1f607030bc029e79a2a927c3fe3fb558'

    
var cityName = 'seattle';

var fullURL = baseOpenWeatherURL + cityName + keyAPI;
    
    function getApi() {
console.log(fetch(fullURL));

fetch(fullURL)
.then(function (response) {
    return response.json();
    if(response.ok){
        console.log("is able to connect");
    } else {
        console.log("not happening");
    }
  })
  .then(function (data) {
    if(response.ok){
        console.log("is able to connect");
    } else {
        console.log("not happening");
    }
    console.log(data)
    console.log(data.weather[0].main);

  });
}

getApi();

/*

var searchCityWeatherInput = function(event){ // this function will be called on first when event happens 
    event.preventDefault();
    var cityName = inputCityName.value.trim();

    //This section is for the search bar for location
    if (cityName){

        getCityNameRepos(cityName); // note to self get 1 = city name, get 2 = suggested popular cities

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
          getPopularCitiesRepos(populousCities); // when click event happens, depending on the city chosen, 
      
          repoContainerEl.textContent = '';
        }
      };
     
      var getCityNameRepos = function (cityNmae) { // Once the cityName have been made into the search bar it will activate this function
        var APIURL = baseOpenWeatherURL + cityName + keyAPI; // the variable will be placed into this URL guiding the user to any repos of the same city 
      
        fetch(APIURL).then(function (response) {
            if (response.ok) {// .ok is a property that is a boolean saying if the information is transferable
              console.log(response);
              console.log(response.cityName);
             return response.json() // .json will parse the data making it legiable for javascript
            
              .then(function (data) {  
                console.log(data);
                displayCities(data, cityName);
          })

          .catch(function (error) {
            alert('Unable to connect to Open Weather API');
          });
      };

    
});

      }


var displayWeather = function (currentWeek, searchTerm) {
    if (currentWeek.length === 0) {
        openAreaDiv.textContent = 'Enter a location or city in the search bar' + "<i class=' status-icon icon-'></i>";
      return;
    }
}

userInputTitle.textContent = searchTerm; // whenever the user searches a city name it will appear to reminder the user on the page


        var cityInfoCurrentEl = document.openAreaDiv.createElement('div'); // creates container for boxes
                                
    cityInfoCurrentEl.classList = 'list-item flex-row justify-space-between align-center';

        var forcastEl = document.cityInfoCurrentEl.createElement('h2');
    forcastEl = weather[0].main;

        if (parameter.property[0].forcast === Rain) {
        statusEl.innerHTML =
          "<i class='rain-icon '></i>" + 'today will have' + weather[0].description;
      } else if (weather[0].main === Clouds){
        statusEl.innerHTML =
          "<i class='cloudy-icon '></i>" + 'today will have' + weather[0].description;
      } else if (weather[0].main  === Sunshine){
        statusEl.innerHTML =
          "<i class='sunshine-icon '></i>" + 'today will have' + weather[0].description;
      } else if (weather[0].main  === thunderstorms){
        statusEl.innerHTML =
          "<i class='thunderstorms-icon '></i>" + 'today will have' + weather[0].description;
      }  else if (weather[0].main){
        statusEl.innerHTML =
          weather[0].main + 'today will have' + weather[0].description;
      } else {
        statusEl.innerHTML =
          "<i class='error-icon '></i>" + 'error: wheather cannot be found';
      }


    var tempEl = document.open-area.cityInfoCurrentEl.createElement('p');
    // may have to create an if statement to have date be the same or display throgh page 1
    tempEl = parameter.property[0].temp;

    var windSpeedEl = document.open-area.cityInfoCurrentEl.createElement('p');
    windSpeedEl = parameter.property[0].windSpeed;

    var humidityEl = document.open-area.cityInfoCurrentEl.createElement('p');
    humidityEl = parameter.property[0].humidity;

    /*

 for (var i = 1; i < 6; i++) { //This for loop will cycle through the dates after the current date

    var afterDay = document.open-area.createElement('div');

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
  */ /*
  
  userCitySearch.addEventListener('submit',searchCityWeatherInput);
  populousCities.addEventListener('click', buttonClickHandler);
  



/*

Plan of attack 

Have a search bar that serches city repos 

...

after everything is set up, have a course of 5 days 
each with a display of name, date, weather, weather icon,
 wind speed, tempture, and humitaty 

 For each day will be a box and have the stats inside of them
*/ 

