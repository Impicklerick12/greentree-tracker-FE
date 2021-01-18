import React, { useState, useEffect } from 'react'
import { useGlobalState } from '../../config/store'
import { getPlantFromId } from '../../services/plantServices'
import { findUser } from '../../services/authServices'
import { deleteQuote, updateQuote } from '../../services/quoteServices'
import { alertBanner } from '../Alerts'

import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    LinearProgress
} from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: "1em",
        marginTop: "1em",
    },
    links: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    userInfo: {
        justifyContent: 'space-around'
    },
    container: {
        paddingTop: theme.spacing(1)
    },
    table: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    tableHead: {
        backgroundColor: grey[300],
    }
  }));

const SubmittedQuotes = ({quote}) => {

    const classes = useStyles();

    const { store, dispatch } = useGlobalState()
    const { plants, submittedQuotes } = store

    useEffect(() => {
        // Find the data of each user
        if (user_id) {
            setUserDataLoading(true)
            findUser(user_id).then((res) => {
                let user = res.data
                setUserInfo({
                    username: user.username,
                    email: user.email
                })
                setUserDataLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setUserDataLoading(false)
            })  
        }
    }, [])

    useEffect(() => {
        // Find the data of each plant in quote request
        if (quote.plants) {
            let x = []
            quote.plants.map((p) => {
                let plant = getPlantFromId(plants, p.plant_id)
                x.push({
                    common_name: plant.common_name,
                    price: plant.price,
                    id: plant._id,
                    quantity: p.quantity
                })
                return x
            })
            setPlantInfo(x)
        }
    }, [])

    const [userInfo, setUserInfo] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const [plantInfo, setPlantInfo] = useState([])
    const [completed, setCompleted] = useState(false)
    const [userDataLoading, setUserDataLoading] = useState(false)

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
        quote.completed = !quote.completed
        setCompleted(true)
        updateQuote(quote)
            .then((res) => {
                setCompleted(false)
            })
            .catch((error) => console.log(error))
        
        // return quote.completed
    }

    const {comment, modified_date, user_id, _id} = quote

    return (
        <>
            <Card className={classes.root} raised>
                { errorMessage && alertBanner(errorMessage) }
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h2" color="textSecondary">
                        Quote No. <strong>{_id}</strong>
                    </Typography>
                    <Typography gutterBottom variant="body1" component="p">
                        Date: <strong>{modified_date}</strong>
                    </Typography>
                    { userDataLoading ? (
                        <LinearProgress color="secondary" />
                    ) : (
                        <Grid container className={classes.userInfo}>
                            <Typography variant="body1" component="p">
                                <strong>User: </strong>{userInfo.username}
                            </Typography>
                            <Typography variant="body1" component="p">
                                <strong>email: </strong>{userInfo.email}
                            </Typography>
                        </Grid>
                    )}
                    <TableContainer component={Paper} className={classes.table}>
                        <Table aria-label="Quote Plant Table">
                            <TableHead className={classes.tableHead}>
                                <TableRow>
                                    <TableCell align="left"><strong>Plant ID</strong></TableCell>
                                    <TableCell align="left"><strong>Common Name</strong></TableCell>
                                    <TableCell align="left"><strong>Price</strong></TableCell>
                                    <TableCell align="left"><strong>Quantity</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { plantInfo.map((p, i) => (
                                    <TableRow key={i}>
                                        <TableCell align="left">{p.id}</TableCell>
                                        <TableCell align="left">{p.common_name}</TableCell>
                                        <TableCell align="left">${p.price}</TableCell>
                                        <TableCell align="left">{p.quantity}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {comment}
                    </Typography>
                </CardContent>
                <Grid container className={classes.links}>
                    <Grid item>
                            {quote.completed ? (
                                <IconButton size="small" onClick={handleQuoteUpdate} style={{ color: green[300] }} title="Quote is complete" alt="Mark as completed">
                                    <Typography variant="h6">Quote Completed</Typography>
                                    <DoneOutlineIcon />
                                </IconButton>
                            ) : (
                                <IconButton size="small" onClick={handleQuoteUpdate} style={{ color: red[600] }} title="Mark as Completed" alt="Mark as completed">
                                    <Typography variant="h6">Mark as complete</Typography>
                                    <ClearIcon />
                                </IconButton>
                            )}
                    </Grid>
                    <Grid item>
                            <IconButton aria-label="delete" color="secondary" onClick={handleQuoteDelete} title="Delete">
                                <DeleteIcon />
                            </IconButton>
                    </Grid>
                </Grid>
            </Card>
        </>
  );
}

export default SubmittedQuotes
