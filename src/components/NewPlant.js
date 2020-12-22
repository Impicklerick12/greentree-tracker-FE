import React, { useState, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import { useGlobalState } from '../config/store'
import { addPlant } from '../services/plantServices'
import S3 from 'aws-s3';

import { makeStyles } from '@material-ui/core/styles';
import {
    TextField, 
    Button,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@material-ui/core';

// NEED TO FIND AWS ACCESS KEY
// BUGS - Need to fix
// const config = {
    // bucketName: 'greentree-tracker-images',
    // region: 'ap-southeast-2',
    // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    // accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    // secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
// }

// const S3Client = new S3(config)

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    textArea: {
        width: '75%'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
  }));

const NewPlant = ({history}) => {

    const classes = useStyles();

    // Gets the next available id for a new post 
    function getNextId(){
        const ids = plants.map((plant) => plant._id)
        return ids.sort()[ids.length-1] + 1
    }

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
        // event.preventDefault()
        // const nextId = getNextId()
        // const newPlant = {
        //     _id: nextId,
        //     common_name: formState.common_name,
        //     botanical_name: formState.botanical_name,
        //     category: formState.category || "Bush",
        //     modified_date: new Date(),
        //     description: formState.description,
        //     price: formState.price,
        //     pot_size: formState.pot_size,
        //     quantity: formState.quantity,
        // }
        // dispatch({
        //     type: "setPlants",
        //     data: [...plants, newPlant]
        // })
        // history.push(`/plants/${nextId}`)

        // TO USE IN PRODUCTION - REPLACE CODE ABOVE
        event.preventDefault()
        const newPlant = {
            common_name: formState.common_name,
            botanical_name: formState.botanical_name,
            file: formState.fileInput,
            category: formState.category || "Bush",
            description: formState.description,
            pot_size: formState.pot_size,
            quantity: formState.quantity,
            price: formState.price
        }
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

    // AWS3 image upload function
    //function Upload() {
        // console.log(event.target.files[0])
        // const plantImage = event.target.files[0]

        // S3Client
            // .uploadFile(plantImage)
            // .then((res) => {
                // console.log(res.location)
            // })
            // .catch((err) => console.log(err))
    const fileInput = useRef();

    const handleClick = (event) => {
        event.preventDefault(); 
        let file = fileInput.current.files[0]; 
        let newFileName = fileInput.current.files[0].name;
        const config = {
            bucketName: "greentree-tracker-images",
            region: "ap-southeast-2",
            accessKeyId: "AKIA5ZNAM4KIY2HYGWMM", 
            secretAccessKey: "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"
        };
        const ReactS3Client = new S3(config);
        ReactS3Client.uploadFile(file, newFileName).then(data => {
            console.log(data);
            if (data.status === 204) {
                console.log("success");
            } else {
                console.log("fail");
            }
        });
    }; 
    //}

    const initialFormState = {
        common_name: "",
        botanical_name: "",
        file: "",
        category: "",
        description: "",
        pot_size: "",
        quantity: 0,
        price: 0
    } 

    const [formState, setFormState] = useState(initialFormState)
    const [errorMessage, setErrorMessage] = useState(null)
    const [category, setCategory] = React.useState('');
    const [potSize, setPotSize] = React.useState('');
    const { store, dispatch } = useGlobalState()
    const { plants } = store

    return (
        <div>
            {errorMessage && <p>{errorMessage}</p>}
            <Typography variant="h2">New Plant</Typography>
            <form className={classes.root} onSubmit={handleSubmit}>
                <div>
                    <TextField className={classes.textArea} id="standard-basic" required type="text" name="common_name" label="Common Name" onChange={handleChange}></TextField>
                </div>
                <div>
                    <TextField className={classes.textArea} required id="standard-basic" type="text" name="botanical_name" label="Botanical Name" onChange={handleChange}></TextField>
                </div>
                <div>
                    <input type="file" name="plant_image" ref={fileInput}/>
                </div>
                {/* <div>
                    <TextField className={classes.textArea} id="standard-basic" type="text" name="category" label="Category" onChange={handleChange}></TextField>
                </div> */}
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
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
                <div>
                    <TextField className={classes.textArea} multiline required rows={4} name="description" label="Description" onChange={handleChange}></TextField>
                </div>
                {/* <div>
                    <TextField className={classes.textArea} type="text" name="pot_size" label="Pot Size" onChange={handleChange}></TextField>
                </div> */}
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Pot Size</InputLabel>
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
                <div>
                    <TextField className={classes.textArea} type="number" name="quantity" label="Quantity" onChange={handleChange}></TextField>
                </div>
                <div>
                    <TextField className={classes.textArea} type="number" name="price" label="Price" onChange={handleChange}></TextField>
                </div>
                <Button type="submit" value="Add Plant" onClick={handleClick}>Add Plant</Button>
            </form>
        </div>
    )
}

export default withRouter(NewPlant)

