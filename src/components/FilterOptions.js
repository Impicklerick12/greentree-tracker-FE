import react, { useState } from 'react';
import { useGlobalState } from '../config/store'
import {
    Grid,
    Paper,
    InputBase,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Button
} from '@material-ui/core'

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
    checked: {}
  }));

const FilerOptions = ({filterOptions}) => {
    const { dispatch } = useGlobalState()
    
    // const [treeChecked, setTreeChecked] = useState(false)
    // const [shrubChecked, setShrubChecked] = useState(false)
    // const [grassChecked, setGrassChecked] = useState(false)
    // const [groundCoverChecked, setGroundCoverChecked] = useState(false)
    // // Set initial state. Pot size 140mm
    // const [smallPotChecked, setSmallPotChecked] = useState(false)
    // // Set initial state. Pot size 250mm
    // const [mediumPotChecked, setMediumPotChecked] = useState(false)
    // // Set initial state. Pot size 350mm
    // const [largePotChecked, setLargePotChecked] = useState(false)
    // const [specialChecked, setSpecialChecked] = useState(false)
    // // Price range $0 to $50
    // const [rangeOneChecked, setRangeOneChecked] = useState(false)
    // // Price range $50 to $100
    // const [rangeTwoChecked, setRangeTwoChecked] = useState(false)
    // // Price range $100 and over
    // const [rangeThreeChecked, setRangeThreeChecked] = useState(false)

    const [categoryValue, setCategoryValue] = useState(null);
    const [potSizeValue, setPotSizeValue] = useState(null);
    const [priceValue, setPriceValue] = useState(null);
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

        // if (filterValue == 50) {
        //     filterValue = { $lt: 50 }
        // } else if (filterValue == 100) {
        //     filterValue = { $lt: 100 }
        // } else if (filterValue == "100+") {
        //     filterValue = { $gte: 100}
        // } else {
        //     filterValue = filterValue
        // }
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

    // Links to material UI set up
    const classes = useStyles()

    return (
        // <Grid container>
        //     <Grid item className={classes.container}>
        //         <Paper className={classes.paper}>
        //             <div className={classes.radioChecks}>
        //                 <div className={classes.category}>
        //                     <FormControl component="fieldset">
        //                         <FormLabel component="legend">Category</FormLabel>
        //                         <RadioGroup row aria-label="Category" name="category" onChange={handleChange}>
        //                             <FormControlLabel 
        //                                 checked={treeChecked} 
        //                                 onClick={() => setTreeChecked(!treeChecked)}
        //                                 value="tree" 
        //                                 control={<Radio />} 
        //                                 label="Tree" 
        //                             />
        //                             <FormControlLabel 
        //                                 checked={shrubChecked}
        //                                 onClick={() => setShrubChecked(!shrubChecked)} 
        //                                 value="shrub" 
        //                                 control={<Radio />} 
        //                                 label="Shrub" 
        //                             />
        //                             <FormControlLabel 
        //                                 checked={grassChecked} 
        //                                 onClick={() => setGrassChecked(!grassChecked)}
        //                                 value="grass" 
        //                                 control={<Radio />} 
        //                                 label="Grass" 
        //                             />
        //                             <FormControlLabel 
        //                                 checked={groundCoverChecked}
        //                                 onClick={() => setGroundCoverChecked(!groundCoverChecked)} 
        //                                 value="ground_cover" 
        //                                 control={<Radio />} 
        //                                 label="Ground Cover" 
        //                             />
        //                         </RadioGroup>
        //                     </FormControl>
        //                     <FormControl component="fieldset">
        //                         <FormLabel component="legend">Price</FormLabel>
        //                         <RadioGroup row aria-label="Price" name="price" onChange={handleChange}>
        //                             <FormControlLabel 
        //                                 checked={rangeOneChecked}
        //                                 onClick={() => setRangeOneChecked(!rangeOneChecked)}
        //                                 value="$0 to $50" 
        //                                 control={<Radio />} 
        //                                 label="$0 to $50" 
        //                             />
        //                             <FormControlLabel 
        //                                 checked={rangeTwoChecked}
        //                                 onClick={() => setRangeTwoChecked(!rangeTwoChecked)}
        //                                 value="$50 to $100" 
        //                                 control={<Radio />} 
        //                                 label="$50 to $100" 
        //                             />
        //                             <FormControlLabel 
        //                                 checked={rangeThreeChecked}
        //                                 onClick={() => setRangeThreeChecked(!rangeThreeChecked)}
        //                                 value="$100 and above" 
        //                                 control={<Radio />} 
        //                                 label="$100 and above" 
        //                             />
        //                         </RadioGroup>
        //                     </FormControl>
        //                 </div>
        //             </div>
        //              <div className={classes.potSize}>
        //                     <FormControl component="fieldset">
        //                         <FormLabel component="legend">Pot Size</FormLabel>
        //                         <RadioGroup row aria-label="Pot Size" name="pot_size" onChange={handleChange}>
        //                             <FormControlLabel 
        //                                 checked={smallPotChecked}
        //                                 onClick={() => setSmallPotChecked(!smallPotChecked)}
        //                                 value="140mm" 
        //                                 control={<Radio />} 
        //                                 label="140mm" 
        //                             />
        //                             <FormControlLabel 
        //                                 checked={mediumPotChecked}
        //                                 onClick={() => setMediumPotChecked(!mediumPotChecked)}
        //                                 value="250mm" 
        //                                 control={<Radio />} 
        //                                 label="250mm" 
        //                             />
        //                             <FormControlLabel 
        //                                 checked={largePotChecked}
        //                                 onClick={() => setLargePotChecked(!largePotChecked)}
        //                                 value="350mm" 
        //                                 control={<Radio />} 
        //                                 label="350mm" 
        //                             />
        //                         </RadioGroup>
        //                     </FormControl>
        //                     <FormControl component="fieldset">
        //                         <FormLabel component="legend">Seasonal</FormLabel>
        //                         <RadioGroup row aria-label="Special" name="special" onChange={handleChange}>
        //                             <FormControlLabel 
        //                                 checked={specialChecked}
        //                                 onClick={() => setSpecialChecked(!specialChecked)}
        //                                 value="Seasonal" 
        //                                 control={<Radio />} 
        //                                 label="Seasonal" 
        //                             />
        //                         </RadioGroup>
        //                     </FormControl>
        //                 </div>
        //         </Paper>
        //     </Grid>
        // </Grid>

        <Grid container>
            <Grid item className={classes.container}>
                <Paper className={classes.paper}>
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
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                    </div> */}
                    <div className={classes.radioChecks}>
                        <div className={classes.category}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Category</FormLabel>
                                <RadioGroup row aria-label="Category" name="category" value={filters.category} onChange={handleFilterChange}>
                                    <FormControlLabel value="tree" control={<Radio />} label="Tree" />
                                    <FormControlLabel value="shrub" control={<Radio />} label="Shrub" />
                                    <FormControlLabel value="grass" control={<Radio />} label="Grass" />
                                    <FormControlLabel value="ground cover" control={<Radio />} label="Ground Cover" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className={classes.potSize}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Pot Size</FormLabel>
                                <RadioGroup row aria-label="Pot Size" name="pot_size" value={filters.pot_size} onChange={handleFilterChange}>
                                    <FormControlLabel value="140mm" control={<Radio />} label="140mm" />
                                    <FormControlLabel value="250mm" control={<Radio />} label="250mm" />
                                    <FormControlLabel value="350mm" control={<Radio />} label="350mm" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className={classes.price}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Price</FormLabel>
                                <RadioGroup row aria-label="price" name="price" value={filters.price} onChange={handleFilterChange}>
                                    <FormControlLabel value="50" control={<Radio />} label="Less than $50" />
                                    <FormControlLabel value="100" control={<Radio />} label="Less than $100" />
                                    <FormControlLabel value="100+" control={<Radio />} label="$100 +" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div>
                            <Button 
                                variant="contained" 
                                color="primary"
                                onClick={submitFilters}
                            >
                                Filter
                            </Button>
                            <Button 
                                variant="contained" 
                                color="secondary"
                                onClick={handleReset}
                            >
                                Reset
                            </Button>
                        </div>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default FilerOptions