import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useGlobalState } from '../config/store'
import { getPlantFromId, updatePlant } from '../services/plantServices'

const PlantsEdit = ({history, match}) => {

    const { store, dispatch } = useGlobalState()
    const { plants } = store
    const plantId = match && match.params ? match.params.id : -1
    const plant = getPlantFromId(plants, plantId)

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value

        setFormState({
            ...formState,
            [name]: value
        })
    }

    function handleSubmit(event) {
        // event.preventDefault()

        // const updatedPlant = {
        //     _id: plant._id,
        //     common_name: formState.common_name,
        //     botanical_name: formState.botanical_name,
        //     category: formState.category || "Bush",
        //     modified_date: new Date(),
        //     description: formState.description,
        //     price: formState.price,
        //     pot_size: formState.pot_size,
        //     quantity: formState.quantity,
        // }

        // const otherPlants = plants.filter((plant) => plant._id !== updatedPlant._id)
        // dispatch({
        //     type: "setPlants",
        //     data: [...otherPlants, updatedPlant]
        // })

        // history.push(`/plants/${plant._id}`)

        // TO USE IN PRODUCTION - REPLACE CODE ABOVE
        event.preventDefault()
        const updatedPlant = {
            _id: plant._id,
            common_name: formState.common_name,
            botanical_name: formState.botanical_name,
            category: formState.category || "Bush",
            modified_date: new Date(),
            description: formState.description,
            price: formState.price,
            pot_size: formState.pot_size,
            quantity: formState.quantity,
        }
        updatePlant(updatedPlant).then(() => {
            const otherPlants = plants.filter((plant) => plant._id !== updatedPlant._id)
            dispatch({
                type: "setPlants",
                data: [...otherPlants, updatedPlant]
            })
            history.push(`/plants/${plant._id}`)
        }).catch((error) => {
            const status = error.response ? error.response.status : 500
            console.log("caught error on edit", error)
            if(status === 403)
                setErrorMessage("Oops! It appears we lost your login session. Make sure 3rd party cookies are not blocked by your browser settings.")
            else
                setErrorMessage("Well, this is embarrassing... There was a problem on the server.")
        })
    }
    
    const initialFormState = {
        common_name: "",
        botanical_name: "",
        category: "",
        description: "",
        price: 0,
        pot_size: "",
        quantity: ""
    } 

    const [formState, setFormState] = useState(initialFormState)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
       // Set the formState to the fields in the post after mount and when post changes
       plant && setFormState({
        common_name: plant.common_name,
        botanical_name: plant.botanical_name,
        category: plant.category || "Bush",
        modified_date: new Date(),
        description: plant.description,
        price: plant.price,
        pot_size: plant.pot_size,
        quantity: plant.quantity,
       })
    }, [plant])

    return (
        <div>
            <h1>Plants Edit Page</h1>
            {errorMessage && <p>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Common Name</label>
                    <input required type="text" name="common_name" value={formState.common_name} onChange={handleChange}></input>
                </div>
                <div>
                    <label>Botanical Name</label>
                    <input required type="text" name="botanical_name" value={formState.botanical_name} onChange={handleChange}></input>
                </div>
                <div>
                    <label>Category</label>
                    <input type="text" name="category" value={formState.category} onChange={handleChange}></input>
                </div>
                <div>
                    <label>Description</label>
                    <textarea required name="description" value={formState.description} onChange={handleChange}></textarea>
                </div>
                <div>
                    <label>Pot Size</label>
                    <input type="text" name="pot_size" value={formState.pot_size} onChange={handleChange}></input>
                </div>
                <div>
                    <label>Quantity</label>
                    <input type="number" name="quantity" value={formState.quantity} onChange={handleChange}></input>
                </div>
                <div>
                    <label>Price</label>
                    <input type="number" name="price" value={formState.price} onChange={handleChange}></input>
                </div>
                <input type="submit" value="Update Plant"></input>
            </form>
        </div>
    )
}

export default withRouter(PlantsEdit)
