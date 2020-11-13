import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import {API_URL} from '../../config'

import './RouteDetails.css'

const RouteDetails = (props) => {

    const [route, setRoute] = useState({})
    const [location, setLocation] = useState([])

    useEffect(() => {
        //console.log('routeprops', props)
        let routeDbId = props.match.params.routeDbId

        axios.get(`${API_URL}/details/${routeDbId}`, { withCredentials: true })
            .then((response) => {
                console.log('routedbid response', response)
                setRoute(response.data)
                console.log(route)
            })
    }, [])

    const { _id, routeName, routeType, routeRating, routePitches, routeLocation, personalNotes, dateAccomplished, routeURL } = route
    
    return (
        <div className="route-details">
            <b>Route Name: </b>{routeName}
            <br />
            <b>Route Type: </b>{routeType}
            <br />
            <b>Route Rating: </b>{routeRating}
            <br />
            {
                routeType == 'Boulder' ? null : (<p>Route Pitches: {routePitches}</p>)
            }
            <br />
            <b>Location: </b>{routeLocation}
            <br />
            <br />
            <b>Personal Notes: </b>{ personalNotes }
            <br />
            {/* <b>Date Accomplished: </b>{ dateAccomplished } */}
            {/* need a ternary here for if listType is sent */}
            <br />
            <Link to={`/edit/${_id}`}><button>Edit</button></Link>
            <button onClick={ () => { props.onDelete(_id) } }>Delete</button>
            <br />
            <br />
            <a href={routeURL} target="_blank">Mtn Proj details</a>
        </div>
    )
}

export default RouteDetails