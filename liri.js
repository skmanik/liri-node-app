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
var userCommand2 = process.argv.slice(3).join(" ");

// stores colors because we're awesome
var cyan = "\x1b[36m%s\x1b[0m";
var yellow = "\x1b[33m%s\x1b[0m";

// ===============================
// ========= MAIN ACTION =========
// ===============================

// initializes Liri
runLiri(userCommand1, userCommand2);

// main liri function
function runLiri(userCommand1, userCommand2) {

    // if first argument exists, run this
    if (userCommand1) {

        // when first argument is twitter search
        if (userCommand1 === "my-tweets") {

            console.log(cyan, "\nBEEP BOOP. YOU REQUESTED THE LAST 20 TWEETS BY " + twitParams.screen_name + "...\n");

            renderTweets();

            // when first argument is spotify search
        } else if (userCommand1 === "spotify-this-song") {

            if (!userCommand2) {

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

            // when first argument is movie search
        } else if (userCommand1 === "movie-this") {

            if (!userCommand2) {

                console.log(cyan, "\nBEEP BOOP. YOU DIDN'T REQUEST A MOVIE, BUT LIRI SEARCHED SOMETHING ANYWAY...\n");

                searchOMDB(movieParams);

            } else {

                console.log(cyan, "\nBEEP BOOP. YOU REQUESTED A MOVIE...\n");

                var movieParamsNew = userCommand2;
                searchOMDB(movieParamsNew);

            }
            // when first argument is 'do what it says'
        } else if (userCommand1 === "do-what-it-says") {

            fs.readFile("random.txt", "utf8", function (error, data) {

                if (error) {

                    console.log("Error! " + error);

                }

                var dataArr = data.split(" ");
                var newCommand1 = dataArr[0];
                var newCommand2 = dataArr.slice(1).join(" ");

                if (newCommand1 === "do-what-it-says") {

                    console.log(cyan, "\n*FURION VOICE* How DARE you!\n");
                    return;

                }
                
                // runs program again
                runLiri(newCommand1, newCommand2);

            });

        }

        // if first argument doesn't exist, run default info about LIRI
    } else {

        console.log(cyan, "\nWELCOME TO LIRIBOT.\nLIRIBOT TALKS TO TWITTER AND SPOTIFY SO YOU DON'T HAVE TO.\nSEE THE README FOR A LIST OF COMMANDS.\n");

    }

}

// ==========================
// ==== LESSER FUNCTIONS ====
// ==========================

// tweet function
function renderTweets() {

    client.get("statuses/user_timeline", twitParams, function (error, tweets, response) {

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

// spotify function
function searchSpotify(spotParams) {

    spotify.search(spotParams)
        .then(function (response) {

            console.log("\x1b[33mARTIST(S):\x1b[0m " + response.tracks.items[0].artists[0].name);
            console.log("\x1b[33mTITLE:\x1b[0m " + response.tracks.items[0].name);
            console.log("\x1b[33mALBUM:\x1b[0m " + response.tracks.items[0].album.name);

            if (response.tracks.items[0].preview_url != null) {

                console.log("\x1b[33mPREVIEW:\x1b[0m " + response.tracks.items[0].preview_url + "\n");

            } else {

                console.log(yellow, "Sorry, no 30 second preview available for this track.\n");

            }

            console.log(cyan, "BEEP BOOP. END OF SONG REQUEST.\n");

        })
        .catch(function (err) {

            console.log(cyan, "Error! " + err);

        });

}

// movie function
function searchOMDB(movieParams) {

    var queryUrl = "http://www.omdbapi.com/?t=" + movieParams + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            var movieInfo = JSON.parse(body);

            console.log("\x1b[33mTITLE:\x1b[0m " + movieInfo.Title);
            console.log("\x1b[33mRELEASE DATE:\x1b[0m " + movieInfo.Released);
            console.log("\x1b[33mIMDB RATING:\x1b[0m " + movieInfo.imdbRating);
            console.log("\x1b[33mROTTEN TOMATOES:\x1b[0m " + movieInfo.Ratings[1].Value);
            console.log("\x1b[33mCOUNTRY:\x1b[0m " + movieInfo.Country);
            console.log("\x1b[33mLANGUAGE:\x1b[0m " + movieInfo.Language);
            console.log("\x1b[33mPLOT:\x1b[0m " + movieInfo.Plot);
            console.log("\x1b[33mACTORS:\x1b[0m " + movieInfo.Actors);

            console.log(cyan, "\nBEEP BOOP. END OF MOVIE REQUEST.\n");

        } else {

            console.log(cyan, "Error! " + error);

        }

    });

}
