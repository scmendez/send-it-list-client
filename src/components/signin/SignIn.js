import React from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

import './SignIn.css'

const SignIn = (props) => {

    if (props.loggedInClimber) {
        return <Redirect to={'/home'} />
    }
    
    return (
        <Form onSubmit={props.onSignIn} className="form-styling sign-in-form">
            <div className="form-group">
                <Form.Control onChange={props.onUnmount} type="email" className="form-control" id="emailInput" name="email" aria-describedby="emailHelp" placeholder="Email"/>
            </div>
            <div className="form-group">
                <Form.Control name="password" type="password" className="form-control" id="passwordInput" placeholder="Password"/>
            </div>
            <Button type="submit" className="btn btn-primary">Submit</Button>  

            {
                props.errorMessage ? (
                    <p style={{color: 'red'}}>{props.errorMessage}</p>
                ) : (null)
            }

        </Form>
    )
}

export default SignIn