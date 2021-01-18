import React, { useState } from 'react'
import PlantsEach from '../PlantsEach'
import FilterOptions from '../FilterOptions'
import { useGlobalState } from '../../config/store'
import { getAllFilteredPlants } from '../../services/plantServices'

import { makeStyles } from '@material-ui/core/styles';
import { 
    Grid,
    Typography,
    CircularProgress
} from '@material-ui/core'
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
    },
    filterError: {
        marginTop: theme.spacing(2),
    },
    pagination : {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    loading: {
        marginTop: theme.spacing(20)
    }
  }));
  

const Plants = () => {

    const classes = useStyles();

    const { store } = useGlobalState()
    const { plants } = store

    const [filteredPlants, setFilteredPlants] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [plantsPerPage] = useState(12)
    const [noFilteredPlants, setNoFilteredPlants] = useState(false)
    const [loading, setLoading] = useState(false)

    // Get current plant
    const indexOfLastPlant = currentPage * plantsPerPage
    const indexOfFirstPlant = indexOfLastPlant - plantsPerPage
    const currentPlants = filteredPlants.slice(indexOfFirstPlant, indexOfLastPlant)
    const currentPlantsNoFilters = plants.slice(indexOfFirstPlant, indexOfLastPlant)
    // console.log(searchValue)
    console.log("filtered plants: ", filteredPlants)

    const filterOptions = (filteredOptions) => {
        if (filteredOptions !== null) {
            setLoading(true)
            getAllFilteredPlants(filteredOptions)
                .then((res) => {
                    setLoading(false)
                    console.log(res)
                    if (res.length < 1) {
                        setNoFilteredPlants(true)
                    } else {
                        setFilteredPlants(res)
                        setNoFilteredPlants(false)
                    }
                })
                .catch((error) => console.log(error))
        } else {
            setFilteredPlants([])
            setNoFilteredPlants(false)
        }
    }

    let pageNumbers = Math.ceil((filteredPlants.length > 0) ? (filteredPlants.length / plantsPerPage) : (plants.length / plantsPerPage))
    console.log("pageNumbers: ", pageNumbers)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <>
            <FilterOptions 
                filterOptions={filterOptions}
            />
            { loading ? (
                <Grid container justify="center">
                    <CircularProgress color="secondary" size={100} className={classes.loading}/>
                </Grid>
            ) : (
                <>
                    { noFilteredPlants && (
                        <Grid container justify="center">
                            <Typography variant="h4" className={classes.filterError}>No results found</Typography>
                        </Grid>
                    )}
                    <Grid container spacing={2} className={classes.gridContainer}>
                        { currentPlants.length > 0 ? (
                            currentPlants
                                .sort((a, b) => a.common_name.localeCompare(b.common_name))
                                .map((plant) => {
                                    return <PlantsEach key={plant._id} plant={plant}/>
                                })
                        ) : (
                            currentPlantsNoFilters
                                .sort((a, b) => a.common_name.localeCompare(b.common_name))
                                .map((plant) => {
                                    return <PlantsEach key={plant._id} plant={plant}/>
                                })
                        )}
                    </Grid>
                    <Grid container justify="center">
                        <Pagination 
                            count={pageNumbers} 
                            color="primary" 
                            size="large"
                            onClick={(event) => paginate(event.target.innerText)}
                            className={classes.pagination}
                        />
                    </Grid>
                </>
            )}
        </>
    )
}

export default Plants