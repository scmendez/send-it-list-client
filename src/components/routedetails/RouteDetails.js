import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import {API_URL} from '../../config'

const RouteDetails = (props) => {

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

    const { _id, routeName, routeType, routeRating, routePitches, routeLocation, personalNotes, dateAccomplished } = route

    return (
        <div>
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
            Personal Notes: { personalNotes }
            <br />
            Date Accomplished: { dateAccomplished }
            {/* need a ternary here for if listType is sent */}
            <br />
            <Link to={`/edit/${_id}`}><button>Edit</button></Link>
            <button onClick={ () => { props.onDelete(_id) } }>Delete</button>
        </div>
    )
}

export default RouteDetails