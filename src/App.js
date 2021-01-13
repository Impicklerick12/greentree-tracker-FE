import react, { useEffect, useReducer } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import plantData from './data/plant_data'
import stateReducer from './config/stateReducer'
import { StateContext } from './config/store'
import { getPlantFromId, getAllPlants } from './services/plantServices'
import { getCart } from './services/cartServices'
import { userAuthenticated, setLoggedInUser, getLoggedInUser, userAdmin } from './services/authServices'

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
    quotePlants: [],
    quoteRequestData: [],
    submittedQuotes: [],
    searchValue: null,
    admin: null
  }

  // Create state reducer store and dispatcher
  const [store, dispatch] = useReducer(stateReducer, initialState)
  const { loggedInUser, plants, quotePlants, admin } = store
  console.log("userAdmin: ", admin)

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

  const getCartData = () => {
    getCart().then((cartData) => {
      dispatch({
        type: "setQuotePlants",
        data: cartData
      })
    }).catch((error) => {
      dispatch({
        type: "setError",
        data: true
      })
      console.log("An error occurred fetching the cart from the server:", error)
    })
    console.log("QuotePlants: ", quotePlants)
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
                <Route exact path="/account"><UserAccount /></Route>

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
                {/* <Route component={NotFound} /> */}
              </Switch>
            </Container>

          {/* Footer component */}
          {/* <Footer /> */}

        </BrowserRouter>
        <Footer />
      </StateContext.Provider>
    </div>
  );
}

export default App;
