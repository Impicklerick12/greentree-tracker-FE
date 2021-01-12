import react, { useState } from 'react';

import {
    Grid,
    Paper,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Button,
    useMediaQuery
} from '@material-ui/core'
import grey from '@material-ui/core/colors/grey'

import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
    },
    paper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(3),
        backgroundColor: grey[100],
        border: `2px solid ${grey[600]}`,
        borderRadius: '4px',
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap'
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    radioChecks: {
        '&$checked': {
            colour: 'green'
        }
    },
    filterButtons: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            flexDirection: 'row',
        },
    },
    buttons: {
        margin: theme.spacing(0.5)
    }
  }));

const FilerOptions = ({filterOptions}) => {
    // const [searchValue, setSearchValue] = useState(null)

    const initialFilterState = {
        category: null,
        pot_size: null,
        price: null
    }
    const [filters, setFilters] = useState(initialFilterState)
    // console.log("Filters: ", filters)

    const handleFilterChange = (event) => {
        let filterType = event.target.name
        let filterValue = event.target.value

        setFilters({
            ...filters,
            [filterType]: filterValue
        })
    }
    
    const submitFilters = () => {
        function clean(obj) {
            for (var propName in obj) {
              if (obj[propName] === null || obj[propName] === undefined) {
                delete obj[propName];
              }
            }
            return obj
        }

        let filteredOptions = clean(filters)
        // console.log(filteredOptions)
        filterOptions(filteredOptions)
    }

    const handleReset = () => {
        setFilters(initialFilterState)
        filterOptions(null)
    }

    {/*const handleSearchChange = (event) => {

        setSearchValue(event.target.value)

        dispatch({
            type: "setSearchValue",
            data: searchValue
        })
    }*/}
    const classes = useStyles()

    const categoryRadio = {
        "Tree": 'tree',
        "Shrub": 'shrub',
        "Grass": 'grass',
        'Ground Cover': 'ground cover'
    }

    const potSizeRadio = ["140mm", "250mm", "350mm"]

    // const priceRadio = {
    //     "Less than $50": "50",
    //     "Less than $100": "99",
    //     "More than $100": "100"
    // }

    const createRadio = (obj) => {
        let array = []
        for (let x in obj) {
           array.push(<FormControlLabel value={obj[x]} control={<Radio />} label={x} key={obj[x]}/>)
        }
        return array
    }

    return (
        <Grid container>
            <Grid item className={classes.container}>
                <Paper>
                    {/* SEARCH FUNCTION FIELD */}
                    {/* <div>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search Plants…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'key': 'search' }}
                            />
                        </div>
                    </div> */}
                    <Grid container className={classes.paper}>
                        <Grid className={classes.radioChecks}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Category</FormLabel>
                                <RadioGroup 
                                    row
                                    key="Category" 
                                    name="category" 
                                    value={filters.category} 
                                    onChange={handleFilterChange}
                                >
                                    { createRadio(categoryRadio) }
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid className={classes.radioChecks}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Pot Size</FormLabel>
                                <RadioGroup 
                                    row
                                    key="Pot Size" 
                                    name="pot_size" 
                                    value={filters.pot_size} 
                                    onChange={handleFilterChange}
                                >
                                    { potSizeRadio.map( (pot, i) => {
                                        return <FormControlLabel value={pot} control={<Radio />} label={pot} key={i.toString()}/>
                                    })}
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        {/* PRICE RADIO BUTTONS */}
                        {/* <div className={classes.price}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Price</FormLabel>
                                <RadioGroup row key="price" name="price" value={filters.price} onChange={handleFilterChange}>
                                    { createRadio(priceRadio) }
                                </RadioGroup>
                            </FormControl>
                        </div> */}
                        <Grid className={classes.filterButtons}>
                            <Button 
                                variant="contained" 
                                color="primary"
                                onClick={submitFilters}
                                className={classes.buttons}
                            >
                                Filter
                            </Button>
                            <Button 
                                variant="outlined" 
                                color="secondary"
                                onClick={handleReset}
                                className={classes.buttons}
                            >
                                Reset
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default FilerOptions