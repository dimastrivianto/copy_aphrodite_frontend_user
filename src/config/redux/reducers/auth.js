
const init = {
    id: "",
    username: "",
    token : ""
}

export default (state = init , {type, payload}) => {
    switch(type) {
        case 'LOGIN_SUCCESS':
            return {...state, id: payload.id ? payload.id : state.id , username: payload.username, token : payload.token ? payload.token : state.token }
        case 'LOGOUT_SUCCESS':
            return {...init}
        
        default :
            return state
    }
}