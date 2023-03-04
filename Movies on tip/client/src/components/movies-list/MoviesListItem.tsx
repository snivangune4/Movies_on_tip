import React from "react";
import { faHeartPulse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap";
import IMovie from "../../models/Imovie";
import { Link } from "react-router-dom";

type Props = {
    movie: IMovie;
}
const MoviesListItem = ( { movie } : Props ) => {

    const posterStyle = {
        height:'350px',
        widht:'250px'
     };

    const {
        id,
        title,
        posterurl
    } = movie;

    return (
        <Card style={{ width: '20rem'}}>
            <Link to={`/favourites/${id}`} className='text-decoration-none'>
            <Card.Img variant="top" src={posterurl} alt={title} style = {{...posterStyle}}/>
            </Link>
            <Card.Body style={{ float:'left', padding:'1rem', textAlign:'center' }}>
                <Card.Title>
                    <Link to={`/favourites/${id}`} className='text-decoration-none align-items-bottom' >
                        {title}
                    </Link>
                </Card.Title>
                <Card.Text >
                    <p className="btn btn-primary btn-sm">
                        <FontAwesomeIcon icon={faHeartPulse} className='me-2'/>                        
                        Add to favourites       
                    </p>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default MoviesListItem;