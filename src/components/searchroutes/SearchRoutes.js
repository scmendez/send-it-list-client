import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';
import { Form } from 'react-bootstrap'

import './SearchRoutes.css'

const SearchRoutes = (props) => {
    
    const position = props.searchedCity ? Object.values(props.searchedCity) : [34.0522, -118.2437]

    useEffect(() => {
        //for leaflet marker
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
          iconUrl: require("leaflet/dist/images/marker-icon.png"),
          shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });
      }, []);

    useEffect(() => {
        return props.onUnmount
    }, [])

    const searchedRoutesResults = props.searchedRoutesResults || []
    console.log('within searchroutes js', searchedRoutesResults)

    return(
        <React.Fragment>
            <h1>Search Routes</h1>
            <form onSubmit={props.onRouteSearch}>
                <input type="text" name="location" placeholder="Location" />
                <select name="routeType" className="route-type-btn">
                    <option value="Boulder">Boulder</option>
                    <option value="Sport">Sport</option>
                    <option value="Trad">Trad</option>
                </select>
                <button type="submit">Submit</button>
            </form>
            {
                searchedRoutesResults.length ? (
                <MapContainer style={{width: '900px', height: '400px'}} center={position} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                        {
                            searchedRoutesResults.map((route, i) => {
                                let positionMarker  = [route.latitude, route.longitude]
                                const customMarker = L.icon({ iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-32.png', })
                                return  (
                                    <Marker icon={customMarker} position={positionMarker} key={route.id}>
                                        <Popup>
                                            <b>Name: </b>{route.name}
                                            <br />
                                            <b>Type: </b>{route.type}
                                            <br />
                                            <b>Rating: </b>{route.rating}
                                            <br />
                                            <a href={route.url} target="_blank">More details on MountainProject</a>
                                            <br />
                                            <button onClick={ () => {props.onAddRoute(route.id)} }>Add route</button>
                                        </Popup>
                                    </Marker>)
                            })
                        }
                </MapContainer>
                ) : null
            }
        </React.Fragment>
    )
}
export default SearchRoutes