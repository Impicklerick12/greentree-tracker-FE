import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useGlobalState } from '../config/store'
import { addQuote } from '../services/quoteServices'
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
      '& > *': {
        margin: theme.spacing(1),
      },
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
        // console.log(newQuoteRequest)

        addQuote(newQuoteRequest)
            .then((res) => {
                console.log(res)
            })
            .catch((error) => console.log(error))

        // dispatch({
        //     type: "setQuoteRequestData",
        //     data: newQuoteRequest
        // })
        // console.log("Quote request data: ", quoteRequestData)
        // // history.push('/plants')
    }

    const updateTotal = (price, quantity) => {
        let subtotal
        subtotal += (price * quantity)
        setTotal(subtotal)
    }

    const handleRedirect = () => {
        history.goBack()
    }

    return (
        <div>
             <Grid container justify="center">
                <Typography variant="h2">Quote Request</Typography>
            </Grid>
            { loggedInUser && (quotePlants.length > 0) ? (
                <Grid container justify="center">
                    <Grid item xs={10} sm={8} md={6} lg={4}>
                        <form className={classes.root} onSubmit={handleSubmit}>
                            <div>
                                {quotePlants.map((plant, index) =>
                                    <QuoteItem key={index} cartPlants={plant} updateTotal={updateTotal}/>
                                )}
                            </div>
                            <p>Total: ${total}</p>
                            <div>
                                <TextField className={classes.textArea} multiline rows={4} type="text" name="comment" label="Comments" onChange={handleChange}></TextField>
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
        </div>
    )
}

export default withRouter(QuoteRequest)
