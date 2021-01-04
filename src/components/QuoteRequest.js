import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useGlobalState } from '../config/store'
import { addQuote } from '../services/quoteServices'
import { clearCart } from '../services/cartServices'
import QuoteItem from './QuoteItem'

import { 
    Button,
    Grid,
    Typography,
    TextField
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {

    },
    quotes: {
        // margin: '1rem'
    },
    textArea: {
        width: '100%'
    }
  }));

const QuoteRequest = ({history}) => {

    const classes = useStyles();

    const { store, dispatch } = useGlobalState()
    const { loggedInUser, quotePlants, quoteRequestData } = store
    // console.log(quotes)

    const [quoteRequestComment, setQuoteRequestComment] = useState("")
    const [total, setTotal] = useState(0)
    const [quoteSent, setQuoteSent] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const handleChange = (event) => {
        event.preventDefault()
        const value = event.target.value
        setQuoteRequestComment(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        let plantInfo = []
        quotePlants.map((p) => {
            plantInfo.push({
                plant_id: p.plant_id,
                quantity: p.quantity
            })
        })

        const newQuoteRequest = {
            plants: plantInfo,
            comment: quoteRequestComment
        }

        addQuote(newQuoteRequest)
            .then((res) => {
                console.log(res)
                setQuoteSent(true)
                clearCartItems()
            })
            .catch((error) => {
                const status = error.response ? error.response.status : 500
                console.log("caught error on Add Quote", error)
                if(status === 403)
                    setErrorMessage("You need to sign in first")
                else
                    setErrorMessage("Well, this is embarrassing... There was a problem on the server.")
            })
    }

    const clearCartItems = () => {
        clearCart().then((res) => {
            // console.log(res)
            dispatch({
                type: "setQuotePlants",
                data: []
            })
        })
        .catch((error) => console.log(error))
    }

    const updateTotal = (plantSubtotal) => {
        let subtotal = 0
        subtotal += plantSubtotal
        console.log("subtotal: ", subtotal)
    }

    const handleRedirect = () => {
        history.goBack()
    }

    return (
        <div>
            {quoteSent ? (
                <>
                    {/* Render a new component with successful message? */}
                    <p>Your quote was successfully sent!</p>
                    <Button onClick={() => history.push('/plants')}>Keep Shopping</Button>
                </>
            ) : (
                <>
                    <Grid container justify="center">
                        <Typography variant="h2">Quote Request</Typography>
                    </Grid>
                    { loggedInUser && (quotePlants.length > 0) ? (
                        <Grid container justify="center">
                            <Grid item sm={12} md={6}>
                                <form className={classes.root} onSubmit={handleSubmit}>
                                    <div className={classes.quotes}>
                                        {quotePlants.map((plant, index) =>
                                            <QuoteItem key={index} cartPlants={plant} updateTotal={updateTotal}/>
                                        )}
                                    </div>
                                    <p>Total: ${total}</p>
                                    <div>
                                        <TextField 
                                            className={classes.textArea} 
                                            multiline 
                                            variant="outlined"
                                            rows={4} 
                                            type="text" 
                                            name="comment" 
                                            label="Comments" 
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <Button type="submit" value="Submit Request">Submit Quote Request</Button>
                                </form>
                                <Button onClick={() => history.push('/plants')}>Keep Shopping</Button>
                            </Grid>
                        </Grid>
                    ) : (
                        // ADD IN NEW COMPONENT _ YOU HAVE NO ITEMS IN YOUR CART YET
                        handleRedirect()
                    )}
                </>
            )}
        </div>
    )
}

export default withRouter(QuoteRequest)
