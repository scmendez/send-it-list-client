import React, {useState, useEffect} from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const SearchRoutes = (props) => {

    const [lat, setLat] = useState(51.505)
    const [lon, setLon] = useState( -0.09)


    // useEffect(() => {
    //     //console.log('alltheparse', JSON.stringify(mapCenter))
    //     //if (props.searchedCity) console.log('somanyparentheses', JSON.stringify(Object.values(props.searchedCity)))
    //     let values;
    //     console.log("props", props.searchedCity)
    //     if (props.searchedCity) values = Object.values(props.searchedCity)
    //     console.log("values", values)
    //     if ( (props.searchedCity) && values[0] !== lat && values[1] !== lon ) {

        
    //         console.log("updating the state")
    //     setLat(values[0])
    //     setLon(values[1])
    //     }
    // }, [])

  
    const searchedRoutesResults = props.searchedRoutesResults || []
    console.log(searchedRoutesResults)
    return(
        <React.Fragment>

            <h1>Search Routes</h1>
            <h1>{51.585}</h1>
            <form onSubmit={props.onRouteSearch}>
                <input type="text" name="location" placeholder="Location" />
                     <select name="routeType">
                        <option value="Boulder">Boulder</option>
                        <option value="Sport">Sport</option>
                        <option value="Trad">Trad</option>
                    </select>
                <button type="submit">Submit</button>
            </form>
            {
                searchedRoutesResults.length ? (
            <MapContainer style={{width: '300px', height: '400px'}} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
{
                        searchedRoutesResults.splice(0, 5).map((route, i) => {
                            let position  = [51.985 +i,15.17+i]
                        return <Marker position={[position]} key={route.id}>
                            <Popup>
                                Name: `${route.name}`
                                <br />
                                Type: `${route.type}`
                                <br />
                                Rating: `${route.rating}`
                                {/* add option to add to Future Projs list */}
                            </Popup>
                        </Marker>
                    })
}
            </MapContainer>
                    ) : null
                }



        </React.Fragment>
    )
}

export default SearchRoutes