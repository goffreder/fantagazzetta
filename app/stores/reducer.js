import { fromJS } from 'immutable';

const initialState = fromJS({
    activeTab: 1,
    loading: true
});

export default function(state = initialState, action) {
    switch (action.type) {
        default:
            break;
    }

    return state;
}
