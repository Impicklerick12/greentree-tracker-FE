import React, { useState } from 'react'
import PlantsEach from './PlantsEach'
import FilterOptions from './FilterOptions'
import { useGlobalState } from '../config/store'

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
    gridContainer: {
        paddingTop: '20px'
    }
  }));
  

const Plants = () => {

    const classes = useStyles();

    const { store } = useGlobalState()
    const { plants, searchValue } = store

    const [currentPage, setCurrentPage] = useState(1)
    const [plantsPerPage, setPlantsPerPage] = useState(12)

    // Get current plant
    const indexOfLastPlant = currentPage * plantsPerPage
    const indexOfFirstPlant = indexOfLastPlant - plantsPerPage
    const currentPlants = plants.slice(indexOfFirstPlant, indexOfLastPlant)
    // console.log(searchValue)

    let pageNumbers = Math.ceil(plants.length / plantsPerPage)
    console.log("pageNumbers: ", pageNumbers)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <>
            <FilterOptions />
            <Grid container spacing={2} className={classes.gridContainer}>
                    { currentPlants
                        .sort((a, b) => a.common_name.localeCompare(b.common_name))
                        .map((plant) => plant.common_name.toLowerCase().includes(searchValue) ?
                            (<PlantsEach key={plant._id} plant={plant} />)
                            :
                            (<PlantsEach key={plant._id} plant={plant} />)
                        )
                    }
            </Grid>
            <Pagination 
                count={pageNumbers} 
                color="primary" 
                size="large"
                onClick={(event) => paginate(event.target.innerText)}
            />
        </>
    )
}

export default Plants
