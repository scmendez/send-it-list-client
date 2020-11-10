import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Card } from 'react-bootstrap'
import './ProjectList.css'

const ProjectList = (props) => {

    const { myProjects } = props
    //console.log(myProjects)

    return (
        <React.Fragment className="all-cards">
            {
                myProjects.map((route) => {
                    return (
                        <Container key={route._id} className="route-card">
                            <Card fluid>
                                    <Card.Title>{route.routeName}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{route.routeType}</Card.Subtitle>
                                    <Card.Text>
                                    Personal Notes: {route.personalNotes}
                                    </Card.Text>
                                    <Card.Link><Link to={`/details/${route._id}`}>More info</Link></Card.Link>
                            </Card>
                        </Container>
                    )
                })
            }
        </React.Fragment>
    )
}

export default ProjectList