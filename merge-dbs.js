var fs = require('fs');
var jsonfile = require('jsonfile');

var assetsFolder = 'assets';
var teamsSourceName = 'teams.json';
var playersSourceName = 'players.json';
var dbOutputName = 'db.json';

var db = {};

jsonfile.readFile([__dirname, assetsFolder, teamsSourceName].join('/'), function(err, teams) {
    db.teams = teams;
});

jsonfile.readFile([__dirname, assetsFolder, playersSourceName].join('/'), function(err, players) {
    db.players = players;

    fs.writeFile(
        [__dirname, dbOutputName].join('/'),
        JSON.stringify(db),
        function() {
            console.log('db.json file correctly written');
        }
    );
});
