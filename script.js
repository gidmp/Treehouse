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

        
        console.log(city);
        console.log(genre);
        
        inputQuery(city, genre);
    })

    function inputQuery (city, genre){
        var ticketMasterAPI = "GzXQkPNDt7ZVTo3fbAmXPspPozArApCc";
        var keyword = ""; //search input
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&city="+city+"&classificationName="+genre+"&keyword="+keyword+"&apikey="+ ticketMasterAPI;
    

        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                console.log(queryURL);
                console.log(response);
                
    
                
            })


    }



})
