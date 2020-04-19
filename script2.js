$(document).ready(function() {

    $("#searchBtn").on("click", function(){
        event.preventDefault();
        var city = $("#location").val().trim();   
        var genre = $('select').val();
        
        $("#results").removeClass("hidden")
        
        inputQuery(city, genre);


    })

    function getArtistInfo(artistName) {
        console.log("Vinh's input: " + artistName);
        $("#placeHolderArt").empty();
        var queryURL1 = "https://theaudiodb.com/api/v1/json/1/search.php?s=" + artistName;
        var queryURL2 = "https://theaudiodb.com/api/v1/json/1/searchalbum.php?s=" + artistName;

        $.ajax({
            url: queryURL1,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var artist = response.artists[0].strArtist;
            // var bio = response.artists[0].strBiographyEN;
            var artistID = response.artists[0].idArtist;
            var content = $("<h5>").text("Related Albums");
            $("#placeHolderArt").prepend(content);
            var queryURL3 = "https://theaudiodb.com/api/v1/json/1/mvid.php?i=" + artistID;
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
            var albumPrint = 0;
            var index = 0;
            while(albumPrint != 3 && index != response.album.length - 1) {
                var albumThumb = response.album[index].strAlbumThumb;
                if(albumThumb != null) {
                    var thumbContent = $("<img>").attr("src", albumThumb + "/preview");
                    thumbContent.attr("class","albumThumb");
                    $("#placeHolderArt").append(thumbContent);
                    albumPrint++;
                }
                index++;
            }
            if(albumPrint === 0) {
                var content = $("<p>").text("No album art to show");
                $("#placeHolderArt").append(content);
            }
            var albumID = response.album[0].idAlbum;
            var queryURL5 = "https://theaudiodb.com/api/v1/json/1/track.php?m=" + albumID;
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
                var resultsHeader= $("<h4>").attr("class", "results-header")
                resultsHeader.text("Concerts Happening:");
                $(".results").append(resultsHeader)
                $(".results").append($("<hr>"));

                console.log(queryURL);
                console.log(response);


                //display event name on page
                for(var i = 0; i < 10; i++){
                    var createButtons = $("<li>");
                    var createLine = $("<hr>");
                    var getName = response._embedded.events[i].name; //use loop to place in placeholder as clickable links
                    createButtons.addClass("resultsBtn");
                    createButtons.attr({"city": city, "keyword": getName}); //set the keyword to the query to pull specific info
                    createButtons.text(getName);
                    $(".results").append(createButtons,createLine);
                }

                $(document).on("click", ".resultsBtn", function(event) {
                    event.preventDefault();
                    $("#events").removeClass("hidden");
                    $("#placeHolderArt").empty();
                    $("#ticketPrice").empty();
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

                            //display artists name(bug with the for loop stopping single artist album artwork to show)
                            var artist = response._embedded.events[0]._embedded.attractions[0].name;
                            $("#artistName").text("Artist: ");
                            var artistName = response._embedded.events[0]._embedded.attractions[0].name;
                            $("#artistName").append(artistName + " ");
                            console.log(artistName);
                            // }

                            //display venue
                            var venueName = response._embedded.events[0]._embedded.venues[0].name;
                            var venueAddress = response._embedded.events[0]._embedded.venues[0].address.line1;
                            var venueState = response._embedded.events[0]._embedded.venues[0].state.stateCode;
                            var venueCity = response._embedded.events[0]._embedded.venues[0].city.name;
                            var venuePostalCode = response._embedded.events[0]._embedded.venues[0].postalCode;
                            $("#venueInfo").text("Venue: " + venueName + " ("+venueAddress+", "+venueCity+", "+ venueState+" "+ venuePostalCode +")");

                            var eventStatus = response._embedded.events[0].dates.status.code;
                            $("#eventStatus").text("Event Status : " + eventStatus.toUpperCase());

                            var image = response._embedded.events[0]._embedded.attractions[0].images[1].url;
                            $("#eventImage").empty();
                            $("#eventImage").attr("src", image);

                            var minPrice = response._embedded.events[0].priceRanges[0].min;
                            var maxPrice = response._embedded.events[0].priceRanges[0].max;
                            $("#ticketPrice").text("Ticket price : " + "$"+minPrice + " - " + "$"+maxPrice);

                            //display event date
                            var startDate = response._embedded.events[0].dates.start.localDate;
                            var date=new Date(startDate);
                            var localDate = (date.getMonth() + 1) + '-' + (date.getDate()+1) + '-' +  date.getFullYear();
                            var startTime = response._embedded.events[0].dates.start.localTime;
                            startTime = startTime.slice(0, startTime.length -3);
                            $("#eventTime").text("Event Date : " +  localDate + " @" + startTime);
                            
                            getArtistInfo(artist);
                    
            
                        })
            
                })
            
            
            
            })

    }




})

