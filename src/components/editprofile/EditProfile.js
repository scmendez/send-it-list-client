import React, {useState, useEffect, usePrevious} from 'react'
import axios from 'axios'
import { Form } from 'react-bootstrap'

import {API_URL} from '../../config'

import './EditProfile.css'

const EditProfile = (props) => {

    const [loggedInClimber, setLoggedInClimber] = useState(props.loggedInClimber)
    console.log('props', props.loggedInClimber)

    useEffect(() => {
        let climberId = props.loggedInClimber ? (props.loggedInClimber._id) : null
        console.log('climber', climberId)
        if (climberId) {
            axios.get(`${API_URL}/climberInfo/${climberId}`, { withCredentials: true })
                .then((response) => {
                    console.log('axios climber esponse', response.data)
                    setLoggedInClimber(response.data)
            })
        }
    }, [])

    useEffect(() => {
        const prevloggedInClimber = loggedInClimber
        console.log('CDU', prevloggedInClimber)
        if (props.loggedInClimber && !prevloggedInClimber ) {
             setLoggedInClimber(props.loggedInClimber)
        }
 
    })


    const handleNameChange = (event) => {
        let cloneProfile = JSON.parse(JSON.stringify(loggedInClimber))
        cloneProfile.username = event.target.value
        setLoggedInClimber(cloneProfile)
    }

    if (!loggedInClimber) {
        return null
    }
        console.log('SANDRA HERE', loggedInClimber)
    const { username } = loggedInClimber

    return (
        <React.Fragment>
        <Form onSubmit={ (event) => {props.onUsernameEdit(event, loggedInClimber)}} className="edit-username-form">
            <label>Username: </label>
            <input onChange={handleNameChange} type="text" value={username} name="username" ></input>
            <button type="submit" className="save-username-btn">Save username edit</button>
        </Form>

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