import React from 'react'
import { Link } from 'react-router-dom'

const ClimberHome = (props) => {
    return(
        <div>
            <img src="/images/profilePic.png" alt="temp profile pic"></img>
            {
                props.loggedInClimber ? ( <h1>{props.loggedInClimber.username}</h1> ) : null
            }
            <Link to="/current-projects">Projects</Link>
            <Link to="/future-projects">Want to climb</Link>
            <Link to="/sent-projects">Have climbed</Link>
            <Link to="/search-routes">Search routes</Link>
            
        </div>
    )
}

export default ClimberHome