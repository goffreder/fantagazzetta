import { Panel } from 'react-bootstrap';

import RosterTable from './RosterTable';

export default class TeamPanel extends React.Component {
    render() {
        const title = <h3>{this.props.team.name}</h3>;

        return (
            <Panel header={title}>
                <div><b>Crediti residui:</b> {this.props.team.balance}</div>
                <RosterTable players={this.props.team.players} />
            </Panel>
        );
    }
}

TeamPanel.propTypes = {
    team: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        balance: React.PropTypes.number.isRequired,
        players: React.PropTypes.array.isRequired
    }).isRequired
};
