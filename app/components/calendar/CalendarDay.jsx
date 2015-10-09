import { Panel, Table } from 'react-bootstrap';

import CalendarMatch from './CalendarMatch';

export default class CalendarDay extends React.Component {
    static propTypes = {
        day: React.PropTypes.number.isRequired,
        realDay: React.PropTypes.number,
        matches: React.PropTypes.array.isRequired
    }

    render() {
        const title = (
            <h3>
                {`${this.props.day}a GIORNATA`}
                {this.props.realDay ? ` - ${this.props.realDay}a Serie A` : ''}
            </h3>
        );

        const dayMatches = this.props.matches.map((match, key) => <CalendarMatch key={key} match={match} />);

        const style = {
            width: '50%',
            minWidth: 400,
            margin: 'auto',
            marginBottom: 10
        };

        return (
            <Panel header={title} style={style}>
                <Table striped bordered condensed hover>
                    <tbody>
                        {dayMatches}
                    </tbody>
                </Table>
            </Panel>
        );
    }
}
