import react, { useEffect, useReducer } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import stateReducer from './config/stateReducer'
import { StateContext } from './config/store'
import { getPlantFromId, getAllPlants } from './services/plantServices'
import { getCart } from './services/cartServices'
import { getLoggedInUser, userAdmin, getUserId } from './services/authServices'

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
    fontFamily: "Arial",
  },
  container: {
    // height: '100%'
  }
}));

const App = () => {

  const classes = useStyles();

  const initialState = {
    plants: [],
    loggedInUser: null,
    userId: null,
    quotePlants: [],
    quoteRequestData: [],
    submittedQuotes: [],
    searchValue: null,
    admin: null
  }

  // Create state reducer store and dispatcher
  const [store, dispatch] = useReducer(stateReducer, initialState)
  const { loggedInUser, plants, admin } = store

  function fetchAllPlants() {
    getAllPlants().then((plantData) => {
      dispatch({
        type: "setPlants",
        data: plantData
      })
    }).catch((error) => {
      console.log("An error occurred fetching plants from the server:", error)
    })
  }

  const getCartData = () => {
    getCart().then((cartData) => {
      dispatch({
        type: "setQuotePlants",
        data: cartData
      })
    }).catch((error) => {
      console.log("An error occurred fetching the cart from the server:", error)
    })
  }

  useEffect(() => {
    // Checking the local storage to see if there is a current user
    const currentUser = getLoggedInUser()
    // If current user, set global state again to current user
    if (currentUser) {
      dispatch({
          type: "setLoggedInUser",
          data: currentUser,
      });
    } else {
      console.log("No user in Local Storage");
    }
  }, []);

  useEffect(() => {
    // Checking the local storage to see if there is a userId
    const currentUserId = getUserId()
    // If current userId, set global state again to current userId
    if (currentUserId) {
      dispatch({
          type: "setUserId",
          data: currentUserId,
      });
    } else {
      console.log("No userId in Local Storage");
    }
  }, []);

  // ONLY CURRENTLY WORKING IN DEVELOPMENT 
  useEffect(() => {
    userAdmin().then((res) => {
      console.log(res.status)
      dispatch({
        type:'setAdmin',
        data: true
      })
    })
    .catch((error) => {
      console.log(error)
    })
  },[])

  useEffect(() => {
    fetchAllPlants()
  }, [])

  useEffect(() => {
    getCartData()
  }, [])

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  return (
    <div className={classes.root}>
      <StateContext.Provider value={{store, dispatch}}>
        <BrowserRouter>

          {/* Navbar Component */}
          <Navbar />

            <Container maxWidth="lg" className={classes.container}>
                {loggedInUser 
                ? (
                  <>
                    <p>Welcome back {loggedInUser}</p>
                  </>
                )
                : (<p>Welcome Guest</p>)
                }
              <Switch>
                {/* Home Component */}
                <Route exact path="/"><Landing /></Route>

                {/* Login Component */}
                <Route exact path="/auth/login" component={Login} />

                {/* Register Component */}
                <Route exact path="/auth/register" component={Register} />

                {/* UserAccount Component */}
                <Route exact path="/account" component={UserAccount}/>

                {/* Plants Component */}
                <Route exact path="/plants" component={Plants} />

                {/* Show Plant Component */}
                <Route exact path="/plants/:id" render={(props) => <PlantsShow {...props} plant={getPlantFromId(plants, props.match.params.id)} capitalize={capitalize} /> } />

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
            </Container>

          {/* Footer component */}
          <Footer />

        </BrowserRouter>
      </StateContext.Provider>
    </div>
  );
}

export default App;
