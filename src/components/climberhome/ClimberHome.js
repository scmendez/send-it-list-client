import React, {useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Container, Image, Button } from 'react-bootstrap'
import axios from 'axios'
import {API_URL} from '../../config'

import './ClimberHome.css'

const ClimberHome = (props) => {

  const [loggedInClimberHome, setLoggedInClimberHome] = useState({})

  useEffect(() => {
    axios.get(`${API_URL}/climber`, { withCredentials: true })
    .then((response) => {
        //console.log(response.data)
        setLoggedInClimberHome(response.data)
    })
  }, [])

    if (!props.loggedInClimber) {
        return <Redirect to={'/sign-up'} />
    }

    return (
        <div>
            <Container fluid>
                <Image className="profile-photo" src="/images/defaultProfilePhoto.png" alt="profile pic" roundedCircle />
                {
                    props.loggedInClimber ? ( <h2>Hello, {props.loggedInClimber.username}!</h2> ) : null
                }
                <Button size="lg" variant="light"><Link to="/current-projects" className="proj-links">Current Projects</Link></Button>
                <br />
                <Button size="lg" variant="light"><Link to="/future-projects" className="proj-links">Potential Projects</Link></Button>
                <br />
                <Button size="lg" variant="light"><Link to="/sent-projects" className="proj-links">Sent Projects</Link></Button>
                <br />
                <Button size="lg" variant="light"><Link to="/search-routes" className="search-link">Search routes</Link></Button>
            </Container>    
        </div>
    )

}

export default ClimberHome