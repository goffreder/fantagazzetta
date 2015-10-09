import CalendarDay from './CalendarDay';

export default class CalendarPage extends React.Component {
    static propTypes = {
        calendar: React.PropTypes.arrayOf(React.PropTypes.shape({
            day: React.PropTypes.number.isRequired,
            realDay: React.PropTypes.number,
            matches: React.PropTypes.array.isRequired
        })).isRequired
    }

    render() {
        const days = this.props.calendar.map((dayData, key) => {
            return (
                <CalendarDay
                    key={key}
                    day={dayData.day}
                    realDay={dayData.realDay}
                    matches={dayData.matches}
                />
            );
        });

        return days.length
            ? <div>{days}</div>
            : <div>Calendar is not available</div>;
    }
}
