import { Modal, Button, Table } from 'react-bootstrap';

import CalendarMatch from '../calendar/CalendarMatch';

export default class EditMatchModal extends React.Component {
    static propTypes = {
        show: React.PropTypes.bool.isRequired,
        match: React.PropTypes.object,
        onSave: React.PropTypes.func,
        onClose: React.PropTypes.func
    }

    static defaultProps = {
        onClose: () => {}
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

    render() {
        const title = this.props.match !== null
            ? `${this.props.match.teamA} - ${this.props.match.teamB}, ${this.props.match.day}a GIORNATA`
            : '';

        const matchTable = this.props.show
            ? <CalendarMatch match={this.props.match} editing />
            : null;

        return (
            <Modal show={this.props.show} onHide={this.props.onClose}>
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
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.props.onClose}>Chiudi</Button>
                    <Button bsStyle="primary" onClick={this.handleEditSave}>Salva</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
