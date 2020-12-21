import api from '../config/api'

export async function getAllQuotes() {
    const response = await api.get("/quotes")
    return response.data
}

export async function addQuote(data) {
    const response = await api.post("/quotes/new", data)
    return response.data
}