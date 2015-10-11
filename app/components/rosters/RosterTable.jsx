import '../../styles/griddleStyle.css';

import Griddle from 'griddle-react';

import RolesList from '../common/RolesList';

export default class RosterTable extends React.Component {
    render() {
        const columnMeta = [{
            columnName: 'name',
            displayName: 'Nome'
        }, {
            columnName: 'roles',
            displayName: 'Ruoli',
            customComponent: RolesList
        }, {
            columnName: 'realTeam',
            displayName: 'Squadra'
        }, {
            columnName: 'price',
            displayName: 'Prezzo'
        }];

        const columns = [
            'name',
            'roles',
            'realTeam',
            'price'
        ];

        return (
            <Griddle
                columns={columns}
                columnMetadata={columnMeta}
                results={this.props.players}
                resultsPerPage={this.props.players.length}
                showFilter
                filterPlaceholderText="Filtra giocatori"
                showPager={false}
            />
        );
    }
}

RosterTable.propTypes = {
    players: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        roles: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        realTeam: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired
    })).isRequired
};
