import React from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

import './SignUp.css'

const SignUp = (props) => {

    if (props.loggedInClimber) {
        return <Redirect to={'/home'} />
    }
    
    return (
        <Form onSubmit={props.onSignUp} className="form-styling sign-up-form">
            <div className="form-group">
                <Form.Control type="text" className="form-control" id="usernameInput" name="username" placeholder="Username"/>
            </div>
            <div className="form-group">
                <Form.Control type="email" className="form-control" id="emailInput" name="email" aria-describedby="emailHelp" placeholder="Email"/>
            </div>
            <div className="form-group">
                <Form.Control type="password" className="form-control" id="passwordInput" name="password" placeholder="Password"/>
                <br />
                <Form.Text id="passwordRequirements" className="form-text password-req">Password requirements: Minimum 8 characters, a number, a special character, an uppercase letter, and a lowercase letter.</Form.Text>                
            </div>
            <Button type="submit" className="btn btn-primary">Submit</Button>
        </Form>
    )
}

export default SignUp