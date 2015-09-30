import PlayersTable from './PlayersTable';

export default class PlayersPage extends React.Component {
    render() {
        return (
            <PlayersTable players={this.props.players} />
        );
    }
}

PlayersPage.propTypes = {
    players: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};
