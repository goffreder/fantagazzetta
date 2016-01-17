import Griddle from 'griddle-react';

import FixedPointNumber from '../common/griddleComponents/FixedPointNumber';

export default class StandingsTable extends React.Component {
    static propTypes = {
        standings: React.PropTypes.arrayOf(React.PropTypes.shape({
            teamId: React.PropTypes.number.isRequired,
            teamName: React.PropTypes.string.isRequired,
            points: React.PropTypes.number.isRequired,
            games: React.PropTypes.number.isRequired,
            won: React.PropTypes.number.isRequired,
            draw: React.PropTypes.number.isRequired,
            lost: React.PropTypes.number.isRequired,
            goalScored: React.PropTypes.number.isRequired,
            goalAgainst: React.PropTypes.number.isRequired,
            goalDiff: React.PropTypes.number.isRequired,
            totalPoints: React.PropTypes.number.isRequired
        })).isRequired
    };

    render() {
        const columnMeta = [{
            columnName: 'teamName',
            displayName: 'Nome'
        }, {
            columnName: 'points',
            displayName: 'Pts.',
            cssClassName: 'bold single centered'
        }, {
            columnName: 'games',
            displayName: 'G.',
            cssClassName: 'single centered'
        }, {
            columnName: 'won',
            displayName: 'V.',
            cssClassName: 'single centered'
        }, {
            columnName: 'draw',
            displayName: 'N.',
            cssClassName: 'single centered'
        }, {
            columnName: 'lost',
            displayName: 'P.',
            cssClassName: 'single centered'
        }, {
            columnName: 'goalScored',
            displayName: 'GF.',
            cssClassName: 'single centered'
        }, {
            columnName: 'goalAgainst',
            displayName: 'GS.',
            cssClassName: 'single centered'
        }, {
            columnName: 'goalDiff',
            displayName: '+/-',
            cssClassName: 'single centered'
        }, {
            columnName: 'totalPoints',
            displayName: 'Total',
            cssClassName: 'single centered',
            customComponent: FixedPointNumber,
            precision: 1
        }];

        const columns = columnMeta.map(cm => cm.columnName);

        this.props.standings.sort((a, b) => {
            if (a.points !== b.points) {
                return a.points < b.points;
            }

            return a.totalPoints < b.totalPoints;
        });

        return (
            <Griddle
                columns={columns}
                columnMetadata={columnMeta}
                results={this.props.standings}
                resultsPerPage={this.props.standings.length}
                showPager={false}
            />
        );
    }
}
