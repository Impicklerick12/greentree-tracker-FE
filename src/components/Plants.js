import React from 'react'
import PlantsEach from './PlantsEach'
import FilterOptions from './FilterOptions'
import { useGlobalState } from '../config/store'

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
    gridContainer: {
    }
  });
  

const Plants = () => {

    const classes = useStyles();

    const { store } = useGlobalState()
    const { plants, searchValue } = store

    // console.log(searchValue)

    return (
        <>
            <FilterOptions />
            <Grid container className={classes.gridContainer}>
                    { plants
                        .sort((a, b) => a.common_name.localeCompare(b.common_name))
                        .map((plant) => {
                            return <PlantsEach key={plant._id} plant={plant} />
                        })
                    }
            </Grid>
        </>
    )
}

export default Plants
