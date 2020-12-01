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
            commonName: formState.commonName,
            category: formState.category || "Bush",
            modified_date: new Date(),
            description: formState.description
        }
        dispatch({
            type: "setPlants",
            data: [...plants, newPlant]
        })
        history.push(`/`)
    }

    const initialFormState = {
        commonName: "",
        category: "",
        description: ""
    } 

    const [formState, setFormState] = useState(initialFormState)
    const { store, dispatch } = useGlobalState()
    const { plants } = store

    return (
        <div>
            <h1>New Plant</h1>
            <form id="newPostForm" onSubmit={handleSubmit}>
                <div>
                    <label>Common Name</label>
                    <input required type="text" name="commonName" placeholder="Enter the common name" onChange={handleChange}></input>
                </div>
                <div>
                    <label>Category</label>
                    <input type="text" name="category" placeholder="Enter a category" onChange={handleChange}></input>
                </div>
                <div>
                    <label>Content</label>
                    <textarea form="newPlantForm" required name="description" placeholder="Enter description here" onChange={handleChange}></textarea>
                </div>
                <input type="submit" value="Add Plant"></input>
            </form>
        </div>
    )
}

export default NewPlant
