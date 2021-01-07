import React, { useState } from 'react'
import PlantsEach from './PlantsEach'
import FilterOptions from './FilterOptions'
import { useGlobalState } from '../config/store'
import { getAllFilteredPlants } from '../services/plantServices'

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
    // console.log("Plants: ", plants)

    const [filteredPlants, setFilteredPlants] = useState([])

    // console.log(searchValue)
    console.log("filtered plants: ", filteredPlants)

    const filterOptions = (filteredOptions) => {

        console.log("FilterOptions: ", filteredOptions)

        if (filteredOptions !== null) {
            getAllFilteredPlants(filteredOptions)
            .then((res) => {
                console.log(res)
                setFilteredPlants(res)
            })
            .catch((error) => console.log(error))
        } else {
            setFilteredPlants([])
        }


        // if (category) {
        //     let categoryPlants = plants.filter((plant) => plant.category === category)
        //     console.log("categoryPlants in plants: ", categoryPlants)

        //     setFilteredPlants(categoryPlants)
        // } else {
        //     setFilteredPlants(null)
        // }
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
                filterOptions={filterOptions}
            />
            <Grid container spacing={2} className={classes.gridContainer}>
                { filteredPlants.length > 0 ? (
                    filteredPlants
                        .sort((a, b) => a.common_name.localeCompare(b.common_name))
                        .map((plant) => {
                            return <PlantsEach key={plant._id} plant={plant}/>
                        })
                ) : (
                    plants
                        .sort((a, b) => a.common_name.localeCompare(b.common_name))
                        .map((plant) => {
                            return <PlantsEach key={plant._id} plant={plant}/>
                        })
                )}
            </Grid>
        </>
    )
}

export default Plants