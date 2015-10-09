import { Modal, Button } from 'react-bootstrap';

export default class EditMatchModal extends React.Component {
    static propTypes = {
        show: React.PropTypes.bool.isRequired,
        match: React.PropTypes.object
    }

    render() {
        const title = this.props.match !== null
            ? `${this.props.match.teamA} - ${this.props.match.teamB}, ${this.props.match.day}a GIORNATA`
            : '';

        return (
            <Modal show={this.props.show} onHide={() => {}}>
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    One fine body...
                </Modal.Body>

                <Modal.Footer>
                    <Button>Close</Button>
                    <Button bsStyle="primary">Save changes</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
