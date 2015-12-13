import { Table } from 'react-bootstrap';

import RoleBox from 'common/RoleBox';

import schemes from 'constants/schemes';

import store from 'stores/appStore';

export default class CalendarBoxScore extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false
        };
    }

    static propTypes = {
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
        homeTeam: React.PropTypes.bool
    }

    handleSchemeSelection = (e) => {
        console.log(e.target.value);
    }

    getPositionBox = (position) => {
        let box = null;

        switch (true) {
            case typeof position === 'string':
                box = <RoleBox>{position}</RoleBox>;
                break;
            case position === undefined:
                box = null;
                break;
            default:
                box = position.map(p => <RoleBox key={p}>{p}</RoleBox>);
                break;
        }

        return box;
    }

    render() {
        const styles = {
            borderless: {
                border: 'none'
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

        const schemePositions = schemes[this.props.scheme];

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

                if (schemePosition === undefined) {
                    substitutes.push((
                        <tr key={i}>
                            <td>{this.getPositionBox(playerData.roles)}</td>
                            <td>{`${playerData.name} (${playerData.realTeam})`}</td>
                            <td>{playerPoints}</td>
                        </tr>
                    ));
                } else {
                    starters.push((
                        <tr key={i}>
                            <td>{this.getPositionBox(schemePosition)}</td>
                            <td>{`${playerData.name} (${playerData.realTeam})`}</td>
                            <td>{playerPoints || '-'}</td>
                        </tr>
                    ));
                }

                total += playerPoints;
            });

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

            totalsTable = (
                <Table style={{ textAlign: 'center' }}>
                    <tbody>
                        <tr><td style={styles.borderless}><strong>Totale:</strong></td><td style={styles.borderless}><strong>{total}</strong></td></tr>
                    </tbody>
                </Table>
            );
        }

        return (
            <div {...this.props}>
                <h3>{this.state.editing ? schemeSelector : this.props.scheme.split('').join('-')}</h3>
                {startersTable}
                Sostituzioni: {substitutesTable}
                {totalsTable}
            </div>
        );
    }
}
