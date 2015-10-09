var fs = require('fs');
var line = require('line-by-line');
var capitalize = require('underscore.string/capitalize');

var assetsFolder = 'assets';
var teamsSourceName = 'TutteLeRose.csv';
var teamsOutputName = 'teams.json';
var playersOutputName = 'players.json';
var calendarSourceName = 'Calendario.csv';
var calendarOutputName = 'calendar.json';

var teams = [];
var players = [];
var currentTeam = {};
var calendar = [];

var lr = new line([__dirname, assetsFolder, teamsSourceName].join('/'));

lr.on('line', function(line) {
    var chunks = line.split(',');
    var team = {};
    var player = {};

    switch (true) {
        case chunks[0].match(/Crediti/) !== null:
            currentTeam.balance = parseInt(chunks[0].split(':')[1]);
            currentTeam.id = teams.length;
            teams.push(JSON.parse(JSON.stringify(currentTeam)));
            break;
        case chunks[1] === '':
            currentTeam.name = chunks[0];
            currentTeam.players = [];
            break;
        default:
            players.push({
                id: players.length,
                name: chunks[1].split(' ').map(function(chunk) {
                    return capitalize(chunk, true);
                }).join(' '),
                roles: chunks[0].split(';'),
                teamId: teams.length,
                realTeam: chunks[2],
                price: parseInt(chunks[3])
            });
            currentTeam.players.push(players.length - 1);
            break;
    }
});

lr.on('end', function() {
    fs.writeFile(
        [__dirname, assetsFolder, teamsOutputName].join('/'),
        JSON.stringify(teams),
        function() {
            console.log(teamsOutputName + ' file correctly written');
        }
    );
    fs.writeFile(
        [__dirname, assetsFolder, playersOutputName].join('/'),
        JSON.stringify(players),
        function() {
            console.log(playersOutputName + ' file correctly written');
        }
    );

    loadCalendar(teams);
});

function loadCalendar(teams) {
    var calendar = [];
    var g1, g2;

    var lr = new line([__dirname, assetsFolder, calendarSourceName].join('/'));

    lr.on('line', function(line) {
        var chunks = line.split(',');

        switch(true) {
            case chunks[0].indexOf('Giornata') === 0:
                g1 = chunks[0].split(' ')[1];
                g2 = chunks[6].split(' ')[1];

                calendar[g1-1] = { id: +g1, day: +g1, matches: [] };
                calendar[g2-1] = { id: +g2, day: +g2, matches: [] };
                break;
            default:
                calendar[g1-1].matches.push({
                    teamA: teams.filter(function(team) { return team.name === chunks[0]; }).pop().id,
                    teamB: teams.filter(function(team) { return team.name === chunks[3]; }).pop().id
                });
                calendar[g2-1].matches.push({
                    teamA: teams.filter(function(team) { return team.name === chunks[6]; }).pop().id,
                    teamB: teams.filter(function(team) { return team.name === chunks[9]; }).pop().id
                });
                break;
        }
    });

    lr.on('end', function() {
        fs.writeFile(
            [__dirname, assetsFolder, calendarOutputName].join('/'),
            JSON.stringify(calendar),
            function() {
                console.log(calendarOutputName + ' file correctly written');
            }
        );
    });
};
