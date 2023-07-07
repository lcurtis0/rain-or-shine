



    var userFormEl = document.querySelector('#user-form');
    var openAreaDiv = document.querySelector('#open-area');
    var userCitySearch = document.querySelector('#user-city-search');
    var inputCityName = document.querySelector('#city-name');
    // ^^ This is the input by the user on the search bar
    var populousCities = document.querySelector('populous-cities');

    //https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}.
    var baseOpenWeatherURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' 
   
   // https://api.github.com/search/repositories?q=' + language + '+is:featured&sort=help-wanted-issues';
    var forcast;
    var lat = 'lat={lat}&';
    var lon = 'lon={lon}&';
    var APIkey = 'appid={API key}.';
    var fullURL = baseOpenWeatherURL + forcast + lat + lon + APIkey;

console.log(fetch('https://api.openweathermap.org/data/2.5/forecast?'));

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
        var APIURL = '' + cityName + '/repos'; // the variable will be placed into this URL guiding the user to any repos of the same city 
      
        fetch(APIURL)
          .then(function (response) {
            if (response.ok) {
              console.log(response);
              response.json() // .json will parse the data making it legiable for javascript
              .then(function (data) {  
                console.log(data);
                displayRepos(data, user);
              });
            } else {
              alert('Error: ' + response.statusText);
            }
          })
          .catch(function (error) {
            alert('Unable to connect to GitHub');
          });
      };

    if 

    fetch(fullURL)
    .then(function (response){
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })

}

var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var username = nameInputEl.value.trim();
  
    if (username) {
      getUserRepos(username);
  
      repoContainerEl.textContent = '';
      nameInputEl.value = '';
    } else {
      alert('Please enter a GitHub username');
    }
  };

/*

Plan of attack 

Have a search bar that serches city repos 

...

after everything is set up, have a course of 5 days 
each with a display of name, date, weather, weather icon,
 wind speed, tempture, and humitaty 

*/