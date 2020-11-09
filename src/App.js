import React, { useState, useEffect } from 'react'
import { Switch, Route, withRouter, useHistory } from 'react-router-dom'

import './App.css';

import axios from 'axios'

import {API_URL} from './config'

import SILNavBar from './components/silnavbar/SILNavBar'
import SignUp from './components/signup/SignUp'
import SignIn from './components/signin/SignIn'
import ClimberHome from './components/climberhome/ClimberHome'
import ProjectList from './components/projectlist/ProjectList'
import SearchRoutes from './components/searchroutes/SearchRoutes'

const App = () => {

  const [loggedInClimber, setLoggedInClimber] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [myProjects, setMyProjects] = useState([])
  const [searchedRoutesResults, setSearchedRoutesResults] = useState(null)
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

  const handleRouteSearch = (event) => {
    event.preventDefault();

    const { location, routeType } = event.target

    axios.get(`${API_URL}/mapSearch/${location.value}/${routeType.value}`, { withCredentials: true })
      .then((response) => {
        console.log(response)
        setSearchedRoutesResults(response.data.routesResponse.routes)
        setSearchedCity(response.data.cityLatLon)
      })

      let filteredByTypeList

      {
        searchedRoutesResults ? (filteredByTypeList = searchedRoutesResults.filter((route) => {
            return route.type === routeType.value
            }) 
          ) : (filteredByTypeList = null)
      }

    setSearchedRoutesResults(filteredByTypeList)

  }

  return (
    <div className="App">
      Hello!
      <SILNavBar onLogout={handleLogOut} loggedInClimber={loggedInClimber}/>

      <Switch>

        <Route path="/sign-up" render={ (routeProps) => {
          return <SignUp onSignUp={handleSignUp} {...routeProps} />
        } }/>

        <Route path="/sign-in" render={ (routeProps) => {
          return <SignIn onSignIn={handleSignIn} {...routeProps} errorMessage={errorMessage} />
        } } />

        <Route path="/home" render={ () => {
          return <ClimberHome loggedInClimber={loggedInClimber} />
        } }/>

        <Route path="/current-projects" render={ (routeProps) => {
          return <ProjectList {...routeProps} />
        } }/>

        <Route path="/future-projects" render={ (routeProps) => {
          return <ProjectList {...routeProps} myProjects={myProjects}/>
        } }/>

        <Route path="/sent-projects" render={ (routeProps) => {
          return <ProjectList {...routeProps} />
        } }/>

        <Route path="/search-routes" render={ (routeProps) => {
          return <SearchRoutes {...routeProps} onRouteSearch={handleRouteSearch} searchedRoutesResults={searchedRoutesResults} searchedCity={searchedCity}/>
        } }/>

      </Switch>

    </div>
  );
}

export default withRouter(App);

//add onUnmount to signIn
