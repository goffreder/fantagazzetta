import axios from 'axios';

import { Tabs, Tab } from 'react-bootstrap';

import Loader from './common/Loader';

import RostersPage from './rosters/RostersPage';
import PlayersPage from './players/PlayersPage';
import CalendarPage from './calendar/CalendarPage';

const initialState = {
    loadedTeams: [],
    players: [],
    calendar: [],
    currentTeam: null,
    loading: true
};

export default class Main extends React.Component {
    constructor() {
        super();

        this.state = Object.assign({
            activeTab: 1
        }, initialState);

        this.handleSelect = this.handleSelect.bind(this);
        this.loadTeam = this.loadTeam.bind(this);
    }

    componentWillMount() {
        axios.get('http://localhost:3000/teams')
            .then(res => {
                this.setState({
                    loadedTeams: res.data.map(team => team.name),
                    loading: false
                });
            });
    }

    getDefaultState() {
        return initialState;
    }

    handleSelect(key) {
        this.setState(Object.assign({}, this.getDefaultState(), {
            activeTab: key
        }));

        switch (key) {
            case 1:
                axios.get('http://localhost:3000/teams')
                    .then(res => {
                        this.setState(Object.assign({}, this.getDefaultState(), {
                            loadedTeams: res.data.map(team => team.name),
                            loading: false
                        }));
                    });
                break;
            case 2:
                axios.get('http://localhost:3000/players/?_expand=team')
                    .then(res => {
                        this.setState(Object.assign({}, this.getDefaultState(), {
                            players: res.data.map(player => {
                                player.team = player.team.name;

                                return player;
                            }),
                            loading: false
                        }));
                    });
                break;
            case 3:
                const matches = [{
                    teamA: 'Caracass',
                    teamB: 'Massi',
                    scoreA: 2,
                    scoreB: 0,
                    pointsA: 72,
                    pointsB: 61
                }, {
                    teamA: 'Baralcellona',
                    teamB: 'Blucerchiata',
                    // scoreA: 1,
                    scoreB: 2,
                    pointsA: 68.5,
                    pointsB: 71.5
                }, {
                    teamA: 'Support Team',
                    teamB: 'Cisti Gangleare United',
                    scoreA: 0,
                    scoreB: 1,
                    // pointsA: 61.5,
                    pointsB: 69.5
                }, {
                    teamA: 'Venu Juniors',
                    teamB: 'Ouascicheghesemmu',
                    scoreA: 2,
                    // scoreB: 1,
                    // pointsA: 74,
                    pointsB: 68
                }];

                this.setState({
                    calendar: [{
                        day: 1,
                        realDay: 7,
                        matches
                    }, {
                        day: 2,
                        realDay: 8,
                        matches
                    }],
                    loading: false
                });
                break;
            default:
                break;
        }
    }

    loadTeam(key) {
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

    render() {
        const loader = this.state.loading ? <Loader /> : null;

        return (
            <div>
                <Tabs animation={false} activeKey={this.state.activeTab} onSelect={this.handleSelect}>
                    <Tab eventKey={1} title="Rose">
                        <RostersPage
                            currentTeam={this.state.currentTeam || null}
                            teamsList={this.state.loadedTeams}
                            handleSelectTeam={this.loadTeam}
                        />
                    </Tab>
                    <Tab eventKey={2} title="Giocatori">
                        <PlayersPage players={this.state.players} />
                    </Tab>
                    <Tab eventKey={3} title="Calendario">
                        <CalendarPage calendar={this.state.calendar} />
                    </Tab>
                </Tabs>
                {loader}
            </div>
        );
    }
}
