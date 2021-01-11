import React, { useState, useEffect } from 'react'
import { useGlobalState } from '../config/store'
import { userAdmin } from '../services/authServices'
import { withRouter } from 'react-router-dom'
import { getAllQuotes } from '../services/quoteServices.js'

import { makeStyles } from '@material-ui/core/styles';
import { 
    Paper, 
    Grid,
    Typography
} from '@material-ui/core';

import NewPlant from './NewPlant'
import SubmittedQuotes from './SubmittedQuotes'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    container : {
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column-reverse'
        }
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center'
    },
  }));

const Admin = ({history}) => {

    const { store, dispatch } = useGlobalState()
    const { loggedInUser, submittedQuotes } = store

    // ONLY CURRENTLY WORKING IN DEVELOPMENT 
    // useEffect(() => {
    //     userAdmin().then((res) => {
    //         console.log(res.status)
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //         history.push('/plants')
    //     })
    // },[])

    useEffect(() => {
        getAllQuotes()
        .then((res) => {
            dispatch({
                type: "setSubmittedQuotes",
                data: res
            })
        })
        .catch((error) => console.log(error))
    }, [submittedQuotes])

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={2} className={classes.container}>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <Typography variant="h2">Quote Requests</Typography>
                        {submittedQuotes.map((quote) => 
                            <SubmittedQuotes key={quote._id} quote={quote} />
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <NewPlant />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default withRouter(Admin)
