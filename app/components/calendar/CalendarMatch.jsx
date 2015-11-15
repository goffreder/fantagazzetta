import validator from 'validator';

import { Button, Glyphicon, Input } from 'react-bootstrap';

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
        }).isRequired,
        editing: React.PropTypes.bool,
        handleEditMatch: React.PropTypes.func
    }

    componentDidMount() {
        if (this.refs.pointsA) {
            this.refs.pointsA.getInputDOMNode().focus();
        }
    }

    render() {
        const style = {
            width: 75
        };

        const match = this.props.match;

        let pointsA = null;
        let pointsB = null;
        let scores = null;

        if (this.props.editing) {
            pointsA = (
                <td><Input style={style} type="text" name="pointsA" ref="pointsA" defaultValue={match.pointsA} /></td>
            );
            pointsB = (
                <td><Input style={style} type="text" name="pointsB" ref="pointsB" defaultValue={match.pointsB} /></td>
            );

            scores = (
                <td>
                    <Input style={style} type="text" name="scoreA" ref="scoreA" defaultValue={match.scoreA} />
                    -
                    <Input style={style} type="text" name="scoreB" ref="pscoreBointsA" defaultValue={match.scoreB} />
                </td>
            );
        } else {
            pointsA = match.pointsA !== undefined && match.pointsB !== undefined
                ? <td>{match.pointsA.toFixed(1)}</td>
                : null;

            pointsB = match.pointsA !== undefined && match.pointsB !== undefined
                ? <td>{match.pointsB.toFixed(1)}</td>
                : null;

            scores = pointsA && pointsB && match.scoreA !== undefined && match.scoreB !== undefined
                ? <td>{`${match.scoreA}-${match.scoreB}`}</td>
            : null;
        }

        const editMatch = this.props.handleEditMatch
            ? (
                <td><Button onClick={this.props.handleEditMatch}><Glyphicon glyph="pencil" /></Button></td>
            )
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
                {editMatch}
            </tr>
        );
    }
}
