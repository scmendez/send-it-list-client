import React from 'react'
import { Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './SILNavBar.css'

const SILNavBar = (props) => {
    return (
        <Navbar expand="true" className="nav-bar">

            {
                props.loggedInClimber 
                ? (
                    <React.Fragment>
                        <Link to="/home" className="btn home">Home</Link>                        
                        <Link to="/edit-profile" className="btn edit-profile">Edit Profile</Link>
                        <button onClick={props.onLogout} className="btn logout">Logout</button>
                    </React.Fragment>
                    ) 
                : (
                    <React.Fragment>
                        <Link to="/sign-in" className="btn sign-in">Sign In</Link>
                        <Link to="/sign-up" className="btn sign-up">Sign Up</Link>
                    </React.Fragment>                            
                )
            }

        </Navbar>
    )
}

export default SILNavBar