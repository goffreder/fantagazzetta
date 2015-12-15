import { Button, Table } from 'react-bootstrap';

import CalendarBoxScoreEntry from './CalendarBoxScoreEntry';

import schemes from 'constants/schemes';

import store from 'stores/appStore';

export default class CalendarBoxScore extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: props.editing,
            scheme: null
        };
    }

    static propTypes = {
        teamId: React.PropTypes.number.isRequired,
        scheme: React.PropTypes.oneOf([
            '343',
            '3412',
            '3421',
            '352',
            '442',
            '433',
            '4312',
            '4321',
            '4231',
            '4411',
            '4222'
        ]),
        lineup: React.PropTypes.arrayOf(React.PropTypes.object),
        homeTeam: React.PropTypes.bool,
        editing: React.PropTypes.bool
    }

    handleSchemeSelection = (e) => {
        this.setState({
            scheme: e.target.value
        });
    }

    startEditing = () => {
        this.setState({
            editing: true
        });
    }

    saveLineup = () => {
        this.setState({
            editing: false,
            scheme: null
        });
    }

    render() {
        const styles = {
            borderless: {
                border: 'none'
            },
            button: {
                float: 'right',
                marginBottom: 10
            }
        };

        const schemeOptions = Object.keys(schemes).map(scheme => <option key={scheme} value={scheme}>{scheme}</option>);
        const schemeSelector = (
            <select
                name="schemeSelector"
                defaultValue={this.props.scheme}
                onChange={this.handleSchemeSelection}
            >
                {[<option key="-1" value="-1">-</option>].concat(schemeOptions)}
            </select>
        );

        const schemePositions = schemes[this.state.scheme || this.props.scheme];

        let starters = [];
        let startersTable = null;
        let substitutes = [];
        let substitutesTable = null;
        let totalsTable = null;
        let total = this.props.homeTeam ? 1 : 0;

        if (this.props.lineup) {
            this.props.lineup.forEach((player, i) => {
                const playerId = Object.keys(player).pop();
                const playerPoints = player[playerId];
                const schemePosition = schemePositions[i];

                const playerData = store.getPlayer(Number(playerId));

                const entry = (
                    <CalendarBoxScoreEntry
                        key={i}
                        {...playerData}
                        roles={schemePosition || playerData.roles}
                        points={playerPoints}
                        editing={this.state.editing}
                    />
                );

                schemePosition ? starters.push(entry) : substitutes.push(entry);

                total += playerPoints;
            });

            if (this.state.editing) {
                while (substitutes.length <= 2) {
                    substitutes.push(
                        <CalendarBoxScoreEntry
                            key={starters.length + substitutes.length}
                            teamId={this.props.teamId}
                            editing
                        />
                    );
                }
            }

            startersTable = (
                <Table>
                    <tbody>
                        {starters}
                    </tbody>
                </Table>
            );

            substitutesTable = (
                <Table>
                    <tbody>
                        {substitutes}
                    </tbody>
                </Table>
            );

            totalsTable = this.state.editing
                ? null
                : (
                    <Table style={{ textAlign: 'center' }}>
                        <tbody>
                            <tr><td style={styles.borderless}><strong>Totale:</strong></td><td style={styles.borderless}><strong>{total}</strong></td></tr>
                        </tbody>
                    </Table>
                );
        }

        return (
            <div {...this.props}>
                <h3>
                    {this.state.editing ? schemeSelector : this.props.scheme.split('').join('-')}
                    <Button
                        bsStyle={this.state.editing ? 'success' : 'primary'}
                        style={styles.button}
                        onClick={this.state.editing ? this.saveLineup : this.startEditing}
                    >
                        {this.state.editing ? 'Save Lineup' : 'Edit Lineup'}
                    </Button>
                </h3>
                {startersTable}
                Sostituzioni: {substitutesTable}
                {totalsTable}
            </div>
        );
    }
}
