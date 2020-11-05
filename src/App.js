import React, { useState } from 'react'
import { Switch, Route, withRouter, useHistory } from 'react-router-dom'

import './App.css';

import axios from 'axios'

import {API_URL} from './config'

import SILNavBar from './components/silnavbar/SILNavBar'
import SignUp from './components/signup/SignUp'

const App = () => {

  const [loggedInClimber, setLoggedInClimber] = useState(null)

  const history = useHistory();

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
        history.push('/')
      })
  }

  return (
    <div className="App">
      Hello!
      <SILNavBar />

      <Switch>

        <Route path="/sign-up" render={ (routeProps) => {
          return <SignUp onSignUp={handleSignUp} {...routeProps} />
        } }/>

        <Route path="/sign-in"/>

      </Switch>

    </div>
  );
}

export default withRouter(App);
