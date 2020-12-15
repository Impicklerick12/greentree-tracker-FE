import react, { useEffect, useReducer } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import plantData from './data/plant_data'
import stateReducer from './config/stateReducer'
import { StateContext } from './config/store'
import { getPlantFromId, getAllPlants } from './services/plantServices'
import { userAuthenticated, setLoggedInUser, getLoggedInUser } from './services/authServices'

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
  NotFound,
  Footer
} from './Exports'

import {
  Container
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

require('dotenv').config()

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
}));

const App = () => {

  const classes = useStyles();

  const initialState = {
    plants: [],
    loggedInUser: null,
    quotes: [],
    quoteRequestData: [],
    searchValue: null
  }

  // Create state reducer store and dispatcher
  const [store, dispatch] = useReducer(stateReducer, initialState)
  const { loggedInUser, plants } = store

  function fetchAllPlants() {
    getAllPlants().then((plantData) => {
      dispatch({
        type: "setPlants",
        data: plantData
      })
    }).catch((error) => {
      dispatch({
        type: "setError",
        data: true
      })
      console.log("An error occurred fetching plants from the server:", error)
    })
  }

  // useEffect(() => {
  //   // dispatch({
  //   //   type: "setPlants",
  //   //   data: plantData
  //   // })

  //   // TO USE IN PRODUCION - REPLACE CODE ABOVE
	// 	userAuthenticated().then(() => {			 
	// 		dispatch({
	// 			type: "setLoggedInUser",
	// 			data: getLoggedInUser()
	// 		})
	// 	}).catch((error) => {
	// 		console.log("got an error trying to check authenticated user:", error)
	// 		setLoggedInUser(null) 
	// 		dispatch({
	// 			type: "setLoggedInUser",
	// 			data: null
	// 		})
	// 	})
  //   // return a function that specifies any actions on component unmount
  //   return () => {}
  // },[])

  useEffect(() => {
    // if not logged in FE
    if (loggedInUser === null) {
    // checks to see if there is any logged in user in BE using the cookies
      userAuthenticated()
        .then((resp) => {
            let currentUser = resp.data.user;
            // if there is a logged in user in the BE, assign it to the state currentUser
            if (currentUser) {
                dispatch({
                    type: "setLoggedInUser",
                    data: currentUser,
                });
            } else {
                console.log("No user logged in on page reload");
            }
        })
        .catch((error) => {
            console.log(
                `An error ocurred on getLoggedInUser: ${error}.`
            );
        });
    }
  }, []);

  useEffect(() => {
    fetchAllPlants()
  }, [])

  // // Register user
  // function registerUser(user) {
  //   dispatch({
  //     type: "setLoggedInUser",
  //     data: user.username
  //   })
  // }

  // // Login user
  // function loginUser(user) {
  //   dispatch({
  //     type: "setLoggedInUser",
  //     data: user.username
  //   })
  // }

  // // Logout user
  // function logoutUser() {
  //   dispatch({
  //     type: "setLoggedInUser",
  //     data: null
  //   })
  // }

  return (
    <div className={classes.root}>
      <StateContext.Provider value={{store, dispatch}}>
        <BrowserRouter>

          {/* Navbar Component */}
          <Navbar />

            <Container maxWidth="lg">
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
                {/* <Route component={NotFound} /> */}
              </Switch>
            </Container>

          {/* Footer component */}
          {/* <Footer /> */}

        </BrowserRouter>
      </StateContext.Provider>
    </div>
  );
}

export default App;
