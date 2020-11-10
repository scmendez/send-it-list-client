import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Image, Button } from 'react-bootstrap'

import './ClimberHome.css'

const ClimberHome = (props) => {
    return(
        <div>
        <Container fluid>
            <Image src="/images/profilePic.png" alt="temp profile pic" roundedCircle />
            {
                props.loggedInClimber ? ( <h2>Hello, {props.loggedInClimber.username}!</h2> ) : null
            }
            <Button size="lg" variant="light"><Link to="/current-projects" className="proj-links">Projects</Link></Button>
            <br />
            <Button size="lg" variant="light"><Link to="/future-projects" className="proj-links">Want to climb</Link></Button>
            <br />
            <Button size="lg" variant="light"><Link to="/sent-projects" className="proj-links">Have climbed</Link></Button>
            <br />
            <Button size="lg" variant="light"><Link to="/search-routes" className="search-link">Search routes</Link></Button>
        </Container>    
        </div>
    )
}

export default ClimberHome