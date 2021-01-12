import React, { useState, useEffect } from 'react'
import { useGlobalState } from '../config/store'
import { withRouter } from 'react-router-dom'
import { getAllQuotes } from '../services/quoteServices.js'
import { findAllUsers } from '../services/authServices.js'

import { makeStyles } from '@material-ui/core/styles';
import { 
    Paper, 
    Grid,
    Typography,
    CircularProgress
} from '@material-ui/core';

import NewPlant from './NewPlant'
import SubmittedQuotes from './SubmittedQuotes'
import Users from './Users'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    container : {
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column-reverse'
        }
    },
    left: {
        flexDirection: 'column'
    },
    newPlant: {
        marginBottom: theme.spacing(3)
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center'
    },
    loading: {
        marginTop: theme.spacing(20),
        marginBottom: theme.spacing(20),
    }
  }));

const Admin = ({history}) => {

    const { store, dispatch } = useGlobalState()
    const { loggedInUser, submittedQuotes, admin } = store
    const [quoteLoading, setQuoteLoading] = useState(false)
    const [userLoading, setUserLoading] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(() => {
        setQuoteLoading(true)
        getAllQuotes()
            .then((res) => {
                dispatch({
                    type: "setSubmittedQuotes",
                    data: res
                })
                setQuoteLoading(false)
            })
            .catch((error) => console.log(error))
    }, [])

    useEffect(() => {
        setUserLoading(true)
        findAllUsers()
            .then((res) => {
                setUserLoading(false)
                setUsers(res.data)
            })
            .catch((error) => console.log(error))
    }, [])

    const handleRedirect = () => {
        history.goBack()
    }

    const classes = useStyles();

    return (
        <>
            { loggedInUser && admin ? (
                <div className={classes.root}>
                    <Grid className={classes.container} container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.paper}>
                                <Typography variant="h2">Quote Requests</Typography>
                                { quoteLoading ? (
                                    <Grid container justify="center">
                                        <CircularProgress color="secondary" size={100} className={classes.loading}/>
                                    </Grid>
                                ) : (
                                    <>
                                        { submittedQuotes
                                            .sort((a, b) => a.completed - b.completed)
                                            .sort((a,b) => b.modified_date - a.modified_date)
                                            .map((quote, i) => <SubmittedQuotes key={i} quote={quote} />)
                                        }
                                    </>
                                )}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Grid item xs={12} className={classes.left}>
                                <Grid item className={classes.newPlant}>
                                    <Paper className={classes.paper}>
                                        <NewPlant />
                                    </Paper>
                                </Grid>
                                <Grid item>
                                    <Paper className={classes.paper}>
                                        <Users users={users}/>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            ) : (
                handleRedirect()
            )}
        </>
    )
}

export default withRouter(Admin)
