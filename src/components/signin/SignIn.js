import React from 'react'

const SignIn = (props) => {
    return (
        <form onSubmit={props.onSignIn}>
            <div className="form-group">
                <label>Email</label>
                <input onChange={props.onUnmount} type="email" className="form-control" id="emailInput" name="email" aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input name="password" type="password" className="form-control" id="passwordInput" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>  

            {
                props.errorMessage ? (
                    <p style={{color: 'red'}}>{props.errorMessage}</p>
                ) : (null)
            }

        </form>
    )
}

export default SignIn