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
    FormLabel
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
    }
  }));

const FilerOptions = () => {
    const { dispatch } = useGlobalState()
    const [treeChecked, setTreeChecked] = useState(false)
    const [shrubChecked, setShrubChecked] = useState(false)
    const [grassChecked, setGrassChecked] = useState(false)
    const [groundCoverChecked, setGroundCoverChecked] = useState(false)
    // Set initial state. Pot size 140mm
    const [smallPotChecked, setSmallPotChecked] = useState(false)
    // Set initial state. Pot size 250mm
    const [mediumPotChecked, setMediumPotChecked] = useState(false)
    // Set initial state. Pot size 350mm
    const [largePotChecked, setLargePotChecked] = useState(false)
    // const [value, setValue] = useState('')
    // const [searchValue, setSearchValue] = useState(null)

    const handleChange = (event) => {
        const selection = event.target.value

    };

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
        <Grid container>
            <Grid item className={classes.container}>
                <Paper className={classes.paper}>
                    {/* <div>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                onChange={handleSearchChange}
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
                                <RadioGroup row aria-label="Category" name="category" onChange={handleChange}>
                                    <FormControlLabel 
                                        checked={treeChecked} 
                                        onClick={() => setTreeChecked(!treeChecked)}
                                        value="tree" 
                                        control={<Radio />} 
                                        label="Tree" 
                                    />
                                    <FormControlLabel 
                                        checked={shrubChecked}
                                        onClick={() => setShrubChecked(!shrubChecked)} 
                                        value="shrub" 
                                        control={<Radio />} 
                                        label="Shrub" 
                                    />
                                    <FormControlLabel 
                                        checked={grassChecked} 
                                        onClick={() => setGrassChecked(!grassChecked)}
                                        value="grass" 
                                        control={<Radio />} 
                                        label="Grass" 
                                    />
                                    <FormControlLabel 
                                        checked={groundCoverChecked}
                                        onClick={() => setGroundCoverChecked(!groundCoverChecked)} 
                                        value="ground_cover" 
                                        control={<Radio />} 
                                        label="Ground Cover" 
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className={classes.potSize}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Pot Size</FormLabel>
                                <RadioGroup row aria-label="Pot Size" name="pot_size" onChange={handleChange}>
                                    <FormControlLabel 
                                        checked={smallPotChecked}
                                        onClick={() => setSmallPotChecked(!smallPotChecked)}
                                        value="140mm" 
                                        control={<Radio />} 
                                        label="140mm" 
                                    />
                                    <FormControlLabel 
                                        checked={mediumPotChecked}
                                        onClick={() => setMediumPotChecked(!mediumPotChecked)}
                                        value="250mm" 
                                        control={<Radio />} 
                                        label="250mm" 
                                    />
                                    <FormControlLabel 
                                        checked={largePotChecked}
                                        onClick={() => setLargePotChecked(!largePotChecked)}
                                        value="350mm" 
                                        control={<Radio />} 
                                        label="350mm" 
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default FilerOptions