import api from '../config/api'

// Returns a single plant based on the id provided
export function getPlantFromId(plants, id) {
    const plant =  plants.find((plant) =>  plant._id === parseInt(id))
    return plant
}

// Returns all blog plants from the server
export async function getAllPlants() {
    const response = await api.get("/plants")
    return response.data
}

// Adds a Plant on the server
export async function addPlant(newPlant) {
    const response = await api.post("/plants", newPlant)
    return response.data
}

// Deletes a Plant on the server
export async function deletePlant(id) {
    const response = await api.delete(`/plants/${id}`)
    return response.data
}

export async function updatePlant(plant) {
    const response = await api.put(`/plants/${plant._id}`, plant)
    return response.data
}