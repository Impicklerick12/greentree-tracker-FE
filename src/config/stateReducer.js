export default function (state, action) {
    switch(action.type) {
        case "setLoggedInUser": {
            return {
                ...state,
                loggedInUser: action.data
            }
        }
        case "setPlants": {
            return {
                ...state,
                plants: action.data
            }
        }
        case "setQuotes": {
            return {
                ...state,
                quotes: action.data
            }
        }
        case "setSearchValue": {
            return {
                ...state,
                searchValue: action.data
            }
        }
        case "setError": {
            return {
                ...state,
                error: action.data
            }
        }
        default: 
            return state
    }
}