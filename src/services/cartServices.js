import api from '../config/api'

export async function addPlantToCart(data) {
    const response = await api.post(`/cart/${data.plant}/add-to-cart`, data)
    return response.data
}

// Returns all cart items from the server
export async function getCart() {
    const response = await api.get("/cart")
    return response.data
}

export async function deleteItemFromCart(plant_id) {
    const response = await api.delete(`/cart/${plant_id}`)
    return response.data
}

export async function updateCart(data) {
    const response = await api.put(`/cart/${data.cartItemId}`, data)
    return response.data
}

export async function clearCart(data) {
    const response = await api.delete("/cart/")
    return response.data
}