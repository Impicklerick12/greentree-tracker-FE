import api from '../config/api'

export async function getAllQuotes() {
    const response = await api.get("/quotes")
    return response.data
}

export async function addQuote(data) {
    const response = await api.post("/quotes/new", data)
    return response.data
}

export async function deleteQuote(quote_id) {
    const response = await api.delete(`/quotes/${quote_id}`)
    return response.data
}

export async function updateQuote(quote) {
    const response = await api.put(`/quotes/${quote._id}`, quote)
    return response.data
}