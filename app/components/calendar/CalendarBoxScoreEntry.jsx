import { Input } from 'react-bootstrap';

import RoleBox from 'common/RoleBox';

import appStore from 'stores/appStore';

export default class CalendarBoxScoreEntry extends React.Component {
    constructor() {
        super();
    }

    static propTypes = {
        roles: React.PropTypes.any,
        id: React.PropTypes.number,
        teamId: React.PropTypes.number,
        name: React.PropTypes.string,
        realTeam: React.PropTypes.string,
        points: React.PropTypes.number,
        editing: React.PropTypes.bool
    }

    getRolesBox = (roles) => {
        let box = null;

        switch (true) {
            case typeof roles === 'string':
                box = <RoleBox>{roles}</RoleBox>;
                break;
            case roles === undefined:
                box = null;
                break;
            default:
                box = roles.map(p => <RoleBox key={p}>{p}</RoleBox>);
                break;
        }

        return box;
    }

    render() {
        const styles = {
            td: {
                height: 51,
                verticalAlign: 'middle'
            },
            input: {
                width: 50,
                display: 'inline-block',
                textAlign: 'center'
            }
        };

        if (this.props.editing) {
            const teamPlayers = [
                <option key="-1" value="-1">-</option>
            ].concat(appStore.getTeamPlayers(this.props.teamId).map(p => <option key={p.id} value={p.id}>{`${p.name} (${p.realTeam})`}</option>));

            const playerSelector = <select name="playerSelector" defaultValue={this.props.id}>{teamPlayers}</select>;

            return (
                <tr className="rolebox-entry">
                    <td style={Object.assign({
                        width: '20%'
                    }, styles.td)}>{this.getRolesBox(this.props.roles)}</td>
                <td style={styles.td}>{playerSelector}</td>
                    <td style={Object.assign({
                        width: '10%',
                        textAlign: 'center'
                    }, styles.td)}>
                        <Input type="text" style={styles.input} defaultValue={this.props.points} name="points" ref={this.props.id} />
                    </td>
                </tr>
            );
        }

        return (
            <tr>
                <td style={Object.assign({
                    width: '20%'
                }, styles.td)}>{this.getRolesBox(this.props.roles)}</td>
                <td style={styles.td}>{`${this.props.name} (${this.props.realTeam})`}</td>
                <td style={Object.assign({
                    width: '10%',
                    textAlign: 'center'
                }, styles.td)}>{this.props.points || '-'}</td>
            </tr>
        );
    }
}
