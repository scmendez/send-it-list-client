import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './SILNavBar.css'

const SILNavBar = (props) => {
    return (
        <Navbar bg="light" expand="lg" className="nav-bar">
            <Link to="/home" className="home-btn">Home</Link>
            {
                props.loggedInClimber ? (
                    <button onClick={props.onLogout} className="logout-btn">Logout</button>
                ) : (
                    <React.Fragment>
                        <Link to="/sign-in">Sign In</Link>
                        <Link to="/sign-up">Sign Up</Link>
                    </React.Fragment>                            
                )
            }

        </Navbar>
    )
}

export default SILNavBar