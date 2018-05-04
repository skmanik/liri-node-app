// ==========================
// ==== GLOBAL VARIABLES ====
// ==========================

// requires files and packages
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");
var fs = require("fs");

// creates instances for Spotify and Twitter
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// builds default twitter query
var twitParams = {
    screen_name: "smnthnnn",
    count: 20
}

// builds default spotify query
var spotParams = {
    type: "track",
    query: "Ace of Base The Sign",
    limit: 1
}

// builds default OMDB query
var movieParams = "Mr. Nobody";

// stores user arguments
var userCommand1 = process.argv[2];
var userCommand2 = process.argv.slice(3);

// allows colors because we're awesome
var cyan = "\x1b[36m%s\x1b[0m";
var yellow = "\x1b[33m%s\x1b[0m";

// ===========================
// ========= ACTIONS =========
// ===========================

if (userCommand1) {

    if (userCommand1 === "my-tweets") {

        console.log(cyan, "\nBEEP BOOP. YOU REQUESTED THE LAST 20 TWEETS BY " + twitParams.screen_name + "...\n");

        renderTweets();

    } else if (userCommand1 === "spotify-this-song") {

        if (process.argv.length < 4) {

            console.log(cyan, "\nBEEP BOOP. YOU DIDN'T REQUEST A SONG, BUT LIRI SEARCHED SOMETHING ANYWAY...\n");

            searchSpotify(spotParams);

        } else {

            console.log(cyan, "\nBEEP BOOP. YOU REQUESTED A SONG...\n");

            var spotParamsNew = {
                type: "track",
                query: userCommand2,
                limit: 1

            }

            searchSpotify(spotParamsNew);

        }

    } else if (userCommand1 === "movie-this") {

        console.log(cyan, "\nBEEP BOOP. YOU REQUESTED A MOVIE...\n");

        searchOMDB(movieParams);

    }

} else {

    console.log(cyan, "\nWELCOME TO LIRIBOT.\nLIRIBOT TALKS TO TWITTER AND SPOTIFY SO YOU DON'T HAVE TO.\nSEE THE README FOR A LIST OF COMMANDS.\n");

}

// ==========================
// ==== GLOBAL FUNCTIONS ====
// ==========================

function renderTweets() {

    client.get("statuses/user_timeline", twitParams, function(error, tweets, response) {

        if (!error) {

            for (var i = 0; i < tweets.length; i++) {

                var realIndex = tweets.length - i;
                console.log(yellow, "Tweet #" + realIndex + ", created on " + tweets[i].created_at + ":");
                console.log(tweets[i].text + "\n");

            }

            console.log(cyan, "BEEP BOOP. END OF TWEETS BY " + twitParams.screen_name + ".\n");

        } else {

            console.log(cyan, "Error! " + error);

        }

    });

}

function searchSpotify(spotParams) {

    spotify.search(spotParams)
        .then(function(response) {

            console.log("ARTIST(S): " + response.tracks.items[0].artists[0].name);
            console.log("TITLE: " + response.tracks.items[0].name);
            console.log("ALBUM: " + response.tracks.items[0].album.name);

            if (response.tracks.items[0].preview_url != null) {

                console.log("PREVIEW: " + response.tracks.items[0].preview_url + "\n");

            } else {

                console.log(yellow, "Sorry, no 30 second preview available for this track.\n");

            }

            console.log(cyan, "BEEP BOOP. END OF SONG REQUEST.\n");

        })
        .catch(function(err) {

            console.log(cyan, "Error! " + err);

        });

}

function searchOMDB(movieParams) {

    var queryUrl = "http://www.omdbapi.com/?t=" + movieParams + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body) {

        if (!error && response.statusCode === 200) {

            console.log(JSON.parse(body));

            console.log(cyan, "\nBEEP BOOP. END OF MOVIE REQUEST.\n");

        } else {

            console.log(cyan, "Error! " + error);

        }

    });

}