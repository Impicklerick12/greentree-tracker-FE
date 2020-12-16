import React, { useEffect } from 'react'
import { useGlobalState } from '../config/store'
import { userAdmin } from '../services/authServices'
import { withRouter } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import { 
    Paper, 
    Grid,
    Typography
} from '@material-ui/core';

import NewPlant from './NewPlant'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center'
    },
  }));

const Admin = ({history}) => {

    useEffect(() => {
        // userAdmin()
        //     .then(() => {
        //         dispatch({
        //             type: "setUserAdmin",
        //             data: true
        //         })
        //     })
        //     .catch((error) => {
        //         console.log(
        //             `An error ocurred on getLoggedInUser: ${error}.`
        //         );
        //     });

        userAdmin()
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const { store, dispatch } = useGlobalState()
    const { loggedInUser } = store

    const classes = useStyles();

    return (
        <div className={classes.root}>
            {/* <Typography variant="h2">Admin Dashboard</Typography> */}
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <Typography variant="h2">Quote Requests</Typography>
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
