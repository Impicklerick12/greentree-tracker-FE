import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { 
    Paper, 
    Grid,
    TextField,
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

const Admin = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h2">Admin Dashboard</Typography>
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

export default Admin
