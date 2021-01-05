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
    successful: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    quotes: {
        paddingTop: theme.spacing(2)
    },
    total: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    textArea: {
        width: '100%',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    keepShopping : {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    }
  }));

const QuoteRequest = ({history}) => {

    const classes = useStyles();

    const { store, dispatch } = useGlobalState()
    const { loggedInUser, quotePlants } = store
    // console.log(quotes)

    const [quoteRequestComment, setQuoteRequestComment] = useState("")
    const [total, setTotal] = useState([])
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
            dispatch({
                type: "setQuotePlants",
                data: []
            })
        })
        .catch((error) => console.log(error))
    }

    const updateTotal = (plantSubtotal) => {
        console.log("plant subtotal: ", plantSubtotal)
        setTotal(plantSubtotal)
    }

    return (
        <div>
            {quoteSent ? (
                <>
                    {/* Render a new component with successful message? */}
                    <Grid container justify="center">
                        <Grid item className={classes.successful}>
                            <Typography variant="h5">Your quote was successfully sent!</Typography>
                            <Typography variant="body2">
                                We will get back to you within 48 hours with a response. Due to stock availability and the changing nature of plants, some items may not be available.
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container justify="center" className={classes.keepShopping}>
                        <Button 
                            onClick={() => history.push('/plants')}
                            variant="outlined"
                            color="secondary"
                            size="small"
                        >
                            Keep Shopping
                        </Button>
                    </Grid>
                </>
            ) : (
                <>
                    <Grid container justify="center">
                        <Typography variant="h2">Quote Request</Typography>
                        { errorMessage && <p>{errorMessage}</p>}
                    </Grid>
                    { loggedInUser && (quotePlants.length > 0) ? (
                        <Grid container justify="center">
                            <Grid item sm={12} md={6}>
                                <Grid item>
                                    <Typography variant="body1" color="textSecondary">To change the quantity value, simply select the text box and type your new quantity</Typography>
                                </Grid>
                                <form className={classes.root} onSubmit={handleSubmit}>
                                    <Grid className={classes.quotes}>
                                        {quotePlants.map((plant, index) =>
                                            <QuoteItem key={index} cartPlants={plant} updateTotal={updateTotal}/>
                                        )}
                                    </Grid>
                                    {/* NEED TO ADD IN TOTAL HERE  */}
                                    {/* <Typography className={classes.total} variant="subtitle1">Total: ${total}</Typography> */}
                                    <Grid>
                                        <TextField 
                                            className={classes.textArea} 
                                            multiline 
                                            variant="outlined"
                                            rows={4} 
                                            type="text" 
                                            name="comment" 
                                            label="Add a comment" 
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid container justify="center">
                                        <Button 
                                            type="submit" 
                                            value="Submit Request"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Submit Quote Request
                                        </Button>
                                    </Grid>
                                </form>
                                <Grid container justify="center" className={classes.keepShopping}>
                                    <Button 
                                        onClick={() => history.push('/plants')}
                                        variant="outlined"
                                        color="secondary"
                                        size="small"
                                    >
                                        Keep Shopping
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container justify="center">
                            <Grid item>
                                <Typography variant="body1" color="textSecondary">Your cart is empty</Typography>
                            </Grid>
                        </Grid>
                    )}
                </>
            )}
        </div>
    )
}

export default withRouter(QuoteRequest)
