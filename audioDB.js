$(document).ready(function() {

    function getArtistInfo() {
        var artistName = $(this).attr("artist-name");
        console.log("Vinh's input: " + artistName);
        var queryURL1 = "http://theaudiodb.com/api/v1/json/1/search.php?s=" + artistName;
        var queryURL2 = "http://theaudiodb.com/api/v1/json/1/searchalbum.php?s=" + artistName;

        $.ajax({
            url: queryURL1,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var artist = response.artists[0].strArtist;
            var bio = response.artists[0].strBiographyEN;
            var artistID = response.artists[0].idArtist;
            var musicBrainzArtist = response.artists[0].strMusicBrainzID;
            var content = $("<p>").text(artist);
            var biography = $("<p>").text(bio);
            $("#placeHolderArt").append(content, biography);
            var queryURL3 = "http://theaudiodb.com/api/v1/json/1/mvid.php?i=" + artistID;
            $.ajax({
                url: queryURL3,
                method: "GET"
            }).then(function(response) {
                console.log(response);
            });
            var queryURL4 = "http://theaudiodb.com/api/v1/json/1/mvid-mb.php?i=" + musicBrainzArtist;
            $.ajax({
                url: queryURL4,
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

    $(document).on("click", ".resultsBtn", function(event){
        event.preventDefault();
        console.log("Clicked! Vinh");
        console.log($("#artistName").attr("artist-name"));
        getArtistInfo();
    });

});

