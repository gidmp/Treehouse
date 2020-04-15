var artistName = "ludacris";
var queryURL1 = "http://theaudiodb.com/api/v1/json/1/search.php?s=" + artistName;
var queryURL2 = "http://theaudiodb.com/api/v1/json/1/searchalbum.php?s=" + artistName;

$.ajax({
    url: queryURL1,
    method: "GET"
}).then(function(response) {
    console.log(response);
    var artist = response.artists[0].strArtist;
    var bio = response.artists[0].strBiographyEN;
});

$.ajax({
    url: queryURL2,
    method: "GET"
}).then(function(response) {
    console.log(response);
    var albumID = response.album[0].idAlbum;
    var queryURL3 = "http://theaudiodb.com/api/v1/json/1/track.php?m=" + albumID;
    $.ajax({
        url: queryURL3,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });
    
});

