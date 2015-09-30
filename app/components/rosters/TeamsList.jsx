import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class TeamsList extends React.Component {
    constructor() {
        super();
    }

    handleItemClick(key) {
        this.props.handleItemClick(key);
    }

    render() {
        const items = this.props.teams.map((team, key) => {
            return (
                <ListGroupItem
                    key={key}
                    onClick={this.handleItemClick.bind(this, key)}
                >
                    {team}
                </ListGroupItem>
            );
        });

        return (
            <ListGroup>
                {items}
            </ListGroup>
        );
    }
}

TeamsList.propTypes = {
    teams: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    handleItemClick: React.PropTypes.func
};
