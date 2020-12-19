import React from 'react'
import { useGlobalState } from '../config/store'

import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

const QuoteItem = ({history, plant}) => {

    const { store, dispatch } = useGlobalState()
    const { loggedInUser, quotePlants } = store

    if (!plant) return null

    const { quantity, item } = plant

    function handleDelete(event) {
        event.preventDefault()

        const updatedQuotes = quotePlants.filter((q) => q._id !== plant._id)
        
        dispatch({
            type: "setQuotePlants",
            data: updatedQuotes
        })
    }

    return (
        <div>
            <p>{quantity}</p>
            <p>{item}</p>
            <IconButton aria-label="delete" color="secondary" onClick={handleDelete}>
                <DeleteIcon />
            </IconButton>
        </div>
    )
}

export default QuoteItem

