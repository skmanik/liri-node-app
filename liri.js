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

// builds twitter query
var twitParams = {
    screen_name: "smnthnnn",
    count: 20
}

// user argument
var userCommand = process.argv[2];

// ===========================
// ========= ACTIONS =========
// ===========================

if (userCommand) {

    if (userCommand === "my-tweets") {
        console.log("Ok hombre we'll get your tweets for you.");
    }

}


client.get("statuses/user_timeline", twitParams, function(error, tweets, response) {

    if (!error) {

        console.log("BEEP BOOP. YOU REQUESTED THE LAST 20 TWEETS BY " + twitParams.screen_name + "... \n")

        for (var i = 0; i < tweets.length; i++) {

            var realIndex = tweets.length - i;
            console.log("Tweet #" + realIndex + ", created on " + tweets[i].created_at + ": \n" + tweets[i].text + "\n");

        }

        console.log("BEEP BOOP. END OF TWEETS BY " + twitParams.screen_name + ".");

    } else {

        console.log("Error! " + error);

    }

 });

