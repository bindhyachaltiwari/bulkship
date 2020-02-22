
const initialState = {
    items: [],
    apiData: [],
};
export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD': {
            return Object.assign({}, state, {
                items: state.items.concat(action.payload)
            });
        }
        case 'DATA-LOADED': {
            return Object.assign({}, state, {
                apiData: state.apiData.concat(action.finalData)
            });
        }
        default:
            return state
    }

}
