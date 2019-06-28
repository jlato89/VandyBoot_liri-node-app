require("dotenv").config();
// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
// var userParm = process.argv.splice(2, process.argv.length - 1); //! needs .trim() ???
var action = process.argv[2];
var value = process.argv[3];

switch(action) {
   case "concert-this":
      console.log('Command -> Concert This');
      concertThis();
      break;

   case "spotify-this-song":
      console.log('Command -> Spotify This Song');
      spotifyThisSong();
      break;

   case "movie-this":
      console.log('Command -> Movie This');
      movieThis();
      break;

   case "do-what-it-says":
      console.log('Command -> Do What It Says');
      doWhatItSays();
      break;
      
   default:
      console.log('*Please try another command*');
      console.log('command used -> '+ action);
}


//*   FUNCTIONS
function concertThis() {

}

function spotifyThisSong() {

}

function movieThis() {

}

function doWhatItSays() {

}