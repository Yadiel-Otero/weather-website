let weather = {
    apiKey: "dfc8066219e5d4f42ddefefae2b9d416",

    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city 
            + "&units=imperial&appid=" 
            + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },

    displayWeather: function(data){
        //Destructuring expression ES6
        const {name} = data;
        //Weather is an array contaning one object
        const {icon, description} = data.weather[0];
        let {temp, humidity} = data.main;
        const {speed} = data.wind;
        temp = Math.trunc(temp);
        console.log(name, icon, description, temp, humidity, speed)

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" 
        + icon 
        + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "F°";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/h";
        
    },

    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

//Because the script runs at the beginning BEFORE the button was CREATED
//It wont let me add an event listener so i'll need to add "defer" to the script
//so it runs at the end

//Search weather on SEARCH button click
document
.querySelector(".search button")
.addEventListener("click", function (){
    weather.search();
});

//Search weather on ENTER keypress
document
.querySelector(".search-bar")
.addEventListener("keydown", function(event){
    if (event.key == "Enter"){
        weather.search();
    }
})