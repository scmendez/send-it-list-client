import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Card } from 'react-bootstrap'
import './ProjectList.css'

const ProjectList = (props) => {

    const { myProjects } = props

    return myProjects.length 
    ? (<h2>No projects yet!</h2>)
    : (
        <React.Fragment>
            {
                myProjects.map((route) => {
                    return (
                        <Container key={route._id} className="route-card">
                            <Card fluid="true" className="card-info">
                                    <Card.Img variant="top" src={route.routeImg} className="card-img"/>
                                    <Card.Title>{route.routeName}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{route.routeType}</Card.Subtitle>
                                    <Card.Text>
                                        <b>Personal Notes: </b> { route.personalNotes ? (<p>{route.personalNotes}</p>) : (<p>No notes yet!</p>) }
                                    </Card.Text>
                                    <Link to={`/details/${route._id}`} className="more-info-link">More info</Link>
                            </Card>
                        </Container>
                    )
                })
            }
        </React.Fragment>
    )
}

export default ProjectList