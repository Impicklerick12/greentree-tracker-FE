import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useGlobalState } from '../config/store'
import { addPlant } from '../services/plantServices'
import S3 from 'aws-s3';

import { makeStyles } from '@material-ui/core/styles';
import {
    TextField, 
    Button,
    Typography
} from '@material-ui/core';

// NEED TO FIND AWS ACCESS KEY
// BUGS - Need to fix
const config = {
    bucketName: 'greentree-tracker-images',
    region: 'ap-southeast-2',
    // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
}

const S3Client = new S3(config)

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    textArea: {
        width: '75%'
    }
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
            category: formState.category || "Bush",
            modified_date: new Date(),
            description: formState.description,
            price: formState.price,
            pot_size: formState.pot_size,
            quantity: formState.quantity,
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
                setErrorMessage("Oops! It appears we lost your login session. Make sure 3rd party cookies are not blocked by your browser settings.")
            else
                setErrorMessage("Well, this is embarrassing... There was a problem on the server.")
        })
    }

    function handleImageUpload(event) {
        // console.log(event.target.files[0])
        const plantImage = event.target.files[0]

        S3Client
            .uploadFile(plantImage)
            .then((res) => {
                console.log(res.location)
            })
            .catch((err) => console.log(err))
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
    const { store, dispatch } = useGlobalState()
    const { plants } = store

    return (
        <div>
            <Typography variant="h2">New Plant</Typography>
            <form className={classes.root} onSubmit={handleSubmit}>
                <div>
                    <TextField className={classes.textArea} id="standard-basic" required type="text" name="common_name" label="Common Name" onChange={handleChange}></TextField>
                </div>
                <div>
                    <TextField className={classes.textArea} required id="standard-basic" type="text" name="botanical_name" label="Botanical Name" onChange={handleChange}></TextField>
                </div>
                <div>
                    <input type="file" name="plant_image" onChange={handleImageUpload}/>
                </div>
                <div>
                    <TextField className={classes.textArea} id="standard-basic" type="text" name="category" label="Category" onChange={handleChange}></TextField>
                </div>
                <div>
                    <TextField className={classes.textArea} multiline required rows={4} name="description" label="Description" onChange={handleChange}></TextField>
                </div>
                <div>
                    <TextField className={classes.textArea} type="text" name="pot_size" label="Pot Size" onChange={handleChange}></TextField>
                </div>
                <div>
                    <TextField className={classes.textArea} type="number" name="quantity" label="Quantity" onChange={handleChange}></TextField>
                </div>
                <div>
                    <TextField className={classes.textArea} type="number" name="price" label="Price" onChange={handleChange}></TextField>
                </div>
                <Button type="submit" value="Add Plant">Add Plant</Button>
            </form>
        </div>
    )
}

export default withRouter(NewPlant)
