import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const SearchRoutes = (props) => {
    return(
        <React.Fragment>
            <p>SearchRoutes</p>

            <form onSubmit={props.onRouteSearch}>
                <input type="text" name="location" placeholder="Location" />
                     <select name="routeType">
                        <option value="All">All</option>
                        <option value="Boulder">Boulder</option>
                        <option value="Sport">Sport</option>
                        <option value="Trad">Trad</option>
                    </select>
                <button type="submit">Submit</button>
            </form>

            <MapContainer style={{width: '300px', height: '400px'}} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={[51.505, -0.09]}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </React.Fragment>
    )
}

export default SearchRoutes