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
        paddingTop: '20px'
    }
  });
  

const Plants = () => {

    const classes = useStyles();

    const { store } = useGlobalState()
    const { plants, searchValue } = store

    // console.log(searchValue)

    let showingPlants

    const filterCategory = (category) => {
        console.log("category in plants: ", category)
    }

    const filterPotSize = (potSize) => {
        console.log("potSize in plants: ", potSize)
    }

    const filterPrice = (price) => {
        console.log("price in plants: ", price)
    }

    return (
        <>
            <FilterOptions 
                filterCategory={filterCategory} 
                filterPrice={filterPrice} 
                filterPotSize={filterPotSize}
            />
            <Grid container spacing={2} className={classes.gridContainer}>
                    { plants
                        .sort((a, b) => a.common_name.localeCompare(b.common_name))
                        .map((plant) => {
                            return <PlantsEach key={plant._id} plant={plant}/>
                        })
                    }
            </Grid>
        </>
    )
}

export default Plants
