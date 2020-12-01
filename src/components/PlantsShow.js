import { common } from '@material-ui/core/colors'
import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalState } from '../config/store'

const PlantsShow = ({history, plant}) => {

    const { store, dispatch } = useGlobalState()
    const { plants } = store

    // If we don't have a plant, return null
    if (!plant) return null

    const { commonName, category, modified_date, description } = plant

    return (
        <div>
            <h2>{commonName}</h2>
            <h2>{modified_date.toLocaleString()}</h2>
            <h2>{category}</h2>
            <p>{description}</p>
        </div>
    )
}

export default PlantsShow
