import React, { useState, useEffect } from 'react'
import { useGlobalState } from '../config/store'
import { getPlantFromId } from '../services/plantServices'
import { deleteItemFromCart, updateCart } from '../services/cartServices'

import { 
    IconButton,
    Grid,
    Paper,
    TextField,
    Typography
} from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear';
import grey from '@material-ui/core/colors/grey';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(1)
    },
    plantQuote : {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        padding: theme.spacing(1),
        backgroundColor: grey[100],
        [theme.breakpoints.down('xs')]: {
            flexWrap: 'wrap',
            justifyContent: 'space-between'
        }
    },
    input: {
        width: '15%',
        [theme.breakpoints.down('xs')]: {
            width: '20%'
        },
    },
    commonName: {
        [theme.breakpoints.down('xs')]: {
           padding: theme.spacing(1)
        },
    }
}))


const QuoteItem = ({ cartPlants }) => {

    const classes = useStyles();

    const { quantity, plant_id, _id } = cartPlants

    const { store, dispatch } = useGlobalState()
    const { plants, quotePlants } = store
    const [plantInfo, setPlantInfo] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        // If there are plants in the cart, then find their information and set it in plantInfo state
        if (cartPlants) {
            const plantData = getPlantFromId(plants, plant_id)
            setPlantInfo(plantData)
        } else {
            console.log("No cartPlants")
        }
    }, [quantity])

    const {common_name, price, pot_size} = plantInfo

    if (!cartPlants) return null

    function handleDelete(event) {
        event.preventDefault()

        deleteItemFromCart(plant_id)
            .then((res) => {
                console.log("attempted deleted plant successful")
                const updatedCart = quotePlants.filter((p) => p.plant_id !== plant_id)
                dispatch({
                    type: "setQuotePlants",
                    data: updatedCart
                })
                console.log(quotePlants)
            })
            .catch((error) => {
                const status = error.response ? error.response.status : 500
                console.log("caught error on cart delete", error)
                if(status === 403)
                    setErrorMessage("You are not an admin, and unable to delete a plant")
                else
                    setErrorMessage("Well, this is embarrassing... There was a problem on the server.")
            })
    }

    const handleQuantityChange = (event) => {
        event.preventDefault()
        
        if (event.target.value < 1) {
            event.target.value = 1
        }
        let updatedQuantity = event.target.value

        const data = {
            cartItemId: _id,
            plant: plant_id,
            quantity: updatedQuantity
        }

        updateCart(data)
            .then((res) => {
                console.log(res)
                // const otherCartItmes = quotePlants.filter((p) => p.plant_id !== plant_id)
                // dispatch({
                //     type: "setQuotePlants",
                //     data: [...otherCartItmes, updatedQuantity]
                // })
            })
            .catch((error) => {
                const status = error.response ? error.response.status : 500
                console.log("caught error on quantity edit", error)
                if(status === 403)
                    setErrorMessage("Sorry there was an error")
                else
                    setErrorMessage("Well, this is embarrassing... There was a problem on the server.")
            })
    }

    return (
        <Grid container className={classes.container}>
            { errorMessage && (<Typography>{errorMessage}</Typography>)}
            <Paper className={classes.plantQuote}>
                <TextField 
                    type="number" 
                    variant="outlined"
                    size="small"
                    name="quantity" 
                    placeholder={quantity} 
                    onChange={handleQuantityChange}
                    className={classes.input}
                />
                <Grid className={classes.commonName}>
                    <Typography variant="body2"><strong>{common_name}</strong></Typography>
                </Grid>
                <Grid>
                    <Typography variant="body2" color="textSecondary">Pot Size: <strong>{pot_size}</strong></Typography>
                </Grid>
                <Grid>
                    <Typography variant="body2" color="textSecondary">Price: <strong>${price}</strong></Typography>
                </Grid>
                <Grid>
                    <IconButton aria-label="delete" color="secondary" onClick={handleDelete}>
                        <ClearIcon />
                    </IconButton>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default QuoteItem

