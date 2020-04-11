$(document).ready(function() {

    var ticketMasterAPI = "GzXQkPNDt7ZVTo3fbAmXPspPozArApCc";
    var keyword = ""; //search input
    var city = "";
    var genre = "Electronic"
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&city="+city+"&classificationName="+genre+"&keyword="+keyword+"&apikey="+ ticketMasterAPI;
    // var queryURL = "https://app.ticketmaster.com/discovery/v2/classifications/genres/KnvZfZ7vAev?apikey="+ ticketMasterAPI;

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            console.log(response);
        })

})

