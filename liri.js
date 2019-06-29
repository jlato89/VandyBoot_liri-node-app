require("dotenv").config();
var axios = require("axios");
var moment = require('moment');
var Spotify = require('node-spotify-api');
var fs = require("fs")
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
// var userParm = process.argv.splice(2, process.argv.length - 1); //! needs .trim() ???
var action = process.argv[2];
var value = process.argv[3];

switch(action) {
   case "concert-this":
      console.log('***Command -> Concert This');
      concertThis(value);
      break;

   case "spotify-this-song":
      console.log('***Command -> Spotify This Song');
      spotifyThisSong(value);
      break;

   case "movie-this":
      console.log('***Command -> Movie This');
      movieThis(value);
      break;

   case "do-what-it-says":
      console.log('***Command -> Do What It Says');
      doWhatItSays(value);
      break;
      
   default:
      console.log('***Please try another command***');
      console.log('command used -> '+ action);
}


//*   FUNCTIONS
function concertThis(value) {
   axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
      .then(function (response) {
         var venueName = response.data[0].venue.name
         var location = response.data[0].venue.city+", " + response.data[0].venue.region;
         var date = moment(response.data[0].datetime).format("MM/DD/YYYY");

         console.log("Venue Name: "+venueName);
         console.log("Location: "+location);
         console.log("Next Event: "+date);
      })
      .catch(function (error) {
         if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
         } else if (error.request) {
            console.log(error.request);
         } else {
            console.log("Error", error.message);
         }
         console.log(error.config);
      });
}

function spotifyThisSong(value) {
   if (!value) {
      console.log('***No song entered so we chose one for you');

      spotify
      .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
         .then(function (response) {
            var artists = response.artists[0].name;
            var songName = response.name;
            var prevLink = response.external_urls.spotify;
            var album = response.album.name;

            console.log('Artist(s): ' + artists);
            console.log('Song Name: ' + songName);
            console.log('Song Link: ' + prevLink);
            console.log('Album: ' + album);

         })
         .catch(function (error) {
            if (error.response) {
               console.log(error.response.data);
               console.log(error.response.status);
               console.log(error.response.headers);
            } else if (error.request) {
               console.log(error.request);
            } else {
               console.log("Error", error.message);
            }
            console.log(error.config);
         });
   } else {
   spotify
      .search({ type: 'track', query: value, limit: 1 })
      .then(function (response) {
         var artists = response.tracks.items[0].artists[0].name;
         var songName = response.tracks.items[0].name;
         var prevLink = response.tracks.items[0].external_urls.spotify;
         var album = response.tracks.items[0].album.name;

         console.log('Artist(s): '+artists);
         console.log('Song Name: '+songName);
         console.log('Song Link: '+prevLink);
         console.log('Album: '+album);
         
      })
      .catch(function (error) {
         if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
         } else if (error.request) {
            console.log(error.request);
         } else {
            console.log("Error", error.message);
         }
         console.log(error.config);
      });
   }
}

function movieThis(value) {
   if (!value) { movie = "Mr. Nobody"; }
   else { movie = value; }
   
   var movie;
   var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

   axios.get(queryUrl).then(
      function (response) {
         console.log("Title: " + response.data.Title);
         console.log("Year: " + response.data.Year);
         console.log("IMDB Rating: " + response.data.Ratings[0].Value);
         console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
         console.log("Country Produced: " + response.data.Country);
         console.log("Language: " + response.data.Language);
         console.log("Plot: " + response.data.Plot);
         console.log("Actors: " + response.data.Actors);
      })
      .catch(function (error) {
         if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
         } else if (error.request) {
            console.log(error.request);
         } else {
            console.log("Error", error.message);
         }
         console.log(error.config);
      });
}

function doWhatItSays(value) {
   fs.readFile("random.txt", "utf8", function (error, data) {
      if (error) {
         return console.log(error);
      }

      console.log(data);
      var dataArr = data.split(",");
      console.log(dataArr);

      var action = dataArr[0];
      var value = dataArr[1];

      switch (action) {
         case "concert-this":
            console.log('***Command -> Concert This');
            concertThis(value);
            break;

         case "spotify-this-song":
            console.log('***Command -> Spotify This Song');
            spotifyThisSong(value);
            break;

         case "movie-this":
            console.log('***Command -> Movie This');
            movieThis(value);
            break;

         case "do-what-it-says":
            console.log('***Command -> Do What It Says');
            doWhatItSays(value);
            break;

         default:
            console.log('***Please try another command***');
            console.log('command used -> ' + action);
      }
   });
}