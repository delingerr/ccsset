var searchInput = document.getElementById("search-input").textContent;

        $("button").on("click", function() {
          event.preventDefault();
          $(".card-body").empty();
          $(".forecast-card").remove();
       
        var apiKey = "1d2ed82a1cbc39f2f966ed54593c81bb"
        var searchInput = document.getElementById("search-input").value;
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+searchInput+"&appid="+apiKey+"";
        
  
          $.ajax({
            url: queryURL,
            method: "GET"
          
          }).then(function(response) {
            
            var cityHistory = [];           
            var cityName = response.name;
            var cityTemp = (response.main.temp - 273.15) * 1.80 + 32;
            var cityHumid = response.main.humidity;
            var cityWind = response.wind.speed;
            var cityIcon = response.weather[0].icon;
            var cityDate = new Date(response.dt * 1000);
            var cardDate = cityDate.toLocaleDateString();
            var cardTitle = $("<h4>").text(cityName + " ("+cardDate+")");
            var cardIconUrl = $("<img>").attr("src", "http://openweathermap.org/img/w/" + cityIcon + ".png");
            var cardTemp = $("<p>").text("Temperature: " + cityTemp.toFixed(2) + " ℉");
            var cardHumid = $("<p>").text("Humidity: " + cityHumid + "%");
            var cardWind = $("<p>").text("Wind Speed: " + cityWind + " MPH");
            var cityHistoryCard = $("<button>").text(cityName).attr("type", "button").addClass("list-group-item list-group-item-action");

            cityHistory.push(cityName);
            
            $(".card-current").append(cardTitle);
            cardTitle.append(cardIconUrl);
            $(".card-current").append(cardTemp);
            $(".card-current").append(cardHumid);
            $(".card-current").append(cardWind);
            $(".list-group").append(cityHistoryCard);

            

            console.log(response)

            // API call to get the UV value and forecast

            var longitude = response.coord.lon;
            var latitude = response.coord.lat;
            var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?appid="+apiKey+"&lat="+latitude+"&lon="+longitude+"";
            
            $.ajax({
            url: queryURL2,
            method: "GET"
          
          }).then(function(response2) {
            
            var cityUv = response2.current.uvi;
            var cardUv = $("<p>").text("UV Index: ");
            var uv = $("<a>").text(cityUv).addClass("uvClass text-white");
            $(".card-current").append(cardUv);
            cardUv.append(uv);

            if(cityUv < 3){
                $(".uvClass").addClass("bg-success");
            } else if (cityUv < 8) {
                $(".uvClass").removeClass("bg-success");
                $(".uvClass").addClass("bg-warning");
            } else {
                $(".uvClass").removeClass("bg-success");
                $(".uvClass").removeClass("bg-warning");
                $(".uvClass").addClass("bg-danger");
            };

            for (var i = 1; i < 6; i++) {
            var forcastTemp = (response2.daily[i].temp.day - 273.15) * 1.80 + 32;;
            var forcastHumid = response2.daily[i].humidity
            var forecastIcon = response2.daily[i].weather[0].icon;
            var forecastDate = new Date(response2.daily[i].dt * 1000);
            var cardDateFor = $("<h5>").text(forecastDate.toLocaleDateString());
            var cardDiv = $("<div>").addClass("card forecast-card");
            var cardBody = $("<div>").addClass("card-body");
            var cardIconUrlFor = $("<img>").attr("src", "http://openweathermap.org/img/w/" + forecastIcon + ".png");
            var cardTempFor = $("<p>").text("Temp: "+forcastTemp.toFixed(2) + " ℉");
            var cardHumidFor = $("<p>").text("Humidity: "+forcastHumid+"%");
            
              
            
            $(".card-deck").append(cardDiv);
            cardBody.append(cardDateFor);
            cardDiv.append(cardBody);
            cardBody.append(cardIconUrlFor);
            cardBody.append(cardTempFor);
            cardBody.append(cardHumidFor);
            }
            console.log(response2)
          
          })



          });

        });