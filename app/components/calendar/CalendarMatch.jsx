import validator from 'validator';

const validateInt = (props, propName, componentName) => {
    if (props[propName] !== undefined && !validator.isInt(props[propName])) {
        return new Error(
            `Invalid prop \`${propName}\` supplied to \`${componentName}\`.` +
            ` \`${props[propName]}\` is not an integer value.`
        );
    }
};

const validateFloat = (props, propName, componentName) => {
    if (props[propName] !== undefined && !validator.isFloat(props[propName])) {
        return new Error(
            `Invalid prop \`${propName}\` supplied to \`${componentName}\`.` +
            ` \`${props[propName]}\` is not a float value.`
        );
    }
};

export default class CalendarMatch extends React.Component {
    static propTypes = {
        match: React.PropTypes.shape({
            teamA: React.PropTypes.string.isRequired,
            teamB: React.PropTypes.string.isRequired,
            scoreA: validateInt,
            scoreB: validateInt,
            pointsA: validateFloat,
            pointsB: validateFloat
        }).isRequired
    }

    render() {
        const match = this.props.match;

        const pointsA = match.pointsA !== undefined && match.pointsB !== undefined
            ? <td>{match.pointsA.toFixed(1)}</td>
            : null;

        const pointsB = match.pointsA !== undefined && match.pointsB !== undefined
            ? <td>{match.pointsB.toFixed(1)}</td>
            : null;

        const scores = match.scoreA !== undefined && match.scoreB !== undefined
            ? <td>{`${match.scoreA}-${match.scoreB}`}</td>
        : null;

        let teamAColSpan = 1;
        let teamBColSpan = 1;

        if (!pointsA) {
            teamAColSpan = 2;
        }

        if (!pointsB) {
            if (!scores) {
                teamBColSpan = 3;
            } else {
                teamBColSpan = 2;
            }
        } else {
            if (!scores) {
                teamBColSpan = 2;
            }
        }

        return (
            <tr>
                <td colSpan={teamAColSpan}>{match.teamA}</td>
                {pointsA}
                <td>-</td>
                {pointsB}
                <td colSpan={teamBColSpan}>{match.teamB}</td>
                {scores}
            </tr>
        );
    }
}
