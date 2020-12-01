// Returns a single plant based on the id provided
export function getPlantFromId(plants, id) {
    const plant =  plants.find((plant) =>  plant._id === parseInt(id))
    return plant
}