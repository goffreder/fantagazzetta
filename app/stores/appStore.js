const _store = {};

export default {
    getPlayer(playerId) {
        return _store.players.filter(p => p.id === playerId).pop();
    },

    getPlayers() {
        return _store.players;
    },

    getStore() {
        return _store;
    },

    setStore(store) {
        Object.assign(_store, store);
    }
};
