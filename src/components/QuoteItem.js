import React, { useState, useEffect } from 'react'
import { useGlobalState } from '../config/store'
import { getPlantFromId } from '../services/plantServices'
import { deleteItemFromCart, updateCart } from '../services/cartServices'

import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'


const QuoteItem = ({history, cartPlants, updateTotal}) => {

    const { quantity, plant_id, _id } = cartPlants

    const { store, dispatch } = useGlobalState()
    const { loggedInUser, plants, quotePlants } = store
    const [plantInfo, setPlantInfo] = useState([])
    const [formQuantity, setFormQuantity] = useState(quantity)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        // If there are plants in the cart, then find their information and set it in plantInfo state
        if (cartPlants) {
            const plantData = getPlantFromId(plants, plant_id)
            setPlantInfo(plantData)
            // console.log("plantInfo: ", plantInfo)
        } else {
            console.log("No cartPlants")
        }
    }, [quotePlants])

    const {common_name, price, pot_size} = plantInfo

    updateTotal(price, quantity)

    if (!cartPlants) return null

    function handleDelete(event) {
        event.preventDefault()

        deleteItemFromCart(plant_id)
            .then((res) => {
                console.log("attempted deleted plant successful")
                const updatedCart = quotePlants.filter((p) => p.plant_id !== plant_id)
                dispatch({
                    type: "setQuotePlants",
                    data: updatedCart
                })
                console.log(quotePlants)
            })
            .catch((error) => {
                const status = error.response ? error.response.status : 500
                console.log("caught error on cart delete", error)
                if(status === 403)
                    setErrorMessage("You are not an admin, and unable to delete a plant")
                else
                    setErrorMessage("Well, this is embarrassing... There was a problem on the server.")
            })
        // const updatedQuotes = quotePlants.filter((q) => q._id !== plant_id)
        
        // dispatch({
        //     type: "setQuotePlants",
        //     data: updatedQuotes
        // })
    }

    const handleQuantityChange = (event) => {
        event.preventDefault()
        
        const updatedQuantity = event.target.value
        const data = {
            cartItemId: _id,
            plant: plant_id,
            quantity: updatedQuantity
        }

        updateCart(data)
            .then((res) => {
                console.log(res)
                // const otherCartItmes = quotePlants.filter((p) => p.plant_id !== plant_id)
                // dispatch({
                //     type: "setQuotePlants",
                //     data: [...otherCartItmes, updatedQuantity]
                // })
            })
            .catch((error) => {
                const status = error.response ? error.response.status : 500
                console.log("caught error on quantity edit", error)
                if(status === 403)
                    setErrorMessage("You are not an admin, and unable to edit a plant")
                else
                    setErrorMessage("Well, this is embarrassing... There was a problem on the server.")
            })
    }

    return (
        <div>
            <input type="number" name="quantity" placeholder={quantity} onChange={handleQuantityChange}></input>
            <p>{common_name}</p>
            <p>Pot Size: {pot_size}</p>
            <p>Price: ${price}</p>
            <IconButton aria-label="delete" color="secondary" onClick={handleDelete}>
                <DeleteIcon />
            </IconButton>
        </div>
    )
}

export default QuoteItem

