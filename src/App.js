import react, { useState, useEffect, useReducer } from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import plantData from './data/plant_data'
import stateReducer from './config/stateReducer'
import { StateContext } from './config/store'
import { useGlobalState } from './config/store'
import { getPlantFromId } from './services/plantServices'

import {
  Navbar,
  Landing,
  Login,
  Register,
  UserAccount,
  Plants,
  PlantsShow,
  PlantsEdit,
  QuoteRequest,
  Contact,
  Admin,
  NotFound
} from './Exports'

const App = () => {

  const initialState = {
    plants: [],
    loggedInUser: null
  }

  // Create state reducer store and dispatcher
  const [store,dispatch] = useReducer(stateReducer, initialState)
  const {loggedInUser, plants} = store

  useEffect(() => {
    dispatch({
      type: "setPlants",
      data: plantData
    })
  },[])

  // Register user
  function registerUser(user) {
    dispatch({
      type: "setLoggedInUser",
      data: user.username
    })
  }

  // Login user
  function loginUser(user) {
    dispatch({
      type: "setLoggedInUser",
      data: user.username
    })
  }

  // Logout user
  function logoutUser() {
    dispatch({
      type: "setLoggedInUser",
      data: null
    })
  }

  return (
    <div>
      <StateContext.Provider value={{store, dispatch}}>
        <BrowserRouter>
          {/* Navbar Component */}
          <Navbar />
            {loggedInUser 
            ? (<p>{loggedInUser}</p>)
            : (<p>Guest</p>)
            }
          <Switch>
            {/* Home Component */}
            <Route exact path="/"><Landing /></Route>

            {/* Login Component */}
            <Route exact path="/auth/login" component={Login} />

            {/* Register Component */}
            <Route exact path="/auth/register" component={Register} />

            {/* UserAccount Component */}
            <Route exact path="/account"><UserAccount /></Route>

            {/* Plants Component */}
            <Route exact path="/plants" component={Plants} />

            {/* Show Plant Component */}
            <Route exact path="/plants/:id" render={(props) => <PlantsShow {...props} plant={getPlantFromId(plants, props.match.params.id)} /> } />

            {/* Edit Plant Component */}
            <Route exact path="/plants/edit/:id" component={PlantsEdit} />

            {/* Quote Request Component */}
            <Route exact path="/quote"><QuoteRequest /></Route>

            {/* Contact Component */}
            <Route exact path="/contact"><Contact /></Route>

            {/* Admin Component */}
            <Route exact path="/admin"><Admin /></Route>

            {/* Not found component which will display if a URL doesn't match a route */}
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </StateContext.Provider>
    </div>
  );
}

export default App;
