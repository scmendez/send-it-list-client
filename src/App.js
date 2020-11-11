import React, { useState, useEffect } from 'react'
import { Switch, Route, withRouter, useHistory } from 'react-router-dom'

import './App.css';
import 'bootstrap/dist/css/bootstrap.css'

import axios from 'axios'

import {API_URL} from './config'

import SILNavBar from './components/silnavbar/SILNavBar'
import SignUp from './components/signup/SignUp'
import SignIn from './components/signin/SignIn'
import ClimberHome from './components/climberhome/ClimberHome'
import EditProfile from './components/editprofile/EditProfile'
import ProjectList from './components/projectlist/ProjectList'
import SearchRoutes from './components/searchroutes/SearchRoutes'
import RouteDetails from './components/routedetails/RouteDetails'
import EditRoute from './components/editroute/EditRoute'

const App = () => {

  const [loggedInClimber, setLoggedInClimber] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [myProjects, setMyProjects] = useState([])
  const [searchedRoutesResults, setSearchedRoutesResults] = useState([])
  const [searchedCity, setSearchedCity] = useState(null)

  const history = useHistory();

  useEffect(() => {
    if (!loggedInClimber) {
      axios.get(`${API_URL}/climber`, { withCredentials: true })
        .then((response) => {
          console.log(response.data)
          setLoggedInClimber(response.data)
        })
    }

    axios.get(`${API_URL}/myProjects`, { withCredentials: true })
      .then((response) => {
        setMyProjects(response.data)
      })
  }, [])

  const handleSignUp = (event) => {
    event.preventDefault();

    const { username, email, password } = event.target

    axios.post(`${API_URL}/signup`, {
      username: username.value,
      email: email.value,
      password: password.value
    }, {withCredentials: true})
      .then((response) => {
        setLoggedInClimber(response.data)
        history.push('/home')
      })
  }

  const handleSignIn = (event) => {
    event.preventDefault();

    const { email, password } = event.target

    axios.post(`${API_URL}/signin`, {
      email: email.value,
      password: password.value
    }, { withCredentials: true })
      .then((response) => {
        setLoggedInClimber(response.data)
        history.push('/home')
      })
      .catch((err) => {
        setErrorMessage(err.response.data.error)
      })
  }

  const handleLogOut = () => {
    axios.post(`${API_URL}/logout`, {}, { withCredentials: true })
      .then(() => {
        setLoggedInClimber(null)
        history.push('/')
      })
  }

  const handleUsernameEdit = (event, climber) => {
    event.preventDefault();

    const { username } = event.target
    
    //console.log('handle edit')
    axios.patch(`${API_URL}/editUsername/${climber._id}`, {username: username.value}, { withCredentials: true })
      .then((updatedClimber) => {
          setLoggedInClimber(updatedClimber)
          history.push('/home')          
      })
  }

  const handleProfilePhotoEdit = (event, climber) => {
    console.log('profile photo edit')
  }

  const handleRouteSearch = (event) => {
    event.preventDefault();

    const { location, routeType } = event.target
    console.log(routeType.value)

    axios.get(`${API_URL}/mapSearch/${location.value}`, { withCredentials: true })
      .then((response) => {
        let searchResults = response.data.routesResponse.routes
        setSearchedRoutesResults(searchResults.filter((route) => {
            return route.type === routeType.value
            }))
        setSearchedCity(response.data.cityLatLon)
        console.log('within function', searchedRoutesResults)
      })
  }

  const handleAddRoute = (routeId) => {

    axios.get(`${API_URL}/add-climbing-route/${routeId}`, { withCredentials: true })
      .then((response) => {
        setMyProjects(...myProjects, response)
        history.push('/home')
      })
  }

  const handleUnmount = () => {
    setSearchedRoutesResults(null)

  }

  const handleDelete = (routeDbId) => {
    axios.delete(`${API_URL}/delete/${routeDbId}`, { withCredentials: true })
      .then(() => {

        let filteredProjects = myProjects.filter((eachRoute) => {
              return eachRoute._id !== routeDbId
          })

        setMyProjects(filteredProjects)
        history.push('/home')
      })
  }

  const handleRouteEdit = (event, route) => {
    event.preventDefault();
    console.log('routeDbId', route._id)

    const { personalNotes, dateAccomplished, listType } = event.target
    
    //console.log('handle edit')
    axios.patch(`${API_URL}/edit/${route._id}`, {
      personalNotes: personalNotes.value,
      dateAccomplished: dateAccomplished.value,
      listType: listType.value
    }, { withCredentials: true })
      .then(() => {
        let updatedRoute = myProjects.map((eachRoute) => {
          if (eachRoute._id == route._id) {
            eachRoute = route
          }
          return eachRoute
        })

        setMyProjects(updatedRoute)
        history.push('/home')
    })
  }

  return (
    <div className="App">
      <h1>Send-It List</h1>
      <SILNavBar onLogout={handleLogOut} loggedInClimber={loggedInClimber}/>

      <Switch>

        <Route path="/sign-up" render={ (routeProps) => {
          return <SignUp onSignUp={handleSignUp} {...routeProps} loggedInClimber={loggedInClimber} />
        } }/>

        <Route path="/sign-in" render={ (routeProps) => {
          return <SignIn onSignIn={handleSignIn} {...routeProps} errorMessage={errorMessage} />
        } } />

        <Route path="/home" render={ () => {
          return <ClimberHome loggedInClimber={loggedInClimber} />
        } }/>

        <Route path="/edit-profile" render={ (routeProps) => {
          return <EditProfile {...routeProps} loggedInClimber={loggedInClimber} onUsernameEdit={handleUsernameEdit} onProfilePhotoEdit={handleProfilePhotoEdit}/>
        } } />

        <Route path="/current-projects" render={ (routeProps) => {
          return <ProjectList {...routeProps} onDelete={handleDelete} myProjects={myProjects.filter((route) => {
            return route.listType === 'current'
            })} />
        } }/>

        <Route path="/future-projects" render={ (routeProps) => {
          return <ProjectList {...routeProps} onDelete={handleDelete} myProjects={myProjects.filter((route) => {
            return route.listType === 'future'
            })} />
        } }/>

        <Route path="/sent-projects" render={ (routeProps) => {
          return <ProjectList {...routeProps} onDelete={handleDelete} myProjects={myProjects.filter((route) => {
            return route.listType === 'sent'
            })} />
        } }/>

        <Route path="/search-routes" render={ (routeProps) => {
          return <SearchRoutes {...routeProps} onRouteSearch={handleRouteSearch} onAddRoute={handleAddRoute} searchedRoutesResults={searchedRoutesResults} searchedCity={searchedCity} onUnmount={handleUnmount}/>
        } }/>

        <Route path="/details/:routeDbId" render={ (routeProps) => {
          return <RouteDetails {...routeProps} onDelete={handleDelete} />
        } }></Route>

        <Route path="/edit/:routeDbId" render={ (routeProps) => {
          return <EditRoute {...routeProps} onRouteEdit={handleRouteEdit} />
        } }></Route>

      </Switch>

    </div>
  );
}

export default withRouter(App);

//add onUnmount to signIn
