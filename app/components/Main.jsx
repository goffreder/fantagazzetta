import axios from 'axios';

import { Tabs, Tab } from 'react-bootstrap';

import RostersPage from './rosters/RostersPage';
import PlayersPage from './players/PlayersPage';

export default class Main extends React.Component {
    constructor() {
        super();

        this.state = {
            activeTab: 1,
            loadedTeams: [],
            players: [],
            currentTeam: null
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.loadTeam = this.loadTeam.bind(this);
    }

    componentWillMount() {
        axios.get('http://localhost:3000/teams')
            .then(res => {
                this.setState({
                    loadedTeams: res.data.map(team => team.name)
                });
            });
    }

    getDefaultState() {
        return {
            activeTab: 1,
            currentTeam: null,
            players: []
        };
    }

    handleSelect(key) {
        switch (key) {
            case 1:
                this.setState(Object.assign({}, this.getDefaultState(), {
                    activeTab: key
                }));
                break;
            case 2:
                axios.get('http://localhost:3000/players/?_expand=team')
                    .then(res => {
                        this.setState(Object.assign({}, this.getDefaultState(), {
                            activeTab: key,
                            players: res.data.map(player => {
                                player.team = player.team.name;

                                return player;
                            })
                        }));
                    });
                break;
            default:
                break;
        }

        this.setState({
            activeTab: key
        });
    }

    loadTeam(key) {
        axios.get('http://localhost:3000/teams/' + key + '/?_embed=players')
            .then(res => {
                this.setState({
                    currentTeam: res.data
                });
            });
    }

    render() {
        return (
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
            </Tabs>
        );
    }
}
