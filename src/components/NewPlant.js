import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useGlobalState } from '../config/store'

const NewPlant = ({history}) => {

    // Gets the next available id for a new post 
    function getNextId(){
        const ids = plants.map((plant) => plant._id)
        return ids.sort()[ids.length-1] + 1
    }

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setFormState({
            ...formState,
            [name]: value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        const nextId = getNextId()
        const newPlant = {
            _id: nextId,
            common_name: formState.common_name,
            botanical_name: formState.botanical_name,
            category: formState.category || "Bush",
            modified_date: new Date(),
            description: formState.description,
            price: formState.price,
            pot_size: formState.pot_size,
            quantity: formState.quantity,
        }
        dispatch({
            type: "setPlants",
            data: [...plants, newPlant]
        })
        history.push(`/plants/${nextId}`)
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
    const { store, dispatch } = useGlobalState()
    const { plants } = store

    return (
        <div>
            <h1>New Plant</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Common Name</label>
                    <input required type="text" name="common_name" placeholder="Enter the common name" onChange={handleChange}></input>
                </div>
                <div>
                    <label>Botanical Name</label>
                    <input required type="text" name="botanical_name" placeholder="Enter the botanical name" onChange={handleChange}></input>
                </div>
                <div>
                    <label>Category</label>
                    <input type="text" name="category" placeholder="Enter a category" onChange={handleChange}></input>
                </div>
                <div>
                    <label>Description</label>
                    <textarea required name="description" placeholder="Plant Description" onChange={handleChange}></textarea>
                </div>
                <div>
                    <label>Pot Size</label>
                    <input type="text" name="pot_size" placeholder="Enter a pot size" onChange={handleChange}></input>
                </div>
                <div>
                    <label>Quantity</label>
                    <input type="number" name="quantity" placeholder="Enter a quantity" onChange={handleChange}></input>
                </div>
                <div>
                    <label>Price</label>
                    <input type="number" name="price" placeholder="Enter a price" onChange={handleChange}></input>
                </div>
                <input type="submit" value="Add Plant"></input>
            </form>
        </div>
    )
}

export default withRouter(NewPlant)
