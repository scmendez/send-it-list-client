import React from 'react'

const SignUp = (props) => {
    return (
        <form onSubmit={props.onSignUp}>
            <div className="form-group">
                <label>Username </label>
                <input type="text" className="form-control" id="usernameInput" name="username" />
            </div>
            <div className="form-group">
                <label>Email </label>
                <input type="email" className="form-control" id="emailInput" name="email" aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
                <label>Password </label>
                <input type="password" className="form-control" id="passwordInput" name="password" />
                <br />
                <small id="passwordRequirements" className="form-text text-muted">Password requirements: Minimum 8 characters, a number, a special character, an uppercase letter, and a lowercase letter.</small>                
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default SignUp