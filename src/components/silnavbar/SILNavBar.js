import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SILNavBar = () => {
    return (
        <Navbar bg="light" expand="lg">
                <Link to="/sign-up">Sign-Up</Link>



            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    
                    <Link to="/sign-in">Sign-In</Link>
                </Nav>
            </Navbar.Collapse>

        </Navbar>
    )
}

export default SILNavBar