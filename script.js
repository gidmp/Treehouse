$(document).ready(function() {


    $("#searchBtn").on("click", function(){
        event.preventDefault();
        var city = $("#location").val().trim();   
        var genre = $('select').val();
        
        inputQuery(city, genre);


    })

    function inputQuery (city, genre) {
        var ticketMasterAPI = "GzXQkPNDt7ZVTo3fbAmXPspPozArApCc";
        var page = 0; //page number, starts from 0
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&city="+city+"&classificationName="+genre+"&size=10&page="+page+"&apikey="+ ticketMasterAPI;

        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                //empty out previous query after each search event button press
                $(".results").empty();

                console.log(response);

                var resultsHeader= $("<h4>").attr("class", "results-header")
                resultsHeader.text("Events Happening:");
                $(".results").append(resultsHeader)
                $(".results").append($("<hr>"));
                
                //display event name on page
                for(var i = 0; i < 10; i++){
                    var createButtons = $("<li>");
                    var createLine = $("<hr>");
                    var getName = response._embedded.events[i].name //use loop to place in placeholder as clickeable links
                    createButtons.addClass("resultsBtn");
                    createButtons.attr({"city": city, "keyword": getName}); //set the keyword to the query to pull specific info
                    createButtons.text(getName);
                    $(".results").append(createButtons,createLine);

                }


                $(document).on("click", ".resultsBtn", function(event) {
                    event.preventDefault();
                    var keyword = $(this).attr("keyword");
                    var city = $(this).attr("city");
                    var eventQueryURL = "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&city="+city+"&keyword="+keyword+"&apikey="+ ticketMasterAPI;
            
                    $.ajax({
                        url: eventQueryURL,
                        method: "GET"
                        }).then(function(response) {
                            console.log(response);
                            var getTitle = response._embedded.events[0].name
                            $("#eventName").text(getTitle);

                            var artist = response._embedded.events[0]._embedded.attractions[0].name;
                            $("#artistName").text("Artist: " + artist).attr("artist-name", artist);

                            var venueName = response._embedded.events[0]._embedded.venues[0].name;
                            var venueAddress = response._embedded.events[0]._embedded.venues[0].address.line1;
                            var venueState = response._embedded.events[0]._embedded.venues[0].state.stateCode;
                            var venueCity = response._embedded.events[0]._embedded.venues[0].city.name;
                            var venuePostalCode = response._embedded.events[0]._embedded.venues[0].postalCode;
                            $("#venueInfo").text("Venue: " + venueName + " ("+venueAddress+", "+venueCity+", "+ venueState+" "+ venuePostalCode +")");

                            var eventStatus = response._embedded.events[0].dates.status.code;
                            $("#eventStatus").text("Event Status : " + eventStatus.toUpperCase());

                            var image = response._embedded.events[0]._embedded.attractions[0].images[4].url;
                            $("#eventImage").attr("src", image);

                            var ticketLink = response._embedded.events[0]._embedded.attractions[0].url;
                            $("#ticketLink").attr("href", ticketLink);

                            // var ticketLink = response._embedded.events[0]._embedded.attractions[0].url;
                            // var minPrice = response._embedded.events[0].priceRanges[0].min;
                            // var maxPrice = response._embedded.events[0].priceRanges[0].max;
                            // var startDate = response._embedded.events[0].dates.start.localDate;
                            // var startTime = response._embedded.events[0].dates.start.localTime;

                    
            
                        })
            
                })
            
            
            
            })

    }

})

