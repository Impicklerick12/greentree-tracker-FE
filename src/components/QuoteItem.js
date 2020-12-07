import React from 'react'
import { useGlobalState } from '../config/store'

import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

const QuoteItem = ({history, quote}) => {

    const { store, dispatch } = useGlobalState()
    const { loggedInUser, quotes } = store

    if (!quote) return null

    const { quantity, item } = quote

    function handleDelete(event) {
        event.preventDefault()

        const updatedQuotes = quotes.filter((q) => q._id !== quote._id)
        
        dispatch({
            type: "setQuotes",
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
