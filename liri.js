require("dotenv").config();


var keys = request("./keys"),
    sportify = require("node-spotify-api"),
    request = require("request"),
    fs = require("fs");


var command = process.argv[2],
    searchItem = process.argv[3];

doCommand(command, searchItem)

function doCommand(command, searchItem) {

    switch (command) {
        case 'my-tweets':

            console.log('getting tweets')

            break;

        case 'spotify-this-song':

            console.log('searching spotify')

            spotifySong(searchItem)

            break;

        case 'movie-this':

            console.log('searching movies')

            movieThis(searchItem)

            break;

        case 'read-file':

            console.log('reading file')

            readTheFile();

            break;


    }
}

function spotifySong(searchItem) {

    var spotify = new Spotify(key.sportify)
    var query = searchItem ? searchItem : 'Collide',
        trackNum = searchItem ? 0 : 5

    spotify.search({
        type: 'track',
        query: query
    }, function (err, data) {

        if (err) {

            return console.log(' error: ' + err);
        }

        var track = data.track.items[trackNum]
        var album = track.album.name;
        var artist = track.artists[0].name;
        var ext_url = track.external_urls.spotify;
        var song = track.name;

        console.log(artist + '\n' + song + '\n' + ext_url + '\n' + album);

    });
}

function movieThis(searchItem) {

    var movie = searchItem ? searchItem : "Castle%20In%20The%20Sky"
    var endpoint = 'https://www.omdbapi.com/?apikey=trilogy&t=' + movie

    console.log(endpoint);

    request.get(endpoint, function (err, res, body) {

        if (err) {

            return console.log(err)

        }

        body = JSON.parse(body) //convert string to JSON

        console.log(
            '* ' + body.Title + '\n' +

            '* ' + body.Year + '\n' +

            '* IMDB rating: ' + body.Ratings[0].Value + '\n' +

            '* Rotten Tomatoes rating: ' + body.Ratings[1].Value + '\n' +

            '* ' + body.Country + '\n' +

            '* ' + body.Language + '\n' +

            '* ' + body.Plot + '\n' +

            '* ' + body.Actors + '\n')
    })
}

function readTheFile () {
    fs.readFile('random.txt', 'utf-8', function(error, data){

        if (error) {
            return console.log(error);
        }
    
        var dataArr = data.split(',')
        var comm = dataArr[0]
        var search = dataArr[1]

        doCommand(comm, search)
    })
}