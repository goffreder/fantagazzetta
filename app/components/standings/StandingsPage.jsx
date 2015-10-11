import StandingsTable from './StandingsTable';

import { Button } from 'react-bootstrap';

export default class StandingsPage extends React.Component {
    static propTypes = {
        standings: React.PropTypes.array.isRequired,
        handleReloadClick: React.PropTypes.func
    }

    render() {
        if (this.props.standings.length === 0) {
            return <div>No data to display</div>;
        }

        const tableStyle = {
            width: '60%',
            margin: 'auto',
            marginTop: 20,
            marginBottom: 20
        };

        const buttonStyle = {
            margin: 10
        };

        const reloadButton = this.props.handleReloadClick
            ? (
                <Button
                    bsStyle="primary"
                    bsSize="large"
                    style={buttonStyle}
                    onClick={this.props.handleReloadClick}
                >
                    Ricalcola classifica
                </Button>
            )
            : null;

        return (
            <div style={tableStyle}>
                <StandingsTable standings={this.props.standings} />
                {reloadButton}
            </div>
        );
    }
}
