import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useGlobalState } from '../config/store'
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
    const { loggedInUser, quotes } = store
    console.log(quotes)

    const initialFormState = {
        plantQuotes: [],
        user: "",
        comment: ""
    } 

    const [quoteRequestData, setQuoteRequestData] = useState(initialFormState)

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value

        setQuoteRequestData({
            ...quoteRequestData,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const newQuoteRequest = {
            plantQuotes: quotes,
            user: loggedInUser,
            comment: quoteRequestData.comment
        }
        dispatch({
            type: "setQuoteRequestData",
            data: [...quoteRequestData, newQuoteRequest]
        })
        console.log(quoteRequestData)
        // history.push('/plants')
    }

    // const addQuoteRequest = () => {
    //     dispatch({
    //         type: "setQuoteRequests",
    //         data: 
    //     })
    // }

    return (
        <div>
             <Grid container justify="center">
                <Typography variant="h2">Quote Request</Typography>
            </Grid>
            { quotes ? (
                <Grid container justify="center">
                    <Grid item xs={10} sm={8} md={6} lg={4}>
                        <form className={classes.root} onSubmit={handleSubmit}>
                            <div>
                                {quotes.map((quote, index) =>
                                    <QuoteItem key={index} quote={quote} />
                                )}
                            </div>
                            <div>
                                <p>{loggedInUser}</p>
                            </div>
                            <div>
                                <TextField className={classes.textArea} multiline rows={4} type="text" name="comment" label="Comments" onChange={handleChange}></TextField>
                            </div>
                            <Button type="submit" value="Submit Request">Submit Quote Request</Button>
                        </form>
                        <Button onClick={() => history.push('/plants')}>Keep Shopping</Button>
                    </Grid>
                </Grid>
            ) : (
                <p>User not logged in</p>
            )}
        </div>
    )
}

export default withRouter(QuoteRequest)
