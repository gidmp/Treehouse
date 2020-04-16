$(document).ready(function() {



    $("#searchBtn").on("click", function(){
        //when the submit button is clicked
        //when the genre is picked, it will added class selected, add the 
        //value of the selected class to the query and 
        //when the input form have the name of the city,take it's value
        //and insert it to the query
        event.preventDefault();
        var city = $("#location").val().trim();   
        var genre = $('select').val();
        
        inputQuery(city, genre);


    })

    function inputQuery (city, genre){
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
            
                        })
            
                })
            
            
            
            })

    }

    //when event name clicked, display the event info on the side bar
    // $(document).on("click", ".resultsBtn", function(event) {
    //     event.preventDefault();
    //     var ticketMasterAPI = "GzXQkPNDt7ZVTo3fbAmXPspPozArApCc";
    //     var keyword = $(this).attr("keyword");
    //     var city = $(this).attr("city");
    //     console.log(keyword);
    //     var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&city="+city+"&keyword="+keyword+"&apikey="+ ticketMasterAPI;

    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //         }).then(function(response) {
    //             console.log(response);

    //         })

    // })



})

