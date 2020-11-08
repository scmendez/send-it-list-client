import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const SearchRoutes = (props) => {

    let mapCenter = [51.505, -0.09];

    {
    props.searchedRoutesResults ? (mapCenter = Object.values(props.searchedCity)) : (mapCenter = [51.505, -0.09])
    }

    //make it so map only renders after you hit search

    return(
        <React.Fragment>

            <h1>Search Routes</h1>

            <form onSubmit={props.onRouteSearch}>
                <input type="text" name="location" placeholder="Location" />
                     <select name="routeType">
                        <option value="Boulder">Boulder</option>
                        <option value="Sport">Sport</option>
                        <option value="Trad">Trad</option>
                    </select>
                <button type="submit">Submit</button>
            </form>

            <MapContainer style={{width: '300px', height: '400px'}} center={mapCenter} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

    {
    props.searchedRoutesResults ? (props.searchedRoutesResults.map((route) => {
                        return (
                            <Marker position={[`${route.latitude}`, `${route.latitude}`]} key={route.id}>
                                <Popup>
                                    Name: `${route.name}`
                                    <br />
                                    Type: `${route.type}`
                                    <br />
                                    Rating: `${route.rating}`
                                    {/* add option to add to Future Projs list */}
                                </Popup>
                            </Marker>
                        )
                    })) : null
    }

            </MapContainer>

        </React.Fragment>
    )
}

export default SearchRoutes