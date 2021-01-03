import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useGlobalState } from '../config/store'
import { getPlantFromId, updatePlant } from '../services/plantServices'

import { makeStyles } from '@material-ui/core/styles';
import {
    TextField, 
    Button,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center'
    },
    form: {
        margin: '1rem 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        '& > *': {
        margin: theme.spacing(1),
        },
    },
    textArea: {
        width: '100%',
        [theme.breakpoints.down('md')]: {
            width: "100%"
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    select: {
        display: "flex",
        justifyContent: "space-around",
    },
    updateButton: {
        width: 'inherit'
    }
  }));

const PlantsEdit = ({history, match}) => {

    const classes = useStyles();

    const { store, dispatch } = useGlobalState()
    const { plants } = store
    const plantId = match && match.params ? match.params.id : -1
    const plant = getPlantFromId(plants, plantId)

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setFormState({
            ...formState,
            [name]: value
        })
    }

    const handleCategoryChange = (event) => {
        const name = "category"
        const value = event.target.value
        setFormState({
            ...formState,
            [name]: value
        })
    }

    const handlePotSizeChange = (event) => {
        const name = "pot_size"
        const value = event.target.value
        setFormState({
            ...formState,
            [name]: value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()

        const updatedPlant = {
            _id: plant._id,
            common_name: formState.common_name,
            botanical_name: formState.botanical_name,
            category: formState.category || "tree",
            modified_date: new Date(),
            description: formState.description,
            price: formState.price,
            pot_size: formState.pot_size,
            quantity: formState.quantity,
        }

        updatePlant(updatedPlant)
            .then(() => {
                const otherPlants = plants.filter((plant) => plant._id !== updatedPlant._id)
                dispatch({
                    type: "setPlants",
                    data: [...otherPlants, updatedPlant]
                })
                history.push(`/plants/${plant._id}`)
            })
            .catch((error) => {
                const status = error.response ? error.response.status : 500
                console.log("caught error on edit", error)
                if(status === 403) {
                    setErrorMessage("You are not an admin, and unable to edit a plant")
                } else {
                    setErrorMessage("Well, this is embarrassing... There was a problem on the server.")
                }
            })
    }

    const handleBack = () => {
        history.goBack()
    }
    
    const initialFormState = {
        common_name: "",
        botanical_name: "",
        category: "",
        description: "",
        price: 0,
        pot_size: "",
        quantity: ""
    } 

    const [formState, setFormState] = useState(initialFormState)
    const [errorMessage, setErrorMessage] = useState(null)

    const {
        common_name,
        botanical_name,
        category,
        description,
        pot_size,
        price,
        quantity
    } = formState

    useEffect(() => {
       // Set the formState to the fields in the post after mount and when post changes
       plant && setFormState({
        common_name: plant.common_name,
        botanical_name: plant.botanical_name,
        category: plant.category || "Bush",
        modified_date: new Date(),
        description: plant.description,
        price: plant.price,
        pot_size: plant.pot_size,
        quantity: plant.quantity,
       })
    }, [plant])

    return (
        <>
            <Grid container justify="center">
                <Typography variant="h2">Edit Plant</Typography>
            </Grid>
            {errorMessage && <p>{errorMessage}</p>}
            <Grid className={classes.container}>
                <Grid item sm={12} md={6}>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <div>
                            <TextField 
                                className={classes.textArea} 
                                variant="outlined"
                                id="outlined" 
                                required 
                                type="text" 
                                name="common_name"
                                label="Common Name"
                                value={common_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TextField 
                                className={classes.textArea} 
                                required 
                                variant="outlined"
                                id="outlined" 
                                type="text" 
                                name="botanical_name" 
                                label="Botanical Name"
                                value={botanical_name} 
                                onChange={handleChange}
                            />
                        </div>
                        <div className={classes.select}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">
                                    Category
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={category}
                                    onChange={handleCategoryChange}
                                    label="Category"
                                >
                                    <MenuItem value="tree">Tree</MenuItem>
                                    <MenuItem value="shrub">Shrub</MenuItem>
                                    <MenuItem value="grass">Grass</MenuItem>
                                    <MenuItem value="ground cover">Ground Cover</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">
                                    Pot Size
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={pot_size}
                                    onChange={handlePotSizeChange}
                                    label="Pot Size"
                                >
                                    <MenuItem value="140mm">140mm</MenuItem>
                                    <MenuItem value="250mm">250mm</MenuItem>
                                    <MenuItem value="350mm">350mm</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <TextField 
                                className={classes.textArea} 
                                multiline 
                                required 
                                variant="outlined"
                                id="outlined" 
                                rows={4} 
                                name="description" 
                                label="Description"
                                value={description} 
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TextField 
                                className={classes.textArea}
                                variant="outlined"
                                id="outlined" 
                                onChange={handleChange}
                                type="number" 
                                name="quantity" 
                                label="Quantity"
                                value={quantity ? quantity : ""}
                            />
                        </div>
                        <div>
                            <TextField 
                                className={classes.textArea}
                                variant="outlined"
                                id="outlined"  
                                type="number" 
                                name="price" 
                                label="Price"
                                value={price}
                                onChange={handleChange}
                            />
                        </div>
                        <Button 
                            type="submit" 
                            value="Update Plant" 
                            variant="contained" 
                            color="primary"
                            size="medium"
                            className={classes.updateButton}
                        >
                            Update Plant
                        </Button>
                    </form>
                    <Button 
                            variant="outlined" 
                            color="secondary"
                            size="medium"
                            onClick={handleBack}
                        >
                            Back
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default withRouter(PlantsEdit)
