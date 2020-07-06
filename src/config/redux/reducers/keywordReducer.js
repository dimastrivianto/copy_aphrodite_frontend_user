let init = {
    keyowrd: ""
};

export default(state = init, action) => {
    switch (action.type) {
        case "NAVBAR_SEARCH_KEYWORD":
            return {
                ...state, keyword: action.payload.keyword
            }
        default:
            return state;
    }
}
