import React from 'react'
import { withRouter } from 'react-router-dom'
import { useGlobalState } from '../config/store'
import QuoteItem from './QuoteItem'

import { Button } from '@material-ui/core'

const QuoteRequest = ({history}) => {

    const { store, dispatch } = useGlobalState()
    const { loggedInUser, quotes } = store
    console.log(quotes)

    return (
        <div>
            <h1>Quote Request</h1>
            {quotes.map((quote, index) =>
                <QuoteItem key={index} quote={quote} />
            )}
            <Button onClick={() => history.push('/plants')}>Keep Shopping</Button>
        </div>
    )
}

export default withRouter(QuoteRequest)
