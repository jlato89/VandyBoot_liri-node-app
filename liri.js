require("dotenv").config();
var axios = require("axios");
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
   var artist = value;
   console.log('value is '+artist);

   axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
      function (response) {
         console.log(response);
         // console.log(response.venue.city+", "+response.venue.region);
      })
      .catch(function (error) {
         if (error.response) {
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
         } else if (error.request) {console.log(error.request);
         } else {console.log("Error", error.message);}
         console.log(error.config);
      });

}

function spotifyThisSong(value) {

}

function movieThis(value) {

}

function doWhatItSays(value) {

}