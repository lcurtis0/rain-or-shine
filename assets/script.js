



    var userFormEl = document.querySelector('#user-form');
    var openAreaDiv = document.querySelector('#open-area');
    var userCitySearch = document.querySelector('#user-city-search');
    var inputCityName = document.querySelector('#city-name');
    // ^^ This is the input by the user on the search bar
    var populousCities = document.querySelector('populous-cities');

   // "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=1f607030bc029e79a2a927c3fe3fb558";
    var baseOpenWeatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=' 

    var keyAPI = '&appid=1f607030bc029e79a2a927c3fe3fb558'

    var fullURL = baseOpenWeatherURL + cityName + keyAPI;

    var cityName = 'Austin';
    
    function getApi() {
console.log(fetch(fullURL));

fetch(fullURL)
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)
  });
}

getApi();
/*
var searchCityWeatherInput = function(event){ // this function will be called on first when event happens 
    event.preventDefault();
    var cityName = inputCityName.value;

    //This section is for the search bar for location
    if (cityName){

        get 1 Repos(cityName); // note to self get 1 = city name, get 2 = suggested popular cities

        openAreaDiv.textContent = '';
        inputCityName.value = '';

    } else {
        alert("Invalid: The user must enter a valid location");
    }

    // This ection is for the well known city locations i.e. Denvier or New York
    var buttonClickHandler = function (event) {
        var populousCities = event.target.getAttribute('popular-cities'); // popular cities  is the attribute to each button in the HTML doc
      
        if (populousCities) { 
          get 2 Repos(populousCities); // when click event happens, depending on the city chosen, 
      
          repoContainerEl.textContent = '';
        }
      };
     
      
      var get 1 Repos = function (cityNmae) { // Once the cityName have been made into the search bar it will activate this function
        var APIURL = baseOpenWeatherURL + cityName + '/repos'; // the variable will be placed into this URL guiding the user to any repos of the same city 
      
        fetch(APIURL)
          .then(function (response) {
            if (response.cityName) {// .ok is a property that is a boolean saying if the information is transferable
              console.log(response);
              console.log(response.cityName);
              response.json() // .json will parse the data making it legiable for javascript
              .then(function (data) {  
                console.log(data);
                displayCities(data, cityName);



          })
          .catch(function (error) {
            alert('Unable to connect to GitHub');
          });
      };

    
}

var displayRepos = function (currentWeek, searchTerm) {
    if (currentWeek.length === 0) {
        openAreaDiv.textContent = '<h4>Enter a location or city in the search bar</h4>' + "<i class=' status-icon icon-'></i>";
      return;
    }

    repoSearchTerm.textContent = searchTerm;

        var cityInfoCurrentEl = document.open-area.createElement('div');
                                
    cityInfoCurrentEl.classList = 'list-item flex-row justify-space-between align-center box';

    var tempEl = document.open-area.cityInfoCurrentEl.createElement('p');
    // may have to create an if statement to have date be the same or display throgh page 1
    tempEl = parameter.property[0].temp;

    var windSpeedEl = document.open-area.cityInfoCurrentEl.createElement('p');
    windSpeedEl = parameter.property[0].temp;

    var humidityEl = document.open-area.cityInfoCurrentEl.createElement('p');
    humidityEl = parameter.property[0].humidity;


 for (var i = 1; i < 6; i++) { //This for loop will cycle through the dates after the current date

    var afterDay = document.open-area.createElement('div');

              });
            } else {
              alert('Error: ' + response.statusText);
            }


  for (var i = 0; i < 6; i++) {
    var repoName = repos[i].owner.login + '/' + repos[i].name;

    var repoEl = document.createElement('a');
    repoEl.classList = 'list-item flex-row justify-space-between align-center';
    repoEl.setAttribute('href', './single-repo.html?repo=' + repoName);

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
  
  userFormEl.addEventListener('submit', formSubmitHandler);
  languageButtonsEl.addEventListener('click', buttonClickHandler);
  

*/

/*

Plan of attack 

Have a search bar that serches city repos 

...

after everything is set up, have a course of 5 days 
each with a display of name, date, weather, weather icon,
 wind speed, tempture, and humitaty 

 For each day will be a box and have the stats inside of them

*/

