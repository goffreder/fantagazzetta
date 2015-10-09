import axios from 'axios';

import { Tabs, Tab } from 'react-bootstrap';

import Loader from './common/Loader';

import RostersPage from './rosters/RostersPage';
import PlayersPage from './players/PlayersPage';
import CalendarPage from './calendar/CalendarPage';

import EditMatchModal from './modals/EditMatchModal';

const initialState = {
    players: [],
    calendar: [],
    currentTeam: null,
    loading: true,
    editingMatch: null
};

export default class Main extends React.Component {
    constructor() {
        super();

        this.state = Object.assign({
            activeTab: 1,
            loadedTeams: []
        }, initialState);
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

    handleSelect = (key) => {
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
                axios.get('http://localhost:3000/calendar/')
                    .then(res => {
                        const calendar = res.data.map(day => {
                            const matches = day.matches.map(match => {
                                return {
                                    teamA: this.state.loadedTeams[match.teamA],
                                    teamB: this.state.loadedTeams[match.teamB]
                                };
                            });

                            return Object.assign(day, { matches });
                        });

                        this.setState(Object.assign({}, this.getDefaultState(), {
                            calendar,
                            loading: false
                        }));
                    });
                break;
            default:
                break;
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

    handleEditMatch = (day, match) => {
        this.setState({
            editingMatch: Object.assign({
                day,
                match
            }, this.state.calendar[day - 1].matches[match])
        });
    }

    render() {
        const loader = this.state.loading ? <Loader /> : null;

        const editMatchModal = (
            <EditMatchModal
                show={Boolean(this.state.editingMatch)}
                match={this.state.editingMatch}
            />
        );

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
                        <CalendarPage calendar={this.state.calendar} handleEditMatch={this.handleEditMatch}/>
                    </Tab>
                </Tabs>
                {loader}
                {editMatchModal}
            </div>
        );
    }
}
