import React from 'react'

const ProjectList = (props) => {

    const { myProjects } = props
    console.log(myProjects)

    return (
        <React.Fragment>
            {
                myProjects.map((route) => {
                    return (
                        <div key={route._id}>
                            <h2>{route.routeName}</h2>
                            <br />
                            <p>{route.routeType}</p>
                            <br />
                        </div>
                    )
                })
            }
        </React.Fragment>
    )
}

export default ProjectList