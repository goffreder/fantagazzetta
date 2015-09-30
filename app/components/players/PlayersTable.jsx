import Griddle from 'griddle-react';

import RolesList from '../common/RolesList';

export default class PlayersTable extends React.Component {
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
        }, {
            columnName: 'team',
            displayName: 'FantaTeam'
        }];

        const columns = [
            'name',
            'roles',
            'realTeam',
            'price',
            'team'
        ];

        return this.props.players.length > 0
            ? (
                <Griddle
                    columns={columns}
                    columnMetadata={columnMeta}
                    results={this.props.players}
                    resultsPerPage={20}
                    showFilter
                    filterPlaceholderText="Filtra giocatori"
                />
            )
            : <div>Sto caricando la lista dei giocatori....</div>;
    }
}

PlayersTable.propTypes = {
    players: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};
