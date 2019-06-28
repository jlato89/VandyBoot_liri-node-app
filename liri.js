require("dotenv").config();
var axios = require("axios");
var moment = require('moment');
// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
// var userParm = process.argv.splice(2, process.argv.length - 1); //! needs .trim() ???
var action = process.argv[2];
var value = process.argv[3];

switch(action) {
   case "concert-this":
      console.log('Command -> Concert This');
      concertThis(value);
      break;

   case "spotify-this-song":
      console.log('Command -> Spotify This Song');
      spotifyThisSong(value);
      break;

   case "movie-this":
      console.log('Command -> Movie This');
      movieThis(value);
      break;

   case "do-what-it-says":
      console.log('Command -> Do What It Says');
      doWhatItSays(value);
      break;
      
   default:
      console.log('*Please try another command*');
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

}

function movieThis(value) {

}

function doWhatItSays(value) {

}