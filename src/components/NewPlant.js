import React, { useState, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import { useGlobalState } from '../config/store'
import { addPlant } from '../services/plantServices'
import { config } from '../config/awsConfig'
import S3 from 'aws-s3';

import { successBanner, alertBanner } from './Alerts'

import { makeStyles } from '@material-ui/core/styles';
import {
    TextField, 
    Button,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    LinearProgress,
    Grid
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    textArea: {
        width: '75%',
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
    loadingBar : {
        width: '100%'
    }
  }));

const NewPlant = ({history}) => {

    const classes = useStyles();
    const { store, dispatch } = useGlobalState()
    const { plants } = store

    const initialFormState = {
        common_name: "",
        botanical_name: "",
        plant_image: "",
        category: "",
        description: "",
        pot_size: "",
        quantity: 0,
        price: 0
    } 

    const [formState, setFormState] = useState(initialFormState);
    const [errorMessage, setErrorMessage] = useState(null);
    const [category, setCategory] = useState('');
    const [potSize, setPotSize] = useState('');
    const [upload, setUpload] = useState(true)
    const [loading, setLoading] = useState(null);

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value

        setFormState({
            ...formState,
            [name]: value
        })
        console.log(formState)
    }

    const handleCategoryChange = (event) => {
        const name = "category"
        const value = event.target.value
        setFormState({
            ...formState,
            [name]: value
        })
        setCategory(value)
    }

    const handlePotSizeChange = (event) => {
        const name = "pot_size"
        const value = event.target.value
        setFormState({
            ...formState,
            [name]: value
        })
        setPotSize(value)
    }

    function handleSubmit(event) {
        event.preventDefault()

        const newPlant = {
            common_name: formState.common_name,
            botanical_name: formState.botanical_name,
            plant_image: formState.plant_image,
            category: formState.category || "tree",
            description: formState.description,
            pot_size: formState.pot_size,
            quantity: formState.quantity,
            price: formState.price
        }
        console.log("newPlant: ", newPlant)
        addPlant(newPlant).then((newPlant) => {
            dispatch({
                type: "setPlants",
                data: [...plants, newPlant]
            })
            history.push(`/plants/${newPlant._id}`)
        }).catch((error) => {
            const status = error.response ? error.response.status : 500
            console.log("caught error on Add Plant", error)
            if(status === 403)
                setErrorMessage("You are not an admin, and unable to create a plant")
            else
                setErrorMessage("Well, this is embarrassing... There was a problem on the server.")
        })
    }
 
    const fileInput = useRef();

    const handleClick = (event) => {
        event.preventDefault();

        const ReactS3Client = new S3(config);

        let file = fileInput.current.files[0];
        let newFileName = fileInput.current.files[0].name;
        setUpload(false)
        setLoading(true)
        
        ReactS3Client.uploadFile(file, newFileName)
            .then(data => {
                setFormState({
                    ...formState,
                    plant_image: data.location
                })

                if (data.status === 204) {
                    console.log("Image Upload Successful");
                    setLoading(false)
                } else {
                    console.log("Image Upload fail");
                }
            });
    };

    return (
        <div>
            {errorMessage && alertBanner(errorMessage)}
            <Typography variant="h2">New Plant</Typography>
            <form className={classes.root} onSubmit={handleSubmit}>
                <div>
                    <TextField 
                        className={classes.textArea} 
                        variant="outlined"
                        id="outlined" 
                        required 
                        type="text" 
                        name="common_name" 
                        label="Common Name" 
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
                        onChange={handleChange}
                    />
                </div>
                { upload ? (
                    <div>
                        <input 
                            type="file" 
                            name="plant_image" 
                            accept="image/*"
                            ref={fileInput} 
                            onChange={handleClick}
                        />
                    </div>
                ) : (
                    <Grid container justify="center" className={classes.loadingBar}>
                        { loading ? (
                            <LinearProgress color="secondary"/>
                        ) : (
                            successBanner("Image upload Successful!")
                        )}
                    </Grid>
                )}
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
                            value={potSize}
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
                        onChange={handleChange}
                    />
                </div>
                <Button type="submit" value="Add Plant">
                    Add Plant
                </Button>
            </form>
        </div>
    )
}

export default withRouter(NewPlant)

