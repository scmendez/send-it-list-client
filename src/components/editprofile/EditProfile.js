import React, {useState, useEffect} from 'react'
import axios from 'axios'

import {API_URL} from '../../config'

const EditProfile = (props) => {

    const [loggedInClimber, setLoggedInClimber] = useState({})

    useEffect(() => {
        axios.get(`${API_URL}/climber`, { withCredentials: true })
            .then((response) => {
                console.log('routedbid response', response)
                setLoggedInClimber(response.data)
        })
    }, [])

    const handleNameChange = (event) => {
        let cloneProfile = JSON.parse(JSON.stringify(loggedInClimber))
        cloneProfile.username = event.target.value
        setLoggedInClimber(cloneProfile)
    }

    const { username } = loggedInClimber

    return (
        <React.Fragment>
        <form onSubmit={ (event) => {props.onUsernameEdit(event, loggedInClimber)}}>
            <label>Username: </label>
            <input onChange={handleNameChange} type="text" value={username} name="username" ></input>
            <button type="submit">Save username edit</button>
        </form>

            <hr /> 

        {/* <form onSubmit={ (event) => {props.onProfilePhotoEdit(event, loggedInClimber)}}>
            <label>Profile photo: </label>
            <input onChange={handleNameChange} type="text" value={username} ></input>
            <button type="submit">Upload image</button>
        </form> */}
        </React.Fragment>
    )
}

export default EditProfile