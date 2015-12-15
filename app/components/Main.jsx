import axios from 'axios';

import { Tabs, Tab } from 'react-bootstrap';

import Loader from './common/Loader';

import RostersPage from './rosters/RostersPage';
import PlayersPage from './players/PlayersPage';
import CalendarPage from './calendar/CalendarPage';
import StandingsPage from './standings/StandingsPage';

import EditMatchModal from './modals/EditMatchModal';

import appStore from 'stores/appStore';

const initialState = {
    players: [],
    calendar: [],
    standings: [],
    currentTeam: null,
    loading: true,
    editingMatch: null
};

class Main extends React.Component {
    constructor() {
        super();

        this.state = Object.assign({
            activeTab: 'teams',
            loadedTeams: []
        }, initialState);
    }

    componentWillMount() {
        this.loadTeams();
    }

    getDefaultState() {
        return initialState;
    }

    handleEditMatch = (day, match) => {
        this.setState({
            editingMatch: Object.assign({
                day,
                match
            }, this.state.calendar[day - 1].matches[match])
        });
    }

    handleSaveEditMatch = (matchData) => {
        const matchDay = this.state.calendar[this.state.editingMatch.day - 1];
        const match = matchDay.matches[this.state.editingMatch.match];

        Object.assign(match, matchData);

        this.setState({
            editingMatch: null
        });

        axios.put('http://localhost:3000/calendar/' + this.state.editingMatch.day, {
            day: matchDay.day,
            matches: matchDay.matches.map(m => {
                return {
                    teamA: this.state.loadedTeams.indexOf(m.teamA),
                    teamB: this.state.loadedTeams.indexOf(m.teamB),
                    scoreA: m.scoreA,
                    scoreB: m.scoreB,
                    pointsA: m.pointsA,
                    pointsB: m.pointsB
                };
            })
        });
    }

    handleSelect = (key) => {
        this.setState(Object.assign({}, this.getDefaultState(), {
            activeTab: key
        }));

        switch (key) {
            case 'teams':
                this.loadTeams();
                break;
            case 'players':
                this.loadPlayers();
                break;
            case 'schedule':
                this.loadCalendar();
                break;
            case 'standings':
                this.loadStandings();
                break;
            default:
                break;
        }
    }

    loadCalendar = () => {
        let calendar = appStore.getCalendar();

        if (calendar) {
            this.setState(Object.assign({}, this.getDefaultState(), {
                calendar,
                loading: false
            }));
        } else {
            axios.get('http://localhost:3000/calendar/')
                .then(res => {
                    calendar = res.data.map(day => {
                        const matches = day.matches.map(match => {
                            match.teamA = this.state.loadedTeams[match.teamA];
                            match.teamB = this.state.loadedTeams[match.teamB];

                            return match;
                        });

                        return Object.assign(day, { matches });
                    });

                    appStore.setStore({ calendar });

                    this.setState(Object.assign({}, this.getDefaultState(), {
                        calendar,
                        loading: false
                    }));
                });
        }
    }

    loadPlayers = () => {
        let players = appStore.getPlayers();

        if (players) {
            this.setState(Object.assign({}, this.getDefaultState(), {
                players,
                loading: false
            }));
        } else {
            axios.get('http://localhost:3000/players/?_expand=team')
                .then(res => {
                    players = res.data.map(player => {
                        player.team = player.team.name;

                        return player;
                    });

                    appStore.setStore({ players });

                    this.setState(Object.assign({}, this.getDefaultState(), {
                        players,
                        loading: false
                    }));
                });
        }
    }

    loadStandings = () => {
        let standings = appStore.getStandings();

        console.log(standings);

        if (standings) {
            this.setState(Object.assign({}, this.getDefaultState(), {
                standings,
                loading: false
            }));
        } else {
            axios.get('http://localhost:3000/standings')
                .then(res => {
                    standings = res.data;

                    appStore.setStore({ standings });

                    this.setState(Object.assign({}, this.getDefaultState(), {
                        standings,
                        loading: false
                    }));
                });
        }
    }

    loadTeam = (key) => {
        this.setState({
            loading: true
        });

        axios.get('http://localhost:3000/teams/' + key + '/?_embed=players')
            .then(res => {
                this.setState({
                    currentTeam: res.data,
                    loading: false
                });
            });
    }

    loadTeams = () => {
        axios.get('http://localhost:3000/teams')
            .then(res => {
                this.setState(Object.assign({}, this.getDefaultState(), {
                    loadedTeams: res.data.map(team => team.name),
                    loading: false
                }));
            });
    }

    reloadStandings = () => {
        this.state.standings = [];

        this.state.loadedTeams.forEach((team, id) => {
            this.state.standings.push({
                teamId: id,
                teamName: team,
                points: 0,
                games: 0,
                won: 0,
                draw: 0,
                lost: 0,
                goalScored: 0,
                goalAgainst: 0,
                goalDiff: 0,
                totalPoints: 0
            });
        });

        this.setState({
            loading: true
        });

        axios.get('http://localhost:3000/calendar/')
            .then(res => {
                res.data.map(day => {
                    day.matches.forEach(match => {
                        const stA = this.state.standings[match.teamA];
                        const stB = this.state.standings[match.teamB];

                        if (match.scoreA !== undefined && match.scoreB !== undefined) {
                            if (match.scoreA === match.scoreB) {
                                stA.draw++;
                                stB.draw++;
                            } else {
                                if (match.scoreA > match.scoreB) {
                                    stA.won++;
                                    stB.lost++;
                                } else {
                                    stA.lost++;
                                    stB.won++;
                                }
                            }

                            stA.goalScored += parseInt(match.scoreA, 10);
                            stB.goalScored += parseInt(match.scoreB, 10);

                            stA.goalAgainst += parseInt(match.scoreB, 10);
                            stB.goalAgainst += parseInt(match.scoreA, 10);

                            stA.totalPoints += parseFloat(match.pointsA);
                            stB.totalPoints += parseFloat(match.pointsB);

                            stA.games = stA.won + stA.draw + stA.lost;
                            stB.games = stB.won + stB.draw + stB.lost;

                            stA.goalDiff = stA.goalScored - stA.goalAgainst;
                            stB.goalDiff = stB.goalScored - stB.goalAgainst;

                            stA.points = stA.won * 3 + stA.draw;
                            stB.points = stB.won * 3 + stB.draw;
                        }
                    });
                });

                this.state.standings.forEach((st, id) => {
                    axios.put('http://localhost:3000/standings/' + id, st);
                });

                this.setState({
                    loading: false
                });
            });
    }

    render() {
        const loader = this.state.loading ? <Loader /> : null;

        const editMatchModal = (
            <EditMatchModal
                show={Boolean(this.state.editingMatch)}
                match={this.state.editingMatch}
                onSave={this.handleSaveEditMatch}
                onClose={() => {
                    this.setState({
                        editingMatch: null
                    });
                }}
            />
        );

        return (
            <div>
                <Tabs animation={false} activeKey={this.state.activeTab} onSelect={this.handleSelect}>
                    <Tab eventKey="teams" title="Rose">
                        <RostersPage
                            currentTeam={this.state.currentTeam || null}
                            teamsList={this.state.loadedTeams}
                            handleSelectTeam={this.loadTeam}
                        />
                    </Tab>
                    <Tab eventKey="players" title="Giocatori">
                        <PlayersPage players={this.state.players} />
                    </Tab>
                    <Tab eventKey="schedule" title="Calendario">
                        <CalendarPage calendar={this.state.calendar} handleEditMatch={this.handleEditMatch}/>
                    </Tab>
                    <Tab eventKey="standings" title="Classifica">
                        <StandingsPage standings={this.state.standings} handleReloadClick={this.reloadStandings}/>
                    </Tab>
                </Tabs>
                {loader}
                {editMatchModal}
            </div>
        );
    }
}

export default Main;
