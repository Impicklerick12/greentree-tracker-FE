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
        case "setQuotePlants": {
            return {
                ...state,
                quotePlants: action.data
            }
        }
        case "setQuoteRequests": {
            return {
                ...state,
                quoteRequests: action.data
            }
        }
        case "setSubmittedQuotes": {
            return {
                ...state,
                submittedQuotes: action.data
            }
        }
        case "setSearchValue": {
            return {
                ...state,
                searchValue: action.data
            }
        }
        case "setAdmin": {
            return {
                ...state,
                admin: action.data
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