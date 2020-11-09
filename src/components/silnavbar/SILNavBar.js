import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SILNavBar = (props) => {
    return (
        <Navbar bg="light" expand="lg">
            <Link to="/home">Home</Link>
            {
                props.loggedInClimber ? (
                    <button onClick={props.onLogout}>Logout</button>
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