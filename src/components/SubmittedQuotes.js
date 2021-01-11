import React, { useState, useEffect } from 'react'
import { useGlobalState } from '../config/store'
import { getPlantFromId } from '../services/plantServices'
import { findUser } from '../services/authServices'
import { deleteQuote, updateQuote } from '../services/quoteServices'

import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    IconButton
} from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    root: {
        marginBottom: "1em"
    },
    links: {
        justifyContent: "center"
    }
  });

const SubmittedQuotes = ({quote}) => {

    const classes = useStyles();

    const { store, dispatch } = useGlobalState()
    const { plants, submittedQuotes } = store
    // console.log(plants)

    useEffect(() => {
        // Find the data of each user
        if (user_id) {
            findUser(user_id).then((res) => {
                setUserInfo(res.data)
            })
            .catch((error) => console.log(error))  
        }
    },[])

    const [userInfo, setUserInfo] = useState([])
    const[errorMessage, setErrorMessage] = useState(null)

    function handleQuoteDelete() {
        deleteQuote(_id).then(() => {
            console.log("deleted quote")
            const updatedQuotes = submittedQuotes ? submittedQuotes.filter((q) => q._id !== _id) : null
            dispatch({
                type: "setSubmittedQuotes",
                data: updatedQuotes
            })
        }).catch((error) => {
            const status = error.response ? error.response.status : 500
            console.log("caught error on quote delete", error)
            if(status === 403)
                setErrorMessage("You are not an admin, and unable to delete a quote")
            else
                setErrorMessage("Well, this is embarrassing... There was a problem on the server.")
        })
    }

    const handleQuoteUpdate = (event) => {
        event.preventDefault()
        quote.completed = true

        updateQuote(quote)
            .then((res) => {
                console.log("response data for updated quote: ", res)
            })
            .catch((error) => console.log(error))
        
        return quote.completed
    }

    const {comment, modified_date, user_id, _id} = quote

    return (
        <>
            <Card className={classes.root}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Quote # {_id}
                    </Typography>
                    <CardActionArea>
                        <Typography variant="body2" component="p">
                            User: {userInfo.username} email: {userInfo.email}
                        </Typography>
                        {quote.plants.map((plant, i) =>
                            <p key={i}>Plant Id: {plant._id} Quantity: {plant.quantity}</p>
                        )}
                        <Typography variant="body2" color="textSecondary" component="p">
                            {comment}
                        </Typography>
                    </CardActionArea>
                </CardContent>
                <CardActions className={classes.links}>
                    {!quote.completed && (
                        <IconButton size="small" onClick={handleQuoteUpdate} style={{ color: green[300] }} title="Mark as Completed" alt="Mark as completed">
                           <DoneOutlineIcon />
                        </IconButton>
                    )}
                    <IconButton aria-label="delete" color="secondary" onClick={handleQuoteDelete} title="Delete">
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </>
  );
}

export default SubmittedQuotes
