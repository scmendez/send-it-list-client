import React, {useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Container, Image, Button } from 'react-bootstrap'
import axios from 'axios'
import {API_URL} from '../../config'

import './ClimberHome.css'

const ClimberHome = (props) => {

  const [loggedInClimber, setLoggedInClimber] = useState(props.loggedInClimber ? props.loggedInClimber: null)
  console.log('propsloggedinclimber', loggedInClimber)


  useEffect(() => {

    let climberId = props.loggedInClimber ? (props.loggedInClimber._id) : null

    if (climberId) {
        axios.get(`${API_URL}/climberInfo/${climberId}`, { withCredentials: true })
        .then((response) => {
            console.log('axios climber esponse', response.data)
            setLoggedInClimber(response.data)
        })
    }
  }, [])

      useEffect(() => {
        const prevloggedInClimber = loggedInClimber
        console.log('CDU', prevloggedInClimber)
        if (props.loggedInClimber && !prevloggedInClimber ) {
             setLoggedInClimber(props.loggedInClimber)
        }
 
    })

    if (!loggedInClimber) {
        return <Redirect to={'/sign-up'} />
    }

    return (
        <div>
            <Container fluid className="link-container">
                <Image className="profile-photo" src="/images/defaultProfilePhoto.png" alt="profile pic" roundedCircle />
                {
                    loggedInClimber ? ( <h2>Hello, {loggedInClimber.username}!</h2> ) : null
                }
                <Link to="/current-projects" className="proj-links">Current Projects</Link>
                <br />
                <Link to="/future-projects" className="proj-links">Potential Projects</Link>
                <br />
                <Link to="/sent-projects" className="proj-links">Sent Projects</Link>
                <br />
                <Link to="/search-routes" className="search-link">Search routes</Link>
            </Container>    
        </div>
    )

}

export default ClimberHome