import { Grid, Row, Col } from 'react-bootstrap';
import TeamsList from './TeamsList';
import TeamPanel from './TeamPanel';

export default class RostersPage extends React.Component {
    render() {
        return (
            <Grid fluid>
                <Row className="show-grid">
                    <Col md={3}>
                        <TeamsList
                            teams={this.props.teamsList}
                            handleItemClick={this.props.handleSelectTeam}
                        />
                    </Col>
                    <Col md={9}>
                        {
                            this.props.currentTeam
                                ? <TeamPanel team={this.props.currentTeam} />
                                : 'Seleziona una squadra dalla lista a sinistra'
                        }
                    </Col>
                </Row>
            </Grid>
        );
    }
}

RostersPage.propTypes = {
    currentTeam: React.PropTypes.object,
    teamsList: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    handleSelectTeam: React.PropTypes.func
};
