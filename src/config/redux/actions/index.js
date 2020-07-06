export const loginAction = (data) => {

    localStorage.setItem('user',JSON.stringify(data))
    return { type: 'LOGIN_SUCCESS', payload: data }
}

export let navbarSearchAction = (keyword) =>{
    localStorage.setItem("navbarSearchKeyword", JSON.stringify(keyword))

    return {
        type: "NAVBAR_SEARCH_KEYWORD",
        payload: keyword
    }
}