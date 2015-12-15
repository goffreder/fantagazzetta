const _store = {};

export default {
    getPlayer(playerId) {
        return _store.players.filter(p => p.id === playerId).pop();
    },

    getPlayers() {
        return _store.players;
    },

    getTeamPlayers(teamId) {
        return _store.players.filter(p => p.teamId === teamId);
    },

    getCalendar() {
        return _store.calendar;
    },

    getStandings() {
        return _store.standings;
    },

    getStore() {
        return _store;
    },

    setStore(store) {
        Object.assign(_store, store);
    }
};
