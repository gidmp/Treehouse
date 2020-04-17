$(document).ready(function() {

    $("#searchBtn").on("click", function(){
        event.preventDefault();
        var city = $("#location").val().trim();   
        var genre = $('select').val();
        
        inputQuery(city, genre);


    })

    function getArtistInfo(artistName) {
        console.log("Vinh's input: " + artistName);
        var queryURL1 = "http://theaudiodb.com/api/v1/json/1/search.php?s=" + artistName;
        var queryURL2 = "http://theaudiodb.com/api/v1/json/1/searchalbum.php?s=" + artistName;

        $.ajax({
            url: queryURL1,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var artist = response.artists[0].strArtist;
            // var bio = response.artists[0].strBiographyEN;
            var artistID = response.artists[0].idArtist;
            var content = $("<p>").text(artist);
            $("#placeHolderArt").append(content);
            var queryURL3 = "http://theaudiodb.com/api/v1/json/1/mvid.php?i=" + artistID;
            $.ajax({
                url: queryURL3,
                method: "GET"
            }).then(function(response) {
                console.log(response);
            });
        });

        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            for(var i = 0; i < response.album.length; i++) {
                console.log(response.album[i].strAlbum);
            }
            var albumThumb = response.album[0].strAlbumThumb + "/preview";
            var thumbContent = $("<img>").attr("src", albumThumb);
            $("#placeHolderArt").append(thumbContent);
            var albumID = response.album[0].idAlbum;
            var queryURL5 = "http://theaudiodb.com/api/v1/json/1/track.php?m=" + albumID;
            $.ajax({
                url: queryURL5,
                method: "GET"
            }).then(function(response) {
                console.log(response);
            });
        });
    }


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

                console.log(queryURL);
                console.log(response);
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
                    console.log(keyword);
                    var eventQueryURL = "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&city="+city+"&keyword="+keyword+"&apikey="+ ticketMasterAPI;
            
                    $.ajax({
                        url: eventQueryURL,
                        method: "GET"
                        }).then(function(response) {
                            console.log(response);
                            var getTitle = response._embedded.events[0].name
                            $("#eventName").text(getTitle);

                            var artist = response._embedded.events[0]._embedded.attractions[0].name;
                            $("#artistName").text("Artist: " + artist);

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
                            
                            getArtistInfo(artist);
                    
            
                        })
            
                })
            
            
            
            })

    }




})

