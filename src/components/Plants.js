import React from 'react'
import PlantsShow from './PlantsShow'
import { useGlobalState } from '../config/store'

const Plants = () => {

    const { store } = useGlobalState()
    const { plants } = store

    return (
        <div>
            { plants
                .sort((a, b) => b.modified_date - a.modified_date)
                .map((plant) => <PlantsShow key={plant._id} plant={plant} />)
            }
        </div>
    )
}

export default Plants
