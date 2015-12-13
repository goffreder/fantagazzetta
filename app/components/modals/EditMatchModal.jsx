import { Modal, Button, Table } from 'react-bootstrap';

import CalendarMatch from '../calendar/CalendarMatch';
import CalendarBoxScore from '../calendar/CalendarBoxScore';

import appStore from 'stores/appStore';

class EditMatchModal extends React.Component {
    constructor() {
        super();

        this.state = {
            showLineups: false
        };
    }

    static propTypes = {
        show: React.PropTypes.bool.isRequired,
        match: React.PropTypes.object,
        onSave: React.PropTypes.func,
        onClose: React.PropTypes.func
    }

    static defaultProps = {
        onClose: () => {}
    }

    handleClose = () => {
        this.setState({
            showLineups: false
        });

        this.props.onClose();
    }

    handleEditSave = () => {
        const elems = this.refs.matchForm.elements;

        const matchData = {};

        if (elems.pointsA.value !== '') {
            matchData.pointsA = parseFloat(elems.pointsA.value);
        }

        if (elems.pointsB.value !== '') {
            matchData.pointsB = parseFloat(elems.pointsB.value);
        }

        if (elems.scoreA.value !== '') {
            matchData.scoreA = parseInt(elems.scoreA.value, 10);
        }

        if (elems.scoreB.value !== '') {
            matchData.scoreB = parseInt(elems.scoreB.value, 10);
        }

        this.props.onSave(matchData);
    }

    getShowLineupsButton = () => {
        if (!appStore.getPlayers()) {
            return null;
        }

        if (!this.props.match) {
            return null;
        }

        if (!this.props.match.boxScoreA || !this.props.match.boxScoreB) {
            return null;
        }

        return (
            <Button onClick={() => this.setState({ showLineups: !this.state.showLineups })}>
                {this.state.showLineups ? 'Hide Lineups' : 'Show Lineups'}
            </Button>
        );
    }

    getBoxScores = () => {
        let boxScoreA = null;
        let boxScoreB = null;
        let boxScores = null;

        const boxScoreStyle = {
            // width: '50%'
        };

        if (this.state.showLineups) {
            const schemeA = Object.keys(this.props.match.boxScoreA).pop();
            const lineupA = this.props.match.boxScoreA[schemeA];

            boxScoreA = <CalendarBoxScore style={boxScoreStyle} scheme={schemeA} lineup={lineupA} homeTeam />;

            const schemeB = Object.keys(this.props.match.boxScoreB).pop();
            const lineupB = this.props.match.boxScoreB[schemeB];

            boxScoreB = <CalendarBoxScore style={boxScoreStyle} scheme={schemeB} lineup={lineupB} />;

            boxScores = (
                <div>
                    {boxScoreA}
                    {boxScoreB}
                </div>
            );
        }

        return boxScores;
    }

    render() {
        const title = this.props.match !== null
            ? `${this.props.match.teamA} - ${this.props.match.teamB}, ${this.props.match.day}a GIORNATA`
            : '';

        const matchTable = this.props.show
            ? <CalendarMatch match={this.props.match} editing />
            : null;

        const showLineupsButton = this.getShowLineupsButton();
        const boxScores = this.state.showLineups ? this.getBoxScores() : null;

        return (
            <Modal show={this.props.show} onHide={this.handleClose}>
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form className="form-inline" ref="matchForm">
                        <Table striped bordered condensed hover>
                            <tbody>
                                    {matchTable}
                            </tbody>
                        </Table>
                    </form>
                    {showLineupsButton}
                    {boxScores}
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.handleClose}>Chiudi</Button>
                    <Button bsStyle="primary" onClick={this.handleEditSave}>Salva</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default EditMatchModal;
