import React, { useEffect, useState } from 'react'
import axios from 'axios'

import {API_URL} from '../../config'

const EditRoute = (props) => {

    const [route, setRoute] = useState({})

    useEffect(() => {
        //console.log('routeprops', props)
        let routeDbId = props.match.params.routeDbId

        axios.get(`${API_URL}/details/${routeDbId}`, { withCredentials: true })
            .then((response) => {
                console.log('routedbid response', response)
                setRoute(response.data)
        })
    }, [])

    const personalNotesEdit = (event) => {
        let cloneNotes = JSON.parse(JSON.stringify(route))
        cloneNotes.personalNotes = event.target.value
        setRoute(cloneNotes)
    }

    const { routeName, routeType, routeRating, routePitches, routeLocation, personalNotes, dateAccomplished, listType } = route

    return (
        <form onSubmit={ (event) => {props.onRouteEdit(event, route)}}>
            Route Name: {routeName}
            <br />
            Route Type: {routeType}
            <br />
            Route Rating: {routeRating}
            <br />
            {
                routeType == 'Boulder' ? null : (<p>Route Pitches: {routePitches}</p>)
            }
            <br />
            {routeLocation}
            <br />
            <label>Personal Notes: </label>
            <input name="personalNotes" onChange={personalNotesEdit} type="text" value={personalNotes}></input>
            <br />
            <label>Date Accomplished </label>
            <input name="dateAccomplished" type="text" value={dateAccomplished}></input>
            <br />
            <label>List </label>
            <select name="listType">
                <option value={listType}>{listType}</option>
                <option value="current">Current</option>
                <option value="future">Future</option>
                <option value="sent">Sent</option>
            </select>
            <br />
            <button type="submit">Edit</button>
        </form>
    )
}

export default EditRoute