# LIRI-Bot

A little Node application that takes specific commands and returns information from Twitter, Spotify, and OMDB. Make your own `.env` to run this program effectively.

## Instructions

Use the following commands to run LIRI-Bot:

* `node liri.js my-tweets` which returns the last twenty tweets of a dummy Twitter account.
* `node liri.js spotify-this-song EXAMPLE` which, provided you replace EXAMPLE with a valid song title, returns a Spotify track with information on the artist, album, etc.
* `node liri.js movie-this EXAMPLE` which, provided you replace EXAMPLE with a valid movie title, returns information from OMDB about that movie (release date, rating, plot, etc).
* `node liri.js do-what-it-says` which runs whatever command is written in the `random.txt` file.
