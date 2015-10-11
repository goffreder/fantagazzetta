var fs = require('fs');
var jsonfile = require('jsonfile');

var assetsFolder = 'assets';
var teamsSourceName = 'teams.json';
var playersSourceName = 'players.json';
var calendarSourceName = 'calendar.json';
var standingsSourceName = 'standings.json';
var dbOutputName = 'db.json';

var db = {};

jsonfile.readFile([__dirname, assetsFolder, calendarSourceName].join('/'), function(err, calendar) {
    console.log('read calendar');
    db.calendar = calendar;

    jsonfile.readFile([__dirname, assetsFolder, teamsSourceName].join('/'), function(err, teams) {
        console.log('read teams');
        db.teams = teams;

        jsonfile.readFile([__dirname, assetsFolder, standingsSourceName].join('/'), function(err, standings) {
            console.log('read standings');
            db.standings = standings;

            jsonfile.readFile([__dirname, assetsFolder, playersSourceName].join('/'), function(err, players) {
                console.log('read players');
                db.players = players;

                fs.writeFile(
                    [__dirname, dbOutputName].join('/'),
                    JSON.stringify(db),
                    function() {
                        console.log('db.json file correctly written');
                    }
                );
            });
        });
    });
});
