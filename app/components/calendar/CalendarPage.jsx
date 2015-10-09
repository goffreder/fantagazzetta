import CalendarDay from './CalendarDay';

export default class CalendarPage extends React.Component {
    static propTypes = {
        calendar: React.PropTypes.arrayOf(React.PropTypes.shape({
            day: React.PropTypes.number.isRequired,
            realDay: React.PropTypes.number,
            matches: React.PropTypes.array.isRequired
        })).isRequired,
        handleEditMatch: React.PropTypes.func
    }

    render() {
        const days = this.props.calendar.map((dayData, key) => {
            return (
                <CalendarDay
                    key={key}
                    day={dayData.day}
                    realDay={dayData.realDay}
                    matches={dayData.matches}
                    handleEditMatch={match => {
                        this.props.handleEditMatch(dayData.day, match);
                    }}
                />
            );
        });

        const style = {
            marginTop: 20,
            textAlign: 'center'
        };

        return days.length
            ? <div style={style}>{days}</div>
            : <div style={style}>Calendar is not available</div>;
    }
}
